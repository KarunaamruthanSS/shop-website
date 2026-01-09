import { NextResponse } from 'next/server'
import { getUserFromToken } from './auth'

export async function validateAdminAuth(request) {
  try {
    // Get token from middleware header
    const token = request.headers.get('x-auth-token')

    if (!token) {
      return {
        error: NextResponse.json(
          { error: 'Authentication required' },
          { status: 401 }
        )
      }
    }

    // Verify token and get user
    const user = await getUserFromToken(token)

    if (!user) {
      return {
        error: NextResponse.json(
          { error: 'Invalid token' },
          { status: 401 }
        )
      }
    }

    // Check if user is admin
    if (user.role !== 'ADMIN') {
      return {
        error: NextResponse.json(
          { error: 'Admin access required' },
          { status: 403 }
        )
      }
    }

    return { user }
  } catch (error) {
    console.error('Admin auth validation error:', error)
    return {
      error: NextResponse.json(
        { error: 'Authentication failed' },
        { status: 401 }
      )
    }
  }
}