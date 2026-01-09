import { NextResponse } from 'next/server'
import { authenticateUser, generateToken } from '../../../../lib/auth'

export async function POST(request) {
  try {
    const { identifier, password } = await request.json()

    if (!identifier || !password) {
      return NextResponse.json(
        { error: 'Email/Phone and password are required' },
        { status: 400 }
      )
    }

    const { user } = await authenticateUser(identifier, password)
    const token = generateToken(user)

    // Create response with token in cookie
    const response = NextResponse.json({
      success: true,
      user,
      token
    })

    // Set HTTP-only cookie for security
    response.cookies.set('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 7 * 24 * 60 * 60 // 7 days
    })

    return response
  } catch (error) {
    console.error('Login error:', error)
    return NextResponse.json(
      { error: error.message },
      { status: 401 }
    )
  }
}