"use client";

import Link from "next/link";
import { useTheme } from "../lib/themeContext";
import { useTranslation } from "../lib/translationContext";

export default function Footer() {
  const { colors } = useTheme();
  const { t } = useTranslation();

  return (
    <footer style={{
      backgroundColor: colors.surface,
      borderTop: `1px solid ${colors.border}`,
      marginTop: "50px",
      padding: "40px 20px 20px",
      color: colors.text
    }}>
      <div style={{
        maxWidth: "1200px",
        margin: "0 auto"
      }}>
        {/* Main Footer Content */}
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
          gap: "30px",
          marginBottom: "30px"
        }}>
          {/* Company Info */}
          <div>
            <h3 style={{ 
              color: colors.primary, 
              marginBottom: "15px",
              fontSize: "18px"
            }}>
              Hardware Shop 🛠️
            </h3>
            <p style={{ 
              color: colors.textSecondary, 
              lineHeight: "1.6",
              marginBottom: "15px"
            }}>
              Your trusted partner for quality hardware products and tools. We provide premium products at competitive prices with fast delivery across India.
            </p>
            <div style={{ marginBottom: "10px" }}>
              <span style={{ color: colors.text, fontWeight: "500" }}>📱 Phone: </span>
              <span style={{ color: colors.textSecondary }}>+91 94898 22432</span>
            </div>
            <div>
              <span style={{ color: colors.text, fontWeight: "500" }}>📧 Email: </span>
              <span style={{ color: colors.textSecondary }}>karunaamruthanss@gmail.com</span>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 style={{ 
              color: colors.primary, 
              marginBottom: "15px",
              fontSize: "18px"
            }}>
              Quick Links
            </h3>
            <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
              <Link href="/products" style={{ 
                color: colors.textSecondary, 
                textDecoration: "none",
                transition: "color 0.3s ease"
              }}>
                🛍️ Shop Products
              </Link>
              <Link href="/about-us" style={{ 
                color: colors.textSecondary, 
                textDecoration: "none",
                transition: "color 0.3s ease"
              }}>
                ℹ️ About Us
              </Link>
              <Link href="/contact-us" style={{ 
                color: colors.textSecondary, 
                textDecoration: "none",
                transition: "color 0.3s ease"
              }}>
                📞 Contact Us
              </Link>
              <Link href="/cart" style={{ 
                color: colors.textSecondary, 
                textDecoration: "none",
                transition: "color 0.3s ease"
              }}>
                🛒 Shopping Cart
              </Link>
            </div>
          </div>

          {/* Customer Service */}
          <div>
            <h3 style={{ 
              color: colors.primary, 
              marginBottom: "15px",
              fontSize: "18px"
            }}>
              Customer Service
            </h3>
            <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
              <span style={{ color: colors.textSecondary }}>
                🕒 Mon - Sat: 9:00 AM - 7:00 PM
              </span>
              <span style={{ color: colors.textSecondary }}>
                🌐 Online Support: 24/7
              </span>
              <span style={{ color: colors.textSecondary }}>
                🚚 Free Shipping on orders above ₹500
              </span>
              <span style={{ color: colors.textSecondary }}>
                🔄 7-day Return Policy
              </span>
              <span style={{ color: colors.textSecondary }}>
                ✅ Authentic Products Only
              </span>
            </div>
          </div>

          {/* Categories */}
          <div>
            <h3 style={{ 
              color: colors.primary, 
              marginBottom: "15px",
              fontSize: "18px"
            }}>
              Product Categories
            </h3>
            <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
              <span style={{ color: colors.textSecondary }}>🔨 Hand Tools</span>
              <span style={{ color: colors.textSecondary }}>⚡ Power Tools</span>
              <span style={{ color: colors.textSecondary }}>🔩 Hardware & Fasteners</span>
              <span style={{ color: colors.textSecondary }}>🚿 Plumbing Supplies</span>
              <span style={{ color: colors.textSecondary }}>💡 Electrical Components</span>
              <span style={{ color: colors.textSecondary }}>🎨 Paint & Finishing</span>
            </div>
          </div>
        </div>

        {/* Legal Links */}
        <div style={{
          borderTop: `1px solid ${colors.border}`,
          paddingTop: "20px",
          marginBottom: "20px"
        }}>
          <div style={{
            display: "flex",
            justifyContent: "center",
            gap: "30px",
            flexWrap: "wrap",
            marginBottom: "15px"
          }}>
            <Link href="/privacy-policy" style={{ 
              color: colors.textSecondary, 
              textDecoration: "none",
              fontSize: "14px",
              transition: "color 0.3s ease"
            }}>
              🔒 Privacy Policy
            </Link>
            <Link href="/terms-conditions" style={{ 
              color: colors.textSecondary, 
              textDecoration: "none",
              fontSize: "14px",
              transition: "color 0.3s ease"
            }}>
              📋 Terms & Conditions
            </Link>
            <Link href="/contact-us" style={{ 
              color: colors.textSecondary, 
              textDecoration: "none",
              fontSize: "14px",
              transition: "color 0.3s ease"
            }}>
              📞 Support
            </Link>
          </div>
        </div>

        {/* Copyright */}
        <div style={{
          textAlign: "center",
          paddingTop: "15px",
          borderTop: `1px solid ${colors.border}`
        }}>
          <p style={{ 
            color: colors.textMuted, 
            fontSize: "14px",
            margin: 0
          }}>
            © {new Date().getFullYear()} Sathya Hardwares. All rights reserved. | Made with ❤️ in India
          </p>
        </div>
      </div>

      <style jsx>{`
        footer a:hover {
          color: ${colors.primary} !important;
        }

        @media (max-width: 768px) {
          footer > div > div:first-child {
            grid-template-columns: 1fr !important;
            gap: 20px !important;
          }
          
          footer > div > div:nth-child(2) > div {
            gap: 15px !important;
            flex-direction: column !important;
          }
        }
      `}</style>
    </footer>
  );
}