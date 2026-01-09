import { NextResponse } from 'next/server'
import { prisma } from '../../../lib/prisma'
import { withAuth } from '../../../lib/middleware'
import { sendOrderEmail } from '../../../lib/email'
import sendOrderSMSIndia, { sendOrderSMSLocal } from '../../../lib/sms'

export const POST = withAuth(async (req, context) => {
  try {
    const { cart, total } = await req.json()

    if (!cart || cart.length === 0) {
      return NextResponse.json(
        { error: 'Cart is empty' },
        { status: 400 }
      )
    }

    // Create order
    const order = await prisma.order.create({
      data: {
        userId: req.user.id,
        total: parseFloat(total),
        status: 'PENDING'
      }
    })

    // Create order items
    const orderItems = await Promise.all(
      cart.map(item =>
        prisma.orderItem.create({
          data: {
            orderId: order.id,
            productId: item.id,
            quantity: item.quantity,
            price: item.price
          }
        })
      )
    )

    // Update product stock
    await Promise.all(
      cart.map(item =>
        prisma.product.update({
          where: { id: item.id },
          data: {
            stock: {
              decrement: item.quantity
            }
          }
        })
      )
    )

    // Clear user's cart
    await prisma.cartItem.deleteMany({
      where: { userId: req.user.id }
    })

    // Fetch full order with items and product names to include in email
    const fullOrder = await prisma.order.findUnique({
      where: { id: order.id },
      include: {
        items: {
          include: { product: { select: { name: true } } }
        }
      }
    })

    // Fetch user info (name/email/phone)
    const user = await prisma.user.findUnique({
      where: { id: req.user.id },
      select: { name: true, email: true, phone: true }
    })

    // Send invoice email (don't block order on email failures)
    try {
      const itemsForEmail = (fullOrder.items || []).map(i => ({
        productName: i.product?.name || 'Product',
        quantity: i.quantity,
        price: i.price
      }))

      if (user?.email) {
        console.log('Sending order confirmation email to:', user.email)
        await sendOrderEmail(user.email, fullOrder, itemsForEmail, user)
        console.log('Order confirmation email sent successfully')
      } else {
        console.warn('No email address found for user:', req.user.id)
      }
    } catch (emailError) {
      console.error('Failed to send order email:', emailError.message)
      // Don't fail the order if email fails
    }

    // Send SMS notification (don't block order on SMS failures)
    try {
      const itemsForSMS = (fullOrder.items || []).map(i => ({
        productName: i.product?.name || 'Product',
        quantity: i.quantity,
        price: i.price
      }))

      if (user?.phone) {
        console.log('Sending order confirmation SMS to:', user.phone)
        
        const smsService = process.env.SMS_SERVICE || 'local'
        
        if (smsService === 'local') {
          await sendOrderSMSLocal(user.phone, fullOrder, itemsForSMS, user)
        } else {
          // Use the main Indian SMS service which handles all providers
          await sendOrderSMSIndia(user.phone, fullOrder, itemsForSMS, user)
        }
        
        console.log('Order confirmation SMS sent successfully')
      } else {
        console.warn('No phone number found for user:', req.user.id)
      }
    } catch (smsError) {
      console.error('Failed to send order SMS:', smsError.message)
      // Don't fail the order if SMS fails
    }

    return NextResponse.json({
      success: true,
      orderId: order.id,
      order: {
        ...order,
        items: orderItems
      }
    })
  } catch (error) {
    return NextResponse.json(
      { error: error.message },
      { status: 500 }
    )
  }
})

export async function GET(request) {
  try {
    const orders = await prisma.order.findMany({
      include: {
        user: {
          select: { name: true, email: true }
        },
        items: {
          include: {
            product: {
              select: { name: true }
            }
          }
        }
      },
      orderBy: { createdAt: 'desc' }
    })

    return NextResponse.json({ orders })
  } catch (error) {
    return NextResponse.json(
      { error: error.message },
      { status: 500 }
    )
  }
}
