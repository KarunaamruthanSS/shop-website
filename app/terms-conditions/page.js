"use client";

import { useTheme } from "../../lib/themeContext";

export default function TermsConditionsPage() {
  const { colors } = useTheme();

  return (
    <main style={{ 
      padding: "20px", 
      maxWidth: "800px", 
      margin: "0 auto",
      backgroundColor: colors.background,
      color: colors.text,
      lineHeight: "1.6"
    }}>
      <div style={{
        backgroundColor: colors.surface,
        padding: "30px",
        borderRadius: "8px",
        border: `1px solid ${colors.border}`,
        boxShadow: `0 2px 8px ${colors.shadow}`
      }}>
        <h1 style={{ 
          color: colors.primary, 
          marginBottom: "20px",
          fontSize: "2rem",
          textAlign: "center"
        }}>
          Terms & Conditions
        </h1>
        
        <p style={{ 
          color: colors.textSecondary, 
          textAlign: "center", 
          marginBottom: "30px" 
        }}>
          Last updated: {new Date().toLocaleDateString('en-IN')}
        </p>

        <div style={{ marginBottom: "25px" }}>
          <h2 style={{ color: colors.text, marginBottom: "15px" }}>1. Acceptance of Terms</h2>
          <p style={{ color: colors.textSecondary }}>
            By accessing and using Hardware Shop's website and services, you accept and agree to be bound by the terms and provision of this agreement. If you do not agree to abide by the above, please do not use this service.
          </p>
        </div>

        <div style={{ marginBottom: "25px" }}>
          <h2 style={{ color: colors.text, marginBottom: "15px" }}>2. Products and Services</h2>
          <ul style={{ paddingLeft: "20px", color: colors.textSecondary }}>
            <li>We sell hardware products and related accessories</li>
            <li>Product descriptions and prices are subject to change without notice</li>
            <li>We reserve the right to limit quantities and discontinue products</li>
            <li>All products are subject to availability</li>
            <li>Product images are for illustration purposes and may vary from actual products</li>
          </ul>
        </div>

        <div style={{ marginBottom: "25px" }}>
          <h2 style={{ color: colors.text, marginBottom: "15px" }}>3. Account Registration</h2>
          <ul style={{ paddingLeft: "20px", color: colors.textSecondary }}>
            <li>You must provide accurate and complete information during registration</li>
            <li>You are responsible for maintaining the confidentiality of your account</li>
            <li>You must notify us immediately of any unauthorized use of your account</li>
            <li>We reserve the right to suspend or terminate accounts that violate our terms</li>
          </ul>
        </div>

        <div style={{ marginBottom: "25px" }}>
          <h2 style={{ color: colors.text, marginBottom: "15px" }}>4. Orders and Payment</h2>
          <ul style={{ paddingLeft: "20px", color: colors.textSecondary }}>
            <li>All orders are subject to acceptance and availability</li>
            <li>We reserve the right to refuse or cancel any order</li>
            <li>Payment must be made in full before order processing</li>
            <li>We accept various payment methods as displayed during checkout</li>
            <li>Prices include applicable taxes unless otherwise stated</li>
          </ul>
        </div>

        <div style={{ marginBottom: "25px" }}>
          <h2 style={{ color: colors.text, marginBottom: "15px" }}>5. Shipping and Delivery</h2>
          <ul style={{ paddingLeft: "20px", color: colors.textSecondary }}>
            <li>Delivery times are estimates and not guaranteed</li>
            <li>Risk of loss passes to you upon delivery</li>
            <li>You must inspect products upon delivery and report any issues immediately</li>
            <li>Shipping costs are calculated based on location and product weight</li>
            <li>We are not responsible for delays caused by shipping carriers</li>
          </ul>
        </div>

        <div style={{ marginBottom: "25px" }}>
          <h2 style={{ color: colors.text, marginBottom: "15px" }}>6. Returns and Refunds</h2>
          <ul style={{ paddingLeft: "20px", color: colors.textSecondary }}>
            <li>Returns must be initiated within 7 days of delivery</li>
            <li>Products must be in original condition with all packaging</li>
            <li>Custom or personalized items are not eligible for return</li>
            <li>Refunds will be processed within 5-7 business days</li>
            <li>Return shipping costs may apply unless the item is defective</li>
          </ul>
        </div>

        <div style={{ marginBottom: "25px" }}>
          <h2 style={{ color: colors.text, marginBottom: "15px" }}>7. Warranty and Liability</h2>
          <ul style={{ paddingLeft: "20px", color: colors.textSecondary }}>
            <li>Products come with manufacturer warranties where applicable</li>
            <li>We are not liable for indirect, incidental, or consequential damages</li>
            <li>Our liability is limited to the purchase price of the product</li>
            <li>Warranty claims must be processed through the manufacturer</li>
          </ul>
        </div>

        <div style={{ marginBottom: "25px" }}>
          <h2 style={{ color: colors.text, marginBottom: "15px" }}>8. Intellectual Property</h2>
          <p style={{ color: colors.textSecondary }}>
            All content on this website, including text, graphics, logos, and images, is the property of Hardware Shop and is protected by copyright and other intellectual property laws. You may not reproduce, distribute, or create derivative works without our written permission.
          </p>
        </div>

        <div style={{ marginBottom: "25px" }}>
          <h2 style={{ color: colors.text, marginBottom: "15px" }}>9. Prohibited Uses</h2>
          <p style={{ marginBottom: "10px" }}>You may not use our service:</p>
          <ul style={{ paddingLeft: "20px", color: colors.textSecondary }}>
            <li>For any unlawful purpose or to solicit others to perform unlawful acts</li>
            <li>To violate any international, federal, provincial, or state regulations, rules, laws, or local ordinances</li>
            <li>To infringe upon or violate our intellectual property rights or the intellectual property rights of others</li>
            <li>To harass, abuse, insult, harm, defame, slander, disparage, intimidate, or discriminate</li>
            <li>To submit false or misleading information</li>
          </ul>
        </div>

        <div style={{ marginBottom: "25px" }}>
          <h2 style={{ color: colors.text, marginBottom: "15px" }}>10. Governing Law</h2>
          <p style={{ color: colors.textSecondary }}>
            These terms and conditions are governed by and construed in accordance with the laws of India. Any disputes arising under these terms shall be subject to the exclusive jurisdiction of the courts of India.
          </p>
        </div>

        <div style={{ marginBottom: "25px" }}>
          <h2 style={{ color: colors.text, marginBottom: "15px" }}>11. Contact Information</h2>
          <p style={{ color: colors.textSecondary, marginBottom: "10px" }}>
            For questions about these Terms & Conditions, please contact us:
          </p>
          <div style={{ 
            backgroundColor: colors.background,
            padding: "15px",
            borderRadius: "6px",
            border: `1px solid ${colors.border}`
          }}>
            <p style={{ margin: "5px 0", color: colors.text }}>
              <strong>Hardware Shop</strong>
            </p>
            <p style={{ margin: "5px 0", color: colors.textSecondary }}>
              📧 Email: support@hardwareshop.com
            </p>
            <p style={{ margin: "5px 0", color: colors.textSecondary }}>
              📱 Phone: +91 94898 22432
            </p>
          </div>
        </div>

        <div style={{ 
          backgroundColor: colors.background,
          padding: "20px",
          borderRadius: "6px",
          border: `1px solid ${colors.border}`,
          textAlign: "center"
        }}>
          <p style={{ 
            color: colors.textSecondary, 
            fontSize: "14px",
            margin: 0
          }}>
            We reserve the right to update these terms at any time without prior notice. Your continued use of the service after any such changes constitutes your acceptance of the new terms.
          </p>
        </div>
      </div>
    </main>
  );
}