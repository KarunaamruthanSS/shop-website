import { NextResponse } from 'next/server'
import { prisma } from '../../../../lib/prisma'
import { withAdmin } from '../../../../lib/middleware'

export async function GET(request, { params }) {
  try {
    const product = await prisma.product.findUnique({
      where: { id: params.id }
    })

    if (!product) {
      return NextResponse.json(
        { error: 'Product not found' },
        { status: 404 }
      )
    }

    return NextResponse.json({ product })
  } catch (error) {
    return NextResponse.json(
      { error: error.message },
      { status: 500 }
    )
  }
}

export const PUT = withAdmin(async (req, { params }) => {
  try {
    const { name, description, price, stock, category, imageUrl, isActive } = await req.json()

    const product = await prisma.product.update({
      where: { id: params.id },
      data: {
        name,
        description,
        price: parseFloat(price),
        stock: parseInt(stock),
        category,
        imageUrl,
        isActive
      }
    })

    return NextResponse.json({ product })
  } catch (error) {
    return NextResponse.json(
      { error: error.message },
      { status: 500 }
    )
  }
})

export const DELETE = withAdmin(async (req, { params }) => {
  try {
    await prisma.product.delete({
      where: { id: params.id }
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    return NextResponse.json(
      { error: error.message },
      { status: 500 }
    )
  }
})