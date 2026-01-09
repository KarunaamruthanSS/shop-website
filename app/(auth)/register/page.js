"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useTranslation } from "../../../lib/translationContext";
import { useToast } from "../../../lib/toastContext";

export default function RegisterPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    phone: "",
    dateOfBirth: ""
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const { t } = useTranslation();
  const { showSuccess, showError } = useToast();
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(formData)
      });

      const data = await res.json();

      if (res.ok) {
        setSuccess(true);
        showSuccess(t('Registration successful!'));
        setTimeout(() => {
          router.push("/login");
        }, 2000);
      } else {
        const errorMessage = data.error || "Registration failed";
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

  if (success) {
    return (
      <>
        <main className="auth-page">
          <div className="auth-container">
            <div className="success-message">
              <h3>{t('Registration Successful!')}</h3>
              <p>{t('Redirecting to login page...')}</p>
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
            background-color: #f8f9fa;
          }

          .auth-container {
            background: white;
            padding: 30px;
            border-radius: 8px;
            box-shadow: 0 4px 12px rgba(0,0,0,0.1);
            width: 100%;
            max-width: 400px;
          }

          .success-message {
            color: #28a745;
            text-align: center;
            padding: 20px;
            border: 1px solid #28a745;
            border-radius: 4px;
            background-color: #d4edda;
          }

          .success-message h3 {
            margin: 0 0 10px 0;
          }

          .success-message p {
            margin: 0;
          }
        `}</style>
      </>
    );
  }

  return (
    <>
      <main className="auth-page">
        <div className="auth-container">
          <h2 className="auth-title">{t('Register')}</h2>

          {error && (
            <div className="error-message">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="auth-form">
            <div className="form-group">
              <input
                type="text"
                placeholder={t('Full Name')}
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                required
                className="form-input"
              />
            </div>

            <div className="form-group">
              <input
                type="email"
                placeholder={t('Email')}
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                required
                className="form-input"
              />
            </div>

            <div className="form-group">
              <input
                type="tel"
                placeholder={t('Phone Number')}
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                className="form-input"
              />
            </div>

            <div className="form-group">
              <label className="form-label">
                {t('Date of Birth (optional)')}:
              </label>
              <input
                type="date"
                value={formData.dateOfBirth}
                onChange={(e) => setFormData({ ...formData, dateOfBirth: e.target.value })}
                className="form-input"
                max={new Date().toISOString().split('T')[0]}
              />
            </div>

            <div className="form-group">
              <input
                type="password"
                placeholder={t('Password (min 6 characters)')}
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                required
                minLength={6}
                className="form-input"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className={`btn btn-primary ${loading ? 'loading' : ''}`}
            >
              {loading ? t('Creating Account...') : t('Register')}
            </button>
          </form>

          <p className="auth-link">
            {t('Already have an account?')} <Link href="/login">{t('Login here')}</Link>
          </p>
        </div>
      </main>

      <style jsx>{`
        .auth-page {
          padding: 20px;
          min-height: calc(100vh - 80px);
          display: flex;
          align-items: center;
          justify-content: center;
          background-color: #f8f9fa;
        }

        .auth-container {
          background: white;
          padding: 30px;
          border-radius: 8px;
          box-shadow: 0 4px 12px rgba(0,0,0,0.1);
          width: 100%;
          max-width: 400px;
        }

        .auth-title {
          text-align: center;
          margin-bottom: 25px;
          color: #333;
          font-size: 1.8rem;
        }

        .error-message {
          color: #dc3545;
          margin-bottom: 15px;
          padding: 10px;
          border: 1px solid #dc3545;
          border-radius: 4px;
          background-color: #f8d7da;
          font-size: 14px;
        }

        .auth-form {
          margin-bottom: 20px;
        }

        .form-group {
          margin-bottom: 15px;
        }

        .form-label {
          display: block;
          margin-bottom: 5px;
          font-size: 14px;
          color: #666;
          font-weight: normal;
        }

        .form-input {
          width: 100%;
          padding: 12px;
          border: 1px solid #ddd;
          border-radius: 4px;
          font-size: 16px;
          box-sizing: border-box;
        }

        .form-input:focus {
          outline: none;
          border-color: #007bff;
          box-shadow: 0 0 0 2px rgba(0,123,255,0.25);
        }

        .btn {
          width: 100%;
          padding: 12px;
          border: none;
          border-radius: 4px;
          cursor: pointer;
          font-size: 16px;
          font-weight: bold;
          transition: background-color 0.2s;
        }

        .btn-primary {
          background-color: #28a745;
          color: white;
        }

        .btn-primary:hover:not(.loading) {
          background-color: #218838;
        }

        .btn.loading {
          background-color: #ccc;
          cursor: not-allowed;
        }

        .auth-link {
          text-align: center;
          color: #666;
        }

        .auth-link a {
          color: #007bff;
          text-decoration: none;
        }

        .auth-link a:hover {
          text-decoration: underline;
        }

        @media (max-width: 768px) {
          .auth-page {
            padding: 15px;
          }

          .auth-container {
            padding: 20px;
          }

          .auth-title {
            font-size: 1.5rem;
          }

          .form-input {
            font-size: 16px; /* Prevents zoom on iOS */
          }
        }

        @media (max-width: 480px) {
          .auth-container {
            padding: 15px;
          }

          .form-group {
            margin-bottom: 12px;
          }
        }
      `}</style>
    </>
  );
}
