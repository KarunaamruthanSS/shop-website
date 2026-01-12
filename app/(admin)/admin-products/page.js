"use client";

import { useState, useEffect } from "react";
import AdminNav from "../../../components/admin-nav";

export default function AdminProducts() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    stock: "",
    category: "",
    imageUrl: ""
  });

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const res = await fetch("/api/products");
      const data = await res.json();

      if (res.ok) {
        setProducts(data.products);
      } else {
        setError(data.error || "Failed to fetch products");
      }
    } catch (error) {
      setError("Network error");
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const url = editingProduct ? `/api/products/${editingProduct.id}` : "/api/products";
      const method = editingProduct ? "PUT" : "POST";

      const res = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(formData)
      });

      const data = await res.json();

      if (res.ok) {
        await fetchProducts();
        setShowForm(false);
        setEditingProduct(null);
        setFormData({
          name: "",
          description: "",
          price: "",
          stock: "",
          category: "",
          imageUrl: ""
        });
      } else {
        setError(data.error || "Operation failed");
      }
    } catch (error) {
      setError("Network error");
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (product) => {
    setEditingProduct(product);
    setFormData({
      name: product.name,
      description: product.description || "",
      price: product.price.toString(),
      stock: product.stock.toString(),
      category: product.category || "",
      imageUrl: product.imageUrl || ""
    });
    setShowForm(true);
  };

  const handleDelete = async (productId) => {
    if (!confirm("Are you sure you want to delete this product?")) return;

    try {
      const res = await fetch(`/api/products/${productId}`, {
        method: "DELETE"
      });

      if (res.ok) {
        await fetchProducts();
      } else {
        const data = await res.json();
        setError(data.error || "Delete failed");
      }
    } catch (error) {
      setError("Network error");
    }
  };

  const toggleProductStatus = async (product) => {
    try {
      const res = await fetch(`/api/products/${product.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          ...product,
          isActive: !product.isActive
        })
      });

      if (res.ok) {
        await fetchProducts();
      } else {
        const data = await res.json();
        setError(data.error || "Update failed");
      }
    } catch (error) {
      setError("Network error");
    }
  };

  if (loading && products.length === 0) {
    return (
      <main style={{ padding: 20 }}>
        <h2>Manage Products</h2>
        <p>Loading...</p>
      </main>
    );
  }

  return (
    <main style={{ padding: 0 }}>
      <AdminNav />
      <div style={{ padding: 20 }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
          <h2>Manage Products</h2>
        <button
          onClick={() => {
            setShowForm(!showForm);
            setEditingProduct(null);
            setFormData({
              name: "",
              description: "",
              price: "",
              stock: "",
              category: "",
              imageUrl: ""
            });
          }}
          style={{
            padding: "10px 20px",
            backgroundColor: "#007bff",
            color: "white",
            border: "none",
            borderRadius: 4,
            cursor: "pointer"
          }}
        >
          {showForm ? "Cancel" : "Add Product"}
        </button>
      </div>

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

      {showForm && (
        <div style={{ 
          marginBottom: 30, 
          padding: 20, 
          border: "1px solid #ddd", 
          borderRadius: 8,
          backgroundColor: "#f8f9fa",
          maxWidth: 500
        }}>
          <h3 style={{ marginTop: 0, marginBottom: 20 }}>{editingProduct ? "Edit Product" : "Add New Product"}</h3>
          <form onSubmit={handleSubmit}>
            <div style={{ marginBottom: 15 }}>
              <label style={{ display: "block", marginBottom: 5, fontWeight: 500 }}>Product Name *</label>
              <input
                type="text"
                placeholder="Enter product name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                required
                style={{ width: "100%", padding: 10, borderRadius: 6, border: "1px solid #ccc", boxSizing: "border-box" }}
              />
            </div>
            <div style={{ marginBottom: 15 }}>
              <label style={{ display: "block", marginBottom: 5, fontWeight: 500 }}>Price (₹) *</label>
              <input
                type="number"
                step="0.01"
                placeholder="Enter price"
                value={formData.price}
                onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                required
                style={{ width: "100%", padding: 10, borderRadius: 6, border: "1px solid #ccc", boxSizing: "border-box" }}
              />
            </div>
            <div style={{ marginBottom: 15 }}>
              <label style={{ display: "block", marginBottom: 5, fontWeight: 500 }}>Stock Quantity *</label>
              <input
                type="number"
                placeholder="Enter stock quantity"
                value={formData.stock}
                onChange={(e) => setFormData({ ...formData, stock: e.target.value })}
                required
                style={{ width: "100%", padding: 10, borderRadius: 6, border: "1px solid #ccc", boxSizing: "border-box" }}
              />
            </div>
            <div style={{ marginBottom: 15 }}>
              <label style={{ display: "block", marginBottom: 5, fontWeight: 500 }}>Category</label>
              <input
                type="text"
                placeholder="Enter category"
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                style={{ width: "100%", padding: 10, borderRadius: 6, border: "1px solid #ccc", boxSizing: "border-box" }}
              />
            </div>
            <div style={{ marginBottom: 15 }}>
              <label style={{ display: "block", marginBottom: 5, fontWeight: 500 }}>Description</label>
              <textarea
                placeholder="Enter product description"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                style={{ width: "100%", padding: 10, minHeight: 100, borderRadius: 6, border: "1px solid #ccc", boxSizing: "border-box", resize: "vertical" }}
              />
            </div>
            <div style={{ marginBottom: 20 }}>
              <label style={{ display: "block", marginBottom: 5, fontWeight: 500 }}>Image URL</label>
              <input
                type="url"
                placeholder="Enter image URL (optional)"
                value={formData.imageUrl}
                onChange={(e) => setFormData({ ...formData, imageUrl: e.target.value })}
                style={{ width: "100%", padding: 10, borderRadius: 6, border: "1px solid #ccc", boxSizing: "border-box" }}
              />
            </div>
            <div style={{ display: "flex", gap: 10 }}>
              <button
                type="submit"
                disabled={loading}
                style={{
                  flex: 1,
                  padding: "12px 20px",
                  backgroundColor: loading ? "#ccc" : "#28a745",
                  color: "white",
                  border: "none",
                  borderRadius: 6,
                  cursor: loading ? "not-allowed" : "pointer",
                  fontWeight: 500,
                  fontSize: 16
                }}
              >
                {loading ? "Saving..." : (editingProduct ? "Update Product" : "Add Product")}
              </button>
              <button
                type="button"
                onClick={() => {
                  setShowForm(false);
                  setEditingProduct(null);
                }}
                style={{
                  padding: "12px 20px",
                  backgroundColor: "#6c757d",
                  color: "white",
                  border: "none",
                  borderRadius: 6,
                  cursor: "pointer",
                  fontWeight: 500,
                  fontSize: 16
                }}
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      <div style={{ overflowX: "auto" }}>
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr style={{ backgroundColor: "#f8f9fa" }}>
              <th style={{ padding: 10, border: "1px solid #ddd", textAlign: "left" }}>Name</th>
              <th style={{ padding: 10, border: "1px solid #ddd", textAlign: "left" }}>Category</th>
              <th style={{ padding: 10, border: "1px solid #ddd", textAlign: "left" }}>Price</th>
              <th style={{ padding: 10, border: "1px solid #ddd", textAlign: "left" }}>Stock</th>
              <th style={{ padding: 10, border: "1px solid #ddd", textAlign: "left" }}>Status</th>
              <th style={{ padding: 10, border: "1px solid #ddd", textAlign: "left" }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product.id}>
                <td style={{ padding: 10, border: "1px solid #ddd" }}>
                  <div>
                    <strong>{product.name}</strong>
                    {product.description && (
                      <div style={{ fontSize: "12px", color: "#666", marginTop: 2 }}>
                        {product.description.substring(0, 50)}...
                      </div>
                    )}
                  </div>
                </td>
                <td style={{ padding: 10, border: "1px solid #ddd" }}>{product.category || "N/A"}</td>
                <td style={{ padding: 10, border: "1px solid #ddd" }}>₹{product.price}</td>
                <td style={{ padding: 10, border: "1px solid #ddd" }}>
                  <span style={{ 
                    color: product.stock <= 10 ? "red" : "black",
                    fontWeight: product.stock <= 10 ? "bold" : "normal"
                  }}>
                    {product.stock}
                  </span>
                </td>
                <td style={{ padding: 10, border: "1px solid #ddd" }}>
                  <span style={{ 
                    padding: "2px 8px", 
                    borderRadius: 4, 
                    fontSize: "12px",
                    backgroundColor: product.isActive ? "#d4edda" : "#f8d7da",
                    color: product.isActive ? "#155724" : "#721c24"
                  }}>
                    {product.isActive ? "Active" : "Inactive"}
                  </span>
                </td>
                <td style={{ padding: 10, border: "1px solid #ddd" }}>
                  <div style={{ display: "flex", gap: 5 }}>
                    <button
                      onClick={() => handleEdit(product)}
                      style={{
                        padding: "5px 10px",
                        backgroundColor: "#ffc107",
                        color: "black",
                        border: "none",
                        borderRadius: 3,
                        cursor: "pointer",
                        fontSize: "12px"
                      }}
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => toggleProductStatus(product)}
                      style={{
                        padding: "5px 10px",
                        backgroundColor: product.isActive ? "#dc3545" : "#28a745",
                        color: "white",
                        border: "none",
                        borderRadius: 3,
                        cursor: "pointer",
                        fontSize: "12px"
                      }}
                    >
                      {product.isActive ? "Deactivate" : "Activate"}
                    </button>
                    <button
                      onClick={() => handleDelete(product.id)}
                      style={{
                        padding: "5px 10px",
                        backgroundColor: "#dc3545",
                        color: "white",
                        border: "none",
                        borderRadius: 3,
                        cursor: "pointer",
                        fontSize: "12px"
                      }}
                    >
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {products.length === 0 && (
        <div style={{ textAlign: "center", padding: 40, color: "#666" }}>
          <p>No products found. Add your first product to get started!</p>
        </div>
      )}
      </div>
    </main>
  );
}
