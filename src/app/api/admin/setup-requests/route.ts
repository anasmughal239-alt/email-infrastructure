import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth-config'
import { db } from '@/lib/db'
import { Role } from '@prisma/client'

export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session?.user?.id) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    // Check if user has admin role
    if (session.user.role !== Role.ADMIN) {
      return NextResponse.json(
        { error: 'Forbidden - Admin access required' },
        { status: 403 }
      )
    }

    const setupRequests = await db.setupRequest.findMany({
      include: {
        user: {
          select: {
            id: true,
            email: true,
            name: true,
          }
        },
        domains: {
          select: {
            id: true,
            domain: true,
            status: true,
            isProvided: true,
          }
        },
        mailboxes: {
          select: {
            id: true,
            address: true,
            status: true,
          }
        },
      },
      orderBy: {
        createdAt: 'desc'
      }
    })

    // Transform the data to include additional computed fields
    const transformedRequests = setupRequests.map(request => ({
      ...request,
      domainsCount: request.domains.length,
      mailboxesCount: request.mailboxes.length,
      activeDomains: request.domains.filter(d => d.status === 'ACTIVE').length,
      activeMailboxes: request.mailboxes.filter(m => m.status === 'ACTIVE').length,
    }))
    
    return NextResponse.json({ setupRequests: transformedRequests })
  } catch (error) {
    console.error('Admin setup requests fetch error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

export async function PATCH(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session?.user?.id) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    // Check if user has admin role
    if (session.user.role !== Role.ADMIN) {
      return NextResponse.json(
        { error: 'Forbidden - Admin access required' },
        { status: 403 }
      )
    }

    const { setupRequestId, status } = await request.json()

    if (!setupRequestId || !status) {
      return NextResponse.json(
        { error: 'Setup request ID and status are required' },
        { status: 400 }
      )
    }

    const validStatuses = ['PENDING', 'IN_PROGRESS', 'COMPLETED', 'FAILED']
    if (!validStatuses.includes(status)) {
      return NextResponse.json(
        { error: 'Invalid status' },
        { status: 400 }
      )
    }

    const updatedRequest = await db.setupRequest.update({
      where: { id: setupRequestId },
      data: { 
        status,
        completedAt: status === 'COMPLETED' ? new Date() : null
      },
      include: {
        user: {
          select: {
            id: true,
            email: true,
            name: true,
          }
        },
        domains: true,
        mailboxes: true,
      }
    })
    
    return NextResponse.json({ setupRequest: updatedRequest })
  } catch (error) {
    console.error('Admin setup request update error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
