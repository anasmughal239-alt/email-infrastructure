import { NextRequest, NextResponse } from 'next/server';
import { createServerSupabaseClient } from '@/lib/supabase/server';
import { db } from '@/lib/db';

interface SetupSubmissionData {
  domains: Array<{ domain: string; isProvided: boolean }>;
  emailProvider: string;
  mailboxConfig: {
    prefix: string;
    quantity: number;
  };
}

export async function POST(request: NextRequest) {
  try {
    const supabase = createServerSupabaseClient();
    const { data: { user } } = await supabase.auth.getUser();
    
    if (!user?.email) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const data: SetupSubmissionData = await request.json();

    // Validate required fields
    if (!data.domains || data.domains.length === 0) {
      return NextResponse.json({ error: 'At least one domain is required' }, { status: 400 });
    }

    if (!data.emailProvider || !['GOOGLE_WORKSPACE', 'MICROSOFT_OUTLOOK'].includes(data.emailProvider)) {
      return NextResponse.json({ error: 'Valid email provider is required' }, { status: 400 });
    }

    if (!data.mailboxConfig?.prefix || !data.mailboxConfig?.quantity || data.mailboxConfig.quantity < 1) {
      return NextResponse.json({ error: 'Valid mailbox configuration is required' }, { status: 400 });
    }

    // Get user from database
    const appUser = await db.user.findUnique({
      where: { email: user.email },
      select: { id: true, setupCompleted: true }
    });

    if (!appUser) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    if (appUser.setupCompleted) {
      return NextResponse.json({ error: 'Setup already completed' }, { status: 400 });
    }

    // Use transaction to ensure data consistency
    const result = await db.$transaction(async (tx) => {
      // Create setup request
      const setupRequest = await tx.setupRequest.create({
        data: {
          userId: user.id,
          emailProvider: data.emailProvider as any,
          status: 'IN_PROGRESS'
        }
      });

      // Create domains
      const domainPromises = data.domains.map(domainData => 
        tx.domain.create({
          data: {
            userId: user.id,
            setupRequestId: setupRequest.id,
            domain: domainData.domain,
            isProvided: domainData.isProvided,
            status: domainData.isProvided ? 'PENDING' : 'PENDING'
          }
        })
      );

      const domains = await Promise.all(domainPromises);

      // Create mailbox requests
      const mailboxPromises = [];
      for (let i = 1; i <= data.mailboxConfig.quantity; i++) {
        // For now, use the first domain or a placeholder
        const primaryDomain = domains[0]?.domain || 'pending-domain.com';
        const mailboxAddress = `${data.mailboxConfig.prefix}${i}@${primaryDomain}`;
        
        mailboxPromises.push(
          tx.mailbox.create({
            data: {
              userId: user.id,
              setupRequestId: setupRequest.id,
              domainId: domains[0]?.id || '', // Use the first domain's ID
              address: mailboxAddress,
              prefix: data.mailboxConfig.prefix,
              status: 'WARMING'
            }
          })
        );
      }

      const mailboxes = await Promise.all(mailboxPromises);

      // Update user setup status
      await tx.user.update({
        where: { id: appUser.id },
        data: { setupCompleted: true }
      });

      return {
        setupRequest,
        domains,
        mailboxes
      };
    });

    return NextResponse.json({
      success: true,
      setupRequestId: result.setupRequest.id,
      message: 'Setup request submitted successfully'
    });

  } catch (error) {
    console.error('Error submitting setup:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
