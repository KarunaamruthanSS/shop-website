const { PrismaClient } = require('@prisma/client')
const fs = require('fs')

// Create a Prisma client for SQLite (temporarily)
const prisma = new PrismaClient({
  datasources: {
    db: {
      url: 'file:./prisma/dev.db'
    }
  }
})

async function exportData() {
  try {
    console.log('📤 Exporting data from SQLite database...')
    
    // Export users
    const users = await prisma.user.findMany()
    console.log(`Found ${users.length} users`)
    
    // Export products
    const products = await prisma.product.findMany()
    console.log(`Found ${products.length} products`)
    
    // Export orders
    const orders = await prisma.order.findMany({
      include: {
        items: true
      }
    })
    console.log(`Found ${orders.length} orders`)
    
    // Export cart items
    const cartItems = await prisma.cartItem.findMany()
    console.log(`Found ${cartItems.length} cart items`)
    
    // Save to JSON file
    const exportData = {
      users,
      products,
      orders,
      cartItems,
      exportedAt: new Date().toISOString()
    }
    
    fs.writeFileSync('sqlite-data-export.json', JSON.stringify(exportData, null, 2))
    console.log('✅ Data exported to sqlite-data-export.json')
    
    // Show admin and test user info
    const adminUser = users.find(u => u.email === 'admin@hardware.com')
    const testUser = users.find(u => u.email === 'user@test.com')
    
    console.log('\n👤 Found users:')
    if (adminUser) {
      console.log(`   Admin: ${adminUser.name} (${adminUser.email}) - Role: ${adminUser.role}`)
    }
    if (testUser) {
      console.log(`   Test User: ${testUser.name} (${testUser.email}) - Role: ${testUser.role}`)
    }
    
    users.forEach(user => {
      if (user.email !== 'admin@hardware.com' && user.email !== 'user@test.com') {
        console.log(`   Other: ${user.name} (${user.email}) - Role: ${user.role}`)
      }
    })
    
  } catch (error) {
    console.error('❌ Error exporting data:', error.message)
  } finally {
    await prisma.$disconnect()
  }
}

exportData()