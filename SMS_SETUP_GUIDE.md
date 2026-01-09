# 📱 SMS Setup Guide - Indian Domestic Services

## 🇮🇳 Indian SMS Services Integration

I've updated the SMS system to support popular **Indian domestic SMS providers** that are cost-effective and reliable for Indian businesses.

## 🚀 Available SMS Services

### **1. 🖥️ Local Simulation (Default - RECOMMENDED for Development)**
- ✅ **Perfect for development and testing**
- ✅ **Works everywhere** (no restrictions)
- ✅ **SMS content logged to console** for verification
- ✅ **No external API dependencies**
- ✅ **No costs or limits**

### **2. 📱 TextLocal (Indian Service)**
- ✅ **Popular Indian SMS provider**
- ✅ **Competitive pricing** (₹0.15-0.25 per SMS)
- ✅ **Good delivery rates in India**
- ✅ **Easy API integration**
- 🌐 Website: https://www.textlocal.in/

### **3. 📲 MSG91 (Indian Service)**
- ✅ **Leading Indian SMS gateway**
- ✅ **Very affordable** (₹0.10-0.20 per SMS)
- ✅ **High delivery success rate**
- ✅ **Supports promotional and transactional SMS**
- 🌐 Website: https://msg91.com/

### **4. ⚡ Fast2SMS (Indian Service)**
- ✅ **Fast delivery and reliable**
- ✅ **Competitive rates** (₹0.12-0.18 per SMS)
- ✅ **Good for bulk SMS**
- ✅ **Easy setup process**
- 🌐 Website: https://www.fast2sms.com/

## ⚙️ Configuration Setup

### **Step 1: Choose Your SMS Service**

Add this to your `.env.local` file:

```env
# Choose one: local, textlocal, msg91, fast2sms
SMS_SERVICE=local
```

### **Step 2: Configure Your Chosen Service**

#### **For TextLocal:**
```env
SMS_SERVICE=textlocal
TEXTLOCAL_API_KEY=your_api_key_here
TEXTLOCAL_SENDER=HWSHOP
```

#### **For MSG91:**
```env
SMS_SERVICE=msg91
MSG91_AUTH_KEY=your_auth_key_here
MSG91_SENDER=HWSHOP
MSG91_ROUTE=4
```

#### **For Fast2SMS:**
```env
SMS_SERVICE=fast2sms
FAST2SMS_API_KEY=your_api_key_here
FAST2SMS_SENDER=HWSHOP
```

## 📋 Service Setup Instructions

### **TextLocal Setup:**
1. Visit https://www.textlocal.in/
2. Sign up for an account
3. Go to Settings → API Keys
4. Generate a new API key
5. Add the API key to your `.env.local`

### **MSG91 Setup:**
1. Visit https://msg91.com/
2. Create an account
3. Go to API → Auth Key
4. Copy your auth key
5. Add the auth key to your `.env.local`

### **Fast2SMS Setup:**
1. Visit https://www.fast2sms.com/
2. Register for an account
3. Go to Developer API
4. Get your API key
5. Add the API key to your `.env.local`

## 💰 Cost Comparison (Approximate)

| Service | Cost per SMS | Minimum Recharge | Best For |
|---------|-------------|------------------|----------|
| **TextLocal** | ₹0.15-0.25 | ₹100 | Small businesses |
| **MSG91** | ₹0.10-0.20 | ₹50 | Startups |
| **Fast2SMS** | ₹0.12-0.18 | ₹100 | Bulk messaging |

## 🧪 Test SMS Functionality

### **Method 1: Local Simulation (Recommended)**
```env
SMS_SERVICE=local
```
- Place an order and check console for SMS content
- Perfect for development and testing

### **Method 2: Test with Real Service**
1. Set up one of the Indian services above
2. Add a small amount to your account (₹50-100)
3. Update `.env.local` with your service and credentials
4. Place a test order with your phone number

## 📱 Indian Phone Number Format

The system automatically handles Indian phone numbers:
- **Input**: `9876543210` or `+919876543210`
- **Processed**: `919876543210` (country code added)
- **Supports**: All major Indian mobile networks

## 🔄 Automatic Fallback System

If your primary SMS service fails, the system automatically falls back to local simulation, ensuring your application never breaks.

## 🌟 Benefits of Indian Domestic Services

1. **Cost Effective**: Much cheaper than international services like Twilio
2. **Better Delivery**: Optimized for Indian mobile networks
3. **Local Support**: Customer support in Indian time zones
4. **Regulatory Compliance**: Follows Indian telecom regulations
5. **Multiple Options**: Choose based on your budget and needs

## 🚀 Production Deployment

For production:
1. Choose a reliable service (MSG91 or TextLocal recommended)
2. Set up proper sender ID registration
3. Add sufficient balance to your account
4. Monitor delivery reports
5. Keep local simulation as fallback

## ✅ Current Status

- 🟢 **SMS Service**: Updated with Indian providers
- 🟢 **Development Ready**: Local simulation works perfectly
- 🟢 **Production Ready**: Multiple Indian services available
- 🟢 **Cost Effective**: Much cheaper than international services
- 🟢 **Auto Fallback**: Never breaks your application

## 🎯 Recommendation

**For Development**: Use `SMS_SERVICE=local` (free, unlimited)
**For Production**: Use `SMS_SERVICE=msg91` (reliable, affordable)

The SMS system now supports Indian domestic services with automatic fallback to ensure reliability!