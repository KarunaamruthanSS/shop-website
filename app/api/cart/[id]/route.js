import { NextResponse } from 'next/server'
import { prisma } from '../../../../lib/prisma'
import { withAuth } from '../../../../lib/middleware'

export const PUT = withAuth(async (req, { params }) => {
  try {
    const { quantity } = await req.json()

    if (quantity <= 0) {
      return NextResponse.json(
        { error: 'Quantity must be greater than 0' },
        { status: 400 }
      )
    }

    const cartItem = await prisma.cartItem.update({
      where: {
        id: params.id,
        userId: req.user.id
      },
      data: { quantity },
      include: {
        product: true
      }
    })

    return NextResponse.json({ cartItem })
  } catch (error) {
    return NextResponse.json(
      { error: error.message },
      { status: 500 }
    )
  }
})

export const DELETE = withAuth(async (req, { params }) => {
  try {
    await prisma.cartItem.delete({
      where: {
        id: params.id,
        userId: req.user.id
      }
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    return NextResponse.json(
      { error: error.message },
      { status: 500 }
    )
  }
})