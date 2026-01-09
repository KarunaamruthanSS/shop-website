import { NextResponse } from 'next/server'
import { prisma } from '../../../../lib/prisma'
import { getUserFromToken } from '../../../../lib/auth'

export async function GET(request) {
  try {
    // Get token from middleware header
    const token = request.headers.get('x-auth-token')

    if (!token) {
      return NextResponse.json(
        { error: 'Authentication required' },
        { status: 401 }
      )
    }

    // Verify token and get user
    const user = await getUserFromToken(token)

    if (!user) {
      return NextResponse.json(
        { error: 'Invalid token' },
        { status: 401 }
      )
    }

    console.log('Admin analytics - User ID:', user.id, 'Role:', user.role)

    // Check if user is admin
    if (user.role !== 'ADMIN') {
      return NextResponse.json(
        { error: 'Admin access required' },
        { status: 403 }
      )
    }

    const { searchParams } = new URL(request.url)
    const days = parseInt(searchParams.get('days') || '30')
    
    const startDate = new Date()
    startDate.setDate(startDate.getDate() - days)
    
    const previousStartDate = new Date()
    previousStartDate.setDate(previousStartDate.getDate() - (days * 2))
    
    // Current period data
    const [
      currentRevenue,
      currentOrders,
      currentCustomers,
      topProducts,
      orderStatusDistribution,
      recentOrders
    ] = await Promise.all([
      // Total revenue
      prisma.order.aggregate({
        where: {
          createdAt: { gte: startDate }
        },
        _sum: { total: true }
      }),
      
      // Total orders
      prisma.order.count({
        where: {
          createdAt: { gte: startDate }
        }
      }),
      
      // New customers
      prisma.user.count({
        where: {
          createdAt: { gte: startDate },
          role: 'USER'
        }
      }),
      
      // Top products
      prisma.orderItem.groupBy({
        by: ['productId'],
        where: {
          order: {
            createdAt: { gte: startDate }
          }
        },
        _sum: {
          quantity: true,
          price: true
        },
        _avg: {
          price: true
        },
        orderBy: {
          _sum: {
            quantity: 'desc'
          }
        },
        take: 10
      }),
      
      // Order status distribution
      prisma.order.groupBy({
        by: ['status'],
        where: {
          createdAt: { gte: startDate }
        },
        _count: {
          status: true
        }
      }),
      
      // Recent orders for activity
      prisma.order.findMany({
        take: 10,
        orderBy: { createdAt: 'desc' },
        include: {
          user: {
            select: { name: true }
          }
        }
      })
    ])

    // Previous period data for comparison
    const [
      previousRevenue,
      previousOrders,
      previousCustomers
    ] = await Promise.all([
      prisma.order.aggregate({
        where: {
          createdAt: { 
            gte: previousStartDate,
            lt: startDate
          }
        },
        _sum: { total: true }
      }),
      
      prisma.order.count({
        where: {
          createdAt: { 
            gte: previousStartDate,
            lt: startDate
          }
        }
      }),
      
      prisma.user.count({
        where: {
          createdAt: { 
            gte: previousStartDate,
            lt: startDate
          },
          role: 'USER'
        }
      })
    ])

    // Get product details for top products
    const productIds = topProducts.map(p => p.productId)
    const products = await prisma.product.findMany({
      where: { id: { in: productIds } },
      select: { id: true, name: true, category: true }
    })

    const topProductsWithDetails = topProducts.map(tp => {
      const product = products.find(p => p.id === tp.productId)
      return {
        id: tp.productId,
        name: product?.name || 'Unknown Product',
        category: product?.category || 'N/A',
        totalSold: tp._sum.quantity,
        totalRevenue: tp._sum.price * tp._sum.quantity,
        avgPrice: tp._avg.price
      }
    })

    // Calculate metrics
    const totalRevenue = currentRevenue._sum.total || 0
    const totalOrders = currentOrders
    const newCustomers = currentCustomers
    const averageOrderValue = totalOrders > 0 ? totalRevenue / totalOrders : 0

    // Calculate growth percentages
    const prevRevenue = previousRevenue._sum.total || 0
    const prevOrders = previousOrders
    const prevCustomers = previousCustomers
    const prevAOV = prevOrders > 0 ? prevRevenue / prevOrders : 0

    const revenueGrowth = prevRevenue > 0 ? ((totalRevenue - prevRevenue) / prevRevenue) * 100 : 0
    const orderGrowth = prevOrders > 0 ? ((totalOrders - prevOrders) / prevOrders) * 100 : 0
    const customerGrowth = prevCustomers > 0 ? ((newCustomers - prevCustomers) / prevCustomers) * 100 : 0
    const aovGrowth = prevAOV > 0 ? ((averageOrderValue - prevAOV) / prevAOV) * 100 : 0

    // Format recent activity
    const recentActivity = recentOrders.map(order => ({
      type: 'New Order',
      description: `Order #${order.id.slice(-8)} by ${order.user?.name || (order.userId === null ? 'Deleted User' : 'Guest')} - ₹${order.total}`,
      timestamp: order.createdAt
    }))

    return NextResponse.json({
      totalRevenue,
      totalOrders,
      newCustomers,
      averageOrderValue,
      revenueGrowth,
      orderGrowth,
      customerGrowth,
      aovGrowth,
      topProducts: topProductsWithDetails,
      orderStatusDistribution: orderStatusDistribution.map(osd => ({
        status: osd.status,
        count: osd._count.status
      })),
      recentActivity
    })
  } catch (error) {
    console.error('Analytics error:', error)
    return NextResponse.json(
      { error: 'Failed to fetch analytics' },
      { status: 500 }
    )
  }
}