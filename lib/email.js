import nodemailer from 'nodemailer'

function getTransporter() {
  const host = process.env.SMTP_HOST
  const port = process.env.SMTP_PORT ? parseInt(process.env.SMTP_PORT, 10) : 587
  const user = process.env.SMTP_USER
  const pass = process.env.SMTP_PASS

  if (!host || !user || !pass) {
    throw new Error('SMTP configuration missing. Please set SMTP_HOST, SMTP_USER and SMTP_PASS in .env.local')
  }

  console.log('Email config:', { host, port, user: user.substring(0, 5) + '***' })

  return nodemailer.createTransport({
    host,
    port,
    secure: port === 465, // true for 465 (SSL), false for 587 (TLS)
    auth: { 
      user, 
      pass 
    },
    tls: {
      rejectUnauthorized: false // For development only
    }
  })
}

function buildOrderHtml(order, items, user) {
  const rows = items
    .map(i => `
      <tr>
        <td style="padding:8px;border:1px solid #ddd">${i.productName}</td>
        <td style="padding:8px;border:1px solid #ddd;text-align:center">${i.quantity}</td>
        <td style="padding:8px;border:1px solid #ddd;text-align:right">$${Number(i.price).toFixed(2)}</td>
        <td style="padding:8px;border:1px solid #ddd;text-align:right">$${(i.price * i.quantity).toFixed(2)}</td>
      </tr>
    `)
    .join('')

  return `
    <div style="font-family:Arial,Helvetica,sans-serif;color:#111;max-width:600px;margin:0 auto;">
      <div style="background:#f8f9fa;padding:20px;text-align:center;border-radius:8px 8px 0 0;">
        <h1 style="color:#007bff;margin:0;">Hardware Shop</h1>
        <h2 style="color:#333;margin:10px 0 0 0;">Order Confirmation</h2>
      </div>
      
      <div style="padding:20px;border:1px solid #ddd;border-top:none;border-radius:0 0 8px 8px;">
        <p style="font-size:16px;margin-bottom:20px;">
          Dear ${user?.name || 'Customer'},<br>
          Thank you for your order! We've received your payment and are preparing your items for shipment.
        </p>
        
        <div style="background:#f8f9fa;padding:15px;border-radius:6px;margin-bottom:20px;">
          <h3 style="margin:0 0 10px 0;color:#333;">Order Details</h3>
          <p style="margin:5px 0;"><strong>Order ID:</strong> ${order.id}</p>
          <p style="margin:5px 0;"><strong>Order Date:</strong> ${new Date(order.createdAt).toLocaleDateString()}</p>
          <p style="margin:5px 0;"><strong>Status:</strong> ${order.status}</p>
        </div>

        <h3 style="color:#333;margin-bottom:15px;">Items Ordered</h3>
        <table style="border-collapse:collapse;width:100%;margin-bottom:20px;">
          <thead>
            <tr style="background:#f8f9fa;">
              <th style="padding:12px 8px;border:1px solid #ddd;text-align:left;">Product</th>
              <th style="padding:12px 8px;border:1px solid #ddd;text-align:center;">Qty</th>
              <th style="padding:12px 8px;border:1px solid #ddd;text-align:right;">Unit Price</th>
              <th style="padding:12px 8px;border:1px solid #ddd;text-align:right;">Subtotal</th>
            </tr>
          </thead>
          <tbody>
            ${rows}
          </tbody>
          <tfoot>
            <tr style="background:#f8f9fa;">
              <td colspan="3" style="padding:12px 8px;border:1px solid #ddd;text-align:right;font-weight:bold;">Total Amount</td>
              <td style="padding:12px 8px;border:1px solid #ddd;text-align:right;font-weight:bold;color:#007bff;">$${Number(order.total).toFixed(2)}</td>
            </tr>
          </tfoot>
        </table>

        <div style="background:#e7f3ff;padding:15px;border-radius:6px;margin-bottom:20px;">
          <h4 style="margin:0 0 10px 0;color:#0056b3;">What's Next?</h4>
          <ul style="margin:0;padding-left:20px;">
            <li>We'll process your order within 1-2 business days</li>
            <li>You'll receive a shipping confirmation with tracking details</li>
            <li>Estimated delivery: 3-5 business days</li>
          </ul>
        </div>

        <p style="margin-top:20px;color:#666;font-size:14px;">
          If you have any questions about your order, please reply to this email or contact our support team.
        </p>
        
        <div style="text-align:center;margin-top:30px;padding-top:20px;border-top:1px solid #eee;">
          <p style="color:#666;font-size:12px;margin:0;">
            Thank you for shopping with Hardware Shop!<br>
            This is an automated email, please do not reply directly.
          </p>
        </div>
      </div>
    </div>
  `
}

export async function sendOrderEmail(to, order, items = [], user = {}) {
  try {
    console.log('Attempting to send email to:', to)
    
    const transporter = getTransporter()
    const from = process.env.FROM_EMAIL || process.env.SMTP_USER

    // Test the connection first
    await transporter.verify()
    console.log('SMTP connection verified successfully')

    const html = buildOrderHtml(order, items, user)

    const mailOptions = {
      from: `"Hardware Shop" <${from}>`,
      to,
      subject: `Order Confirmation #${order.id} - Hardware Shop`,
      html,
      text: `Thank you for your order #${order.id}! Total: $${Number(order.total).toFixed(2)}. We'll send you shipping details soon.`
    }

    const result = await transporter.sendMail(mailOptions)
    console.log('Email sent successfully:', result.messageId)
    return result

  } catch (error) {
    console.error('Email sending failed:', error)
    throw error
  }
}

export default sendOrderEmail