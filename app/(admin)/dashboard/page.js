"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import AdminNav from "../../../components/admin-nav";

export default function AdminDashboard() {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const res = await fetch("/api/admin/stats", {
        credentials: 'include'
      });
      const data = await res.json();

      if (res.ok) {
        setStats(data);
      } else {
        setError(data.error || "Failed to fetch stats");
      }
    } catch (error) {
      setError("Network error");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <>
        <main className="dashboard-container">
          <div className="loading-container">
            <div className="loading-spinner"></div>
            <h2 className="loading-text">Loading Dashboard...</h2>
          </div>
        </main>
        <style jsx>{`
          .dashboard-container {
            min-height: 100vh;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            display: flex;
            align-items: center;
            justify-content: center;
            padding: 20px;
          }
          .loading-container {
            text-align: center;
            background: rgba(255, 255, 255, 0.95);
            padding: 40px;
            border-radius: 20px;
            box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
            backdrop-filter: blur(10px);
          }
          .loading-spinner {
            width: 50px;
            height: 50px;
            border: 4px solid #f3f3f3;
            border-top: 4px solid #667eea;
            border-radius: 50%;
            animation: spin 1s linear infinite;
            margin: 0 auto 20px;
          }
          .loading-text {
            color: #333;
            font-size: 1.5rem;
            margin: 0;
            background: linear-gradient(45deg, #667eea, #764ba2);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            background-clip: text;
          }
          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
        `}</style>
      </>
    );
  }

  if (error) {
    return (
      <>
        <main className="dashboard-container">
          <div className="error-container">
            <div className="error-icon">⚠️</div>
            <h2 className="error-title">Oops! Something went wrong</h2>
            <div className="error-message">{error}</div>
            <button className="retry-button" onClick={fetchStats}>
              Try Again
            </button>
          </div>
        </main>
        <style jsx>{`
          .dashboard-container {
            min-height: 100vh;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            display: flex;
            align-items: center;
            justify-content: center;
            padding: 20px;
          }
          .error-container {
            text-align: center;
            background: rgba(255, 255, 255, 0.95);
            padding: 40px;
            border-radius: 20px;
            box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
            backdrop-filter: blur(10px);
            max-width: 400px;
          }
          .error-icon {
            font-size: 4rem;
            margin-bottom: 20px;
            animation: bounce 2s infinite;
          }
          .retry-button {
            background: linear-gradient(45deg, #667eea, #764ba2);
            color: white;
            border: none;
            padding: 12px 30px;
            border-radius: 25px;
            cursor: pointer;
            font-size: 16px;
            font-weight: 600;
            transition: all 0.3s ease;
            box-shadow: 0 4px 15px rgba(102, 126, 234, 0.4);
          }
          .retry-button:hover {
            transform: translateY(-2px);
            box-shadow: 0 8px 25px rgba(102, 126, 234, 0.6);
          }
          @keyframes bounce {
            0%, 20%, 50%, 80%, 100% { transform: translateY(0); }
            40% { transform: translateY(-10px); }
            60% { transform: translateY(-5px); }
          }
        `}</style>
      </>
    );
  }
  return (
    <>
      <main className="dashboard-main">
        <div className="dashboard-content">
          <div className="dashboard-header">
            <h1 className="dashboard-title">
              <span className="title-icon">📊</span>
              Admin Dashboard
            </h1>
            <div className="welcome-message">
              Welcome back! Here's what's happening with your store today.
            </div>
          </div>

          {/* Stats Cards */}
          <div className="stats-grid">
            <div className="stat-card users-card">
              <div className="stat-icon">👥</div>
              <div className="stat-content">
                <div className="stat-number">{stats.stats.totalUsers}</div>
                <div className="stat-label">Total Users</div>
              </div>
              <div className="stat-trend">+12% this month</div>
            </div>

            <div className="stat-card products-card">
              <div className="stat-icon">📦</div>
              <div className="stat-content">
                <div className="stat-number">{stats.stats.totalProducts}</div>
                <div className="stat-label">Total Products</div>
              </div>
              <div className="stat-trend">+5% this month</div>
            </div>

            <div className="stat-card orders-card">
              <div className="stat-icon">🛒</div>
              <div className="stat-content">
                <div className="stat-number">{stats.stats.totalOrders}</div>
                <div className="stat-label">Total Orders</div>
              </div>
              <div className="stat-trend">+18% this month</div>
            </div>

            <div className="stat-card revenue-card">
              <div className="stat-icon">💰</div>
              <div className="stat-content">
                <div className="stat-number">₹{stats.stats.totalRevenue.toFixed(2)}</div>
                <div className="stat-label">Total Revenue</div>
              </div>
              <div className="stat-trend">+25% this month</div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="quick-actions-section">
            <h3 className="section-title">
              <span className="section-icon">⚡</span>
              Quick Actions
            </h3>
            <div className="actions-grid">
              <Link href="/admin-products" className="action-link">
                <div className="action-card products-action">
                  <div className="action-icon">📦</div>
                  <div className="action-content">
                    <div className="action-title">Manage Products</div>
                    <div className="action-desc">Add, edit, or remove products</div>
                  </div>
                </div>
              </Link>
              <Link href="/orders" className="action-link">
                <div className="action-card orders-action">
                  <div className="action-icon">📋</div>
                  <div className="action-content">
                    <div className="action-title">View Orders</div>
                    <div className="action-desc">Manage customer orders</div>
                  </div>
                </div>
              </Link>
              <Link href="/analytics" className="action-link">
                <div className="action-card analytics-action">
                  <div className="action-icon">📈</div>
                  <div className="action-content">
                    <div className="action-title">Analytics</div>
                    <div className="action-desc">View detailed reports</div>
                  </div>
                </div>
              </Link>
              <Link href="/users" className="action-link">
                <div className="action-card users-action">
                  <div className="action-icon">👤</div>
                  <div className="action-content">
                    <div className="action-title">Manage Users</div>
                    <div className="action-desc">User administration</div>
                  </div>
                </div>
              </Link>
            </div>
          </div>
          {/* Recent Orders */}
          <div className="recent-orders-section">
            <h3 className="section-title">
              <span className="section-icon">🕒</span>
              Recent Orders
            </h3>
            {stats.recentOrders.length > 0 ? (
              <div className="table-container">
                <table className="modern-table">
                  <thead>
                    <tr>
                      <th>Order ID</th>
                      <th>Customer</th>
                      <th>Total</th>
                      <th>Status</th>
                      <th>Date</th>
                    </tr>
                  </thead>
                  <tbody>
                    {stats.recentOrders.map((order, index) => (
                      <tr key={order.id} className="table-row" style={{ animationDelay: `${index * 0.1}s` }}>
                        <td className="order-id">#{order.id.slice(-8)}</td>
                        <td className="customer-info">
                          <div className="customer-name">
                            {order.user?.name || (order.userId === null ? "Deleted User" : "Guest")}
                          </div>
                          {order.user?.email && (
                            <div className="customer-email">{order.user.email}</div>
                          )}
                        </td>
                        <td className="order-total">₹{order.total}</td>
                        <td>
                          <span className={`status-badge status-${order.status.toLowerCase()}`}>
                            {order.status}
                          </span>
                        </td>
                        <td className="order-date">
                          {new Date(order.createdAt).toLocaleDateString()}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <div className="empty-state">
                <div className="empty-icon">📦</div>
                <div className="empty-text">No recent orders</div>
              </div>
            )}
          </div>

          {/* Low Stock Alert */}
          {stats.lowStockProducts.length > 0 && (
            <div className="low-stock-section">
              <h3 className="section-title alert-title">
                <span className="section-icon">⚠️</span>
                Low Stock Alert
              </h3>
              <div className="alert-container">
                {stats.lowStockProducts.map((product, index) => (
                  <div key={product.id} className="alert-item" style={{ animationDelay: `${index * 0.1}s` }}>
                    <div className="alert-icon">📦</div>
                    <div className="alert-content">
                      <div className="alert-product">{product.name}</div>
                      <div className="alert-stock">Only {product.stock} left in stock</div>
                    </div>
                    <div className="alert-action">
                      <button className="restock-btn">Restock</button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </main>
      <style jsx>{`
        .dashboard-main {
          min-height: 100vh;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          padding: 20px;
        }

        .dashboard-content {
          max-width: 1400px;
          margin: 0 auto;
        }

        .dashboard-header {
          text-align: center;
          margin-bottom: 40px;
          animation: fadeInDown 0.8s ease-out;
        }

        .dashboard-title {
          font-size: 3rem;
          font-weight: 700;
          color: white;
          margin: 0 0 15px 0;
          text-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 15px;
        }

        .title-icon {
          font-size: 3.5rem;
          animation: pulse 2s infinite;
        }

        .welcome-message {
          font-size: 1.2rem;
          color: rgba(255, 255, 255, 0.9);
          font-weight: 300;
        }

        .stats-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
          gap: 25px;
          margin-bottom: 50px;
        }

        .stat-card {
          background: rgba(255, 255, 255, 0.95);
          border-radius: 20px;
          padding: 30px;
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
          backdrop-filter: blur(10px);
          border: 2px solid transparent;
          background-clip: padding-box;
          position: relative;
          overflow: hidden;
          transition: all 0.4s ease;
          animation: fadeInUp 0.8s ease-out;
          animation-fill-mode: both;
        }

        .stat-card::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          border-radius: 20px;
          padding: 2px;
          background: linear-gradient(45deg, #667eea, #764ba2, #f093fb, #f5576c);
          mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
          mask-composite: exclude;
          z-index: -1;
        }

        .stat-card:hover {
          transform: translateY(-10px) scale(1.02);
          box-shadow: 0 20px 40px rgba(0, 0, 0, 0.2);
        }

        .users-card { animation-delay: 0.1s; }
        .products-card { animation-delay: 0.2s; }
        .orders-card { animation-delay: 0.3s; }
        .revenue-card { animation-delay: 0.4s; }

        .stat-icon {
          font-size: 3rem;
          margin-bottom: 15px;
          display: block;
          animation: bounce 2s infinite;
        }

        .stat-content {
          margin-bottom: 15px;
        }

        .stat-number {
          font-size: 2.5rem;
          font-weight: 700;
          color: #333;
          margin-bottom: 5px;
          background: linear-gradient(45deg, #667eea, #764ba2);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .stat-label {
          font-size: 1rem;
          color: #666;
          font-weight: 500;
        }

        .stat-trend {
          font-size: 0.9rem;
          color: #28a745;
          font-weight: 600;
          background: rgba(40, 167, 69, 0.1);
          padding: 5px 10px;
          border-radius: 15px;
          display: inline-block;
        }
        .quick-actions-section, .recent-orders-section, .low-stock-section {
          margin-bottom: 50px;
          animation: fadeInUp 1s ease-out;
        }

        .section-title {
          font-size: 1.8rem;
          font-weight: 600;
          color: white;
          margin-bottom: 25px;
          display: flex;
          align-items: center;
          gap: 10px;
          text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
        }

        .section-icon {
          font-size: 2rem;
        }

        .alert-title {
          color: #ff6b6b;
        }

        .actions-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
          gap: 20px;
        }

        .action-link {
          text-decoration: none;
          display: block;
        }

        .action-card {
          background: rgba(255, 255, 255, 0.95);
          border-radius: 15px;
          padding: 25px;
          display: flex;
          align-items: center;
          gap: 20px;
          transition: all 0.3s ease;
          box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
          border: 2px solid transparent;
          position: relative;
          overflow: hidden;
        }

        .action-card::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          border-radius: 15px;
          padding: 2px;
          background: linear-gradient(45deg, #667eea, #764ba2);
          mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
          mask-composite: exclude;
          opacity: 0;
          transition: opacity 0.3s ease;
          z-index: -1;
        }

        .action-card:hover::before {
          opacity: 1;
        }

        .action-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 15px 30px rgba(0, 0, 0, 0.2);
        }

        .action-icon {
          font-size: 2.5rem;
          opacity: 0.8;
        }

        .action-title {
          font-size: 1.2rem;
          font-weight: 600;
          color: #333;
          margin-bottom: 5px;
        }

        .action-desc {
          font-size: 0.9rem;
          color: #666;
        }

        .table-container {
          background: rgba(255, 255, 255, 0.95);
          border-radius: 20px;
          overflow: hidden;
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
          backdrop-filter: blur(10px);
          border: 2px solid transparent;
          position: relative;
        }

        .table-container::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          border-radius: 20px;
          padding: 2px;
          background: linear-gradient(45deg, #667eea, #764ba2, #f093fb, #f5576c);
          mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
          mask-composite: exclude;
          z-index: -1;
        }
        .modern-table {
          width: 100%;
          border-collapse: collapse;
        }

        .modern-table thead {
          background: linear-gradient(45deg, #667eea, #764ba2);
        }

        .modern-table th {
          padding: 20px;
          text-align: left;
          font-weight: 600;
          color: white;
          font-size: 1rem;
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }

        .modern-table td {
          padding: 20px;
          border-bottom: 1px solid rgba(0, 0, 0, 0.05);
          font-size: 0.95rem;
        }

        .table-row {
          transition: all 0.3s ease;
          animation: slideInLeft 0.6s ease-out;
          animation-fill-mode: both;
        }

        .table-row:hover {
          background: rgba(102, 126, 234, 0.05);
          transform: scale(1.01);
        }

        .order-id {
          font-family: 'Courier New', monospace;
          font-weight: 600;
          color: #667eea;
        }

        .customer-name {
          font-weight: 600;
          color: #333;
        }

        .customer-email {
          font-size: 0.8rem;
          color: #666;
          margin-top: 2px;
        }

        .order-total {
          font-weight: 700;
          color: #28a745;
          font-size: 1.1rem;
        }

        .order-date {
          color: #666;
        }

        .status-badge {
          padding: 6px 12px;
          border-radius: 20px;
          font-size: 0.8rem;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }

        .status-delivered {
          background: linear-gradient(45deg, #28a745, #20c997);
          color: white;
        }

        .status-shipped {
          background: linear-gradient(45deg, #17a2b8, #6f42c1);
          color: white;
        }

        .status-processing {
          background: linear-gradient(45deg, #ffc107, #fd7e14);
          color: white;
        }

        .status-pending {
          background: linear-gradient(45deg, #6c757d, #495057);
          color: white;
        }

        .empty-state {
          text-align: center;
          padding: 60px 20px;
          background: rgba(255, 255, 255, 0.95);
          border-radius: 20px;
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
        }

        .empty-icon {
          font-size: 4rem;
          margin-bottom: 20px;
          opacity: 0.5;
        }

        .empty-text {
          font-size: 1.2rem;
          color: #666;
        }
        .alert-container {
          background: rgba(255, 255, 255, 0.95);
          border-radius: 20px;
          padding: 25px;
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
          border: 2px solid rgba(255, 107, 107, 0.3);
        }

        .alert-item {
          display: flex;
          align-items: center;
          gap: 20px;
          padding: 20px;
          margin-bottom: 15px;
          background: rgba(255, 107, 107, 0.05);
          border-radius: 15px;
          border-left: 4px solid #ff6b6b;
          transition: all 0.3s ease;
          animation: slideInRight 0.6s ease-out;
          animation-fill-mode: both;
        }

        .alert-item:hover {
          transform: translateX(10px);
          background: rgba(255, 107, 107, 0.1);
        }

        .alert-item:last-child {
          margin-bottom: 0;
        }

        .alert-icon {
          font-size: 2rem;
          opacity: 0.7;
        }

        .alert-content {
          flex: 1;
        }

        .alert-product {
          font-weight: 600;
          color: #333;
          margin-bottom: 5px;
        }

        .alert-stock {
          color: #ff6b6b;
          font-size: 0.9rem;
        }

        .restock-btn {
          background: linear-gradient(45deg, #ff6b6b, #ee5a52);
          color: white;
          border: none;
          padding: 8px 16px;
          border-radius: 20px;
          cursor: pointer;
          font-size: 0.9rem;
          font-weight: 600;
          transition: all 0.3s ease;
        }

        .restock-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 5px 15px rgba(255, 107, 107, 0.4);
        }

        @keyframes fadeInDown {
          from {
            opacity: 0;
            transform: translateY(-30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes slideInLeft {
          from {
            opacity: 0;
            transform: translateX(-30px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        @keyframes slideInRight {
          from {
            opacity: 0;
            transform: translateX(30px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        @keyframes pulse {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.1); }
        }

        @keyframes bounce {
          0%, 20%, 50%, 80%, 100% { transform: translateY(0); }
          40% { transform: translateY(-10px); }
          60% { transform: translateY(-5px); }
        }

        @media (max-width: 768px) {
          .dashboard-title {
            font-size: 2rem;
          }
          .title-icon {
            font-size: 2.5rem;
          }
          .stats-grid {
            grid-template-columns: 1fr;
            gap: 20px;
          }
          .actions-grid {
            grid-template-columns: 1fr;
          }
          .modern-table {
            font-size: 0.8rem;
          }
          .modern-table th,
          .modern-table td {
            padding: 10px;
          }
          .action-card {
            flex-direction: column;
            text-align: center;
            gap: 15px;
          }
        }
      `}</style>
    </>
  );
}