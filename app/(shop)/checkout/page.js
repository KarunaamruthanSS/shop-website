"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useCart } from "../../../lib/cartContext";
import { useTranslation } from "../../../lib/translationContext";
import { useToast } from "../../../lib/toastContext";
import { useSession } from "../../../lib/sessionContext";
import { useTheme } from "../../../lib/themeContext";

export default function CheckoutPage() {
  const [dbCart, setDbCart] = useState([]);
  const [loading, setLoading] = useState(true);
  const [processing, setProcessing] = useState(false);
  const [showPaymentImage, setShowPaymentImage] = useState(false);
  const [error, setError] = useState("");
  const { cart, clearCart } = useCart();
  const { t } = useTranslation();
  const { showSuccess, showError } = useToast();
  const { user } = useSession();
  const { colors } = useTheme();
  const router = useRouter();

  useEffect(() => {
    // Use session context for user state
    if (user) {
      fetchDbCart();
    } else {
      setLoading(false);
    }
  }, [user]);

  const fetchDbCart = async () => {
    try {
      const res = await fetch("/api/cart", {
        credentials: 'include'
      });
      if (res.ok) {
        const data = await res.json();
        setDbCart(data.cartItems);
      }
    } catch (error) {
      console.error("Failed to fetch cart:", error);
    } finally {
      setLoading(false);
    }
  };

  const currentCart = user ? dbCart : cart;
  const isEmpty = currentCart.length === 0;

  const calculateTotal = () => {
    if (user) {
      return dbCart.reduce((sum, item) => sum + (item.product.price * item.quantity), 0);
    } else {
      return cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    }
  };

  const placeOrder = async () => {
    if (isEmpty) return;

    // Require login for placing orders
    if (!user) {
      showError("Please login to place an order");
      router.push("/login");
      return;
    }

    setProcessing(true);
    setError("");

    // Show payment image immediately when Pay Now is clicked
    setShowPaymentImage(true);

    try {
      const orderData = {
        cart: user ? dbCart.map(item => ({
          id: item.product.id,
          name: item.product.name,
          price: item.product.price,
          quantity: item.quantity
        })) : cart,
        total: calculateTotal()
      };

      // Add a delay to show the payment image
      await new Promise(resolve => setTimeout(resolve, 3000));

      const res = await fetch("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: 'include',
        body: JSON.stringify(orderData)
      });

      const data = await res.json();

      if (res.ok) {
        if (user) {
          // Cart will be cleared by the API
        } else {
          clearCart();
        }
        showSuccess(t('Order placed successfully!'));
        router.push(`/order-success?orderId=${data.orderId}`);
      } else {
        const errorMessage = data.error || "Order failed";
        setError(errorMessage);
        showError(errorMessage);
        setShowPaymentImage(false);
      }
    } catch (error) {
      const errorMessage = "Network error. Please try again.";
      setError(errorMessage);
      showError(errorMessage);
      setShowPaymentImage(false);
    } finally {
      setProcessing(false);
    }
  };

  if (loading) {
    return (
      <main style={{ padding: 20 }}>
        <h2>Checkout</h2>
        <p>Loading...</p>
      </main>
    );
  }

  if (isEmpty) {
    return (
      <main style={{ padding: 20, textAlign: "center" }}>
        <h2>Checkout</h2>
        <div style={{ 
          padding: 40, 
          backgroundColor: "#f8f9fa", 
          borderRadius: 8, 
          margin: "20px 0" 
        }}>
          <p style={{ fontSize: "18px", color: "#666", marginBottom: 20 }}>
            Your cart is empty. Add some products before checkout.
          </p>
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
        </div>
      </main>
    );
  }

  const total = calculateTotal();

  return (
    <main style={{ padding: 20, maxWidth: 800, margin: "0 auto" }}>
      <h2>Checkout</h2>

      {error && (
        <div style={{ 
          color: "red", 
          marginBottom: 20, 
          padding: 10, 
          border: "1px solid red", 
          borderRadius: 4 
        }}>
          {error}
        </div>
      )}

      {/* Order Summary */}
      <div style={{
        marginBottom: 30,
        padding: 20,
        backgroundColor: "#f8f9fa",
        borderRadius: 8,
        border: "1px solid #e9ecef"
      }}>
        <h3 style={{ marginTop: 0 }}>Order Summary</h3>
        
        {currentCart.map((item) => {
          const product = user ? item.product : item;
          const quantity = user ? item.quantity : item.quantity;
          const itemTotal = product.price * quantity;

          return (
            <div key={user ? item.id : item.id} style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              padding: "10px 0",
              borderBottom: "1px solid #dee2e6"
            }}>
              <div>
                <strong>{product.name}</strong>
                <div style={{ fontSize: "14px", color: "#666" }}>
                  ₹{product.price} × {quantity}
                </div>
              </div>
              <div style={{ fontWeight: "bold" }}>
                ₹{itemTotal.toFixed(2)}
              </div>
            </div>
          );
        })}

        <div style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          paddingTop: 15,
          marginTop: 15,
          borderTop: "2px solid #007bff"
        }}>
          <h3 style={{ margin: 0 }}>Total Amount</h3>
          <h3 style={{ margin: 0, color: "#007bff" }}>₹{total.toFixed(2)}</h3>
        </div>
      </div>

      {/* Customer Information */}
      {user && (
        <div style={{
          marginBottom: 30,
          padding: 20,
          backgroundColor: "white",
          borderRadius: 8,
          border: "1px solid #e9ecef"
        }}>
          <h3 style={{ marginTop: 0 }}>Customer Information</h3>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 15 }}>
            <div>
              <strong>Name:</strong> {user.name}
            </div>
            <div>
              <strong>Email:</strong> {user.email}
            </div>
          </div>
        </div>
      )}

      {/* Guest User Notice - Now shows login requirement */}
      {!user && (
        <div style={{
          marginBottom: 30,
          padding: 20,
          backgroundColor: "#f8d7da",
          borderRadius: 8,
          border: "1px solid #f5c6cb"
        }}>
          <h4 style={{ marginTop: 0, color: "#721c24" }}>Login Required</h4>
          <p style={{ margin: "10px 0", color: "#721c24" }}>
            You must be logged in to place an order. Please login or register to continue.
          </p>
          <div style={{ display: "flex", gap: 10 }}>
            <Link href="/login">
              <button style={{
                padding: "10px 20px",
                backgroundColor: "#007bff",
                color: "white",
                border: "none",
                borderRadius: 4,
                cursor: "pointer",
                fontSize: "14px"
              }}>
                Login
              </button>
            </Link>
            <Link href="/register">
              <button style={{
                padding: "10px 20px",
                backgroundColor: "#28a745",
                color: "white",
                border: "none",
                borderRadius: 4,
                cursor: "pointer",
                fontSize: "14px"
              }}>
                Register
              </button>
            </Link>
          </div>
        </div>
      )}

      {/* Action Buttons */}
      <div style={{ display: "flex", gap: 15 }}>
        <Link href="/cart" style={{ flex: 1 }}>
          <button style={{
            width: "100%",
            padding: "15px",
            backgroundColor: "#6c757d",
            color: "white",
            border: "none",
            borderRadius: 4,
            cursor: "pointer",
            fontSize: "16px"
          }}>
            Back to Cart
          </button>
        </Link>

        <button
          onClick={placeOrder}
          disabled={processing || !user}
          style={{
            flex: 2,
            padding: "15px",
            backgroundColor: processing || !user ? "#ccc" : "#28a745",
            color: "white",
            border: "none",
            borderRadius: 4,
            cursor: processing || !user ? "not-allowed" : "pointer",
            fontSize: "16px",
            fontWeight: "bold"
          }}
        >
          {!user ? "Login Required" : processing ? "Processing..." : `Pay Now - ₹${total.toFixed(2)}`}
        </button>
      </div>

      {/* Payment Notice */}
      <div style={{
        marginTop: 20,
        padding: 15,
        backgroundColor: "#d1ecf1",
        borderRadius: 8,
        border: "1px solid #bee5eb",
        textAlign: "center"
      }}>
        <p style={{ margin: 0, color: "#0c5460", fontSize: "14px" }}>
          🔒 This is a demo checkout. No actual payment will be processed.
        </p>
      </div>

      {/* Payment Image Modal */}
      {showPaymentImage && (
        <div style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: "rgba(0, 0, 0, 0.8)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          zIndex: 1000,
          padding: 20
        }}>
          <div style={{
            backgroundColor: colors.surface,
            borderRadius: 12,
            padding: 20,
            maxWidth: "90vw",
            maxHeight: "90vh",
            overflow: "auto",
            position: "relative",
            textAlign: "center",
            border: `1px solid ${colors.border}`,
            color: colors.text
          }}>
            <button
              onClick={() => setShowPaymentImage(false)}
              style={{
                position: "absolute",
                top: 10,
                right: 15,
                background: "none",
                border: "none",
                fontSize: "24px",
                cursor: "pointer",
                color: colors.textSecondary
              }}
            >
              ✕
            </button>
            
            <h3 style={{ marginTop: 0, marginBottom: 20, color: colors.success }}>
              🎉 Payment Processing
            </h3>
            
            <div style={{ marginBottom: 20 }}>
              <img 
                src="/images/payment-success.jpg" 
                alt="Payment Success" 
                style={{
                  maxWidth: "100%",
                  maxHeight: "60vh",
                  borderRadius: 8,
                  boxShadow: `0 4px 12px ${colors.shadow}`
                }}
                onError={(e) => {
                  // Try SVG fallback first
                  if (e.target.src.includes('.jpg')) {
                    e.target.src = '/images/payment-success.svg';
                  } else {
                    // If both fail, show placeholder
                    e.target.style.display = 'none';
                    e.target.nextSibling.style.display = 'block';
                  }
                }}
              />
              <div style={{ 
                display: 'none', 
                padding: 40, 
                backgroundColor: colors.surface, 
                borderRadius: 8,
                color: colors.textSecondary,
                border: `1px solid ${colors.border}`
              }}>
                <p>🏛️ Payment Success Image</p>
                <p style={{ fontSize: '14px' }}>
                  Please place your image at: /public/images/payment-success.jpg
                </p>
              </div>
            </div>
            
            <p style={{ color: colors.textSecondary, marginBottom: 20 }}>
              Your payment is being processed. Please wait...
            </p>
            
            <div style={{
              display: "inline-block",
              width: 40,
              height: 40,
              border: `4px solid ${colors.border}`,
              borderTop: `4px solid ${colors.primary}`,
              borderRadius: "50%",
              animation: "spin 1s linear infinite"
            }}></div>
          </div>
        </div>
      )}

      <style jsx>{`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
    </main>
  );
}
