# Hardware Shop E-Commerce Platform

A complete e-commerce platform built with Next.js, featuring a modern shopping experience and comprehensive admin panel.

## 🚀 Features

### Customer Features
- **Product Catalog**: Browse products with search, filter, and sort functionality
- **Shopping Cart**: Persistent cart for logged-in users, session cart for guests
- **User Authentication**: Secure login/register system
- **Order Management**: Complete checkout process with order tracking
- **Product Details**: Detailed product pages with stock information

### Admin Features
- **Dashboard**: Real-time business metrics and analytics
- **Product Management**: Full CRUD operations for inventory
- **Order Management**: Process orders and update status
- **User Management**: View and manage customer accounts
- **Analytics**: Comprehensive business intelligence and reporting

## 🛠️ Tech Stack

- **Frontend**: Next.js 14, React 18
- **Database**: SQLite with Prisma ORM
- **Authentication**: JWT with bcryptjs
- **Styling**: CSS with Tailwind CSS
- **State Management**: React Context API

## 📦 Installation

1. **Clone and install dependencies**:
   ```bash
   npm install
   ```

2. **Setup database**:
   ```bash
   npx prisma generate
   npx prisma db push
   node prisma/seed.js
   ```

3. **Start development server**:
   ```bash
   npm run dev
   ```

4. **Open your browser**:
   Navigate to [http://localhost:3000](http://localhost:3000)

## 🔐 Test Accounts

### Admin Account
- **Email**: admin@hardware.com
- **Password**: admin123
- **Access**: Full admin panel access

### User Account
- **Email**: user@test.com
- **Password**: user123
- **Access**: Customer shopping experience

## 📱 Usage

### For Customers
1. Browse products at `/products`
2. Use search and filters to find items
3. Add products to cart
4. Register/login for persistent cart
5. Complete checkout process
6. Track order status

### For Administrators
1. Login with admin credentials
2. Access admin dashboard at `/dashboard`
3. Manage products at `/admin-products`
4. Process orders at `/orders`
5. View analytics at `/analytics`
6. Manage users at `/admin/users`

## 🗂️ Project Structure

```
├── app/
│   ├── (admin)/          # Admin-only pages
│   ├── (auth)/           # Authentication pages
│   ├── (shop)/           # Customer shopping pages
│   ├── api/              # API routes
│   └── globals.css       # Global styles
├── components/           # Reusable components
├── lib/                  # Utility functions
├── prisma/              # Database schema and seed
└── services/            # Business logic services
```

## 🔧 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run db:generate` - Generate Prisma client
- `npm run db:push` - Push schema to database
- `npm run db:seed` - Seed database with sample data

## 🌟 Key Features Implemented

### Authentication & Security
- JWT-based authentication
- Password hashing with bcryptjs
- Role-based access control
- Protected API routes

### Database & ORM
- Prisma ORM with SQLite
- Proper relationships and constraints
- Database seeding and migrations

### E-commerce Functionality
- Product catalog with categories
- Shopping cart with persistence
- Order management system
- Stock tracking and management

### Admin Panel
- Real-time dashboard metrics
- Complete product CRUD operations
- Order processing and status updates
- User management interface
- Advanced analytics and reporting

### User Experience
- Responsive design
- Search and filter functionality
- Loading states and error handling
- Success confirmations
- Mobile-friendly interface

## 📊 Business Intelligence

The platform includes comprehensive analytics:
- Revenue tracking and growth metrics
- Top-selling products analysis
- Order status distribution
- Customer acquisition tracking
- Time-based performance reports

## 🔒 Security Features

- Secure authentication with HTTP-only cookies
- Password hashing and validation
- Protected admin routes
- Input validation and sanitization
- Error handling and logging

## 🚀 Production Ready

This platform is production-ready with:
- Proper error handling
- Security best practices
- Scalable database design
- Performance optimizations
- Comprehensive admin tools

---

**Built with ❤️ using Next.js and modern web technologies**
