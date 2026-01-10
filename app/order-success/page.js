"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { useTranslation } from "../../lib/translationContext";
import { useToast } from "../../lib/toastContext";

function OrderSuccessContent() {
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const { t } = useTranslation();
  const { showSuccess } = useToast();
  const searchParams = useSearchParams();
  const orderId = searchParams.get("orderId");

  useEffect(() => {
    if (orderId) {
      fetchOrder();
      // Show payment confirmation toast
      showSuccess(t('Payment confirmed!'));
    } else {
      setLoading(false);
    }
  }, [orderId, showSuccess, t]);

  const fetchOrder = async () => {
    try {
      const res = await fetch(`/api/orders/${orderId}`, {
        credentials: 'include'
      });
      if (res.ok) {
        const data = await res.json();
        setOrder(data.order);
      }
    } catch (error) {
      console.error("Failed to fetch order:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <main style={{ padding: 20, textAlign: "center" }}>
        <h2>Loading order details...</h2>
      </main>
    );
  }

  return (
    <main style={{ padding: 20, maxWidth: 600, margin: "0 auto", textAlign: "center" }}>
      {/* Success Icon */}
      <div style={{
        width: 80,
        height: 80,
        backgroundColor: "#28a745",
        borderRadius: "50%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        margin: "0 auto 20px auto"
      }}>
        <span style={{ color: "white", fontSize: "40px" }}>✓</span>
      </div>

      <h1 style={{ color: "#28a745", marginBottom: 10 }}>Order Placed Successfully!</h1>
      
      <p style={{ fontSize: "18px", color: "#666", marginBottom: 30 }}>
        Thank you for your purchase. Your order has been received and is being processed.
      </p>

      {order && (
        <div style={{
          backgroundColor: "#f8f9fa",
          padding: 20,
          borderRadius: 8,
          border: "1px solid #e9ecef",
          marginBottom: 30,
          textAlign: "left"
        }}>
          <h3 style={{ marginTop: 0, textAlign: "center" }}>Order Details</h3>
          
          <div style={{ marginBottom: 15 }}>
            <strong>Order ID:</strong> {order.id}
          </div>
          
          <div style={{ marginBottom: 15 }}>
            <strong>Order Date:</strong> {new Date(order.createdAt).toLocaleString()}
          </div>

          <div style={{ marginBottom: 15 }}>
            <strong>Status:</strong> 
            <span style={{ 
              marginLeft: 10,
              padding: "2px 8px",
              backgroundColor: "#fff3cd",
              color: "#856404",
              borderRadius: 4,
              fontSize: "12px"
            }}>
              {order.status}
            </span>
          </div>

          {order.user && (
            <div style={{ marginBottom: 15 }}>
              <strong>Customer:</strong> {order.user.name} ({order.user.email})
            </div>
          )}

          <div style={{ marginBottom: 15 }}>
            <strong>Items:</strong>
            <div style={{ marginTop: 10 }}>
              {order.items.map((item) => (
                <div key={item.id} style={{
                  display: "flex",
                  justifyContent: "space-between",
                  padding: "8px 0",
                  borderBottom: "1px solid #dee2e6"
                }}>
                  <span>{item.product.name} × {item.quantity}</span>
                  <span>₹{(item.price * item.quantity).toFixed(2)}</span>
                </div>
              ))}
            </div>
          </div>

          <div style={{
            display: "flex",
            justifyContent: "space-between",
            paddingTop: 15,
            marginTop: 15,
            borderTop: "2px solid #007bff",
            fontSize: "18px",
            fontWeight: "bold"
          }}>
            <span>Total Amount:</span>
            <span style={{ color: "#007bff" }}>₹{order.total}</span>
          </div>
        </div>
      )}

      {!order && orderId && (
        <div style={{
          backgroundColor: "#f8d7da",
          padding: 20,
          borderRadius: 8,
          border: "1px solid #f5c6cb",
          marginBottom: 30,
          color: "#721c24"
        }}>
          <p>Unable to load order details. Please contact support with Order ID: {orderId}</p>
        </div>
      )}

      {!orderId && (
        <div style={{
          backgroundColor: "#d1ecf1",
          padding: 20,
          borderRadius: 8,
          border: "1px solid #bee5eb",
          marginBottom: 30,
          color: "#0c5460"
        }}>
          <p>Your order has been placed successfully!</p>
        </div>
      )}

      {/* Action Buttons */}
      <div style={{ display: "flex", gap: 15, justifyContent: "center" }}>
        <Link href="/products">
          <button style={{
            padding: "12px 24px",
            backgroundColor: "#007bff",
            color: "white",
            border: "none",
            borderRadius: 4,
            cursor: "pointer",
            fontSize: "16px"
          }}>
            Continue Shopping
          </button>
        </Link>

        <Link href="/">
          <button style={{
            padding: "12px 24px",
            backgroundColor: "#28a745",
            color: "white",
            border: "none",
            borderRadius: 4,
            cursor: "pointer",
            fontSize: "16px"
          }}>
            Go to Home
          </button>
        </Link>
      </div>

      {/* Additional Information */}
      <div style={{
        marginTop: 40,
        padding: 20,
        backgroundColor: "#e2e3e5",
        borderRadius: 8,
        textAlign: "left"
      }}>
        <h4 style={{ marginTop: 0 }}>What happens next?</h4>
        <ul style={{ paddingLeft: 20, lineHeight: 1.6 }}>
          <li>You will receive an order confirmation email shortly</li>
          <li>Your order will be processed within 1-2 business days</li>
          <li>You'll receive tracking information once your order ships</li>
          <li>Estimated delivery: 3-5 business days</li>
        </ul>
        
        <p style={{ marginBottom: 0, fontSize: "14px", color: "#666" }}>
          Need help? Contact our support team at support@hardwareshop.com
        </p>
      </div>
    </main>
  );
}

export default function OrderSuccessPage() {
  return (
    <Suspense fallback={
      <main style={{ padding: 20, textAlign: "center" }}>
        <h2>Loading...</h2>
      </main>
    }>
      <OrderSuccessContent />
    </Suspense>
  );
}