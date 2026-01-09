"use client";

import { useState } from "react";
import AdminNav from "../../../components/admin-nav";

export default function EmailTest() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);

  const testEmail = async (e) => {
    e.preventDefault();
    setLoading(true);
    setResult(null);

    try {
      const res = await fetch("/api/test-email", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ email })
      });

      const data = await res.json();

      if (res.ok) {
        setResult({ success: true, message: data.message });
      } else {
        setResult({ success: false, message: data.error, details: data.details });
      }
    } catch (error) {
      setResult({ success: false, message: "Network error", details: error.message });
    } finally {
      setLoading(false);
    }
  };

  return (
    <main style={{ padding: 0 }}>
      <AdminNav />
      <div style={{ padding: 20, maxWidth: 600 }}>
        <h2>Email Configuration Test</h2>
        <p style={{ color: "#666", marginBottom: 20 }}>
          Test the email functionality by sending a sample order confirmation email.
        </p>

        <form onSubmit={testEmail}>
          <div style={{ marginBottom: 15 }}>
            <label style={{ display: "block", marginBottom: 5, fontWeight: "bold" }}>
              Test Email Address:
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter email to test"
              required
              style={{
                width: "100%",
                padding: 10,
                border: "1px solid #ddd",
                borderRadius: 4,
                fontSize: 14
              }}
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            style={{
              padding: "10px 20px",
              backgroundColor: loading ? "#ccc" : "#007bff",
              color: "white",
              border: "none",
              borderRadius: 4,
              cursor: loading ? "not-allowed" : "pointer",
              fontSize: 14
            }}
          >
            {loading ? "Sending..." : "Send Test Email"}
          </button>
        </form>

        {result && (
          <div style={{
            marginTop: 20,
            padding: 15,
            borderRadius: 4,
            border: `1px solid ${result.success ? "#28a745" : "#dc3545"}`,
            backgroundColor: result.success ? "#d4edda" : "#f8d7da",
            color: result.success ? "#155724" : "#721c24"
          }}>
            <h4 style={{ margin: "0 0 10px 0" }}>
              {result.success ? "✅ Success" : "❌ Error"}
            </h4>
            <p style={{ margin: "0 0 10px 0" }}>{result.message}</p>
            {result.details && (
              <details>
                <summary style={{ cursor: "pointer", fontWeight: "bold" }}>
                  Technical Details
                </summary>
                <pre style={{ 
                  marginTop: 10, 
                  padding: 10, 
                  backgroundColor: "rgba(0,0,0,0.1)", 
                  borderRadius: 4,
                  fontSize: 12,
                  overflow: "auto"
                }}>
                  {result.details}
                </pre>
              </details>
            )}
          </div>
        )}

        <div style={{ 
          marginTop: 30, 
          padding: 15, 
          backgroundColor: "#f8f9fa", 
          borderRadius: 4,
          fontSize: 14
        }}>
          <h4 style={{ margin: "0 0 10px 0" }}>Current Email Configuration:</h4>
          <ul style={{ margin: 0, paddingLeft: 20 }}>
            <li>SMTP Host: smtp.gmail.com</li>
            <li>SMTP Port: 587 (TLS)</li>
            <li>From Email: kasagojara@gmail.com</li>
          </ul>
          <p style={{ margin: "10px 0 0 0", color: "#666", fontSize: 12 }}>
            Note: Make sure you're using an App Password for Gmail, not your regular password.
          </p>
        </div>
      </div>
    </main>
  );
}