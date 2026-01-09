const { PrismaClient } = require('@prisma/client')
const bcrypt = require('bcryptjs')

const prisma = new PrismaClient()

async function main() {
  // Create admin user
  const adminPassword = await bcrypt.hash('admin123', 12)
  const admin = await prisma.user.upsert({
    where: { email: 'admin@hardware.com' },
    update: {},
    create: {
      email: 'admin@hardware.com',
      name: 'Admin User',
      password: adminPassword,
      phone: '+1234567890',
      dateOfBirth: new Date('1985-01-15'),
      role: 'ADMIN'
    }
  })

  // Create test user
  const userPassword = await bcrypt.hash('user123', 12)
  const user = await prisma.user.upsert({
    where: { email: 'user@test.com' },
    update: {},
    create: {
      email: 'user@test.com',
      name: 'Test User',
      password: userPassword,
      phone: '+9876543210',
      dateOfBirth: new Date('1990-06-20'),
      role: 'USER'
    }
  })

  // Create products
  const products = [
    {
      name: 'LED Bulb 9W',
      description: 'Energy efficient LED bulb with warm white light',
      price: 120,
      stock: 50,
      category: 'Lighting',
      isActive: true
    },
    {
      name: 'Wall Switch',
      description: 'Single pole wall switch with modern design',
      price: 50,
      stock: 100,
      category: 'Electrical',
      isActive: true
    },
    {
      name: 'Wire Coil 100m',
      description: '2.5mm copper wire coil for electrical installations',
      price: 450,
      stock: 25,
      category: 'Wiring',
      isActive: true
    },
    {
      name: 'Circuit Breaker 16A',
      description: 'Single pole MCB for electrical protection',
      price: 280,
      stock: 30,
      category: 'Protection',
      isActive: true
    },
    {
      name: 'Extension Cord 5m',
      description: '4-socket extension cord with surge protection',
      price: 350,
      stock: 20,
      category: 'Accessories',
      isActive: true
    }
  ]

  for (const product of products) {
    const existingProduct = await prisma.product.findFirst({
      where: { name: product.name }
    })
    
    if (!existingProduct) {
      await prisma.product.create({
        data: product
      })
    }
  }

  console.log('Database seeded successfully!')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })