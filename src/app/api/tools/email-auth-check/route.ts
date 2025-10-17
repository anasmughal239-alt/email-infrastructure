import { NextRequest, NextResponse } from 'next/server';
import dns from 'dns';
import { promisify } from 'util';

const resolveTxt = promisify(dns.resolveTxt);

interface DomainCheckResult {
  spf: {
    exists: boolean;
    record?: string;
    valid: boolean;
    issues: string[];
    warnings: string[];
    recommendations: string[];
    score: number;
  };
  dkim: {
    exists: boolean;
    record?: string;
    valid: boolean;
    issues: string[];
    warnings: string[];
    recommendations: string[];
    score: number;
    selectors: string[];
  };
  dmarc: {
    exists: boolean;
    record?: string;
    valid: boolean;
    issues: string[];
    warnings: string[];
    recommendations: string[];
    score: number;
    policy?: string;
  };
}

export async function POST(request: NextRequest) {
  try {
    const { domain } = await request.json();

    if (!domain) {
      return NextResponse.json(
        { error: 'Domain is required' },
        { status: 400 }
      );
    }

    // Validate domain format
    const domainRegex = /^(?:[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?\.)+[a-z0-9][a-z0-9-]{0,61}[a-z0-9]$/i;
    if (!domainRegex.test(domain)) {
      return NextResponse.json(
        { error: 'Invalid domain format' },
        { status: 400 }
      );
    }

    const result: DomainCheckResult = {
      spf: {
        exists: false,
        valid: false,
        issues: [],
        warnings: [],
        recommendations: [],
        score: 0
      },
      dkim: {
        exists: false,
        valid: false,
        issues: [],
        warnings: [],
        recommendations: [],
        score: 0,
        selectors: []
      },
      dmarc: {
        exists: false,
        valid: false,
        issues: [],
        warnings: [],
        recommendations: [],
        score: 0
      }
    };

    // Check SPF record
    try {
      const spfRecords = await resolveTxt(domain);
      const spfRecord = spfRecords.flat().find(record => record.startsWith('v=spf1'));
      
      if (spfRecord) {
        result.spf.exists = true;
        result.spf.record = spfRecord;
        result.spf.valid = true;
        result.spf.score = 100;
        
        // Basic SPF validation
        if (!spfRecord.includes('~all') && !spfRecord.includes('-all')) {
          result.spf.warnings.push('SPF record should end with ~all or -all for better security');
          result.spf.score -= 20;
        }
        if (spfRecord.split(' ').length > 10) {
          result.spf.warnings.push('SPF record has too many DNS lookups (max recommended is 10)');
          result.spf.score -= 10;
        }
        if (!spfRecord.includes('include:')) {
          result.spf.recommendations.push('Consider adding email service providers using include: mechanism');
        }
      } else {
        result.spf.issues.push('No SPF record found');
        result.spf.recommendations.push('Add an SPF record to protect against email spoofing');
        result.spf.score = 0;
      }
    } catch (error) {
      if (error instanceof Error) {
        if (error.message.includes('ENOTFOUND')) {
          result.spf.issues.push('Domain not found in DNS');
        } else if (error.message.includes('ENODATA')) {
          result.spf.issues.push('No TXT records found for domain');
        } else {
          result.spf.issues.push(`Failed to check SPF record: ${error.message}`);
        }
      } else {
        result.spf.issues.push('Failed to check SPF record');
      }
      result.spf.score = 0;
    }

    // Check DKIM record
    try {
      const selectors = ['default', 'mail', 'dkim', 'selector1', 'selector2', 'google'];
      let foundSelector = false;
      
      for (const selector of selectors) {
        try {
          const dkimDomain = `${selector}._domainkey.${domain}`;
          const dkimRecords = await resolveTxt(dkimDomain);
          
          if (dkimRecords.length > 0) {
            const dkimRecord = dkimRecords[0].join('');
            if (dkimRecord.includes('v=DKIM1')) {
              result.dkim.exists = true;
              result.dkim.record = dkimRecord;
              result.dkim.valid = true;
              result.dkim.selectors.push(selector);
              foundSelector = true;
            }
          }
        } catch (error) {
          if (error instanceof Error && !error.message.includes('ENOTFOUND')) {
            console.error(`Error checking DKIM selector ${selector}:`, error);
          }
          continue;
        }
      }
      
      if (foundSelector) {
        result.dkim.score = 100;
        if (result.dkim.selectors.length > 1) {
          result.dkim.warnings.push('Multiple DKIM selectors found - ensure all are actively used');
        }
      } else {
        result.dkim.issues.push('No valid DKIM records found with common selectors');
        result.dkim.recommendations.push('Add DKIM records to improve email authentication');
        result.dkim.score = 0;
      }
    } catch (error) {
      if (error instanceof Error) {
        if (error.message.includes('ENOTFOUND')) {
          result.dkim.issues.push('Domain not found in DNS');
        } else if (error.message.includes('ENODATA')) {
          result.dkim.issues.push('No DKIM records found');
        } else {
          result.dkim.issues.push(`Failed to check DKIM records: ${error.message}`);
        }
      } else {
        result.dkim.issues.push('Failed to check DKIM records');
      }
      result.dkim.score = 0;
    }

    // Check DMARC record
    try {
      const dmarcDomain = `_dmarc.${domain}`;
      const dmarcRecords = await resolveTxt(dmarcDomain);
      const dmarcRecord = dmarcRecords.flat().find(record => record.startsWith('v=DMARC1'));
      
      if (dmarcRecord) {
        result.dmarc.exists = true;
        result.dmarc.record = dmarcRecord;
        result.dmarc.valid = true;
        result.dmarc.score = 100;
        
        // Extract policy
        const policyMatch = dmarcRecord.match(/p=([a-z]+)/i);
        if (policyMatch) {
          result.dmarc.policy = policyMatch[1].toLowerCase();
          
          // Policy recommendations
          if (result.dmarc.policy === 'none') {
            result.dmarc.warnings.push('DMARC policy is set to "none" - no enforcement');
            result.dmarc.recommendations.push('Consider increasing DMARC policy to "quarantine" or "reject"');
            result.dmarc.score -= 30;
          } else if (result.dmarc.policy === 'quarantine') {
            result.dmarc.warnings.push('DMARC policy is set to "quarantine" - partial enforcement');
            result.dmarc.recommendations.push('Consider increasing DMARC policy to "reject" for maximum security');
            result.dmarc.score -= 10;
          }
        } else {
          result.dmarc.issues.push('DMARC record missing required policy (p=)');
          result.dmarc.score -= 50;
        }
        
        if (!dmarcRecord.includes('rua=')) {
          result.dmarc.warnings.push('DMARC record missing aggregate report URI (rua=)');
          result.dmarc.recommendations.push('Add rua= tag to receive aggregate reports');
          result.dmarc.score -= 20;
        }
      } else {
        result.dmarc.issues.push('No DMARC record found');
        result.dmarc.recommendations.push('Add a DMARC record to improve email authentication and receive reports');
        result.dmarc.score = 0;
      }
    } catch (error) {
      if (error instanceof Error) {
        if (error.message.includes('ENOTFOUND')) {
          result.dmarc.issues.push('Domain not found in DNS');
        } else if (error.message.includes('ENODATA')) {
          result.dmarc.issues.push('No DMARC records found');
        } else {
          result.dmarc.issues.push(`Failed to check DMARC record: ${error.message}`);
        }
      } else {
        result.dmarc.issues.push('Failed to check DMARC record');
      }
      result.dmarc.score = 0;
    }

    return NextResponse.json(result);
  } catch (error) {
    console.error('Error checking domain:', error);
    let errorMessage = 'Failed to check domain authentication records';
    
    if (error instanceof Error) {
      if (error.message.includes('ENOTFOUND')) {
        errorMessage = 'Domain not found in DNS. Please verify the domain name is correct.';
      } else if (error.message.includes('ENODATA')) {
        errorMessage = 'No DNS records found for domain.';
      } else {
        errorMessage = error.message;
      }
    }
    
    return NextResponse.json(
      { error: errorMessage },
      { status: 500 }
    );
  }
}