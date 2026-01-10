const { PrismaClient } = require('@prisma/client')
const fs = require('fs')

async function importData() {
  // Check if export file exists
  if (!fs.existsSync('sqlite-data-export.json')) {
    console.log('❌ Export file not found. Run export script first.')
    return
  }

  // Check if DATABASE_URL is configured
  if (!process.env.DATABASE_URL || process.env.DATABASE_URL.includes('your_postgresql_database_url_here')) {
    console.log('❌ DATABASE_URL not configured in .env.local')
    console.log('   Please update .env.local with your PostgreSQL connection string')
    return
  }

  const prisma = new PrismaClient()
  
  try {
    // Test connection
    await prisma.$connect()
    console.log('✅ Connected to PostgreSQL')
    
    // Read exported data
    const exportData = JSON.parse(fs.readFileSync('sqlite-data-export.json', 'utf8'))
    console.log('📥 Importing data to PostgreSQL...')
    
    // Import users
    console.log(`Importing ${exportData.users.length} users...`)
    for (const user of exportData.users) {
      try {
        await prisma.user.upsert({
          where: { email: user.email },
          update: {
            name: user.name,
            phone: user.phone,
            dateOfBirth: user.dateOfBirth ? new Date(user.dateOfBirth) : null,
            role: user.role,
            // Don't update password to preserve existing passwords
          },
          create: {
            id: user.id,
            email: user.email,
            name: user.name,
            password: user.password,
            phone: user.phone,
            dateOfBirth: user.dateOfBirth ? new Date(user.dateOfBirth) : null,
            role: user.role,
            createdAt: new Date(user.createdAt),
            updatedAt: new Date(user.updatedAt)
          }
        })
        console.log(`  ✅ User: ${user.name} (${user.email})`)
      } catch (error) {
        console.log(`  ❌ Failed to import user ${user.email}: ${error.message}`)
      }
    }
    
    // Import products
    console.log(`Importing ${exportData.products.length} products...`)
    for (const product of exportData.products) {
      try {
        await prisma.product.upsert({
          where: { id: product.id },
          update: {
            name: product.name,
            description: product.description,
            price: product.price,
            stock: product.stock,
            category: product.category,
            imageUrl: product.imageUrl,
            isActive: product.isActive === 1 || product.isActive === true,
          },
          create: {
            id: product.id,
            name: product.name,
            description: product.description,
            price: product.price,
            stock: product.stock,
            category: product.category,
            imageUrl: product.imageUrl,
            isActive: product.isActive === 1 || product.isActive === true,
            createdAt: new Date(product.createdAt),
            updatedAt: new Date(product.updatedAt)
          }
        })
        console.log(`  ✅ Product: ${product.name}`)
      } catch (error) {
        console.log(`  ❌ Failed to import product ${product.name}: ${error.message}`)
      }
    }
    
    // Import orders
    console.log(`Importing ${exportData.orders.length} orders...`)
    for (const order of exportData.orders) {
      try {
        await prisma.order.upsert({
          where: { id: order.id },
          update: {
            total: order.total,
            status: order.status,
          },
          create: {
            id: order.id,
            userId: order.userId,
            total: order.total,
            status: order.status,
            createdAt: new Date(order.createdAt),
            updatedAt: new Date(order.updatedAt)
          }
        })
        console.log(`  ✅ Order: ${order.id} (${order.status})`)
      } catch (error) {
        console.log(`  ❌ Failed to import order ${order.id}: ${error.message}`)
      }
    }
    
    // Import order items
    console.log(`Importing ${exportData.orderItems.length} order items...`)
    for (const item of exportData.orderItems) {
      try {
        await prisma.orderItem.upsert({
          where: { id: item.id },
          update: {
            quantity: item.quantity,
            price: item.price,
          },
          create: {
            id: item.id,
            orderId: item.orderId,
            productId: item.productId,
            quantity: item.quantity,
            price: item.price
          }
        })
        console.log(`  ✅ Order item: ${item.id}`)
      } catch (error) {
        console.log(`  ❌ Failed to import order item ${item.id}: ${error.message}`)
      }
    }
    
    // Import cart items (if any)
    if (exportData.cartItems.length > 0) {
      console.log(`Importing ${exportData.cartItems.length} cart items...`)
      for (const item of exportData.cartItems) {
        try {
          await prisma.cartItem.upsert({
            where: { 
              userId_productId: {
                userId: item.userId,
                productId: item.productId
              }
            },
            update: {
              quantity: item.quantity,
            },
            create: {
              id: item.id,
              userId: item.userId,
              productId: item.productId,
              quantity: item.quantity
            }
          })
          console.log(`  ✅ Cart item: ${item.id}`)
        } catch (error) {
          console.log(`  ❌ Failed to import cart item ${item.id}: ${error.message}`)
        }
      }
    }
    
    console.log('\n🎉 Data migration completed successfully!')
    console.log('📊 Summary:')
    console.log(`   Users: ${exportData.users.length}`)
    console.log(`   Products: ${exportData.products.length}`)
    console.log(`   Orders: ${exportData.orders.length}`)
    console.log(`   Order Items: ${exportData.orderItems.length}`)
    console.log(`   Cart Items: ${exportData.cartItems.length}`)
    
  } catch (error) {
    console.error('❌ Migration failed:', error.message)
  } finally {
    await prisma.$disconnect()
  }
}

importData()