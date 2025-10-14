import { NextRequest, NextResponse } from 'next/server';
import { createServerSupabaseClient } from '@/lib/supabase/server';
import { db } from '@/lib/db';

export async function GET(request: NextRequest) {
  try {
    const supabase = createServerSupabaseClient();
    const { data: { user } } = await supabase.auth.getUser();
    
    if (!user?.email) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Get user from database
    const appUser = await db.user.findUnique({
      where: { email: user.email },
      select: { 
        id: true, 
        setupCompleted: true,
        setupRequests: {
          orderBy: { createdAt: 'desc' },
          take: 1,
          select: {
            id: true,
            status: true,
            createdAt: true
          }
        }
      }
    });

    if (!appUser) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    return NextResponse.json({
      setupCompleted: appUser.setupCompleted,
      latestRequest: appUser.setupRequests[0] || null
    });

  } catch (error) {
    console.error('Error checking setup status:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
