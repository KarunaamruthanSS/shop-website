import { NextResponse } from 'next/server'
import { prisma } from '../../../lib/prisma'
import { withAuth } from '../../../lib/middleware'

export const dynamic = 'force-dynamic'

export const GET = withAuth(async (req, context) => {
  try {
    const cartItems = await prisma.cartItem.findMany({
      where: { userId: req.user.id },
      include: {
        product: true
      }
    })

    return NextResponse.json({ cartItems })
  } catch (error) {
    console.error('Cart fetch error:', error)
    return NextResponse.json(
      { error: 'Failed to fetch cart' },
      { status: 500 }
    )
  }
})

export const POST = withAuth(async (req, context) => {
  try {
    const { productId, quantity = 1 } = await req.json()

    if (!productId) {
      return NextResponse.json(
        { error: 'Product ID is required' },
        { status: 400 }
      )
    }

    if (quantity < 1) {
      return NextResponse.json(
        { error: 'Quantity must be at least 1' },
        { status: 400 }
      )
    }

    // Check if product exists and has stock
    const product = await prisma.product.findUnique({
      where: { id: productId }
    })

    if (!product || !product.isActive) {
      return NextResponse.json(
        { error: 'Product not found or inactive' },
        { status: 404 }
      )
    }

    if (product.stock < quantity) {
      return NextResponse.json(
        { error: `Only ${product.stock} items available in stock` },
        { status: 400 }
      )
    }

    // Check if item already in cart
    const existingItem = await prisma.cartItem.findUnique({
      where: {
        userId_productId: {
          userId: req.user.id,
          productId
        }
      }
    })

    let cartItem
    if (existingItem) {
      const newQuantity = existingItem.quantity + quantity
      
      if (product.stock < newQuantity) {
        return NextResponse.json(
          { error: `Cannot add ${quantity} more items. Only ${product.stock - existingItem.quantity} more available.` },
          { status: 400 }
        )
      }

      cartItem = await prisma.cartItem.update({
        where: { id: existingItem.id },
        data: { quantity: newQuantity },
        include: { product: true }
      })
    } else {
      cartItem = await prisma.cartItem.create({
        data: {
          userId: req.user.id,
          productId,
          quantity
        },
        include: { product: true }
      })
    }

    return NextResponse.json({ cartItem })
  } catch (error) {
    console.error('Add to cart error:', error)
    return NextResponse.json(
      { error: 'Failed to add item to cart' },
      { status: 500 }
    )
  }
})

export const DELETE = withAuth(async (req, context) => {
  try {
    await prisma.cartItem.deleteMany({
      where: { userId: req.user.id }
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Clear cart error:', error)
    return NextResponse.json(
      { error: 'Failed to clear cart' },
      { status: 500 }
    )
  }
})