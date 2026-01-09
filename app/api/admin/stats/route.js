import { NextResponse } from 'next/server'
import { prisma } from '../../../../lib/prisma'
import { validateAdminAuth } from '../../../../lib/adminAuth'

export async function GET(request) {
  try {
    // Validate admin authentication
    const authResult = await validateAdminAuth(request)
    if (authResult.error) {
      return authResult.error
    }

    const { user } = authResult
    console.log('Admin stats - User ID:', user.id, 'Role:', user.role)

    // Get total counts
    const [totalUsers, totalProducts, totalOrders, totalRevenue] = await Promise.all([
      prisma.user.count(),
      prisma.product.count(),
      prisma.order.count(),
      prisma.order.aggregate({
        _sum: {
          total: true
        }
      })
    ])

    // Get recent orders
    const recentOrders = await prisma.order.findMany({
      take: 5,
      orderBy: { createdAt: 'desc' },
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
      }
    })

    // Get low stock products
    const lowStockProducts = await prisma.product.findMany({
      where: {
        stock: {
          lte: 10
        },
        isActive: true
      },
      orderBy: { stock: 'asc' }
    })

    // Get order status distribution
    const orderStatusStats = await prisma.order.groupBy({
      by: ['status'],
      _count: {
        status: true
      }
    })

    // Get monthly revenue (last 6 months)
    const sixMonthsAgo = new Date()
    sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 6)

    const monthlyRevenue = await prisma.order.groupBy({
      by: ['createdAt'],
      where: {
        createdAt: {
          gte: sixMonthsAgo
        }
      },
      _sum: {
        total: true
      },
      _count: {
        id: true
      }
    })

    return NextResponse.json({
      stats: {
        totalUsers,
        totalProducts,
        totalOrders,
        totalRevenue: totalRevenue._sum.total || 0
      },
      recentOrders,
      lowStockProducts,
      orderStatusStats,
      monthlyRevenue
    })
  } catch (error) {
    console.error('Admin stats error:', error)
    return NextResponse.json(
      { error: error.message },
      { status: 500 }
    )
  }
}