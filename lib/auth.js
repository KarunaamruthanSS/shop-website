import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import { prisma } from './prisma'

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key-change-in-production'

export async function hashPassword(password) {
  return await bcrypt.hash(password, 12)
}

export async function verifyPassword(password, hashedPassword) {
  return await bcrypt.compare(password, hashedPassword)
}

export async function createUser(email, name, password, phone = null, dateOfBirth = null, role = 'USER') {
  const hashedPassword = await hashPassword(password)
  
  return await prisma.user.create({
    data: {
      email,
      name,
      password: hashedPassword,
      phone,
      dateOfBirth: dateOfBirth ? new Date(dateOfBirth) : null,
      role
    }
  })
}

export async function authenticateUser(identifier, password) {
  // Check if identifier is email or phone
  const isEmail = identifier.includes('@')
  
  // Basic phone number validation (should start with + and contain only digits)
  if (!isEmail) {
    const phoneRegex = /^\+?[1-9]\d{1,14}$/
    if (!phoneRegex.test(identifier.replace(/\s/g, ''))) {
      throw new Error('Invalid phone number format. Please use format: +1234567890')
    }
  }
  
  const user = await prisma.user.findUnique({
    where: isEmail ? { email: identifier } : { phone: identifier }
  })

  if (!user) {
    throw new Error(isEmail ? 'User not found' : 'Phone number not registered')
  }

  const isValid = await verifyPassword(password, user.password)
  if (!isValid) {
    throw new Error('Invalid password')
  }

  return {
    user: {
      id: user.id,
      email: user.email,
      name: user.name,
      role: user.role,
      phone: user.phone
    }
  }
}

export function generateToken(user) {
  return jwt.sign(
    { 
      userId: user.id, 
      email: user.email, 
      role: user.role 
    },
    JWT_SECRET,
    { expiresIn: '7d' }
  )
}

export async function getUserFromToken(token) {
  try {
    const decoded = jwt.verify(token, JWT_SECRET)
    
    // Get fresh user data from database
    const user = await prisma.user.findUnique({
      where: { id: decoded.userId },
      select: {
        id: true,
        email: true,
        name: true,
        role: true
      }
    })

    return user
  } catch (error) {
    console.error('Token verification failed:', error.message)
    return null
  }
}