import { NextResponse } from 'next/server'
import { prisma } from '../../../../../lib/prisma'
import { validateAdminAuth } from '../../../../../lib/adminAuth'

export async function DELETE(request, { params }) {
  try {
    // Validate admin authentication
    const authResult = await validateAdminAuth(request)
    if (authResult.error) {
      return authResult.error
    }

    const { user: currentUser } = authResult
    const userId = params.id

    // Prevent admin from deleting themselves
    if (currentUser.id === userId) {
      return NextResponse.json(
        { error: 'You cannot delete your own account' },
        { status: 400 }
      )
    }

    const user = await prisma.user.findUnique({ where: { id: userId } })
    if (!user) {
      return NextResponse.json(
        { error: 'User not found' },
        { status: 404 }
      )
    }

    // Prevent removing the last admin
    if (user.role === 'ADMIN') {
      const adminCount = await prisma.user.count({ where: { role: 'ADMIN' } })
      if (adminCount <= 1) {
        return NextResponse.json(
          { error: 'Cannot delete the last admin user' },
          { status: 400 }
        )
      }
    }

    // Use transaction to safely delete user and update orders
    await prisma.$transaction(async (tx) => {
      // First, set userId to null for all orders by this user
      await tx.order.updateMany({
        where: { userId },
        data: { userId: null }
      })

      // Also clear cart items for this user
      await tx.cartItem.deleteMany({
        where: { userId }
      })

      // Finally, delete the user
      await tx.user.delete({ where: { id: userId } })
    })

    return NextResponse.json({ 
      success: true,
      message: 'User deleted successfully. Their orders have been preserved.'
    })
  } catch (error) {
    console.error('Delete user error:', error)
    return NextResponse.json(
      { error: error.message },
      { status: 500 }
    )
  }
}
