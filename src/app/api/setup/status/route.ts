import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';

export async function GET(request: NextRequest) {
  try {
    // With auth removed, return latest global setup request info
    const latestRequest = await db.setupRequest.findFirst({
      orderBy: { createdAt: 'desc' },
      select: {
        id: true,
        status: true,
        createdAt: true
      }
    });

    return NextResponse.json({
      setupCompleted: false,
      latestRequest: latestRequest || null
    });

  } catch (error) {
    console.error('Error checking setup status:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
