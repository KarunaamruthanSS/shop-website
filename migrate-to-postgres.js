const { PrismaClient } = require('@prisma/client')
const fs = require('fs')
const path = require('path')

// Check if SQLite database exists
const sqliteDbPath = path.join(__dirname, 'prisma', 'dev.db')
const hasSqliteDb = fs.existsSync(sqliteDbPath)

console.log('🔄 PostgreSQL Migration Script')
console.log('================================')

if (hasSqliteDb) {
  console.log('📁 SQLite database found at:', sqliteDbPath)
  console.log('⚠️  Manual data export required:')
  console.log('   1. Use a SQLite browser tool to export your data')
  console.log('   2. Or use sqlite3 CLI to dump data')
  console.log('   3. Then manually insert into PostgreSQL')
  console.log('')
} else {
  console.log('✅ No SQLite database found - clean migration')
}

async function setupPostgreSQL() {
  console.log('🐘 Setting up PostgreSQL database...')
  
  // Check if DATABASE_URL is configured
  if (!process.env.DATABASE_URL || process.env.DATABASE_URL.includes('your_postgresql_database_url_here')) {
    console.log('❌ DATABASE_URL not configured in .env.local')
    console.log('   Please update .env.local with your PostgreSQL connection string')
    console.log('   Format: postgresql://username:password@host:port/database_name')
    return
  }

  try {
    const prisma = new PrismaClient()
    
    // Test connection
    await prisma.$connect()
    console.log('✅ Connected to PostgreSQL successfully')
    
    // Push schema to database
    console.log('📋 Creating database schema...')
    // Note: We'll use prisma db push instead of calling it from here
    
    await prisma.$disconnect()
    console.log('✅ Migration setup complete')
    console.log('')
    console.log('Next steps:')
    console.log('1. Run: npx prisma db push')
    console.log('2. Run: npm run db:seed')
    console.log('3. Test your application')
    
  } catch (error) {
    console.error('❌ Error connecting to PostgreSQL:', error.message)
    console.log('   Please check your DATABASE_URL configuration')
  }
}

setupPostgreSQL()