import { NextRequest, NextResponse } from 'next/server';
import { promises as dns } from 'dns';

interface CheckResult {
  spf: {
    exists: boolean;
    record: string;
    valid: boolean;
    issues: string[];
    warnings: string[];
    recommendations: string[];
    score: number;
  };
  dkim: {
    exists: boolean;
    record: string;
    valid: boolean;
    issues: string[];
    warnings: string[];
    recommendations: string[];
    score: number;
    selectors: string[];
  };
  dmarc: {
    exists: boolean;
    record: string;
    valid: boolean;
    issues: string[];
    warnings: string[];
    recommendations: string[];
    score: number;
    policy: string;
  };
}

// Comprehensive SPF validation
async function checkSPF(domain: string) {
  try {
    const records = await dns.resolveTxt(domain);
    const spfRecords = records.filter(record => 
      record.join('').toLowerCase().trim().startsWith('v=spf1')
    );

    if (spfRecords.length === 0) {
      return {
        exists: false,
        record: '',
        valid: false,
        issues: ['No SPF record found'],
        warnings: ['Missing SPF record may cause email deliverability issues'],
        recommendations: [
          'Add an SPF record to authorize email servers',
          'Start with "v=spf1 include:_spf.google.com ~all" if using Google Workspace',
          'Use "v=spf1 mx ~all" for basic MX-based authorization'
        ],
        score: 0
      };
    }

    if (spfRecords.length > 1) {
      return {
        exists: true,
        record: spfRecords.map(r => r.join('')).join(' | '),
        valid: false,
        issues: ['Multiple SPF records found - only one SPF record is allowed per domain'],
        warnings: ['Multiple SPF records will cause authentication failures'],
        recommendations: ['Combine all SPF mechanisms into a single record'],
        score: 20
      };
    }

    const recordString = spfRecords[0].join('').trim();
    const issues: string[] = [];
    const warnings: string[] = [];
    const recommendations: string[] = [];
    let score = 100;

    // Parse SPF mechanisms
    const mechanisms = recordString.split(/\s+/).filter(m => m.length > 0);
    
    // Check version
    if (!mechanisms[0] || mechanisms[0].toLowerCase() !== 'v=spf1') {
      issues.push('SPF record must start with "v=spf1"');
      score -= 30;
    }

    // Check for "all" mechanism
    const allMechanisms = mechanisms.filter(m => /^[+\-~?]?all$/i.test(m));
    if (allMechanisms.length === 0) {
      issues.push('SPF record must end with an "all" mechanism');
      score -= 25;
    } else if (allMechanisms.length > 1) {
      issues.push('Multiple "all" mechanisms found');
      score -= 20;
    } else {
      const allMech = allMechanisms[0].toLowerCase();
      if (allMech === '+all') {
        warnings.push('Using "+all" allows any server to send email - very permissive');
        recommendations.push('Consider using "~all" (soft fail) or "-all" (hard fail) instead');
        score -= 15;
      } else if (allMech === '?all') {
        warnings.push('Using "?all" provides no protection against spoofing');
        recommendations.push('Use "~all" or "-all" for better protection');
        score -= 10;
      }
    }

    // Count DNS lookups (includes, a, mx, exists, redirect)
    let dnsLookups = 0;
    const lookupMechanisms = ['include:', 'a:', 'mx:', 'exists:', 'redirect='];
    
    for (const mechanism of mechanisms) {
      for (const lookup of lookupMechanisms) {
        if (mechanism.toLowerCase().includes(lookup)) {
          dnsLookups++;
          break;
        }
      }
      // Plain 'a' and 'mx' also count
      if (/^[+\-~?]?(a|mx)$/i.test(mechanism)) {
        dnsLookups++;
      }
    }

    if (dnsLookups > 10) {
      issues.push(`SPF record has ${dnsLookups} DNS lookups (maximum is 10)`);
      score -= 30;
    } else if (dnsLookups > 8) {
      warnings.push(`SPF record has ${dnsLookups} DNS lookups (close to 10 limit)`);
      score -= 10;
    }

    // Check for common issues
    if (recordString.length > 255) {
      issues.push('SPF record exceeds 255 character limit');
      score -= 20;
    }

    // Check for syntax errors
    const validMechanismPattern = /^[+\-~?]?(all|include:[^\s]+|a(:[^\s]+)?|mx(:[^\s]+)?|ptr(:[^\s]+)?|ip4:[^\s]+|ip6:[^\s]+|exists:[^\s]+|redirect=[^\s]+|exp=[^\s]+)$/i;
    const invalidMechanisms = mechanisms.slice(1).filter(m => !validMechanismPattern.test(m) && !m.startsWith('v='));
    
    if (invalidMechanisms.length > 0) {
      issues.push(`Invalid SPF mechanisms: ${invalidMechanisms.join(', ')}`);
      score -= 25;
    }

    // Recommendations for improvement
    if (!mechanisms.some(m => m.toLowerCase().includes('include:'))) {
      if (!mechanisms.some(m => /^[+\-~?]?(a|mx|ip4:|ip6:)/i.test(m))) {
        warnings.push('SPF record may be too restrictive - no authorized servers specified');
      }
    }

    return {
      exists: true,
      record: recordString,
      valid: issues.length === 0,
      issues,
      warnings,
      recommendations,
      score: Math.max(0, score)
    };
  } catch (error) {
    return {
      exists: false,
      record: '',
      valid: false,
      issues: ['DNS lookup failed - unable to retrieve SPF record'],
      warnings: ['Domain may not exist or DNS is misconfigured'],
      recommendations: ['Verify domain exists and DNS is properly configured'],
      score: 0
    };
  }
}

