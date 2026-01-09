"use client";

import { useTheme } from "../../lib/themeContext";

export default function PrivacyPolicyPage() {
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
          Privacy Policy
        </h1>
        
        <p style={{ 
          color: colors.textSecondary, 
          textAlign: "center", 
          marginBottom: "30px" 
        }}>
          Last updated: {new Date().toLocaleDateString('en-IN')}
        </p>

        <div style={{ marginBottom: "25px" }}>
          <h2 style={{ color: colors.text, marginBottom: "15px" }}>1. Information We Collect</h2>
          <p style={{ marginBottom: "10px" }}>We collect information you provide directly to us, such as:</p>
          <ul style={{ paddingLeft: "20px", color: colors.textSecondary }}>
            <li>Personal information (name, email address, phone number)</li>
            <li>Account credentials and preferences</li>
            <li>Order and transaction history</li>
            <li>Communication preferences</li>
            <li>Delivery addresses and contact information</li>
          </ul>
        </div>

        <div style={{ marginBottom: "25px" }}>
          <h2 style={{ color: colors.text, marginBottom: "15px" }}>2. How We Use Your Information</h2>
          <p style={{ marginBottom: "10px" }}>We use the information we collect to:</p>
          <ul style={{ paddingLeft: "20px", color: colors.textSecondary }}>
            <li>Process and fulfill your orders</li>
            <li>Send order confirmations and shipping updates</li>
            <li>Provide customer support and respond to inquiries</li>
            <li>Improve our products and services</li>
            <li>Send promotional communications (with your consent)</li>
            <li>Comply with legal obligations</li>
          </ul>
        </div>

        <div style={{ marginBottom: "25px" }}>
          <h2 style={{ color: colors.text, marginBottom: "15px" }}>3. Information Sharing</h2>
          <p style={{ color: colors.textSecondary }}>
            We do not sell, trade, or otherwise transfer your personal information to third parties without your consent, except as described in this policy. We may share information with:
          </p>
          <ul style={{ paddingLeft: "20px", color: colors.textSecondary, marginTop: "10px" }}>
            <li>Service providers who assist in our operations</li>
            <li>Payment processors for transaction processing</li>
            <li>Shipping companies for order delivery</li>
            <li>Legal authorities when required by law</li>
          </ul>
        </div>

        <div style={{ marginBottom: "25px" }}>
          <h2 style={{ color: colors.text, marginBottom: "15px" }}>4. Data Security</h2>
          <p style={{ color: colors.textSecondary }}>
            We implement appropriate security measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction. This includes encryption of sensitive data and secure storage practices.
          </p>
        </div>

        <div style={{ marginBottom: "25px" }}>
          <h2 style={{ color: colors.text, marginBottom: "15px" }}>5. Cookies and Tracking</h2>
          <p style={{ color: colors.textSecondary }}>
            We use cookies and similar technologies to enhance your browsing experience, analyze site traffic, and personalize content. You can control cookie preferences through your browser settings.
          </p>
        </div>

        <div style={{ marginBottom: "25px" }}>
          <h2 style={{ color: colors.text, marginBottom: "15px" }}>6. Your Rights</h2>
          <p style={{ marginBottom: "10px" }}>You have the right to:</p>
          <ul style={{ paddingLeft: "20px", color: colors.textSecondary }}>
            <li>Access and update your personal information</li>
            <li>Request deletion of your data</li>
            <li>Opt-out of marketing communications</li>
            <li>Request data portability</li>
            <li>Lodge complaints with regulatory authorities</li>
          </ul>
        </div>

        <div style={{ marginBottom: "25px" }}>
          <h2 style={{ color: colors.text, marginBottom: "15px" }}>7. Data Retention</h2>
          <p style={{ color: colors.textSecondary }}>
            We retain your personal information for as long as necessary to fulfill the purposes outlined in this policy, comply with legal obligations, resolve disputes, and enforce our agreements.
          </p>
        </div>

        <div style={{ marginBottom: "25px" }}>
          <h2 style={{ color: colors.text, marginBottom: "15px" }}>8. Contact Information</h2>
          <p style={{ color: colors.textSecondary, marginBottom: "10px" }}>
            If you have questions about this Privacy Policy, please contact us:
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
            This Privacy Policy is effective as of the date stated above and will remain in effect except with respect to any changes in its provisions in the future, which will be in effect immediately after being posted on this page.
          </p>
        </div>
      </div>
    </main>
  );
}