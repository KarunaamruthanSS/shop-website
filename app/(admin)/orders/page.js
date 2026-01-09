"use client";

import { useState, useEffect, useRef } from "react";
import { useTheme } from "../../../lib/themeContext";
import AdminNav from "../../../components/admin-nav";

export default function AdminOrders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [selectedOrder, setSelectedOrder] = useState(null);
  const orderDetailsRef = useRef(null);
  const { colors } = useTheme();

  useEffect(() => {
    fetchOrders();
  }, []);

  // Auto-scroll to order details when an order is selected
  useEffect(() => {
    if (selectedOrder && orderDetailsRef.current) {
      setTimeout(() => {
        orderDetailsRef.current.scrollIntoView({ 
          behavior: 'smooth',
          block: 'start'
        });
      }, 100); // Small delay to ensure DOM is updated
    }
  }, [selectedOrder]);

  const fetchOrders = async () => {
    try {
      const res = await fetch("/api/orders", {
        credentials: 'include'
      });
      const data = await res.json();

      if (res.ok) {
        setOrders(data.orders);
      } else {
        setError(data.error || "Failed to fetch orders");
      }
    } catch (error) {
      setError("Network error");
    } finally {
      setLoading(false);
    }
  };

  const updateOrderStatus = async (orderId, newStatus) => {
    try {
      const res = await fetch(`/api/orders/${orderId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json"
        },
        credentials: 'include',
        body: JSON.stringify({ status: newStatus })
      });

      if (res.ok) {
        await fetchOrders();
        if (selectedOrder && selectedOrder.id === orderId) {
          const updatedOrder = orders.find(o => o.id === orderId);
          setSelectedOrder({ ...updatedOrder, status: newStatus });
        }
      } else {
        const data = await res.json();
        setError(data.error || "Update failed");
      }
    } catch (error) {
      setError("Network error");
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "DELIVERED": return { bg: "#d4edda", color: "#155724" };
      case "SHIPPED": return { bg: "#d1ecf1", color: "#0c5460" };
      case "PROCESSING": return { bg: "#fff3cd", color: "#856404" };
      case "CANCELLED": return { bg: "#f8d7da", color: "#721c24" };
      default: return { bg: "#e2e3e5", color: "#383d41" };
    }
  };

  if (loading) {
    return (
      <main style={{ padding: 20, backgroundColor: colors.background, color: colors.text }}>
        <h2>Orders Management</h2>
        <p>Loading...</p>
      </main>
    );
  }

  return (
    <main style={{ padding: 0, backgroundColor: colors.background, color: colors.text }}>
      <AdminNav />
      <div style={{ padding: 20 }}>
        <h2>Orders Management</h2>

      {error && (
        <div style={{ 
          color: colors.danger, 
          marginBottom: 20, 
          padding: 10, 
          border: `1px solid ${colors.danger}`, 
          borderRadius: 4,
          backgroundColor: `${colors.danger}20`
        }}>
          {error}
        </div>
      )}

      <div>
        {/* Orders List */}
        <div>
          <h3>All Orders ({orders.length})</h3>
          
          {orders.length > 0 ? (
            <div style={{ overflowX: "auto" }}>
              <table style={{ width: "100%", borderCollapse: "collapse", backgroundColor: colors.surface }}>
                <thead>
                  <tr style={{ backgroundColor: colors.primary }}>
                    <th style={{ padding: 10, border: `1px solid ${colors.border}`, textAlign: "left", color: "white" }}>Order ID</th>
                    <th style={{ padding: 10, border: `1px solid ${colors.border}`, textAlign: "left", color: "white" }}>Customer</th>
                    <th style={{ padding: 10, border: `1px solid ${colors.border}`, textAlign: "left", color: "white" }}>Total</th>
                    <th style={{ padding: 10, border: `1px solid ${colors.border}`, textAlign: "left", color: "white" }}>Status</th>
                    <th style={{ padding: 10, border: `1px solid ${colors.border}`, textAlign: "left", color: "white" }}>Date</th>
                    <th style={{ padding: 10, border: `1px solid ${colors.border}`, textAlign: "left", color: "white" }}>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {orders.map((order) => {
                    const statusStyle = getStatusColor(order.status);
                    return (
                      <tr key={order.id} style={{ 
                        backgroundColor: selectedOrder?.id === order.id ? `${colors.primary}20` : colors.surface
                      }}>
                        <td style={{ padding: 10, border: `1px solid ${colors.border}`, color: colors.text }}>
                          {order.id.slice(-8)}
                        </td>
                        <td style={{ padding: 10, border: `1px solid ${colors.border}`, color: colors.text }}>
                          {order.user?.name || (order.userId === null ? "Deleted User" : "Guest")}
                          <div style={{ fontSize: "12px", color: colors.textSecondary }}>
                            {order.user?.email || (order.userId === null ? "User account deleted" : "")}
                          </div>
                        </td>
                        <td style={{ padding: 10, border: `1px solid ${colors.border}`, color: colors.text }}>₹{order.total}</td>
                        <td style={{ padding: 10, border: "1px solid #ddd" }}>
                          <span style={{ 
                            padding: "2px 8px", 
                            borderRadius: 4, 
                            fontSize: "12px",
                            backgroundColor: statusStyle.bg,
                            color: statusStyle.color
                          }}>
                            {order.status}
                          </span>
                        </td>
                        <td style={{ padding: 10, border: "1px solid #ddd" }}>
                          {new Date(order.createdAt).toLocaleDateString()}
                        </td>
                        <td style={{ padding: 10, border: "1px solid #ddd" }}>
                          <button
                            onClick={() => setSelectedOrder(selectedOrder?.id === order.id ? null : order)}
                            style={{
                              padding: "5px 10px",
                              backgroundColor: selectedOrder?.id === order.id ? "#dc3545" : "#007bff",
                              color: "white",
                              border: "none",
                              borderRadius: 3,
                              cursor: "pointer",
                              fontSize: "12px"
                            }}
                          >
                            {selectedOrder?.id === order.id ? "Hide Details" : "View Details"}
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          ) : (
            <div style={{ textAlign: "center", padding: 40, color: "#666" }}>
              <p>No orders found.</p>
            </div>
          )}
        </div>

        {/* Order Details - Now displayed below the table */}
        {selectedOrder && (
          <div 
            ref={orderDetailsRef}
            style={{ 
              marginTop: 30,
              padding: 20, 
              border: "1px solid #ddd", 
              borderRadius: 8,
              backgroundColor: "#f8f9fa"
            }}
          >
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
              <h3 style={{ margin: 0 }}>Order Details</h3>
              <button
                onClick={() => setSelectedOrder(null)}
                style={{
                  padding: "8px 16px",
                  backgroundColor: "#dc3545",
                  color: "white",
                  border: "none",
                  borderRadius: 4,
                  cursor: "pointer",
                  fontSize: "14px"
                }}
              >
                ✕ Close
              </button>
            </div>
            
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: 20 }}>
              {/* Order Information */}
              <div style={{ 
                padding: 15, 
                backgroundColor: "white", 
                borderRadius: 6,
                border: "1px solid #e9ecef"
              }}>
                <h4 style={{ marginTop: 0, color: "#007bff" }}>Order Information</h4>
                
                <div style={{ marginBottom: 10 }}>
                  <strong>Order ID:</strong> {selectedOrder.id}
                </div>
                
                <div style={{ marginBottom: 10 }}>
                  <strong>Customer:</strong> {selectedOrder.user?.name || (selectedOrder.userId === null ? "Deleted User" : "Guest")}
                  {selectedOrder.user?.email ? (
                    <div style={{ fontSize: "14px", color: "#666", marginTop: 2 }}>
                      📧 {selectedOrder.user.email}
                    </div>
                  ) : selectedOrder.userId === null ? (
                    <div style={{ fontSize: "14px", color: "#dc3545", marginTop: 2 }}>
                      ⚠️ User account has been deleted
                    </div>
                  ) : null}
                </div>

                <div style={{ marginBottom: 10 }}>
                  <strong>Order Date:</strong> {new Date(selectedOrder.createdAt).toLocaleString()}
                </div>

                <div style={{ marginBottom: 15 }}>
                  <strong>Status:</strong>
                  <select
                    value={selectedOrder.status}
                    onChange={(e) => updateOrderStatus(selectedOrder.id, e.target.value)}
                    style={{ 
                      marginLeft: 10, 
                      padding: "6px 10px", 
                      borderRadius: 4,
                      border: "1px solid #ddd",
                      fontSize: "14px"
                    }}
                  >
                    <option value="PENDING">Pending</option>
                    <option value="PROCESSING">Processing</option>
                    <option value="SHIPPED">Shipped</option>
                    <option value="DELIVERED">Delivered</option>
                    <option value="CANCELLED">Cancelled</option>
                  </select>
                </div>

                <div style={{ 
                  padding: 12, 
                  backgroundColor: "#007bff", 
                  color: "white", 
                  borderRadius: 4,
                  textAlign: "center",
                  fontSize: "16px",
                  fontWeight: "bold"
                }}>
                  Total: ₹{selectedOrder.total}
                </div>
              </div>

              {/* Order Items */}
              <div style={{ 
                padding: 15, 
                backgroundColor: "white", 
                borderRadius: 6,
                border: "1px solid #e9ecef"
              }}>
                <h4 style={{ marginTop: 0, color: "#28a745" }}>Order Items ({selectedOrder.items.length})</h4>
                
                <div style={{ maxHeight: "300px", overflowY: "auto" }}>
                  {selectedOrder.items.map((item, index) => (
                    <div key={item.id} style={{ 
                      padding: 12, 
                      border: "1px solid #e9ecef", 
                      borderRadius: 4, 
                      marginBottom: 8,
                      backgroundColor: "#f8f9fa"
                    }}>
                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "start" }}>
                        <div style={{ flex: 1 }}>
                          <div style={{ fontWeight: "bold", marginBottom: 4 }}>
                            {index + 1}. {item.product.name}
                          </div>
                          <div style={{ fontSize: "14px", color: "#666" }}>
                            Unit Price: ₹{item.price}
                          </div>
                          <div style={{ fontSize: "14px", color: "#666" }}>
                            Quantity: {item.quantity}
                          </div>
                        </div>
                        <div style={{ 
                          fontWeight: "bold", 
                          color: "#007bff",
                          fontSize: "16px",
                          textAlign: "right"
                        }}>
                          ₹{(item.quantity * item.price).toFixed(2)}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
      </div>
    </main>
  );
}