// Comprehensive DKIM validation
async function checkDKIM(domain: string) {
  try {
    // Comprehensive list of common DKIM selectors
    const commonSelectors = [
      'default', 'google', 'k1', 'k2', 'selector1', 'selector2', 'mail', 'dkim',
      's1', 's2', 'sig1', 'sig2', 'key1', 'key2', 'dk', 'dkim1', 'dkim2',
      'mta', 'smtp', 'email', 'mailgun', 'sendgrid', 'mandrill', 'ses',
      'postmark', 'sparkpost', 'mailchimp', 'constantcontact', 'campaign',
      'newsletter', 'marketing', 'transactional', 'bulk', 'notification'
    ];

    const foundSelectors: string[] = [];
    const foundRecords: { selector: string; record: string; domain: string }[] = [];
    let bestRecord: { selector: string; record: string; domain: string } | null = null;

    // Check all selectors concurrently for better performance
    const selectorChecks = commonSelectors.map(async (selector) => {
      try {
        const dkimDomain = `${selector}._domainkey.${domain}`;
        const records = await dns.resolveTxt(dkimDomain);
        
        for (const record of records) {
          const recordString = record.join('').trim();
          if (recordString.toLowerCase().includes('v=dkim1') || 
              recordString.includes('p=') || 
              recordString.includes('k=')) {
            foundSelectors.push(selector);
            foundRecords.push({ selector, record: recordString, domain: dkimDomain });
            return { selector, record: recordString, domain: dkimDomain };
          }
        }
      } catch (e) {
        // Selector doesn't exist, continue
      }
      return null;
    });

    const results = await Promise.all(selectorChecks);
    const validResults = results.filter(r => r !== null);

    if (validResults.length === 0) {
      return {
        exists: false,
        record: '',
        valid: false,
        issues: ['No DKIM records found'],
        warnings: ['DKIM authentication is not configured'],
        recommendations: [
          'Configure DKIM signing for your email service',
          'Add DKIM public key records to DNS',
          'Common selectors to use: default, google, k1, selector1',
          'Contact your email provider for DKIM setup instructions'
        ],
        score: 0,
        selectors: []
      };
    }

    // Use the first valid record found (could be enhanced to pick the "best" one)
    bestRecord = validResults[0];
    const recordString = bestRecord.record;
    const issues: string[] = [];
    const warnings: string[] = [];
    const recommendations: string[] = [];
    let score = 100;

    // Parse DKIM record parameters
    const params = new Map<string, string>();
    const paramMatches = recordString.match(/([a-z]+)=([^;]+)/gi);
    if (paramMatches) {
      paramMatches.forEach(match => {
        const [, key, value] = match.match(/([a-z]+)=(.+)/i) || [];
        if (key && value) {
          params.set(key.toLowerCase(), value.trim());
        }
      });
    }

    // Check version
    const version = params.get('v');
    if (!version || version.toLowerCase() !== 'dkim1') {
      if (!recordString.toLowerCase().includes('v=dkim1')) {
        issues.push('DKIM record should specify version "v=DKIM1"');
        score -= 20;
      }
    }

    // Check public key
    const publicKey = params.get('p');
    if (!publicKey) {
      issues.push('DKIM record is missing the public key (p= parameter)');
      score -= 40;
    } else {
      if (publicKey.length < 100) {
        warnings.push('DKIM public key appears to be very short');
        score -= 10;
      }
      
      // Check for revoked key
      if (publicKey === '') {
        issues.push('DKIM public key is revoked (empty p= parameter)');
        score -= 30;
      }
    }

    // Check key type
    const keyType = params.get('k');
    if (keyType) {
      if (!['rsa', 'ed25519'].includes(keyType.toLowerCase())) {
        warnings.push(`Unknown key type: ${keyType}`);
        score -= 5;
      }
    } else {
      // Default is RSA, but it's good practice to specify
      recommendations.push('Consider explicitly specifying key type (k=rsa or k=ed25519)');
    }

    // Check hash algorithms
    const hashAlgorithms = params.get('h');
    if (hashAlgorithms) {
      const algorithms = hashAlgorithms.split(':').map(a => a.trim().toLowerCase());
      if (algorithms.includes('sha1')) {
        warnings.push('SHA1 hash algorithm is deprecated and insecure');
        recommendations.push('Use SHA256 instead of SHA1');
        score -= 15;
      }
      if (!algorithms.includes('sha256')) {
        recommendations.push('Consider adding SHA256 to hash algorithms');
      }
    }

    // Check service type
    const serviceType = params.get('s');
    if (serviceType && serviceType !== '*' && serviceType !== 'email') {
      warnings.push(`Service type is restricted to: ${serviceType}`);
    }

    // Check flags
    const flags = params.get('t');
    if (flags) {
      if (flags.includes('y')) {
        warnings.push('DKIM key is in testing mode (t=y flag)');
        recommendations.push('Remove testing flag when ready for production');
        score -= 10;
      }
      if (flags.includes('s')) {
        warnings.push('DKIM key requires strict subdomain matching');
      }
    }

    // Check notes
    const notes = params.get('n');
    if (notes && notes.length > 1024) {
      warnings.push('DKIM notes field is very long');
    }

    // Additional recommendations
    if (foundSelectors.length === 1) {
      recommendations.push('Consider setting up multiple DKIM selectors for key rotation');
    }

    return {
      exists: true,
      record: `${bestRecord.domain}: ${recordString}`,
      valid: issues.length === 0,
      issues,
      warnings,
      recommendations,
      score: Math.max(0, score),
      selectors: foundSelectors
    };
  } catch (error) {
    return {
      exists: false,
      record: '',
      valid: false,
      issues: ['DNS lookup failed - unable to retrieve DKIM records'],
      warnings: ['Domain may not exist or DNS is misconfigured'],
      recommendations: ['Verify domain exists and DNS is properly configured'],
      score: 0,
      selectors: []
    };
  }
}

