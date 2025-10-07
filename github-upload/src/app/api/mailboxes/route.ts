import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth-config';
import { db } from '@/lib/db';

export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session?.user?.email) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Get user from database
    const user = await db.user.findUnique({
      where: { email: session.user.email }
    });

    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    // Fetch mailboxes with related domain data
    const mailboxes = await db.mailbox.findMany({
      where: { userId: user.id },
      include: {
        domain: true,
        setupRequest: true
      },
      orderBy: { createdAt: 'desc' }
    });

    // Transform data to match the frontend expectations
    const transformedMailboxes = mailboxes.map(mailbox => {
      // Calculate status color and background based on status
      let statusColor = 'text-gray-600';
      let statusBg = 'bg-gray-100 dark:bg-gray-900/20';
      
      switch (mailbox.status) {
        case 'ACTIVE':
          statusColor = 'text-green-600';
          statusBg = 'bg-green-100 dark:bg-green-900/20';
          break;
        case 'WARMING':
          statusColor = 'text-blue-600';
          statusBg = 'bg-blue-100 dark:bg-blue-900/20';
          break;
        case 'BLOCKED':
          statusColor = 'text-red-600';
          statusBg = 'bg-red-100 dark:bg-red-900/20';
          break;
        case 'FAILED':
          statusColor = 'text-red-600';
          statusBg = 'bg-red-100 dark:bg-red-900/20';
          break;
      }

      // Calculate warmup progress (for demo purposes, based on days since creation)
      const daysSinceCreation = Math.floor(
        (new Date().getTime() - new Date(mailbox.createdAt).getTime()) / (1000 * 60 * 60 * 24)
      );
      const warmupProgress = Math.min(100, Math.floor((daysSinceCreation / 30) * 100));
      
      // Generate mock data for fields not in database yet
      const dailyLimit = mailbox.status === 'ACTIVE' ? 50 : Math.min(50, daysSinceCreation * 2 + 10);
      const sentToday = Math.floor(Math.random() * dailyLimit * 0.8);
      const reputationScore = mailbox.status === 'ACTIVE' ? 85 + Math.floor(Math.random() * 15) : 
                             mailbox.status === 'WARMING' ? 60 + Math.floor(Math.random() * 25) : 
                             30 + Math.floor(Math.random() * 40);
      
      let reputation = 'New';
      if (reputationScore >= 90) reputation = 'Excellent';
      else if (reputationScore >= 75) reputation = 'Good';
      else if (reputationScore >= 60) reputation = 'Fair';
      else if (reputationScore >= 40) reputation = 'Poor';

      return {
        id: mailbox.id,
        email: mailbox.address,
        domain: mailbox.domain.domain,
        status: mailbox.status === 'ACTIVE' ? 'Active' : 
                mailbox.status === 'WARMING' ? 'Warming' :
                mailbox.status === 'BLOCKED' ? 'Paused' : 'Issues',
        statusColor,
        statusBg,
        warmupProgress,
        warmupDays: daysSinceCreation,
        created: mailbox.createdAt.toISOString().split('T')[0],
        lastActivity: `${Math.floor(Math.random() * 24)} hours ago`,
        dailyLimit,
        sentToday,
        reputation,
        reputationScore
      };
    });

    return NextResponse.json({ mailboxes: transformedMailboxes });
  } catch (error) {
    console.error('Error fetching mailboxes:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}