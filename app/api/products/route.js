import { NextResponse } from 'next/server'
import { prisma } from '../../../lib/prisma'
import { withAdmin } from '../../../lib/middleware'

export async function GET() {
  try {
    const products = await prisma.product.findMany({
      where: { isActive: true },
      orderBy: { createdAt: 'desc' }
    })

    return NextResponse.json({ products })
  } catch (error) {
    return NextResponse.json(
      { error: error.message },
      { status: 500 }
    )
  }
}

export const POST = withAdmin(async (req, context) => {
  try {
    const { name, description, price, stock, category, imageUrl } = await req.json()

    if (!name || !price) {
      return NextResponse.json(
        { error: 'Name and price are required' },
        { status: 400 }
      )
    }

    const product = await prisma.product.create({
      data: {
        name,
        description,
        price: parseFloat(price),
        stock: parseInt(stock) || 0,
        category,
        imageUrl
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