// Comprehensive DMARC validation
async function checkDMARC(domain: string) {
  try {
    const dmarcDomain = `_dmarc.${domain}`;
    const records = await dns.resolveTxt(dmarcDomain);
    const dmarcRecords = records.filter(record => 
      record.join('').toLowerCase().trim().startsWith('v=dmarc1')
    );

    if (dmarcRecords.length === 0) {
      return {
        exists: false,
        record: '',
        valid: false,
        issues: ['No DMARC record found'],
        warnings: ['Domain is vulnerable to email spoofing and phishing'],
        recommendations: [
          'Implement DMARC policy starting with "p=none" for monitoring',
          'Add aggregate reporting with "rua=" parameter',
          'Gradually move to "p=quarantine" then "p=reject" for full protection',
          'Example: "v=DMARC1; p=none; rua=mailto:dmarc@yourdomain.com"'
        ],
        score: 0,
        policy: 'none'
      };
    }

    if (dmarcRecords.length > 1) {
      return {
        exists: true,
        record: dmarcRecords.map(r => r.join('')).join(' | '),
        valid: false,
        issues: ['Multiple DMARC records found - only one DMARC record is allowed'],
        warnings: ['Multiple DMARC records will cause policy failures'],
        recommendations: ['Combine DMARC settings into a single record'],
        score: 20,
        policy: 'invalid'
      };
    }

    const recordString = dmarcRecords[0].join('').trim();
    const issues: string[] = [];
    const warnings: string[] = [];
    const recommendations: string[] = [];
    let score = 100;

    // Parse DMARC tags
    const tags = new Map<string, string>();
    const tagMatches = recordString.match(/([a-z]+)=([^;]+)/gi);
    if (tagMatches) {
      tagMatches.forEach(match => {
        const [, key, value] = match.match(/([a-z]+)=(.+)/i) || [];
        if (key && value) {
          tags.set(key.toLowerCase(), value.trim());
        }
      });
    }

    // Check version
    const version = tags.get('v');
    if (!version || version.toLowerCase() !== 'dmarc1') {
      issues.push('DMARC record must start with "v=DMARC1"');
      score -= 30;
    }

    // Check policy (required)
    const policy = tags.get('p');
    if (!policy) {
      issues.push('DMARC record is missing required policy (p= tag)');
      score -= 40;
    } else {
      const policyValue = policy.toLowerCase();
      if (!['none', 'quarantine', 'reject'].includes(policyValue)) {
        issues.push(`Invalid DMARC policy: ${policy}. Must be "none", "quarantine", or "reject"`);
        score -= 30;
      } else {
        switch (policyValue) {
          case 'none':
            warnings.push('DMARC policy is set to "none" - provides monitoring but no protection');
            recommendations.push('Consider upgrading to "quarantine" for better protection');
            score -= 20;
            break;
          case 'quarantine':
            recommendations.push('Consider upgrading to "reject" for maximum protection');
            score -= 5;
            break;
          case 'reject':
            // Best policy, no deduction
            break;
        }
      }
    }

    // Check subdomain policy
    const subdomainPolicy = tags.get('sp');
    if (subdomainPolicy) {
      const spValue = subdomainPolicy.toLowerCase();
      if (!['none', 'quarantine', 'reject'].includes(spValue)) {
        issues.push(`Invalid subdomain policy: ${subdomainPolicy}`);
        score -= 10;
      }
    } else {
      recommendations.push('Consider adding subdomain policy (sp= tag) for comprehensive protection');
    }

    // Check alignment modes
    const aspfAlignment = tags.get('aspf');
    if (aspfAlignment) {
      if (!['r', 's'].includes(aspfAlignment.toLowerCase())) {
        issues.push(`Invalid SPF alignment mode: ${aspfAlignment}. Must be "r" (relaxed) or "s" (strict)`);
        score -= 10;
      }
    }

    const adkimAlignment = tags.get('adkim');
    if (adkimAlignment) {
      if (!['r', 's'].includes(adkimAlignment.toLowerCase())) {
        issues.push(`Invalid DKIM alignment mode: ${adkimAlignment}. Must be "r" (relaxed) or "s" (strict)`);
        score -= 10;
      }
    }

    // Check percentage
    const percentage = tags.get('pct');
    if (percentage) {
      const pctValue = parseInt(percentage);
      if (isNaN(pctValue) || pctValue < 0 || pctValue > 100) {
        issues.push(`Invalid percentage value: ${percentage}. Must be 0-100`);
        score -= 10;
      } else if (pctValue < 100) {
        warnings.push(`DMARC policy applies to only ${pctValue}% of messages`);
        recommendations.push('Set pct=100 for full policy enforcement');
        score -= 5;
      }
    }

    // Check reporting URIs
    const aggregateReporting = tags.get('rua');
    if (!aggregateReporting) {
      warnings.push('No aggregate reporting configured (rua= tag missing)');
      recommendations.push('Add aggregate reporting to monitor DMARC effectiveness');
      score -= 15;
    } else {
      // Validate email format in rua
      const emailPattern = /mailto:([^,\s]+)/g;
      const emails = [...aggregateReporting.matchAll(emailPattern)];
      if (emails.length === 0) {
        issues.push('Invalid aggregate reporting URI format');
        score -= 10;
      }
    }

    const forensicReporting = tags.get('ruf');
    if (!forensicReporting) {
      recommendations.push('Consider adding forensic reporting (ruf= tag) for detailed failure analysis');
    } else {
      // Validate email format in ruf
      const emailPattern = /mailto:([^,\s]+)/g;
      const emails = [...forensicReporting.matchAll(emailPattern)];
      if (emails.length === 0) {
        issues.push('Invalid forensic reporting URI format');
        score -= 10;
      }
    }

    // Check failure reporting options
    const failureOptions = tags.get('fo');
    if (failureOptions) {
      const validOptions = ['0', '1', 'd', 's'];
      const options = failureOptions.split(':');
      const invalidOptions = options.filter(opt => !validOptions.includes(opt));
      if (invalidOptions.length > 0) {
        issues.push(`Invalid failure reporting options: ${invalidOptions.join(', ')}`);
        score -= 5;
      }
    }

    // Check report interval
    const reportInterval = tags.get('ri');
    if (reportInterval) {
      const interval = parseInt(reportInterval);
      if (isNaN(interval) || interval < 86400) {
        warnings.push('Report interval is less than 24 hours (86400 seconds)');
      }
    }

    // Additional validation for record length
    if (recordString.length > 255) {
      issues.push('DMARC record exceeds 255 character limit');
      score -= 15;
    }

    // Check for unknown tags
    const knownTags = ['v', 'p', 'sp', 'aspf', 'adkim', 'pct', 'rua', 'ruf', 'fo', 'rf', 'ri'];
    const unknownTags = Array.from(tags.keys()).filter(tag => !knownTags.includes(tag));
    if (unknownTags.length > 0) {
      warnings.push(`Unknown DMARC tags found: ${unknownTags.join(', ')}`);
    }

    return {
      exists: true,
      record: recordString,
      valid: issues.length === 0,
      issues,
      warnings,
      recommendations,
      score: Math.max(0, score),
      policy: policy?.toLowerCase() || 'none'
    };
  } catch (error) {
    return {
      exists: false,
      record: '',
      valid: false,
      issues: ['DNS lookup failed - unable to retrieve DMARC record'],
      warnings: ['Domain may not exist or DNS is misconfigured'],
      recommendations: ['Verify domain exists and DNS is properly configured'],
      score: 0,
      policy: 'none'
    };
  }
}

