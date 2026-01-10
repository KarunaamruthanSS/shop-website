"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { useCart } from "../../../../lib/cartContext";
import { useSession } from "../../../../lib/sessionContext";
import { useToast } from "../../../../lib/toastContext";
import { useTranslation } from "../../../../lib/translationContext";

export default function ProductDetailPage() {
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [quantity, setQuantity] = useState(1);
  const { addToCart } = useCart();
  const { user } = useSession();
  const { showSuccess, showError } = useToast();
  const { t } = useTranslation();
  const params = useParams();
  const router = useRouter();

  useEffect(() => {
    if (params.id) {
      fetchProduct();
    }
  }, [params.id]);

  const fetchProduct = async () => {
    try {
      const res = await fetch(`/api/products/${params.id}`);
      const data = await res.json();

      if (res.ok) {
        setProduct(data.product);
      } else {
        setError(data.error || "Product not found");
      }
    } catch (error) {
      setError("Network error");
    } finally {
      setLoading(false);
    }
  };

  const handleAddToCart = async () => {
    if (!product) return;

    if (!user) {
      showError(t('Please login to add items to cart'));
      return;
    }

    try {
      if (user) {
        // Add to database cart
        const res = await fetch("/api/cart", {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          credentials: 'include',
          body: JSON.stringify({ 
            productId: product.id, 
            quantity: quantity 
          })
        });

        if (res.ok) {
          showSuccess(t(`${quantity} ${product.name}(s) added to cart!`));
        } else {
          const data = await res.json();
          showError(data.error || "Failed to add to cart");
        }
      } else {
        // This should not happen now, but keeping as fallback
        let success = true;
        for (let i = 0; i < quantity; i++) {
          success = addToCart(product) && success;
        }
        if (success) {
          showSuccess(t(`${quantity} ${product.name}(s) added to cart!`));
        } else {
          showError(t('Please login to add items to cart'));
        }
      }
    } catch (error) {
      console.error('Error adding to cart:', error);
      showError("Network error");
    }
  };

  if (loading) {
    return (
      <main style={{ padding: 20 }}>
        <p>Loading product...</p>
      </main>
    );
  }

  if (error || !product) {
    return (
      <main style={{ padding: 20 }}>
        <div style={{ color: "red", padding: 10, border: "1px solid red", borderRadius: 4 }}>
          {error || "Product not found"}
        </div>
        <Link href="/products">
          <button style={{ marginTop: 10, padding: 10, backgroundColor: "#007bff", color: "white", border: "none", borderRadius: 4 }}>
            Back to Products
          </button>
        </Link>
      </main>
    );
  }

  return (
    <main style={{ padding: 20, maxWidth: 1200, margin: "0 auto" }}>
      <Link href="/products">
        <button style={{ 
          marginBottom: 20, 
          padding: "8px 16px", 
          backgroundColor: "#6c757d", 
          color: "white", 
          border: "none", 
          borderRadius: 4,
          cursor: "pointer"
        }}>
          ← Back to Products
        </button>
      </Link>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 40, alignItems: "start" }}>
        {/* Product Image */}
        <div>
          {product.imageUrl ? (
            <img 
              src={product.imageUrl} 
              alt={product.name}
              style={{ 
                width: "100%", 
                maxHeight: 500, 
                objectFit: "cover", 
                borderRadius: 8,
                border: "1px solid #ddd"
              }}
            />
          ) : (
            <div style={{
              width: "100%",
              height: 400,
              backgroundColor: "#f8f9fa",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              borderRadius: 8,
              border: "1px solid #ddd",
              color: "#6c757d"
            }}>
              No Image Available
            </div>
          )}
        </div>

        {/* Product Details */}
        <div>
          <h1 style={{ margin: "0 0 10px 0", fontSize: "2rem" }}>{product.name}</h1>
          
          {product.category && (
            <div style={{ marginBottom: 15 }}>
              <span style={{ 
                padding: "4px 12px",
                backgroundColor: "#e9ecef",
                borderRadius: 20,
                fontSize: "14px",
                color: "#495057"
              }}>
                {product.category}
              </span>
            </div>
          )}

          <div style={{ marginBottom: 20 }}>
            <span style={{ 
              fontSize: "2rem", 
              fontWeight: "bold", 
              color: "#007bff" 
            }}>
              ₹{product.price}
            </span>
          </div>

          {product.description && (
            <div style={{ marginBottom: 20 }}>
              <h3>Description</h3>
              <p style={{ 
                color: "#666", 
                lineHeight: 1.6,
                fontSize: "16px"
              }}>
                {product.description}
              </p>
            </div>
          )}

          <div style={{ marginBottom: 20 }}>
            <h4>Availability</h4>
            <span style={{ 
              fontSize: "16px",
              fontWeight: "bold",
              color: product.stock > 10 ? "#28a745" : product.stock > 0 ? "#ffc107" : "#dc3545"
            }}>
              {product.stock > 0 ? `${product.stock} in stock` : "Out of stock"}
            </span>
          </div>

          {product.stock > 0 && (
            <div style={{ marginBottom: 20 }}>
              <label style={{ display: "block", marginBottom: 8, fontWeight: "bold" }}>
                Quantity:
              </label>
              <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  style={{
                    padding: "8px 12px",
                    backgroundColor: "#6c757d",
                    color: "white",
                    border: "none",
                    borderRadius: 4,
                    cursor: "pointer"
                  }}
                >
                  -
                </button>
                <span style={{ 
                  padding: "8px 16px", 
                  border: "1px solid #ddd", 
                  borderRadius: 4,
                  minWidth: 60,
                  textAlign: "center"
                }}>
                  {quantity}
                </span>
                <button
                  onClick={() => setQuantity(Math.min(product.stock, quantity + 1))}
                  style={{
                    padding: "8px 12px",
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
            </div>
          )}

          <div style={{ display: "flex", gap: 15 }}>
            <button 
              onClick={handleAddToCart}
              disabled={product.stock === 0}
              style={{
                flex: 1,
                padding: "15px 30px",
                fontSize: "16px",
                fontWeight: "bold",
                backgroundColor: product.stock === 0 ? "#ccc" : "#28a745",
                color: "white",
                border: "none",
                borderRadius: 4,
                cursor: product.stock === 0 ? "not-allowed" : "pointer"
              }}
            >
              {product.stock === 0 ? "Out of Stock" : "Add to Cart"}
            </button>
            
            <Link href="/cart">
              <button style={{
                padding: "15px 30px",
                fontSize: "16px",
                backgroundColor: "#007bff",
                color: "white",
                border: "none",
                borderRadius: 4,
                cursor: "pointer"
              }}>
                View Cart
              </button>
            </Link>
          </div>

          <div style={{ 
            marginTop: 30, 
            padding: 20, 
            backgroundColor: "#f8f9fa", 
            borderRadius: 8,
            border: "1px solid #e9ecef"
          }}>
            <h4 style={{ margin: "0 0 10px 0" }}>Product Information</h4>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, fontSize: "14px" }}>
              <div><strong>Product ID:</strong> {product.id.slice(-8)}</div>
              <div><strong>Stock:</strong> {product.stock} units</div>
              <div><strong>Category:</strong> {product.category || "N/A"}</div>
              <div><strong>Status:</strong> {product.isActive ? "Active" : "Inactive"}</div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}