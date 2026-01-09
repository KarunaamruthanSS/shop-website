import { NextResponse } from 'next/server'
import { getUserFromToken } from './auth'

export async function requireAuth(req) {
  // For Next.js 13+ App Router, cookies are accessed differently
  const token = req.headers.get('authorization')?.replace('Bearer ', '') || 
                req.cookies.get('token')?.value

  console.log('RequireAuth - Token found:', !!token)

  if (!token) {
    throw new Error('Authentication required')
  }

  const user = await getUserFromToken(token)
  
  console.log('RequireAuth - User found:', !!user, user?.role)
  
  if (!user) {
    throw new Error('Invalid token')
  }

  return user
}

export async function requireAdmin(req) {
  const user = await requireAuth(req)
  
  console.log('RequireAdmin - User role:', user.role)
  
  if (user.role !== 'ADMIN') {
    throw new Error('Admin access required')
  }

  return user
}

export function withAuth(handler) {
  return async (req, context) => {
    try {
      req.user = await requireAuth(req)
      return handler(req, context)
    } catch (error) {
      console.error('WithAuth error:', error.message)
      return NextResponse.json(
        { error: error.message },
        { status: 401 }
      )
    }
  }
}

export function withAdmin(handler) {
  return async (req, context) => {
    try {
      req.user = await requireAdmin(req)
      return handler(req, context)
    } catch (error) {
      console.error('WithAdmin error:', error.message)
      return NextResponse.json(
        { error: error.message },
        { status: error.message === 'Admin access required' ? 403 : 401 }
      )
    }
  }
}