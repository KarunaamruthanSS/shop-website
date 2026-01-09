import { NextResponse } from 'next/server'
import { sendOrderEmail } from '../../../lib/email'

export async function POST(request) {
  try {
    const { email } = await request.json()
    
    if (!email) {
      return NextResponse.json(
        { error: 'Email address required' },
        { status: 400 }
      )
    }

    // Test order data
    const testOrder = {
      id: 'TEST-' + Date.now(),
      total: 99.99,
      status: 'PENDING',
      createdAt: new Date()
    }

    const testItems = [
      {
        productName: 'Test Product',
        quantity: 2,
        price: 49.99
      }
    ]

    const testUser = {
      name: 'Test User',
      email: email
    }

    await sendOrderEmail(email, testOrder, testItems, testUser)

    return NextResponse.json({
      success: true,
      message: 'Test email sent successfully'
    })

  } catch (error) {
    console.error('Test email failed:', error)
    return NextResponse.json(
      { 
        error: 'Email test failed', 
        details: error.message 
      },
      { status: 500 }
    )
  }
}