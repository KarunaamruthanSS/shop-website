import twilio from 'twilio'

// Indian Domestic SMS Services Configuration
function getIndianSMSConfig() {
  const service = process.env.SMS_SERVICE || 'local'
  
  const configs = {
    textlocal: {
      apiKey: process.env.TEXTLOCAL_API_KEY,
      sender: process.env.TEXTLOCAL_SENDER || 'HWSHOP',
      url: 'https://api.textlocal.in/send/'
    },
    msg91: {
      authKey: process.env.MSG91_AUTH_KEY,
      sender: process.env.MSG91_SENDER || 'HWSHOP',
      route: process.env.MSG91_ROUTE || '4',
      url: 'https://api.msg91.com/api/sendhttp.php'
    },
    fast2sms: {
      apiKey: process.env.FAST2SMS_API_KEY,
      sender: process.env.FAST2SMS_SENDER || 'HWSHOP',
      url: 'https://www.fast2sms.com/dev/bulkV2'
    },
    smsgateway: {
      username: process.env.SMSGATEWAY_USERNAME,
      password: process.env.SMSGATEWAY_PASSWORD,
      sender: process.env.SMSGATEWAY_SENDER || 'HWSHOP',
      url: 'https://smsgateway.center/SMSApi/rest/send'
    }
  }
  
  return configs[service] || null
}

function formatOrderSMS(order, items, user) {
  const itemsList = items
    .map(item => `• ${item.productName} (${item.quantity}x) - ₹${(item.price * item.quantity).toFixed(2)}`)
    .join('\n')

  return `🛒 Hardware Shop - Order Confirmation

Hi ${user?.name || 'Customer'}!

Order #${order.id}
Status: ${order.status}
Date: ${new Date(order.createdAt).toLocaleDateString('en-IN')}

Items:
${itemsList}

Total: ₹${Number(order.total).toFixed(2)}

We'll process your order within 1-2 business days and send shipping updates.

Thank you for shopping with us!

Questions? Reply to this message.`
}

// Format Indian phone number
function formatIndianPhoneNumber(phoneNumber) {
  // Remove all non-digits
  let cleaned = phoneNumber.replace(/\D/g, '')
  
  // Handle different Indian number formats
  if (cleaned.length === 10) {
    // Standard 10-digit Indian number
    return '91' + cleaned
  } else if (cleaned.length === 12 && cleaned.startsWith('91')) {
    // Already has country code
    return cleaned
  } else if (cleaned.length === 13 && cleaned.startsWith('91')) {
    // Has country code with extra digit
    return cleaned.substring(0, 12)
  }
  
  // Default: assume it's a 10-digit number and add country code
  return '91' + cleaned.substring(-10)
}

// TextLocal SMS Service (Popular in India)
export async function sendSMSViaTextLocal(phoneNumber, message) {
  try {
    const config = getIndianSMSConfig()
    if (!config || !config.apiKey) {
      throw new Error('TextLocal configuration missing')
    }

    const formattedPhone = formatIndianPhoneNumber(phoneNumber)
    
    const params = new URLSearchParams({
      apikey: config.apiKey,
      numbers: formattedPhone,
      message: message,
      sender: config.sender
    })

    const response = await fetch(config.url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      body: params
    })

    const result = await response.json()
    
    if (result.status === 'success') {
      console.log('SMS sent successfully via TextLocal:', result)
      return { success: true, service: 'TextLocal', messageId: result.messages[0]?.id }
    } else {
      throw new Error(result.errors?.[0]?.message || 'TextLocal SMS failed')
    }
  } catch (error) {
    console.error('TextLocal SMS error:', error)
    throw error
  }
}

// MSG91 SMS Service (Popular in India)
export async function sendSMSViaMSG91(phoneNumber, message) {
  try {
    const config = getIndianSMSConfig()
    if (!config || !config.authKey) {
      throw new Error('MSG91 configuration missing')
    }

    const formattedPhone = formatIndianPhoneNumber(phoneNumber)
    
    const params = new URLSearchParams({
      authkey: config.authKey,
      mobiles: formattedPhone,
      message: message,
      sender: config.sender,
      route: config.route,
      country: '91'
    })

    const response = await fetch(`${config.url}?${params}`, {
      method: 'GET'
    })

    const result = await response.text()
    
    if (result.includes('success') || result.includes('Message Sent')) {
      console.log('SMS sent successfully via MSG91:', result)
      return { success: true, service: 'MSG91', response: result }
    } else {
      throw new Error(`MSG91 SMS failed: ${result}`)
    }
  } catch (error) {
    console.error('MSG91 SMS error:', error)
    throw error
  }
}

// Fast2SMS Service (Popular in India)
export async function sendSMSViaFast2SMS(phoneNumber, message) {
  try {
    const config = getIndianSMSConfig()
    if (!config || !config.apiKey) {
      throw new Error('Fast2SMS configuration missing')
    }

    const formattedPhone = formatIndianPhoneNumber(phoneNumber)
    
    const payload = {
      route: 'q',
      message: message,
      language: 'english',
      flash: 0,
      numbers: formattedPhone
    }

    const response = await fetch(config.url, {
      method: 'POST',
      headers: {
        'Authorization': config.apiKey,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(payload)
    })

    const result = await response.json()
    
    if (result.return === true) {
      console.log('SMS sent successfully via Fast2SMS:', result)
      return { success: true, service: 'Fast2SMS', messageId: result.request_id }
    } else {
      throw new Error(result.message || 'Fast2SMS failed')
    }
  } catch (error) {
    console.error('Fast2SMS error:', error)
    throw error
  }
}

// Main SMS function with Indian service fallback
export async function sendOrderSMSIndia(phoneNumber, order, items = [], user = {}) {
  const message = formatOrderSMS(order, items, user)
  const smsService = process.env.SMS_SERVICE || 'local'
  
  console.log(`Sending SMS via ${smsService} to:`, phoneNumber)
  
  try {
    switch (smsService) {
      case 'textlocal':
        return await sendSMSViaTextLocal(phoneNumber, message)
      
      case 'msg91':
        return await sendSMSViaMSG91(phoneNumber, message)
      
      case 'fast2sms':
        return await sendSMSViaFast2SMS(phoneNumber, message)
      
      case 'local':
      default:
        return await sendOrderSMSLocal(phoneNumber, order, items, user)
    }
  } catch (error) {
    console.error(`Primary SMS service (${smsService}) failed:`, error.message)
    
    // Fallback to local simulation if primary service fails
    console.log('Falling back to local SMS simulation...')
    return await sendOrderSMSLocal(phoneNumber, order, items, user)
  }
}

// Local SMS simulation for development (logs to console)
export async function sendOrderSMSLocal(phoneNumber, order, items = [], user = {}) {
  try {
    console.log('📱 SMS SIMULATION - Local Development Mode')
    console.log('=' .repeat(50))
    console.log('To:', phoneNumber)
    console.log('From: Hardware Shop')
    console.log('Message:')
    console.log('-'.repeat(30))
    
    const messageBody = formatOrderSMS(order, items, user)
    console.log(messageBody)
    
    console.log('-'.repeat(30))
    console.log('✅ SMS would be sent in production')
    console.log('=' .repeat(50))
    
    return { 
      success: true, 
      service: 'local-simulation',
      messageId: 'SIM-' + Date.now(),
      to: phoneNumber,
      message: messageBody
    }

  } catch (error) {
    console.error('SMS simulation failed:', error)
    throw error
  }
}

// Export the main function for Indian SMS services
export default sendOrderSMSIndia