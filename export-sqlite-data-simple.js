const sqlite3 = require('sqlite3').verbose()
const fs = require('fs')
const path = require('path')

const dbPath = path.join(__dirname, 'prisma', 'dev.db')

if (!fs.existsSync(dbPath)) {
  console.log('❌ SQLite database not found at:', dbPath)
  process.exit(1)
}

console.log('📤 Exporting data from SQLite database...')

const db = new sqlite3.Database(dbPath, sqlite3.OPEN_READONLY, (err) => {
  if (err) {
    console.error('❌ Error opening database:', err.message)
    process.exit(1)
  }
  console.log('✅ Connected to SQLite database')
})

const exportData = {
  users: [],
  products: [],
  orders: [],
  orderItems: [],
  cartItems: [],
  exportedAt: new Date().toISOString()
}

// Export users
db.all('SELECT * FROM users', [], (err, rows) => {
  if (err) {
    console.error('Error reading users:', err.message)
    return
  }
  exportData.users = rows
  console.log(`Found ${rows.length} users`)
  
  // Export products
  db.all('SELECT * FROM products', [], (err, rows) => {
    if (err) {
      console.error('Error reading products:', err.message)
      return
    }
    exportData.products = rows
    console.log(`Found ${rows.length} products`)
    
    // Export orders
    db.all('SELECT * FROM orders', [], (err, rows) => {
      if (err) {
        console.error('Error reading orders:', err.message)
        return
      }
      exportData.orders = rows
      console.log(`Found ${rows.length} orders`)
      
      // Export order items
      db.all('SELECT * FROM order_items', [], (err, rows) => {
        if (err) {
          console.error('Error reading order_items:', err.message)
          return
        }
        exportData.orderItems = rows
        console.log(`Found ${rows.length} order items`)
        
        // Export cart items
        db.all('SELECT * FROM cart_items', [], (err, rows) => {
          if (err) {
            console.error('Error reading cart_items:', err.message)
            return
          }
          exportData.cartItems = rows
          console.log(`Found ${rows.length} cart items`)
          
          // Save to file
          fs.writeFileSync('sqlite-data-export.json', JSON.stringify(exportData, null, 2))
          console.log('✅ Data exported to sqlite-data-export.json')
          
          // Show user info
          console.log('\n👤 Found users:')
          exportData.users.forEach(user => {
            console.log(`   ${user.name} (${user.email}) - Role: ${user.role}`)
          })
          
          db.close()
        })
      })
    })
  })
})