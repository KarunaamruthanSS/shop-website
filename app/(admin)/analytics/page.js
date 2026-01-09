"use client";

import { useState, useEffect } from "react";
import AdminNav from "../../../components/admin-nav";

export default function AdminAnalytics() {
  const [analytics, setAnalytics] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [timeRange, setTimeRange] = useState("30"); // days

  useEffect(() => {
    fetchAnalytics();
  }, [timeRange]);

  const fetchAnalytics = async () => {
    try {
      const res = await fetch(`/api/admin/analytics?days=${timeRange}`);
      const data = await res.json();

      if (res.ok) {
        setAnalytics(data);
      } else {
        setError(data.error || "Failed to fetch analytics");
      }
    } catch (error) {
      setError("Network error");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <main style={{ padding: 20 }}>
        <h2>Analytics Dashboard</h2>
        <p>Loading analytics...</p>
      </main>
    );
  }

  if (error) {
    return (
      <main style={{ padding: 20 }}>
        <h2>Analytics Dashboard</h2>
        <div style={{ color: "red", padding: 10, border: "1px solid red", borderRadius: 4 }}>
          {error}
        </div>
      </main>
    );
  }

  return (
    <main style={{ padding: 0 }}>
      <AdminNav />
      <div style={{ padding: 20 }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 30 }}>
          <h2>Analytics Dashboard</h2>
        <select
          value={timeRange}
          onChange={(e) => setTimeRange(e.target.value)}
          style={{ padding: 8, borderRadius: 4, border: "1px solid #ddd" }}
        >
          <option value="7">Last 7 days</option>
          <option value="30">Last 30 days</option>
          <option value="90">Last 90 days</option>
          <option value="365">Last year</option>
        </select>
      </div>

      {analytics && (
        <>
          {/* Key Metrics */}
          <div style={{ 
            display: "grid", 
            gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))", 
            gap: 20, 
            marginBottom: 40 
          }}>
            <div style={{ 
              padding: 20, 
              backgroundColor: "#e3f2fd", 
              borderRadius: 8, 
              border: "1px solid #bbdefb" 
            }}>
              <h3 style={{ margin: "0 0 10px 0", color: "#1976d2" }}>Total Revenue</h3>
              <p style={{ fontSize: "2rem", fontWeight: "bold", margin: 0, color: "#1976d2" }}>
                ₹{analytics.totalRevenue.toFixed(2)}
              </p>
              <p style={{ fontSize: "14px", color: "#666", margin: "5px 0 0 0" }}>
                {analytics.revenueGrowth > 0 ? "+" : ""}{analytics.revenueGrowth.toFixed(1)}% from previous period
              </p>
            </div>

            <div style={{ 
              padding: 20, 
              backgroundColor: "#e8f5e8", 
              borderRadius: 8, 
              border: "1px solid #c8e6c9" 
            }}>
              <h3 style={{ margin: "0 0 10px 0", color: "#388e3c" }}>Total Orders</h3>
              <p style={{ fontSize: "2rem", fontWeight: "bold", margin: 0, color: "#388e3c" }}>
                {analytics.totalOrders}
              </p>
              <p style={{ fontSize: "14px", color: "#666", margin: "5px 0 0 0" }}>
                {analytics.orderGrowth > 0 ? "+" : ""}{analytics.orderGrowth.toFixed(1)}% from previous period
              </p>
            </div>

            <div style={{ 
              padding: 20, 
              backgroundColor: "#fff3e0", 
              borderRadius: 8, 
              border: "1px solid #ffcc02" 
            }}>
              <h3 style={{ margin: "0 0 10px 0", color: "#f57c00" }}>Average Order Value</h3>
              <p style={{ fontSize: "2rem", fontWeight: "bold", margin: 0, color: "#f57c00" }}>
                ₹{analytics.averageOrderValue.toFixed(2)}
              </p>
              <p style={{ fontSize: "14px", color: "#666", margin: "5px 0 0 0" }}>
                {analytics.aovGrowth > 0 ? "+" : ""}{analytics.aovGrowth.toFixed(1)}% from previous period
              </p>
            </div>

            <div style={{ 
              padding: 20, 
              backgroundColor: "#fce4ec", 
              borderRadius: 8, 
              border: "1px solid #f8bbd9" 
            }}>
              <h3 style={{ margin: "0 0 10px 0", color: "#c2185b" }}>New Customers</h3>
              <p style={{ fontSize: "2rem", fontWeight: "bold", margin: 0, color: "#c2185b" }}>
                {analytics.newCustomers}
              </p>
              <p style={{ fontSize: "14px", color: "#666", margin: "5px 0 0 0" }}>
                {analytics.customerGrowth > 0 ? "+" : ""}{analytics.customerGrowth.toFixed(1)}% from previous period
              </p>
            </div>
          </div>

          {/* Top Products */}
          <div style={{ marginBottom: 40 }}>
            <h3>Top Selling Products</h3>
            <div style={{ overflowX: "auto" }}>
              <table style={{ width: "100%", borderCollapse: "collapse" }}>
                <thead>
                  <tr style={{ backgroundColor: "#f8f9fa" }}>
                    <th style={{ padding: 12, border: "1px solid #ddd", textAlign: "left" }}>Product</th>
                    <th style={{ padding: 12, border: "1px solid #ddd", textAlign: "left" }}>Units Sold</th>
                    <th style={{ padding: 12, border: "1px solid #ddd", textAlign: "left" }}>Revenue</th>
                    <th style={{ padding: 12, border: "1px solid #ddd", textAlign: "left" }}>Avg Price</th>
                  </tr>
                </thead>
                <tbody>
                  {analytics.topProducts.map((product, index) => (
                    <tr key={product.id}>
                      <td style={{ padding: 12, border: "1px solid #ddd" }}>
                        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                          <span style={{ 
                            backgroundColor: "#007bff", 
                            color: "white", 
                            borderRadius: "50%", 
                            width: 24, 
                            height: 24, 
                            display: "flex", 
                            alignItems: "center", 
                            justifyContent: "center", 
                            fontSize: "12px" 
                          }}>
                            {index + 1}
                          </span>
                          <div>
                            <strong>{product.name}</strong>
                            <div style={{ fontSize: "12px", color: "#666" }}>
                              {product.category}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td style={{ padding: 12, border: "1px solid #ddd" }}>{product.totalSold}</td>
                      <td style={{ padding: 12, border: "1px solid #ddd" }}>₹{product.totalRevenue.toFixed(2)}</td>
                      <td style={{ padding: 12, border: "1px solid #ddd" }}>₹{product.avgPrice.toFixed(2)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Order Status Distribution */}
          <div style={{ marginBottom: 40 }}>
            <h3>Order Status Distribution</h3>
            <div style={{ 
              display: "grid", 
              gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))", 
              gap: 15 
            }}>
              {analytics.orderStatusDistribution.map((status) => (
                <div key={status.status} style={{
                  padding: 15,
                  backgroundColor: "white",
                  borderRadius: 8,
                  border: "1px solid #ddd",
                  textAlign: "center"
                }}>
                  <div style={{ fontSize: "24px", fontWeight: "bold", marginBottom: 5 }}>
                    {status.count}
                  </div>
                  <div style={{ fontSize: "14px", color: "#666" }}>
                    {status.status}
                  </div>
                  <div style={{ fontSize: "12px", color: "#999", marginTop: 5 }}>
                    {((status.count / analytics.totalOrders) * 100).toFixed(1)}%
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Recent Activity */}
          <div>
            <h3>Recent Activity</h3>
            <div style={{ 
              backgroundColor: "#f8f9fa", 
              borderRadius: 8, 
              padding: 20,
              border: "1px solid #e9ecef"
            }}>
              {analytics.recentActivity.length > 0 ? (
                <div>
                  {analytics.recentActivity.map((activity, index) => (
                    <div key={index} style={{
                      padding: "10px 0",
                      borderBottom: index < analytics.recentActivity.length - 1 ? "1px solid #dee2e6" : "none"
                    }}>
                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                        <div>
                          <strong>{activity.type}</strong>
                          <div style={{ fontSize: "14px", color: "#666" }}>
                            {activity.description}
                          </div>
                        </div>
                        <div style={{ fontSize: "12px", color: "#999" }}>
                          {new Date(activity.timestamp).toLocaleString()}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p style={{ color: "#666", textAlign: "center", margin: 0 }}>
                  No recent activity
                </p>
              )}
            </div>
          </div>
        </>
      )}
      </div>
    </main>
  );
}