# 🛠️ Hardware Shop - Complete Website Guide

## 📋 Table of Contents
1. [Overview](#overview)
2. [Getting Started](#getting-started)
3. [User Guide](#user-guide)
4. [Admin Guide](#admin-guide)
5. [Features & Functionality](#features--functionality)
6. [Technical Documentation](#technical-documentation)
7. [Configuration](#configuration)
8. [Troubleshooting](#troubleshooting)
9. [Support & Contact](#support--contact)

---

## 🌟 Overview

**Hardware Shop** is a modern, full-featured e-commerce platform designed specifically for hardware and tools retail. Built with Next.js 14 and modern web technologies, it provides a seamless shopping experience for customers and powerful management tools for administrators.

### 🎯 Key Highlights
- **Dual Login System**: Mobile number (default) or email authentication
- **Indian SMS Integration**: Domestic SMS services for order notifications
- **Dark/Light Theme**: Professional theme system with smooth transitions
- **Mobile Responsive**: Optimized for all devices
- **Real-time Analytics**: Comprehensive business intelligence
- **Secure & Scalable**: Production-ready architecture

---

## 🚀 Getting Started

### 📦 Installation & Setup

1. **Clone the Repository**
   ```bash
   git clone <repository-url>
   cd hardware-shop
   ```

2. **Install Dependencies**
   ```bash
   npm install
   ```

3. **Environment Configuration**
   ```bash
   cp .env.example .env.local
   ```
   
   Update `.env.local` with your configuration:
   ```env
   JWT_SECRET=your-secure-jwt-secret-key-here
   SMS_SERVICE=local
   SMTP_HOST=smtp.gmail.com
   SMTP_USER=your-email@gmail.com
   SMTP_PASS=your-gmail-app-password
   ```

4. **Database Setup**
   ```bash
   npx prisma generate
   npx prisma db push
   node prisma/seed.js
   ```

5. **Start Development Server**
   ```bash
   npm run dev
   ```

6. **Access the Website**
   - Website: http://localhost:3000
   - Admin Panel: http://localhost:3000/dashboard

### 🔐 Default Accounts

#### Admin Account
- **Email**: admin@hardware.com
- **Phone**: +91 94898 22432
- **Password**: admin123
- **Access**: Full administrative privileges

#### Test User Account
- **Email**: user@test.com
- **Phone**: +91 9876543210
- **Password**: user123
- **Access**: Customer shopping experience

---

## 👥 User Guide

### 🛍️ Shopping Experience

#### 1. **Browse Products**
- Visit `/products` to see all available items
- Use search bar to find specific products
- Filter by category, price range, or availability
- Sort by name, price, or stock levels

#### 2. **Product Details**
- Click any product to view detailed information
- See high-resolution images, descriptions, and specifications
- Check stock availability and pricing
- Add items to cart with quantity selection

#### 3. **Shopping Cart**
- **Guest Users**: Cart stored in browser (localStorage)
- **Logged-in Users**: Cart synced to database
- View cart at `/cart`
- Modify quantities or remove items
- See real-time total calculations

#### 4. **User Registration & Login**
- **Default**: Login with mobile number
- **Alternative**: Login with email address
- Toggle between login methods easily
- Secure password requirements
- Automatic cart migration after login

#### 5. **Checkout Process**
- **Requirement**: Must be logged in to place orders
- Review order details and total
- Confirm shipping information
- Click "Pay Now" to see payment confirmation
- Receive order confirmation via SMS and email

#### 6. **Order Tracking**
- View order history in user account
- Track order status (Pending → Processing → Shipped → Delivered)
- Receive SMS updates for status changes

### 📱 Mobile Experience
- Fully responsive design
- Touch-friendly navigation
- Mobile-optimized cart and checkout
- Swipe gestures and mobile interactions

---

## 👨‍💼 Admin Guide

### 🏠 Dashboard Overview
Access: `/dashboard`

#### Key Metrics
- **Total Revenue**: Real-time sales tracking
- **Total Orders**: Order count and trends
- **Total Products**: Inventory overview
- **Total Users**: Customer base growth
- **Recent Orders**: Latest transactions
- **Top Products**: Best-selling items

### 📊 Analytics & Reports
Access: `/analytics`

#### Available Reports
- **Revenue Analytics**: Daily, weekly, monthly trends
- **Product Performance**: Top sellers, slow movers
- **Order Status Distribution**: Pending, completed, cancelled
- **Customer Insights**: Registration trends, repeat customers
- **Time-based Analysis**: Peak hours, seasonal trends

### 📦 Product Management
Access: `/admin-products`

#### Product Operations
- **Add New Products**: Complete product information
- **Edit Existing**: Update details, pricing, stock
- **Delete Products**: Remove discontinued items
- **Bulk Operations**: Mass updates and imports
- **Category Management**: Organize product catalog
- **Stock Tracking**: Real-time inventory levels

#### Product Information Fields
- Name, description, category
- Price and stock quantity
- Product images and specifications
- Active/inactive status
- SEO-friendly URLs

### 📋 Order Management
Access: `/orders`

#### Order Processing
- **View All Orders**: Complete order history
- **Order Details**: Customer info, items, totals
- **Status Updates**: Change order status
- **Customer Communication**: Automated notifications
- **Shipping Management**: Track deliveries
- **Payment Tracking**: Transaction records

#### Order Status Workflow
1. **Pending**: New orders awaiting processing
2. **Processing**: Orders being prepared
3. **Shipped**: Orders dispatched to customers
4. **Delivered**: Successfully completed orders
5. **Cancelled**: Cancelled or refunded orders

### 👥 User Management
Access: `/admin/users`

#### User Operations
- **View All Users**: Complete customer database
- **User Details**: Profile information, order history
- **Delete Users**: Remove accounts (orders preserved)
- **User Analytics**: Registration trends, activity
- **Communication**: Contact customers directly

#### User Information
- Personal details (name, email, phone)
- Registration date and activity
- Order history and total spent
- Account status and preferences

### 🔧 System Administration

#### SMS Configuration
- **Local Simulation**: Development testing
- **Indian Services**: TextLocal, MSG91, Fast2SMS
- **Message Templates**: Order confirmations, updates
- **Delivery Tracking**: SMS success rates

#### Email Configuration
- **SMTP Setup**: Gmail integration
- **Email Templates**: Order confirmations, receipts
- **Automated Notifications**: Status updates

#### Theme Management
- **Dark/Light Modes**: Professional color schemes
- **Theme Toggle**: Top-left corner placement
- **Responsive Design**: Mobile optimization
- **Accessibility**: WCAG compliance

---

## ⚙️ Features & Functionality

### 🔐 Authentication System
- **Dual Login**: Mobile number (default) or email
- **Secure Passwords**: Bcrypt hashing
- **JWT Tokens**: Secure session management
- **Role-based Access**: Admin vs. customer permissions
- **Session Management**: Automatic logout, activity tracking

### 🛒 E-commerce Features
- **Product Catalog**: Searchable, filterable inventory
- **Shopping Cart**: Persistent for users, session for guests
- **Order Processing**: Complete checkout workflow
- **Payment Integration**: Ready for payment gateway
- **Inventory Management**: Real-time stock tracking
- **Order Notifications**: SMS and email confirmations

### 📱 Communication System
- **SMS Notifications**: Indian domestic services
- **Email Notifications**: SMTP integration
- **Order Updates**: Automated status notifications
- **Customer Support**: Contact forms and direct communication

### 🎨 User Interface
- **Modern Design**: Clean, professional appearance
- **Dark/Light Themes**: User preference support
- **Responsive Layout**: Mobile-first design
- **Accessibility**: Screen reader support, keyboard navigation
- **Performance**: Fast loading, smooth animations

### 📊 Business Intelligence
- **Real-time Analytics**: Live dashboard metrics
- **Sales Reports**: Revenue tracking and trends
- **Product Analytics**: Performance insights
- **Customer Analytics**: User behavior and preferences
- **Operational Metrics**: Order processing efficiency

---

## 🔧 Technical Documentation

### 🏗️ Architecture Overview

#### Frontend
- **Framework**: Next.js 14 with React 18
- **Styling**: CSS with custom properties (CSS variables)
- **State Management**: React Context API
- **Routing**: Next.js App Router
- **Components**: Modular, reusable architecture

#### Backend
- **API Routes**: Next.js API routes
- **Database**: SQLite with Prisma ORM
- **Authentication**: JWT with HTTP-only cookies
- **File Storage**: Local file system
- **Email**: SMTP integration
- **SMS**: Multiple Indian service providers

#### Database Schema
```sql
-- Users table
User {
  id, name, email, phone, password, role, dateOfBirth
  orders[], cart[]
}

-- Products table
Product {
  id, name, description, price, stock, category, imageUrl, isActive
  orderItems[], cartItems[]
}

-- Orders table
Order {
  id, userId, total, status, createdAt, updatedAt
  user, items[]
}

-- Order Items
OrderItem {
  id, orderId, productId, quantity, price
  order, product
}

-- Cart Items
CartItem {
  id, userId, productId, quantity
  user, product
}
```

### 📁 Project Structure
```
hardware-shop/
├── app/                          # Next.js App Router
│   ├── (admin)/                  # Admin-only pages
│   │   ├── dashboard/            # Admin dashboard
│   │   ├── orders/               # Order management
│   │   ├── analytics/            # Business analytics
│   │   └── admin-products/       # Product management
│   ├── (auth)/                   # Authentication pages
│   │   ├── login/                # Login page
│   │   └── register/             # Registration page
│   ├── (shop)/                   # Customer pages
│   │   ├── products/             # Product catalog
│   │   ├── cart/                 # Shopping cart
│   │   └── checkout/             # Checkout process
│   ├── api/                      # API routes
│   │   ├── auth/                 # Authentication endpoints
│   │   ├── products/             # Product CRUD
│   │   ├── orders/               # Order management
│   │   ├── cart/                 # Cart operations
│   │   └── admin/                # Admin endpoints
│   ├── about-us/                 # About page
│   ├── contact-us/               # Contact page
│   ├── privacy-policy/           # Privacy policy
│   ├── terms-conditions/         # Terms & conditions
│   ├── globals.css               # Global styles
│   ├── layout.jsx                # Root layout
│   └── page.jsx                  # Homepage
├── components/                   # Reusable components
│   ├── navbar.jsx                # Navigation bar
│   ├── footer.jsx                # Site footer
│   ├── theme-toggle.jsx          # Theme switcher
│   ├── admin-nav.jsx             # Admin navigation
│   └── toast-container.jsx       # Notifications
├── lib/                          # Utility libraries
│   ├── auth.js                   # Authentication logic
│   ├── cartContext.js            # Cart state management
│   ├── sessionContext.js         # Session management
│   ├── themeContext.js           # Theme management
│   ├── translationContext.js     # Internationalization
│   ├── toastContext.js           # Notification system
│   ├── sms.js                    # SMS services
│   ├── email.js                  # Email services
│   ├── db.js                     # Database utilities
│   └── middleware.js             # API middleware
├── prisma/                       # Database
│   ├── schema.prisma             # Database schema
│   └── seed.js                   # Sample data
├── public/                       # Static assets
│   └── images/                   # Product images
├── .env.example                  # Environment template
├── .env.local                    # Environment variables
├── package.json                  # Dependencies
├── README.md                     # Basic documentation
├── WEBSITE_GUIDE.md              # This comprehensive guide
├── SMS_SETUP_GUIDE.md            # SMS configuration guide
├── EMAIL_SETUP_GUIDE.md          # Email configuration guide
└── DEPLOYMENT_STATUS.md          # Deployment information
```

### 🔌 API Endpoints

#### Authentication
- `POST /api/auth/login` - User login
- `POST /api/auth/register` - User registration
- `POST /api/auth/logout` - User logout

#### Products
- `GET /api/products` - List all products
- `GET /api/products/[id]` - Get product details
- `POST /api/products` - Create product (admin)
- `PUT /api/products/[id]` - Update product (admin)
- `DELETE /api/products/[id]` - Delete product (admin)

#### Cart
- `GET /api/cart` - Get user cart
- `POST /api/cart` - Add item to cart
- `PUT /api/cart/[id]` - Update cart item
- `DELETE /api/cart/[id]` - Remove cart item
- `DELETE /api/cart` - Clear cart

#### Orders
- `GET /api/orders` - Get user orders
- `POST /api/orders` - Create new order
- `GET /api/admin/orders` - Get all orders (admin)
- `PUT /api/admin/orders/[id]` - Update order status (admin)

#### Admin
- `GET /api/admin/analytics` - Business analytics
- `GET /api/admin/users` - User management
- `DELETE /api/admin/users/[id]` - Delete user

---

## ⚙️ Configuration

### 🔧 Environment Variables

#### Required Configuration
```env
# JWT Secret (Required)
JWT_SECRET=your-secure-jwt-secret-key-here

# SMS Service Configuration
SMS_SERVICE=local  # Options: local, textlocal, msg91, fast2sms

# Email Configuration (Optional)
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-gmail-app-password
FROM_EMAIL=your-email@gmail.com
```

#### SMS Service Options

##### Local Simulation (Development)
```env
SMS_SERVICE=local
```

##### TextLocal (Indian Service)
```env
SMS_SERVICE=textlocal
TEXTLOCAL_API_KEY=your_api_key_here
TEXTLOCAL_SENDER=HWSHOP
```

##### MSG91 (Indian Service)
```env
SMS_SERVICE=msg91
MSG91_AUTH_KEY=your_auth_key_here
MSG91_SENDER=HWSHOP
MSG91_ROUTE=4
```

##### Fast2SMS (Indian Service)
```env
SMS_SERVICE=fast2sms
FAST2SMS_API_KEY=your_api_key_here
FAST2SMS_SENDER=HWSHOP
```

### 📱 SMS Service Setup

#### 1. TextLocal Setup
1. Visit https://www.textlocal.in/
2. Create account and verify
3. Go to Settings → API Keys
4. Generate new API key
5. Add to `.env.local`

#### 2. MSG91 Setup
1. Visit https://msg91.com/
2. Register and complete verification
3. Navigate to API → Auth Key
4. Copy authentication key
5. Configure in environment

#### 3. Fast2SMS Setup
1. Go to https://www.fast2sms.com/
2. Sign up and verify account
3. Access Developer API section
4. Generate API key
5. Update configuration

### 📧 Email Configuration

#### Gmail SMTP Setup
1. Enable 2-factor authentication
2. Generate app-specific password
3. Use app password in SMTP_PASS
4. Configure SMTP settings

### 🎨 Theme Customization

#### CSS Variables (Light Theme)
```css
:root {
  --bg-color: #ffffff;
  --text-color: #24292f;
  --primary-color: #0969da;
  --success-color: #1a7f37;
  --warning-color: #bf8700;
  --danger-color: #cf222e;
}
```

#### CSS Variables (Dark Theme)
```css
.dark-theme {
  --bg-color: #0d1117;
  --text-color: #f0f6fc;
  --primary-color: #58a6ff;
  --success-color: #3fb950;
  --warning-color: #d29922;
  --danger-color: #f85149;
}
```

---

## 🔍 Troubleshooting

### 🚨 Common Issues

#### 1. **Database Connection Issues**
```bash
# Reset database
npx prisma db push --force-reset
node prisma/seed.js
```

#### 2. **SMS Not Working**
- Check SMS_SERVICE in `.env.local`
- Verify API credentials
- Use `SMS_SERVICE=local` for testing
- Check console for SMS simulation output

#### 3. **Email Not Sending**
- Verify SMTP credentials
- Check Gmail app password
- Ensure 2FA is enabled
- Test with different email provider

#### 4. **Login Issues**
- Clear browser cookies
- Check JWT_SECRET configuration
- Verify user credentials
- Reset password if needed

#### 5. **Theme Not Switching**
- Clear browser cache
- Check localStorage for theme preference
- Verify theme toggle component
- Inspect CSS variables

#### 6. **Cart Not Persisting**
- Check user login status
- Verify localStorage permissions
- Clear browser data
- Check cart context implementation

### 🔧 Debug Commands

#### Database Debugging
```bash
# View database
npx prisma studio

# Reset and reseed
npx prisma db push --force-reset
node prisma/seed.js

# Generate client
npx prisma generate
```

#### Development Debugging
```bash
# Clear Next.js cache
rm -rf .next

# Reinstall dependencies
rm -rf node_modules package-lock.json
npm install

# Check for errors
npm run build
```

### 📊 Performance Optimization

#### 1. **Image Optimization**
- Use Next.js Image component
- Compress product images
- Implement lazy loading
- Use appropriate formats (WebP)

#### 2. **Database Optimization**
- Add database indexes
- Optimize queries
- Implement pagination
- Use database connection pooling

#### 3. **Caching Strategy**
- Implement Redis for sessions
- Cache product data
- Use CDN for static assets
- Enable browser caching

---

## 📞 Support & Contact

### 🏢 Business Information
- **Company**: Hardware Shop
- **Phone**: +91 94898 22432
- **Email**: support@hardwareshop.com
- **Hours**: Monday - Saturday, 9:00 AM - 7:00 PM IST

### 🛠️ Technical Support

#### For Development Issues
1. Check this guide first
2. Review error logs in console
3. Check environment configuration
4. Verify database connection
5. Test with default accounts

#### For Business Support
1. Contact via phone: +91 94898 22432
2. Email: support@hardwareshop.com
3. Use contact form on website
4. Available during business hours

### 📚 Additional Resources

#### Documentation Files
- `README.md` - Basic setup and overview
- `SMS_SETUP_GUIDE.md` - SMS service configuration
- `EMAIL_SETUP_GUIDE.md` - Email setup instructions
- `DEPLOYMENT_STATUS.md` - Deployment information

#### Online Resources
- Next.js Documentation: https://nextjs.org/docs
- Prisma Documentation: https://www.prisma.io/docs
- React Documentation: https://react.dev

---

## 🎯 Best Practices

### 🔒 Security
- Keep JWT_SECRET secure and unique
- Use HTTPS in production
- Validate all user inputs
- Implement rate limiting
- Regular security updates

### 📊 Performance
- Optimize database queries
- Implement proper caching
- Use image optimization
- Monitor application performance
- Regular performance audits

### 🧪 Testing
- Test all user flows
- Verify admin functionality
- Test mobile responsiveness
- Validate email/SMS delivery
- Cross-browser compatibility

### 🚀 Deployment
- Use environment variables
- Implement proper logging
- Set up monitoring
- Configure backups
- Plan for scalability

---

**🛠️ Hardware Shop - Built with modern web technologies for the future of e-commerce**

*This guide covers all aspects of the Hardware Shop platform. For specific technical issues or business inquiries, please contact our support team.*