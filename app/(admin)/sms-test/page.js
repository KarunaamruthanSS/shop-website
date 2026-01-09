"use client";

import { useState } from "react";
import AdminNav from "../../../components/admin-nav";

export default function SMSTest() {
  const [phone, setPhone] = useState("");
  const [service, setService] = useState("local");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);

  const testSMS = async (e) => {
    e.preventDefault();
    setLoading(true);
    setResult(null);

    try {
      const res = await fetch("/api/test-sms", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ phone, service })
      });

      const data = await res.json();

      if (res.ok) {
        setResult({ success: true, message: data.message, service: data.service });
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
        <h2>SMS Configuration Test</h2>
        <p style={{ color: "#666", marginBottom: 20 }}>
          Test the SMS functionality by sending a sample order confirmation message.
        </p>

        <form onSubmit={testSMS}>
          <div style={{ marginBottom: 15 }}>
            <label style={{ display: "block", marginBottom: 5, fontWeight: "bold" }}>
              Test Phone Number:
            </label>
            <input
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="Enter phone number (e.g., +1234567890)"
              required
              style={{
                width: "100%",
                padding: 10,
                border: "1px solid #ddd",
                borderRadius: 4,
                fontSize: 14
              }}
            />
            <small style={{ color: "#666", fontSize: 12 }}>
              Include country code (e.g., +1 for US, +91 for India)
            </small>
          </div>

          <div style={{ marginBottom: 15 }}>
            <label style={{ display: "block", marginBottom: 5, fontWeight: "bold" }}>
              SMS Service:
            </label>
            <select
              value={service}
              onChange={(e) => setService(e.target.value)}
              style={{
                width: "100%",
                padding: 10,
                border: "1px solid #ddd",
                borderRadius: 4,
                fontSize: 14
              }}
            >
              <option value="local">Local Simulation (Console Log)</option>
              <option value="free">Free Service (Multiple APIs)</option>
              <option value="twilio">Twilio (Requires account setup)</option>
            </select>
          </div>

          <button
            type="submit"
            disabled={loading}
            style={{
              padding: "10px 20px",
              backgroundColor: loading ? "#ccc" : "#28a745",
              color: "white",
              border: "none",
              borderRadius: 4,
              cursor: loading ? "not-allowed" : "pointer",
              fontSize: 14
            }}
          >
            {loading ? "Sending..." : "Send Test SMS"}
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
            {result.service && (
              <p style={{ margin: "0 0 10px 0", fontSize: 12 }}>
                Service used: {result.service}
              </p>
            )}
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
          <h4 style={{ margin: "0 0 15px 0" }}>SMS Service Options:</h4>
          
          <div style={{ marginBottom: 15 }}>
            <h5 style={{ margin: "0 0 5px 0", color: "#28a745" }}>🖥️ Local Simulation (Default)</h5>
            <ul style={{ margin: 0, paddingLeft: 20, fontSize: 13 }}>
              <li>SMS content logged to console</li>
              <li>Perfect for development and testing</li>
              <li>No external API calls</li>
              <li>Works in all countries</li>
            </ul>
          </div>

          <div style={{ marginBottom: 15 }}>
            <h5 style={{ margin: "0 0 5px 0", color: "#ffc107" }}>🆓 Free Service (Multiple APIs)</h5>
            <ul style={{ margin: 0, paddingLeft: 20, fontSize: 13 }}>
              <li>Tries multiple free SMS services</li>
              <li>May have country restrictions</li>
              <li>Limited daily quotas</li>
              <li>Good for testing real SMS delivery</li>
            </ul>
          </div>

          <div>
            <h5 style={{ margin: "0 0 5px 0", color: "#007bff" }}>💼 Twilio (Professional)</h5>
            <ul style={{ margin: 0, paddingLeft: 20, fontSize: 13 }}>
              <li>Unlimited SMS (pay per message)</li>
              <li>Global coverage</li>
              <li>Requires Twilio account setup</li>
              <li>More reliable for production</li>
            </ul>
          </div>

          <div style={{ 
            marginTop: 15, 
            padding: 10, 
            backgroundColor: "#e7f3ff", 
            borderRadius: 4,
            fontSize: 12
          }}>
            <strong>For Production:</strong> Set up a Twilio account and update the environment variables in .env.local
          </div>
        </div>
      </div>
    </main>
  );
}