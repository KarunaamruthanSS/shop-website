"use client";

import { useState, useEffect } from "react";
import AdminNav from "../../../components/admin-nav";

export default function AdminUsers() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const res = await fetch("/api/admin/users");
      const data = await res.json();

      if (res.ok) {
        setUsers(data.users);
      } else {
        setError(data.error || "Failed to fetch users");
      }
    } catch (error) {
      setError("Network error");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (userId) => {
    const user = users.find(u => u.id === userId);
    const hasOrders = user?._count?.orders > 0;
    
    const confirmMessage = hasOrders 
      ? `Are you sure you want to delete this user?\n\nThis user has ${user._count.orders} order(s). The user will be deleted but their orders will be preserved and marked as "Deleted User".`
      : "Are you sure you want to delete this user?";
    
    if (!confirm(confirmMessage)) return;

    try {
      const res = await fetch(`/api/admin/users/${userId}`, {
        method: "DELETE",
        credentials: 'include'
      });

      const data = await res.json();

      if (res.ok) {
        await fetchUsers();
        if (data.message) {
          alert(data.message);
        }
      } else {
        setError(data.error || "Delete failed");
      }
    } catch (error) {
      setError("Network error");
    }
  };

  if (loading) {
    return (
      <main style={{ padding: 20 }}>
        <h2>User Management</h2>
        <p>Loading...</p>
      </main>
    );
  }

  return (
    <main style={{ padding: 0 }}>
      <AdminNav />
      <div style={{ padding: 20 }}>
        <h2>User Management</h2>

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

      <div style={{ marginBottom: 20 }}>
        <p>Total Users: <strong>{users.length}</strong></p>
      </div>

      {users.length > 0 ? (
        <div style={{ overflowX: "auto" }}>
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead>
              <tr style={{ backgroundColor: "#f8f9fa" }}>
                <th style={{ padding: 10, border: "1px solid #ddd", textAlign: "left" }}>Name</th>
                <th style={{ padding: 10, border: "1px solid #ddd", textAlign: "left" }}>Email</th>
                <th style={{ padding: 10, border: "1px solid #ddd", textAlign: "left" }}>Phone</th>
                <th style={{ padding: 10, border: "1px solid #ddd", textAlign: "left" }}>Age</th>
                <th style={{ padding: 10, border: "1px solid #ddd", textAlign: "left" }}>Role</th>
                <th style={{ padding: 10, border: "1px solid #ddd", textAlign: "left" }}>Orders</th>
                <th style={{ padding: 10, border: "1px solid #ddd", textAlign: "left" }}>Joined</th>
                <th style={{ padding: 10, border: "1px solid #ddd", textAlign: "left" }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => {
                const age = user.dateOfBirth 
                  ? Math.floor((new Date() - new Date(user.dateOfBirth)) / (365.25 * 24 * 60 * 60 * 1000))
                  : null;
                
                return (
                  <tr key={user.id}>
                    <td style={{ padding: 10, border: "1px solid #ddd" }}>
                      <strong>{user.name}</strong>
                    </td>
                    <td style={{ padding: 10, border: "1px solid #ddd" }}>
                      {user.email}
                    </td>
                    <td style={{ padding: 10, border: "1px solid #ddd" }}>
                      {user.phone || "Not provided"}
                    </td>
                    <td style={{ padding: 10, border: "1px solid #ddd" }}>
                      {age ? `${age} years` : "Not provided"}
                    </td>
                    <td style={{ padding: 10, border: "1px solid #ddd" }}>
                      <span style={{ 
                        padding: "2px 8px", 
                        borderRadius: 4, 
                        fontSize: "12px",
                        backgroundColor: user.role === "ADMIN" ? "#d4edda" : "#e2e3e5",
                        color: user.role === "ADMIN" ? "#155724" : "#383d41"
                      }}>
                        {user.role}
                      </span>
                    </td>
                    <td style={{ padding: 10, border: "1px solid #ddd" }}>
                      {user._count.orders} orders
                    </td>
                    <td style={{ padding: 10, border: "1px solid #ddd" }}>
                      {new Date(user.createdAt).toLocaleDateString()}
                    </td>
                    <td style={{ padding: 10, border: "1px solid #ddd" }}>
                      <button
                        onClick={() => handleDelete(user.id)}
                        style={{
                          padding: "5px 10px",
                          backgroundColor: user._count.orders > 0 ? "#fd7e14" : "#dc3545",
                          color: "white",
                          border: "none",
                          borderRadius: 3,
                          cursor: "pointer",
                          fontSize: "12px"
                        }}
                        title={user._count.orders > 0 ? `This user has ${user._count.orders} orders. Orders will be preserved.` : "Delete user"}
                      >
                        {user._count.orders > 0 ? "⚠️ Delete" : "Delete"}
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
          <p>No users found.</p>
        </div>
      )}
      </div>
    </main>
  );
}