export async function POST(request: NextRequest) {
  try {
    const { domain } = await request.json();
    
    // Enhanced input validation
    if (!domain || typeof domain !== 'string') {
      return NextResponse.json(
        { error: 'Domain is required and must be a string' },
        { status: 400 }
      );
    }

    // Normalize domain (remove protocol, www, trailing slash, etc.)
    const normalizedDomain = domain
      .toLowerCase()
      .replace(/^https?:\/\//, '')
      .replace(/^www\./, '')
      .replace(/\/$/, '')
      .trim();

    // Enhanced domain validation
    const domainRegex = /^[a-zA-Z0-9]([a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(\.[a-zA-Z0-9]([a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
    if (!domainRegex.test(normalizedDomain)) {
      return NextResponse.json(
        { error: 'Invalid domain format' },
        { status: 400 }
      );
    }

    // Check for domain length limits
    if (normalizedDomain.length > 253) {
      return NextResponse.json(
        { error: 'Domain name too long (max 253 characters)' },
        { status: 400 }
      );
    }

    // Check for valid TLD
    const parts = normalizedDomain.split('.');
    if (parts.length < 2 || parts[parts.length - 1].length < 2) {
      return NextResponse.json(
        { error: 'Domain must have a valid top-level domain' },
        { status: 400 }
      );
    }

    // Check all three records concurrently with timeout
    const timeout = 30000; // 30 seconds timeout
    const timeoutPromise = new Promise((_, reject) => 
      setTimeout(() => reject(new Error('Request timeout')), timeout)
    );

    const [spfResult, dkimResult, dmarcResult] = await Promise.race([
      Promise.all([
        checkSPF(normalizedDomain),
        checkDKIM(normalizedDomain),
        checkDMARC(normalizedDomain)
      ]),
      timeoutPromise
    ]) as [any, any, any];

    // Additional validation for results
    const validateResult = (result: any, type: string): any => {
      if (!result || typeof result !== 'object') {
        return {
          exists: false,
          record: '',
          valid: false,
          issues: [`Failed to check ${type} record`],
          warnings: [],
          recommendations: [`Verify ${type} configuration manually`],
          score: 0,
          ...(type === 'DKIM' && { selectors: [] }),
          ...(type === 'DMARC' && { policy: 'none' })
        };
      }
      return result;
    };

    const validatedResults: CheckResult = {
      spf: validateResult(spfResult, 'SPF'),
      dkim: validateResult(dkimResult, 'DKIM'),
      dmarc: validateResult(dmarcResult, 'DMARC')
    };

    return NextResponse.json(validatedResults);
  } catch (error) {
    console.error('Error checking email authentication:', error);
    
    // Provide more specific error messages
    if (error instanceof Error) {
      if (error.message === 'Request timeout') {
        return NextResponse.json(
          { error: 'Request timed out. The domain may be unreachable or DNS servers are slow.' },
          { status: 408 }
        );
      }
      
      if (error.message.includes('ENOTFOUND') || error.message.includes('ENODATA')) {
        return NextResponse.json(
          { error: 'Domain not found or DNS resolution failed' },
          { status: 404 }
        );
      }
      
      if (error.message.includes('ETIMEDOUT')) {
        return NextResponse.json(
          { error: 'DNS query timed out' },
          { status: 408 }
        );
      }
    }
    
    return NextResponse.json(
      { error: 'Internal server error while checking email authentication records' },
      { status: 500 }
    );
  }
}