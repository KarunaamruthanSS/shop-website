import { NextResponse } from 'next/server'
import { prisma } from '../../../../lib/prisma'
import { getUserFromToken } from '../../../../lib/auth'

export async function GET(request) {
  try {
    // Get token from middleware header
    const token = request.headers.get('x-auth-token')

    if (!token) {
      return NextResponse.json(
        { error: 'Authentication required' },
        { status: 401 }
      )
    }

    // Verify token and get user
    const user = await getUserFromToken(token)

    if (!user) {
      return NextResponse.json(
        { error: 'Invalid token' },
        { status: 401 }
      )
    }

    console.log('Admin users - User ID:', user.id, 'Role:', user.role)

    // Check if user is admin
    if (user.role !== 'ADMIN') {
      return NextResponse.json(
        { error: 'Admin access required' },
        { status: 403 }
      )
    }

    const users = await prisma.user.findMany({
      select: {
        id: true,
        email: true,
        name: true,
        phone: true,
        dateOfBirth: true,
        role: true,
        createdAt: true,
        _count: {
          select: {
            orders: true
          }
        }
      },
      orderBy: { createdAt: 'desc' }
    })

    return NextResponse.json({ users })
  } catch (error) {
    console.error('Admin users error:', error)
    return NextResponse.json(
      { error: error.message },
      { status: 500 }
    )
  }
}