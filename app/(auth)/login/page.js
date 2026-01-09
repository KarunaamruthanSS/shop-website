"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useTranslation } from "../../../lib/translationContext";
import { useToast } from "../../../lib/toastContext";
import { useSession } from "../../../lib/sessionContext";

export default function LoginPage() {
  const [loginMode, setLoginMode] = useState('mobile'); // 'mobile' or 'email'
  const [formData, setFormData] = useState({
    identifier: "",
    password: ""
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const { t } = useTranslation();
  const { showSuccess, showError } = useToast();
  const { login } = useSession();
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    // Basic validation
    if (loginMode === 'mobile') {
      const phoneRegex = /^\+?[1-9]\d{1,14}$/
      if (!phoneRegex.test(formData.identifier.replace(/\s/g, ''))) {
        setError('Please enter a valid phone number (e.g., +1234567890)');
        setLoading(false);
        return;
      }
    }

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(formData)
      });

      const data = await res.json();

      if (res.ok) {
        // Create session with user data
        login(data.user);
        
        // Show success toast
        showSuccess(t('Login successful!'));
        
        // Small delay then redirect
        setTimeout(() => {
          // Redirect based on role
          if (data.user.role === "ADMIN") {
            router.push("/dashboard");
          } else {
            router.push("/");
          }
        }, 500);
      } else {
        const errorMessage = data.error || "Login failed";
        setError(errorMessage);
        showError(errorMessage);
      }
    } catch (error) {
      const errorMessage = "Network error. Please try again.";
      setError(errorMessage);
      showError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <main className="auth-page">
        <div className="auth-container">
          <h2 className="auth-title">{t('Login')}</h2>

          {error && (
            <div className="error-message">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="auth-form">
            {/* Login Mode Toggle */}
            <div className="login-mode-toggle">
              <button
                type="button"
                className={`mode-btn ${loginMode === 'mobile' ? 'active' : ''}`}
                onClick={() => {
                  setLoginMode('mobile');
                  setFormData({ identifier: "", password: "" });
                  setError("");
                }}
              >
                📱 {t('Mobile Number')}
              </button>
              <button
                type="button"
                className={`mode-btn ${loginMode === 'email' ? 'active' : ''}`}
                onClick={() => {
                  setLoginMode('email');
                  setFormData({ identifier: "", password: "" });
                  setError("");
                }}
              >
                ✉️ {t('Email ID')}
              </button>
            </div>

            <div className="form-group">
              <input
                type={loginMode === 'email' ? 'email' : 'tel'}
                placeholder={loginMode === 'email' ? t('Email') : t('Mobile Number')}
                value={formData.identifier}
                onChange={(e) => {
                  let value = e.target.value;
                  // Auto-add + for phone numbers if not present
                  /*if (loginMode === 'mobile' && value && !value.startsWith('+') && /^\d/.test(value)) {
                    value = value;
                  }*/
                  setFormData({ ...formData, identifier: value });
                }}
                required
                className="form-input"
              />
              {loginMode === 'mobile' && (
                <div className="helper-text">
                  {t('Format: +1234567890 (include country code)')}
                </div>
              )}
            </div>

            <div className="form-group">
              <input
                type="password"
                placeholder={t('Password')}
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                required
                className="form-input"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className={`btn btn-primary ${loading ? 'loading' : ''}`}
            >
              {loading ? t('Logging in...') : t('Login')}
            </button>
          </form>

          <p className="auth-link">
            {t('Don\'t have an account?')} <Link href="/register">{t('Register here')}</Link>
          </p>

          <div className="test-accounts">
            <h4>{t('Test Accounts')}:</h4>
            <p><strong>{t('Admin')}:</strong> admin@hardware.com / +1234567890 / admin123</p>
            <p><strong>User:</strong> user@test.com / +9876543210 / user123</p>
          </div>

          <div className="session-info">
            <p style={{ fontSize: "12px", color: "#666", textAlign: "center", marginTop: "15px" }}>
              ⏰ Sessions expire after 7 minutes of inactivity
            </p>
          </div>
        </div>
      </main>

      <style jsx>{`
        .auth-page {
          padding: 20px;
          min-height: calc(100vh - 80px);
          display: flex;
          align-items: center;
          justify-content: center;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          position: relative;
          overflow: hidden;
        }

        .auth-page::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><defs><pattern id="grain" width="100" height="100" patternUnits="userSpaceOnUse"><circle cx="25" cy="25" r="1" fill="white" opacity="0.1"/><circle cx="75" cy="75" r="1" fill="white" opacity="0.1"/><circle cx="50" cy="10" r="0.5" fill="white" opacity="0.1"/><circle cx="10" cy="60" r="0.5" fill="white" opacity="0.1"/><circle cx="90" cy="40" r="0.5" fill="white" opacity="0.1"/></pattern></defs><rect width="100" height="100" fill="url(%23grain)"/></svg>');
          animation: float 20s ease-in-out infinite;
        }

        .auth-container {
          background: rgba(255, 255, 255, 0.95);
          padding: 40px;
          border-radius: 25px;
          box-shadow: 0 25px 50px rgba(0, 0, 0, 0.15);
          width: 100%;
          max-width: 450px;
          backdrop-filter: blur(20px);
          border: 2px solid transparent;
          background-clip: padding-box;
          position: relative;
          overflow: hidden;
          animation: slideInUp 0.8s ease-out;
        }

        .auth-container::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          border-radius: 25px;
          padding: 2px;
          background: linear-gradient(45deg, #667eea, #764ba2, #f093fb, #f5576c);
          mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
          mask-composite: exclude;
          z-index: -1;
        }

        .auth-title {
          text-align: center;
          margin-bottom: 30px;
          color: #333;
          font-size: 2.2rem;
          font-weight: 700;
          background: linear-gradient(45deg, #667eea, #764ba2);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          animation: fadeInDown 0.8s ease-out 0.2s both;
        }

        .error-message {
          color: #dc3545;
          margin-bottom: 20px;
          padding: 15px;
          border: 1px solid rgba(220, 53, 69, 0.3);
          border-radius: 15px;
          background: linear-gradient(135deg, rgba(220, 53, 69, 0.1), rgba(220, 53, 69, 0.05));
          font-size: 14px;
          animation: shake 0.5s ease-in-out;
          backdrop-filter: blur(10px);
        }

        .auth-form {
          margin-bottom: 25px;
        }

        .login-mode-toggle {
          display: flex;
          margin-bottom: 25px;
          border-radius: 15px;
          overflow: hidden;
          border: 2px solid transparent;
          background: linear-gradient(45deg, #667eea, #764ba2) border-box;
          animation: fadeInUp 0.8s ease-out 0.3s both;
        }

        .mode-btn {
          flex: 1;
          padding: 15px 20px;
          border: none;
          background: rgba(255, 255, 255, 0.9);
          color: #666;
          cursor: pointer;
          font-size: 15px;
          font-weight: 600;
          transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
          position: relative;
          overflow: hidden;
        }

        .mode-btn::before {
          content: '';
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%;
          height: 100%;
          background: linear-gradient(45deg, #667eea, #764ba2);
          transition: left 0.4s cubic-bezier(0.4, 0, 0.2, 1);
          z-index: -1;
        }

        .mode-btn.active::before {
          left: 0;
        }

        .mode-btn.active {
          color: white;
          transform: scale(1.02);
        }

        .mode-btn:hover:not(.active) {
          background: rgba(102, 126, 234, 0.1);
          transform: translateY(-2px);
        }

        .form-group {
          margin-bottom: 20px;
          animation: fadeInUp 0.8s ease-out;
          animation-fill-mode: both;
        }

        .form-group:nth-child(2) { animation-delay: 0.4s; }
        .form-group:nth-child(3) { animation-delay: 0.5s; }

        .form-input {
          width: 100%;
          padding: 18px 20px;
          border: 2px solid rgba(102, 126, 234, 0.2);
          border-radius: 15px;
          font-size: 16px;
          box-sizing: border-box;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          background: rgba(255, 255, 255, 0.9);
          backdrop-filter: blur(10px);
        }

        .form-input:focus {
          outline: none;
          border-color: #667eea;
          box-shadow: 0 0 0 4px rgba(102, 126, 234, 0.1);
          transform: translateY(-2px);
          background: white;
        }

        .helper-text {
          font-size: 12px;
          color: #666;
          margin-top: 8px;
          padding-left: 8px;
          opacity: 0.8;
          animation: fadeIn 0.3s ease-out;
        }

        .btn {
          width: 100%;
          padding: 18px;
          border: none;
          border-radius: 15px;
          cursor: pointer;
          font-size: 16px;
          font-weight: 700;
          transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
          position: relative;
          overflow: hidden;
          animation: fadeInUp 0.8s ease-out 0.6s both;
        }

        .btn-primary {
          background: linear-gradient(45deg, #667eea, #764ba2);
          color: white;
          box-shadow: 0 8px 25px rgba(102, 126, 234, 0.4);
        }

        .btn-primary::before {
          content: '';
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%;
          height: 100%;
          background: linear-gradient(45deg, #764ba2, #667eea);
          transition: left 0.4s cubic-bezier(0.4, 0, 0.2, 1);
          z-index: -1;
        }

        .btn-primary:hover:not(.loading)::before {
          left: 0;
        }

        .btn-primary:hover:not(.loading) {
          transform: translateY(-3px);
          box-shadow: 0 15px 35px rgba(102, 126, 234, 0.6);
        }

        .btn.loading {
          background: linear-gradient(45deg, #ccc, #bbb);
          cursor: not-allowed;
          transform: none;
          box-shadow: none;
        }

        .btn.loading::after {
          content: '';
          position: absolute;
          top: 50%;
          left: 50%;
          width: 20px;
          height: 20px;
          margin: -10px 0 0 -10px;
          border: 2px solid transparent;
          border-top: 2px solid white;
          border-radius: 50%;
          animation: spin 1s linear infinite;
        }

        .auth-link {
          text-align: center;
          margin-bottom: 25px;
          color: #666;
          animation: fadeInUp 0.8s ease-out 0.7s both;
        }

        .auth-link a {
          color: #667eea;
          text-decoration: none;
          font-weight: 600;
          transition: all 0.3s ease;
          position: relative;
        }

        .auth-link a::after {
          content: '';
          position: absolute;
          bottom: -2px;
          left: 0;
          width: 0;
          height: 2px;
          background: linear-gradient(45deg, #667eea, #764ba2);
          transition: width 0.3s ease;
        }

        .auth-link a:hover::after {
          width: 100%;
        }

        .test-accounts {
          padding: 20px;
          background: linear-gradient(135deg, rgba(102, 126, 234, 0.1), rgba(118, 75, 162, 0.1));
          border-radius: 15px;
          border: 1px solid rgba(102, 126, 234, 0.2);
          margin-bottom: 20px;
          backdrop-filter: blur(10px);
          animation: fadeInUp 0.8s ease-out 0.8s both;
        }

        .test-accounts h4 {
          margin: 0 0 15px 0;
          color: #333;
          font-size: 1.1rem;
          font-weight: 600;
        }

        .test-accounts p {
          margin: 8px 0;
          font-size: 14px;
          color: #555;
          padding: 8px 12px;
          background: rgba(255, 255, 255, 0.7);
          border-radius: 8px;
          transition: all 0.3s ease;
        }

        .test-accounts p:hover {
          background: rgba(255, 255, 255, 0.9);
          transform: translateX(5px);
        }

        .session-info {
          padding: 15px;
          background: linear-gradient(135deg, rgba(33, 150, 243, 0.1), rgba(33, 150, 243, 0.05));
          border-radius: 15px;
          border: 1px solid rgba(33, 150, 243, 0.2);
          animation: fadeInUp 0.8s ease-out 0.9s both;
        }

        .session-info p {
          font-size: 12px;
          color: #666;
          text-align: center;
          margin: 0;
        }

        @keyframes slideInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes fadeInDown {
          from {
            opacity: 0;
            transform: translateY(-20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }

        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          25% { transform: translateX(-5px); }
          75% { transform: translateX(5px); }
        }

        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }

        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-10px) rotate(180deg); }
        }

        @media (max-width: 768px) {
          .auth-page {
            padding: 15px;
          }

          .auth-container {
            padding: 30px 25px;
          }

          .auth-title {
            font-size: 1.8rem;
          }

          .form-input {
            font-size: 16px;
            padding: 16px 18px;
          }

          .login-mode-toggle {
            margin-bottom: 20px;
          }

          .mode-btn {
            padding: 12px 16px;
            font-size: 14px;
          }
        }

        @media (max-width: 480px) {
          .auth-container {
            padding: 25px 20px;
          }

          .test-accounts {
            padding: 15px;
          }

          .test-accounts p {
            font-size: 13px;
          }
        }
      `}</style>
    </>
  );
}
