import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export interface EmailVerificationData {
  email: string;
  code: string;
  name?: string;
}

export async function sendVerificationEmail({ email, code, name }: EmailVerificationData) {
  // Check if API key is configured
  if (!process.env.RESEND_API_KEY || process.env.RESEND_API_KEY === 'your-resend-api-key') {
    console.error('Resend API key not configured. Please set RESEND_API_KEY in your .env file.');
    throw new Error('Email service not configured. Please contact support.');
  }

  try {
    const { data, error } = await resend.emails.send({
      from: process.env.FROM_EMAIL || 'onboarding@resend.dev',
      to: [email],
      subject: 'Verify Your Email Address',
      html: generateVerificationEmailHTML({ code, name, email }),
    });

    if (error) {
      console.error('Email sending error:', error);
      
      // Provide more specific error messages based on error type
      if (error.name === 'validation_error' && error.message?.includes('API key')) {
        throw new Error('Email service not configured. Please contact support.');
      }
      
      // Handle domain verification requirement
      if (error.message?.includes('verify a domain')) {
        throw new Error('Email service is in testing mode. Please use anasmughal239@gmail.com for testing or verify a domain at resend.com/domains.');
      }
      
      throw new Error('Failed to send verification email');
    }

    return { success: true, data };
  } catch (error) {
    console.error('Email service error:', error);
    
    // Re-throw our custom errors
    if (error instanceof Error && error.message.includes('not configured')) {
      throw error;
    }
    
    throw new Error('Email service unavailable');
  }
}

function generateVerificationEmailHTML({ code, name, email }: { code: string; name?: string; email: string }) {
  return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Email Verification</title>
      <style>
        body {
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
          line-height: 1.6;
          color: #333;
          max-width: 600px;
          margin: 0 auto;
          padding: 20px;
          background-color: #f8f9fa;
        }
        .container {
          background: white;
          padding: 40px;
          border-radius: 12px;
          box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        }
        .header {
          text-align: center;
          margin-bottom: 30px;
        }
        .logo {
          font-size: 24px;
          font-weight: bold;
          color: #2563eb;
          margin-bottom: 10px;
        }
        .verification-code {
          background: #f1f5f9;
          border: 2px dashed #2563eb;
          border-radius: 8px;
          padding: 20px;
          text-align: center;
          margin: 30px 0;
        }
        .code {
          font-size: 32px;
          font-weight: bold;
          color: #2563eb;
          letter-spacing: 4px;
          font-family: 'Courier New', monospace;
        }
        .footer {
          margin-top: 30px;
          padding-top: 20px;
          border-top: 1px solid #e2e8f0;
          font-size: 14px;
          color: #64748b;
          text-align: center;
        }
        .warning {
          background: #fef3c7;
          border-left: 4px solid #f59e0b;
          padding: 15px;
          margin: 20px 0;
          border-radius: 4px;
        }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <div class="logo">Email Infra</div>
          <h1>Verify Your Email Address</h1>
        </div>
        
        <p>Hello${name ? ` ${name}` : ''},</p>
        
        <p>Thank you for signing up! To complete your registration and secure your account, please verify your email address using the verification code below:</p>
        
        <div class="verification-code">
          <div class="code">${code}</div>
          <p style="margin: 10px 0 0 0; color: #64748b;">Enter this code to verify your email</p>
        </div>
        
        <div class="warning">
          <strong>Security Notice:</strong> This verification code will expire in 15 minutes. If you didn't request this verification, please ignore this email.
        </div>
        
        <p>If you have any questions or need assistance, please don't hesitate to contact our support team.</p>
        
        <div class="footer">
          <p>This email was sent to ${email}</p>
          <p>© 2024 Email Infra. All rights reserved.</p>
        </div>
      </div>
    </body>
    </html>
  `;
}

export function generateVerificationCode(): string {
  // Generate a 6-digit numeric code
  return Math.floor(100000 + Math.random() * 900000).toString();
}

export function isCodeExpired(expiresAt: Date): boolean {
  return new Date() > expiresAt;
}

export function getCodeExpirationTime(): Date {
  // Code expires in 15 minutes
  const expirationTime = new Date();
  expirationTime.setMinutes(expirationTime.getMinutes() + 15);
  return expirationTime;
}

interface PasswordResetEmailData {
  email: string;
  resetUrl: string;
  name?: string;
  expiresAt: Date;
}

export async function sendPasswordResetEmail({
  email,
  resetUrl,
  name,
  expiresAt,
}: PasswordResetEmailData): Promise<void> {
  // Check if API key is configured
  if (!process.env.RESEND_API_KEY || process.env.RESEND_API_KEY === 'your-resend-api-key') {
    console.error('Resend API key not configured. Please set RESEND_API_KEY in your .env file.');
    throw new Error('Email service not configured. Please contact support.');
  }

  const expirationTime = new Date(expiresAt).toLocaleTimeString('en-US', {
    hour: 'numeric',
    minute: 'numeric',
    hour12: true,
  });

  const html = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <title>Reset Your Password</title>
      <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
        .button {
          display: inline-block;
          padding: 12px 24px;
          background-color: #0070f3;
          color: white;
          text-decoration: none;
          border-radius: 5px;
          margin: 20px 0;
        }
        .footer { font-size: 12px; color: #666; margin-top: 30px; }
      </style>
    </head>
    <body>
      <div class="container">
        <h2>Reset Your Password</h2>
        <p>Hello${name ? ` ${name}` : ''},</p>
        <p>We received a request to reset your password. Click the button below to create a new password:</p>
        
        <a href="${resetUrl}" class="button">Reset Password</a>
        
        <p>This link will expire at ${expirationTime}. If you didn't request this password reset, you can safely ignore this email.</p>
        
        <p>For security reasons, we recommend resetting your password immediately.</p>
        
        <div class="footer">
          <p>If the button doesn't work, copy and paste this link into your browser:</p>
          <p>${resetUrl}</p>
          <p>This is an automated message, please do not reply to this email.</p>
        </div>
      </div>
    </body>
    </html>
  `;

  const text = `
    Reset Your Password
    
    Hello${name ? ` ${name}` : ''},
    
    We received a request to reset your password. Click the link below to create a new password:
    
    ${resetUrl}
    
    This link will expire at ${expirationTime}. If you didn't request this password reset, you can safely ignore this email.
    
    For security reasons, we recommend resetting your password immediately.
    
    This is an automated message, please do not reply to this email.
  `;

  try {
    console.log('Sending password reset email to:', email);
    const { data, error } = await resend.emails.send({
      from: 'onboarding@resend.dev', // Always use the default Resend sender
      to: [email],
      subject: 'Reset Your Password',
      html: html,
      text: text,
      reply_to: process.env.REPLY_TO_EMAIL,
    });

    if (error) {
      console.error('Password reset email sending error:', error);
      throw new Error('Failed to send password reset email');
    }

    console.log('Password reset email sent successfully to:', email);
    return;
  } catch (error) {
    console.error('Password reset email service error:', error);
    throw new Error('Email service unavailable');
  }
}
