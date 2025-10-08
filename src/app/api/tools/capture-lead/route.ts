import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function POST(request: NextRequest) {
  try {
    const { email, domain, toolUsed, results } = await request.json();

    if (!email || !domain || !toolUsed) {
      return NextResponse.json(
        { error: 'Email, domain, and toolUsed are required' },
        { status: 400 }
      );
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Invalid email format' },
        { status: 400 }
      );
    }

    // Create or update lead in database
    try {
      const lead = await prisma.lead.upsert({
        where: { email },
        update: {
          lastToolUsed: toolUsed,
          lastDomainChecked: domain,
          toolUsageCount: { increment: 1 },
          lastActivity: new Date(),
          results: JSON.stringify(results)
        },
        create: {
          email,
          domain,
          toolUsed,
          lastToolUsed: toolUsed,
          lastDomainChecked: domain,
          toolUsageCount: 1,
          lastActivity: new Date(),
          results: JSON.stringify(results),
          source: 'email-auth-checker'
        }
      });

      // Send email with results (you can integrate with your email service here)
      await sendResultsEmail(email, domain, results);

      return NextResponse.json({ 
        success: true, 
        message: 'Lead captured successfully',
        leadId: lead.id 
      });
    } catch (dbError) {
      console.error('Database error:', dbError);
      
      // If database fails, still try to send email
      await sendResultsEmail(email, domain, results);
      
      return NextResponse.json({ 
        success: true, 
        message: 'Results sent, but lead capture failed' 
      });
    }
  } catch (error) {
    console.error('Error capturing lead:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

async function sendResultsEmail(email: string, domain: string, results: any) {
  try {
    // Generate email content based on results
    const emailContent = generateEmailReport(domain, results);
    
    // Here you would integrate with your email service (SendGrid, AWS SES, etc.)
    // For now, we'll just log it
    console.log(`Sending email to ${email} with results for ${domain}`);
    console.log('Email content:', emailContent);
    
    // Example integration with a hypothetical email service:
    /*
    await emailService.send({
      to: email,
      subject: `Email Authentication Report for ${domain}`,
      html: emailContent,
      from: 'reports@emailinfra.com'
    });
    */
    
    return true;
  } catch (error) {
    console.error('Error sending email:', error);
    return false;
  }
}

function generateEmailReport(domain: string, results: any): string {
  const { spf, dkim, dmarc } = results;
  
  const getStatusEmoji = (valid: boolean, exists: boolean) => {
    if (!exists) return '❌';
    if (valid) return '✅';
    return '⚠️';
  };

  const getRecommendations = () => {
    const recommendations = [];
    
    if (!spf.exists) {
      recommendations.push('• Set up an SPF record to specify which servers can send email for your domain');
    } else if (!spf.valid) {
      recommendations.push('• Fix SPF record issues to improve email deliverability');
    }
    
    if (!dkim.exists) {
      recommendations.push('• Implement DKIM signing to authenticate your emails and prevent spoofing');
    } else if (!dkim.valid) {
      recommendations.push('• Review and fix DKIM configuration issues');
    }
    
    if (!dmarc.exists) {
      recommendations.push('• Create a DMARC policy to protect your domain from email spoofing');
    } else if (!dmarc.valid) {
      recommendations.push('• Optimize your DMARC policy for better email security');
    }
    
    return recommendations;
  };

  return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <title>Email Authentication Report for ${domain}</title>
      <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
        .content { background: #f9f9f9; padding: 30px; border-radius: 0 0 10px 10px; }
        .record { background: white; margin: 20px 0; padding: 20px; border-radius: 8px; border-left: 4px solid #667eea; }
        .status { font-weight: bold; font-size: 18px; margin-bottom: 10px; }
        .record-text { background: #f5f5f5; padding: 10px; border-radius: 4px; font-family: monospace; word-break: break-all; }
        .issues { color: #e74c3c; margin-top: 10px; }
        .recommendations { background: #e8f5e8; padding: 20px; border-radius: 8px; margin-top: 20px; }
        .cta { text-align: center; margin-top: 30px; }
        .button { display: inline-block; background: #667eea; color: white; padding: 15px 30px; text-decoration: none; border-radius: 5px; font-weight: bold; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>📧 Email Authentication Report</h1>
          <p>Comprehensive analysis for <strong>${domain}</strong></p>
        </div>
        
        <div class="content">
          <div class="record">
            <div class="status">${getStatusEmoji(spf.valid, spf.exists)} SPF Record</div>
            <p><strong>Status:</strong> ${spf.exists ? (spf.valid ? 'Valid' : 'Issues Found') : 'Not Found'}</p>
            ${spf.record ? `<div class="record-text">${spf.record}</div>` : ''}
            ${spf.issues.length > 0 ? `<div class="issues">${spf.issues.map(issue => `• ${issue}`).join('<br>')}</div>` : ''}
          </div>
          
          <div class="record">
            <div class="status">${getStatusEmoji(dkim.valid, dkim.exists)} DKIM Record</div>
            <p><strong>Status:</strong> ${dkim.exists ? (dkim.valid ? 'Valid' : 'Issues Found') : 'Not Found'}</p>
            ${dkim.record ? `<div class="record-text">${dkim.record}</div>` : ''}
            ${dkim.issues.length > 0 ? `<div class="issues">${dkim.issues.map(issue => `• ${issue}`).join('<br>')}</div>` : ''}
          </div>
          
          <div class="record">
            <div class="status">${getStatusEmoji(dmarc.valid, dmarc.exists)} DMARC Record</div>
            <p><strong>Status:</strong> ${dmarc.exists ? (dmarc.valid ? 'Valid' : 'Issues Found') : 'Not Found'}</p>
            ${dmarc.record ? `<div class="record-text">${dmarc.record}</div>` : ''}
            ${dmarc.issues.length > 0 ? `<div class="issues">${dmarc.issues.map(issue => `• ${issue}`).join('<br>')}</div>` : ''}
          </div>
          
          <div class="recommendations">
            <h3>🎯 Recommendations</h3>
            ${getRecommendations().length > 0 ? getRecommendations().join('<br>') : '✅ Your email authentication setup looks good!'}
          </div>
          
          <div class="cta">
            <p>Need help implementing these recommendations?</p>
            <a href="https://emailinfra.com/contact" class="button">Get Expert Help</a>
          </div>
          
          <hr style="margin: 30px 0; border: none; border-top: 1px solid #ddd;">
          <p style="text-align: center; color: #666; font-size: 14px;">
            This report was generated by <a href="https://emailinfra.com">EmailInfra</a><br>
            Need more advanced email infrastructure solutions? <a href="https://emailinfra.com">Learn more</a>
          </p>
        </div>
      </div>
    </body>
    </html>
  `;
}

// Add this to your Prisma schema if not already present:
/*
model Lead {
  id                 String   @id @default(cuid())
  email              String   @unique
  domain             String?
  toolUsed           String?
  lastToolUsed       String?
  lastDomainChecked  String?
  toolUsageCount     Int      @default(1)
  lastActivity       DateTime @default(now())
  results            String?  // JSON string of results
  source             String?
  createdAt          DateTime @default(now())
  updatedAt          DateTime @updatedAt
}
*/
