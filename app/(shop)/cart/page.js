"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useCart } from "../../../lib/cartContext";
import { useTranslation } from "../../../lib/translationContext";
import { useToast } from "../../../lib/toastContext";
import { useSession } from "../../../lib/sessionContext";
import { useTheme } from "../../../lib/themeContext";

export default function CartPage() {
  const [dbCart, setDbCart] = useState([]);
  const [loading, setLoading] = useState(true);
  const { cart, removeFromCart, clearCart, updateQuantity, isLoaded: cartLoaded } = useCart();
  const { t } = useTranslation();
  const { showSuccess, showError } = useToast();
  const { user } = useSession();
  const { colors } = useTheme();

  useEffect(() => {
    const initializePage = async () => {
      if (user) {
        // For logged-in users, fetch from database
        await fetchDbCart();
      } else {
        // For guest users, wait for cart to load from localStorage
        if (cartLoaded) {
          setLoading(false);
        }
      }
    };

    initializePage();
  }, [user, cartLoaded]);

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

  const removeFromDbCart = async (cartItemId) => {
    try {
      const res = await fetch(`/api/cart/${cartItemId}`, {
        method: "DELETE",
        credentials: 'include'
      });
      if (res.ok) {
        await fetchDbCart();
        showSuccess(t('Item removed from cart'));
      } else {
        showError("Failed to remove item");
      }
    } catch (error) {
      console.error("Failed to remove item:", error);
      showError("Failed to remove item");
    }
  };

  const updateDbCartQuantity = async (cartItemId, newQuantity) => {
    try {
      const res = await fetch(`/api/cart/${cartItemId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json"
        },
        credentials: 'include',
        body: JSON.stringify({ quantity: newQuantity })
      });
      if (res.ok) {
        await fetchDbCart();
      }
    } catch (error) {
      console.error("Failed to update quantity:", error);
    }
  };

  const clearDbCart = async () => {
    try {
      const res = await fetch("/api/cart", {
        method: "DELETE",
        credentials: 'include'
      });
      if (res.ok) {
        await fetchDbCart();
        showSuccess(t('Cart cleared'));
      } else {
        showError("Failed to clear cart");
      }
    } catch (error) {
      console.error("Failed to clear cart:", error);
      showError("Failed to clear cart");
    }
  };

  if (loading || !cartLoaded) {
    return (
      <main style={{ padding: 20, backgroundColor: colors.background, color: colors.text }}>
        <h2>Your Cart</h2>
        <p>Loading...</p>
      </main>
    );
  }

  const currentCart = user ? dbCart : cart;
  const isEmpty = currentCart.length === 0;

  const calculateTotal = () => {
    if (user) {
      return dbCart.reduce((sum, item) => sum + (item.product.price * item.quantity), 0);
    } else {
      return cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    }
  };

  if (isEmpty) {
    return (
      <main style={{ padding: 20, textAlign: "center", backgroundColor: colors.background, color: colors.text }}>
        <h2>Your Cart</h2>
        <div style={{ 
          padding: 40, 
          backgroundColor: colors.surface, 
          borderRadius: 8, 
          margin: "20px 0",
          border: `1px solid ${colors.border}`
        }}>
          <p style={{ fontSize: "18px", color: colors.textSecondary, marginBottom: 20 }}>
            Your cart is empty
          </p>
          <Link href="/products">
            <button style={{
              padding: "12px 24px",
              backgroundColor: colors.primary,
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

  return (
    <main style={{ padding: 20, maxWidth: 800, margin: "0 auto", backgroundColor: colors.background, color: colors.text }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
        <h2>Your Cart ({currentCart.length} items)</h2>
        <button
          onClick={() => {
            if (user) {
              clearDbCart();
            } else {
              clearCart();
              showSuccess(t('Cart cleared'));
            }
          }}
          style={{
            padding: "8px 16px",
            backgroundColor: colors.danger,
            color: "white",
            border: "none",
            borderRadius: 4,
            cursor: "pointer"
          }}
        >
          Clear Cart
        </button>
      </div>

      <div style={{ marginBottom: 30 }}>
        {currentCart.map((item) => {
          const product = user ? item.product : item;
          const quantity = user ? item.quantity : item.quantity;
          const itemTotal = product.price * quantity;

          return (
            <div key={user ? item.id : item.id} style={{
              display: "flex",
              alignItems: "center",
              padding: 20,
              border: `1px solid ${colors.border}`,
              borderRadius: 8,
              marginBottom: 15,
              backgroundColor: colors.surface
            }}>
              {product.imageUrl && (
                <img 
                  src={product.imageUrl} 
                  alt={product.name}
                  style={{ 
                    width: 80, 
                    height: 80, 
                    objectFit: "cover", 
                    borderRadius: 4,
                    marginRight: 15
                  }}
                />
              )}

              <div style={{ flex: 1 }}>
                <h4 style={{ margin: "0 0 5px 0" }}>{product.name}</h4>
                <p style={{ color: colors.textSecondary, margin: "0 0 10px 0", fontSize: "14px" }}>
                  ₹{product.price} each
                </p>
                {product.category && (
                  <span style={{ 
                    padding: "2px 8px",
                    backgroundColor: colors.surface,
                    border: `1px solid ${colors.border}`,
                    borderRadius: 4,
                    fontSize: "12px",
                    color: colors.textSecondary
                  }}>
                    {product.category}
                  </span>
                )}
              </div>

              <div style={{ display: "flex", alignItems: "center", gap: 15 }}>
                {user ? (
                  <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                    <button
                      onClick={() => updateDbCartQuantity(item.id, Math.max(1, quantity - 1))}
                      style={{
                        padding: "4px 8px",
                        backgroundColor: "#6c757d",
                        color: "white",
                        border: "none",
                        borderRadius: 4,
                        cursor: "pointer"
                      }}
                    >
                      -
                    </button>
                    <span style={{ minWidth: 30, textAlign: "center" }}>{quantity}</span>
                    <button
                      onClick={() => updateDbCartQuantity(item.id, quantity + 1)}
                      style={{
                        padding: "4px 8px",
                        backgroundColor: "#6c757d",
                        color: "white",
                        border: "none",
                        borderRadius: 4,
                        cursor: "pointer"
                      }}
                    >
                      +
                    </button>
                  </div>
                ) : (
                  <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                    <button
                      onClick={() => updateQuantity(item.id, Math.max(1, quantity - 1))}
                      style={{
                        padding: "4px 8px",
                        backgroundColor: "#6c757d",
                        color: "white",
                        border: "none",
                        borderRadius: 4,
                        cursor: "pointer"
                      }}
                    >
                      -
                    </button>
                    <span style={{ minWidth: 30, textAlign: "center" }}>{quantity}</span>
                    <button
                      onClick={() => updateQuantity(item.id, quantity + 1)}
                      style={{
                        padding: "4px 8px",
                        backgroundColor: "#6c757d",
                        color: "white",
                        border: "none",
                        borderRadius: 4,
                        cursor: "pointer"
                      }}
                    >
                      +
                    </button>
                  </div>
                )}

                <div style={{ textAlign: "right", minWidth: 80 }}>
                  <div style={{ fontWeight: "bold" }}>₹{itemTotal.toFixed(2)}</div>
                </div>

                <button
                  onClick={() => {
                    if (user) {
                      removeFromDbCart(item.id);
                    } else {
                      removeFromCart(item.id);
                      showSuccess(t('Item removed from cart'));
                    }
                  }}
                  style={{
                    padding: "8px 12px",
                    backgroundColor: "#dc3545",
                    color: "white",
                    border: "none",
                    borderRadius: 4,
                    cursor: "pointer"
                  }}
                >
                  Remove
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Cart Summary */}
      <div style={{
        padding: 20,
        backgroundColor: colors.surface,
        borderRadius: 8,
        border: `1px solid ${colors.border}`
      }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
          <h3 style={{ margin: 0 }}>Cart Total</h3>
          <h3 style={{ margin: 0, color: colors.primary }}>₹{calculateTotal().toFixed(2)}</h3>
        </div>

        <div style={{ display: "flex", gap: 15 }}>
          <Link href="/products" style={{ flex: 1 }}>
            <button style={{
              width: "100%",
              padding: "12px",
              backgroundColor: "#6c757d",
              color: "white",
              border: "none",
              borderRadius: 4,
              cursor: "pointer"
            }}>
              Continue Shopping
            </button>
          </Link>

          <Link href="/checkout" style={{ flex: 1 }}>
            <button style={{
              width: "100%",
              padding: "12px",
              backgroundColor: colors.success,
              color: "white",
              border: "none",
              borderRadius: 4,
              cursor: "pointer",
              fontSize: "16px",
              fontWeight: "bold"
            }}>
              Proceed to Checkout
            </button>
          </Link>
        </div>
      </div>
    </main>
  );
}
