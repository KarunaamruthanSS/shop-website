import { NextResponse } from 'next/server'
import { prisma } from '../../../../lib/prisma'
import { withAdmin } from '../../../../lib/middleware'

export async function GET(request, { params }) {
  try {
    const order = await prisma.order.findUnique({
      where: { id: params.id },
      include: {
        user: {
          select: { name: true, email: true }
        },
        items: {
          include: {
            product: true
          }
        }
      }
    })

    if (!order) {
      return NextResponse.json(
        { error: 'Order not found' },
        { status: 404 }
      )
    }

    return NextResponse.json({ order })
  } catch (error) {
    return NextResponse.json(
      { error: error.message },
      { status: 500 }
    )
  }
}

export const PUT = withAdmin(async (req, { params }) => {
  try {
    const { status } = await req.json()

    const order = await prisma.order.update({
      where: { id: params.id },
      data: { status },
      include: {
        user: {
          select: { name: true, email: true }
        },
        items: {
          include: {
            product: true
          }
        }
      }
    })

    return NextResponse.json({ order })
  } catch (error) {
    return NextResponse.json(
      { error: error.message },
      { status: 500 }
    )
  }
})