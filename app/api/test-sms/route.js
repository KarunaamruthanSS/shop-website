import { NextResponse } from 'next/server'
import sendOrderSMSIndia, { sendOrderSMSLocal } from '../../../lib/sms'

export async function POST(request) {
  try {
    const { phone, service } = await request.json()
    
    if (!phone) {
      return NextResponse.json(
        { error: 'Phone number required' },
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
        productName: 'Test Hardware Product',
        quantity: 2,
        price: 49.99
      }
    ]

    const testUser = {
      name: 'Test Customer',
      phone: phone
    }

    const smsService = service || process.env.SMS_SERVICE || 'local'
    
    if (smsService === 'local') {
      await sendOrderSMSLocal(phone, testOrder, testItems, testUser)
    } else {
      // Use the main Indian SMS service which handles all providers
      await sendOrderSMSIndia(phone, testOrder, testItems, testUser)
    }

    return NextResponse.json({
      success: true,
      message: `Test SMS sent successfully using ${smsService} service`,
      service: smsService
    })

  } catch (error) {
    console.error('Test SMS failed:', error)
    return NextResponse.json(
      { 
        error: 'SMS test failed', 
        details: error.message 
      },
      { status: 500 }
    )
  }
}