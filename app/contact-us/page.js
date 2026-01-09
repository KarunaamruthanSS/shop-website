"use client";

import { useState } from "react";
import { useTheme } from "../../lib/themeContext";
import { useToast } from "../../lib/toastContext";

export default function ContactUsPage() {
  const { colors } = useTheme();
  const { showSuccess, showError } = useToast();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Simulate form submission (you can integrate with your backend)
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      showSuccess('Thank you for your message! We will get back to you within 24 hours.');
      setFormData({
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: ''
      });
    } catch (error) {
      showError('Failed to send message. Please try again or contact us directly.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main style={{ 
      padding: "20px", 
      maxWidth: "1000px", 
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
          Contact Us 📞
        </h1>
        
        <p style={{ 
          color: colors.textSecondary, 
          textAlign: "center", 
          marginBottom: "30px",
          fontSize: "18px"
        }}>
          We're here to help! Get in touch with us for any questions, support, or feedback.
        </p>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "30px", marginBottom: "30px" }}>
          {/* Contact Information */}
          <div>
            <h2 style={{ color: colors.text, marginBottom: "20px" }}>📍 Get in Touch</h2>
            
            <div style={{ marginBottom: "20px" }}>
              <div style={{ 
                backgroundColor: colors.background,
                padding: "20px",
                borderRadius: "6px",
                border: `1px solid ${colors.border}`,
                marginBottom: "15px"
              }}>
                <div style={{ display: "flex", alignItems: "center", gap: "15px", marginBottom: "10px" }}>
                  <span style={{ fontSize: "24px" }}>📱</span>
                  <div>
                    <h3 style={{ margin: 0, color: colors.text }}>Phone</h3>
                    <p style={{ margin: 0, color: colors.textSecondary }}>+91 94898 22432</p>
                  </div>
                </div>
                <p style={{ color: colors.textSecondary, fontSize: "14px", margin: 0 }}>
                  Call us for immediate assistance
                </p>
              </div>

              <div style={{ 
                backgroundColor: colors.background,
                padding: "20px",
                borderRadius: "6px",
                border: `1px solid ${colors.border}`,
                marginBottom: "15px"
              }}>
                <div style={{ display: "flex", alignItems: "center", gap: "15px", marginBottom: "10px" }}>
                  <span style={{ fontSize: "24px" }}>📧</span>
                  <div>
                    <h3 style={{ margin: 0, color: colors.text }}>Email</h3>
                    <p style={{ margin: 0, color: colors.textSecondary }}>support@hardwareshop.com</p>
                  </div>
                </div>
                <p style={{ color: colors.textSecondary, fontSize: "14px", margin: 0 }}>
                  Send us an email anytime
                </p>
              </div>

              <div style={{ 
                backgroundColor: colors.background,
                padding: "20px",
                borderRadius: "6px",
                border: `1px solid ${colors.border}`
              }}>
                <div style={{ display: "flex", alignItems: "center", gap: "15px", marginBottom: "10px" }}>
                  <span style={{ fontSize: "24px" }}>🕒</span>
                  <div>
                    <h3 style={{ margin: 0, color: colors.text }}>Business Hours</h3>
                    <p style={{ margin: 0, color: colors.textSecondary }}>Mon - Sat: 9:00 AM - 7:00 PM</p>
                  </div>
                </div>
                <p style={{ color: colors.textSecondary, fontSize: "14px", margin: 0 }}>
                  Indian Standard Time (IST)
                </p>
              </div>
            </div>

            <div style={{ 
              backgroundColor: colors.background,
              padding: "20px",
              borderRadius: "6px",
              border: `1px solid ${colors.border}`
            }}>
              <h3 style={{ color: colors.text, marginBottom: "15px" }}>🚀 Quick Support</h3>
              <ul style={{ paddingLeft: "20px", color: colors.textSecondary, margin: 0 }}>
                <li>Order status and tracking</li>
                <li>Product information and recommendations</li>
                <li>Returns and exchanges</li>
                <li>Technical support</li>
                <li>Bulk order inquiries</li>
                <li>Partnership opportunities</li>
              </ul>
            </div>
          </div>

          {/* Contact Form */}
          <div>
            <h2 style={{ color: colors.text, marginBottom: "20px" }}>💬 Send us a Message</h2>
            
            <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "15px" }}>
              <div>
                <label style={{ 
                  display: "block", 
                  marginBottom: "5px", 
                  color: colors.text,
                  fontWeight: "500"
                }}>
                  Full Name *
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                  style={{
                    width: "100%",
                    padding: "12px",
                    borderRadius: "6px",
                    border: `1px solid ${colors.border}`,
                    backgroundColor: colors.background,
                    color: colors.text,
                    fontSize: "16px"
                  }}
                  placeholder="Enter your full name"
                />
              </div>

              <div>
                <label style={{ 
                  display: "block", 
                  marginBottom: "5px", 
                  color: colors.text,
                  fontWeight: "500"
                }}>
                  Email Address *
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  style={{
                    width: "100%",
                    padding: "12px",
                    borderRadius: "6px",
                    border: `1px solid ${colors.border}`,
                    backgroundColor: colors.background,
                    color: colors.text,
                    fontSize: "16px"
                  }}
                  placeholder="Enter your email address"
                />
              </div>

              <div>
                <label style={{ 
                  display: "block", 
                  marginBottom: "5px", 
                  color: colors.text,
                  fontWeight: "500"
                }}>
                  Phone Number
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  style={{
                    width: "100%",
                    padding: "12px",
                    borderRadius: "6px",
                    border: `1px solid ${colors.border}`,
                    backgroundColor: colors.background,
                    color: colors.text,
                    fontSize: "16px"
                  }}
                  placeholder="Enter your phone number"
                />
              </div>

              <div>
                <label style={{ 
                  display: "block", 
                  marginBottom: "5px", 
                  color: colors.text,
                  fontWeight: "500"
                }}>
                  Subject *
                </label>
                <select
                  name="subject"
                  value={formData.subject}
                  onChange={handleInputChange}
                  required
                  style={{
                    width: "100%",
                    padding: "12px",
                    borderRadius: "6px",
                    border: `1px solid ${colors.border}`,
                    backgroundColor: colors.background,
                    color: colors.text,
                    fontSize: "16px"
                  }}
                >
                  <option value="">Select a subject</option>
                  <option value="order-inquiry">Order Inquiry</option>
                  <option value="product-support">Product Support</option>
                  <option value="returns-exchanges">Returns & Exchanges</option>
                  <option value="technical-support">Technical Support</option>
                  <option value="bulk-orders">Bulk Orders</option>
                  <option value="partnership">Partnership</option>
                  <option value="feedback">Feedback</option>
                  <option value="other">Other</option>
                </select>
              </div>

              <div>
                <label style={{ 
                  display: "block", 
                  marginBottom: "5px", 
                  color: colors.text,
                  fontWeight: "500"
                }}>
                  Message *
                </label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  required
                  rows={5}
                  style={{
                    width: "100%",
                    padding: "12px",
                    borderRadius: "6px",
                    border: `1px solid ${colors.border}`,
                    backgroundColor: colors.background,
                    color: colors.text,
                    fontSize: "16px",
                    resize: "vertical"
                  }}
                  placeholder="Please describe your inquiry in detail..."
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                style={{
                  padding: "15px 30px",
                  backgroundColor: isSubmitting ? colors.textMuted : colors.primary,
                  color: "white",
                  border: "none",
                  borderRadius: "6px",
                  fontSize: "16px",
                  fontWeight: "bold",
                  cursor: isSubmitting ? "not-allowed" : "pointer",
                  transition: "all 0.3s ease"
                }}
              >
                {isSubmitting ? "Sending..." : "Send Message"}
              </button>
            </form>
          </div>
        </div>

        {/* FAQ Section */}
        <div style={{ 
          backgroundColor: colors.background,
          padding: "25px",
          borderRadius: "6px",
          border: `1px solid ${colors.border}`
        }}>
          <h2 style={{ color: colors.text, marginBottom: "20px", textAlign: "center" }}>❓ Frequently Asked Questions</h2>
          
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "20px" }}>
            <div>
              <h3 style={{ color: colors.primary, marginBottom: "10px" }}>How can I track my order?</h3>
              <p style={{ color: colors.textSecondary, margin: 0 }}>
                You can track your order using the tracking number sent to your email or by logging into your account.
              </p>
            </div>
            
            <div>
              <h3 style={{ color: colors.primary, marginBottom: "10px" }}>What is your return policy?</h3>
              <p style={{ color: colors.textSecondary, margin: 0 }}>
                We offer a 7-day return policy for most items. Products must be in original condition with packaging.
              </p>
            </div>
            
            <div>
              <h3 style={{ color: colors.primary, marginBottom: "10px" }}>Do you offer bulk discounts?</h3>
              <p style={{ color: colors.textSecondary, margin: 0 }}>
                Yes! Contact us for special pricing on bulk orders and business partnerships.
              </p>
            </div>
            
            <div>
              <h3 style={{ color: colors.primary, marginBottom: "10px" }}>How long does delivery take?</h3>
              <p style={{ color: colors.textSecondary, margin: 0 }}>
                Delivery typically takes 2-5 business days depending on your location and product availability.
              </p>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @media (max-width: 768px) {
          main > div {
            padding: 20px !important;
          }
          
          main > div > div:first-of-type {
            grid-template-columns: 1fr !important;
            gap: 20px !important;
          }
          
          .faq-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </main>
  );
}