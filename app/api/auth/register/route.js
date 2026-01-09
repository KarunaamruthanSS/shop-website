import { NextResponse } from 'next/server'
import { createUser } from '../../../../lib/auth'
import { prisma } from '../../../../lib/prisma'

export async function POST(request) {
  try {
    const { email, name, password, phone, dateOfBirth } = await request.json()

    if (!email || !name || !password) {
      return NextResponse.json(
        { error: 'Name, email, and password are required' },
        { status: 400 }
      )
    }

    if (password.length < 6) {
      return NextResponse.json(
        { error: 'Password must be at least 6 characters' },
        { status: 400 }
      )
    }

    // Validate phone number if provided
    if (phone && !/^\+?[\d\s\-\(\)]{10,15}$/.test(phone.replace(/\s/g, ''))) {
      return NextResponse.json(
        { error: 'Please enter a valid phone number' },
        { status: 400 }
      )
    }

    // Validate date of birth if provided
    if (dateOfBirth) {
      const dob = new Date(dateOfBirth)
      const today = new Date()
      const age = today.getFullYear() - dob.getFullYear()
      
      if (age < 13 || age > 120) {
        return NextResponse.json(
          { error: 'Please enter a valid date of birth' },
          { status: 400 }
        )
      }
    }

    // Check if user already exists (email or phone)
    const existingUser = await prisma.user.findFirst({
      where: {
        OR: [
          { email },
          ...(phone ? [{ phone }] : [])
        ]
      }
    })

    if (existingUser) {
      if (existingUser.email === email) {
        return NextResponse.json(
          { error: 'Email already registered' },
          { status: 400 }
        )
      } else if (existingUser.phone === phone) {
        return NextResponse.json(
          { error: 'Phone number already registered' },
          { status: 400 }
        )
      }
    }

    const user = await createUser(email, name, password, phone, dateOfBirth)

    return NextResponse.json({
      success: true,
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        phone: user.phone,
        dateOfBirth: user.dateOfBirth,
        role: user.role
      }
    })
  } catch (error) {
    return NextResponse.json(
      { error: error.message },
      { status: 500 }
    )
  }
}