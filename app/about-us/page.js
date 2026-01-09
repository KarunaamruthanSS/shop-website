"use client";

import { useTheme } from "../../lib/themeContext";

export default function AboutUsPage() {
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
          About Hardware Shop 🛠️
        </h1>

        <div style={{ 
          textAlign: "center", 
          marginBottom: "30px",
          padding: "20px",
          backgroundColor: colors.background,
          borderRadius: "8px",
          border: `1px solid ${colors.border}`
        }}>
          <h2 style={{ color: colors.text, marginBottom: "15px" }}>Your Trusted Hardware Partner</h2>
          <p style={{ 
            color: colors.textSecondary, 
            fontSize: "18px",
            fontStyle: "italic"
          }}>
            "Quality tools for every project, delivered with excellence since our inception."
          </p>
        </div>

        <div style={{ marginBottom: "25px" }}>
          <h2 style={{ color: colors.text, marginBottom: "15px" }}>🏢 Our Story</h2>
          <p style={{ color: colors.textSecondary, marginBottom: "15px" }}>
            Hardware Shop was founded with a simple mission: to provide high-quality hardware products and tools to professionals, contractors, and DIY enthusiasts across India. What started as a small local business has grown into a trusted online destination for all your hardware needs.
          </p>
          <p style={{ color: colors.textSecondary }}>
            We understand that the right tools make all the difference in any project, whether you're building a home, fixing a leak, or creating something entirely new. That's why we carefully curate our inventory to include only the best products from trusted manufacturers.
          </p>
        </div>

        <div style={{ marginBottom: "25px" }}>
          <h2 style={{ color: colors.text, marginBottom: "15px" }}>🎯 Our Mission</h2>
          <div style={{ 
            backgroundColor: colors.background,
            padding: "20px",
            borderRadius: "6px",
            border: `1px solid ${colors.border}`
          }}>
            <p style={{ color: colors.textSecondary, margin: 0 }}>
              To empower builders, creators, and fixers with access to premium hardware products at competitive prices, backed by exceptional customer service and fast, reliable delivery across India.
            </p>
          </div>
        </div>

        <div style={{ marginBottom: "25px" }}>
          <h2 style={{ color: colors.text, marginBottom: "15px" }}>⭐ Why Choose Us?</h2>
          <div style={{ display: "grid", gap: "15px" }}>
            <div style={{ 
              backgroundColor: colors.background,
              padding: "15px",
              borderRadius: "6px",
              border: `1px solid ${colors.border}`
            }}>
              <h3 style={{ color: colors.primary, margin: "0 0 10px 0" }}>🔧 Quality Products</h3>
              <p style={{ color: colors.textSecondary, margin: 0 }}>
                We source our products from reputable manufacturers and conduct quality checks to ensure you receive only the best tools and hardware.
              </p>
            </div>

            <div style={{ 
              backgroundColor: colors.background,
              padding: "15px",
              borderRadius: "6px",
              border: `1px solid ${colors.border}`
            }}>
              <h3 style={{ color: colors.primary, margin: "0 0 10px 0" }}>🚚 Fast Delivery</h3>
              <p style={{ color: colors.textSecondary, margin: 0 }}>
                Quick and reliable shipping across India with real-time tracking and secure packaging to protect your orders.
              </p>
            </div>

            <div style={{ 
              backgroundColor: colors.background,
              padding: "15px",
              borderRadius: "6px",
              border: `1px solid ${colors.border}`
            }}>
              <h3 style={{ color: colors.primary, margin: "0 0 10px 0" }}>💰 Competitive Pricing</h3>
              <p style={{ color: colors.textSecondary, margin: 0 }}>
                We offer competitive prices without compromising on quality, helping you get the best value for your investment.
              </p>
            </div>

            <div style={{ 
              backgroundColor: colors.background,
              padding: "15px",
              borderRadius: "6px",
              border: `1px solid ${colors.border}`
            }}>
              <h3 style={{ color: colors.primary, margin: "0 0 10px 0" }}>🎧 Expert Support</h3>
              <p style={{ color: colors.textSecondary, margin: 0 }}>
                Our knowledgeable customer service team is here to help you find the right products and answer any questions you may have.
              </p>
            </div>
          </div>
        </div>

        <div style={{ marginBottom: "25px" }}>
          <h2 style={{ color: colors.text, marginBottom: "15px" }}>🛍️ Product Categories</h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "10px" }}>
            {[
              "🔨 Hand Tools",
              "⚡ Power Tools", 
              "🔩 Fasteners & Hardware",
              "🚿 Plumbing Supplies",
              "💡 Electrical Components",
              "🎨 Paint & Finishing",
              "🔧 Automotive Tools",
              "🏠 Home Improvement"
            ].map((category, index) => (
              <div key={index} style={{
                padding: "10px",
                backgroundColor: colors.background,
                borderRadius: "4px",
                border: `1px solid ${colors.border}`,
                textAlign: "center",
                color: colors.textSecondary
              }}>
                {category}
              </div>
            ))}
          </div>
        </div>

        <div style={{ marginBottom: "25px" }}>
          <h2 style={{ color: colors.text, marginBottom: "15px" }}>🌟 Our Commitment</h2>
          <ul style={{ paddingLeft: "20px", color: colors.textSecondary }}>
            <li>Authentic products with manufacturer warranties</li>
            <li>Secure online shopping with multiple payment options</li>
            <li>Hassle-free returns and exchanges</li>
            <li>Regular promotions and special offers</li>
            <li>Continuous improvement based on customer feedback</li>
            <li>Environmental responsibility in packaging and operations</li>
          </ul>
        </div>

        <div style={{ marginBottom: "25px" }}>
          <h2 style={{ color: colors.text, marginBottom: "15px" }}>📞 Get in Touch</h2>
          <p style={{ color: colors.textSecondary, marginBottom: "15px" }}>
            We'd love to hear from you! Whether you have questions about our products, need help with an order, or want to provide feedback, our team is here to help.
          </p>
          <div style={{ 
            backgroundColor: colors.background,
            padding: "20px",
            borderRadius: "6px",
            border: `1px solid ${colors.border}`,
            display: "grid",
            gap: "10px"
          }}>
            <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
              <span style={{ fontSize: "20px" }}>📧</span>
              <span style={{ color: colors.text }}>support@hardwareshop.com</span>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
              <span style={{ fontSize: "20px" }}>📱</span>
              <span style={{ color: colors.text }}>+91 94898 22432</span>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
              <span style={{ fontSize: "20px" }}>🕒</span>
              <span style={{ color: colors.textSecondary }}>Monday - Saturday: 9:00 AM - 7:00 PM IST</span>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
              <span style={{ fontSize: "20px" }}>🌐</span>
              <span style={{ color: colors.textSecondary }}>Available online 24/7</span>
            </div>
          </div>
        </div>

        <div style={{ 
          backgroundColor: colors.background,
          padding: "20px",
          borderRadius: "6px",
          border: `1px solid ${colors.border}`,
          textAlign: "center"
        }}>
          <h3 style={{ color: colors.primary, marginBottom: "10px" }}>Thank You for Choosing Hardware Shop!</h3>
          <p style={{ 
            color: colors.textSecondary, 
            fontSize: "14px",
            margin: 0
          }}>
            Your trust in us drives our commitment to excellence. We look forward to serving you and helping bring your projects to life.
          </p>
        </div>
      </div>
    </main>
  );
}