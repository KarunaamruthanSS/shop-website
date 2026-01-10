"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useCart } from "../lib/cartContext";
import { useTranslation } from "../lib/translationContext";
import { useToast } from "../lib/toastContext";
import { useSession } from "../lib/sessionContext";
import LanguageSwitcher from "./language-switcher";

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { cartCount, isLoaded: cartLoaded, isAuthenticated } = useCart();
  const { t } = useTranslation();
  const { showSuccess } = useToast();
  const { user, loading, logout } = useSession();
  const router = useRouter();

  const handleLogout = () => {
    logout();
    setMobileMenuOpen(false);
    showSuccess(t('Logout successful!'));
    router.push("/");
  };

  return (
    <>
      <nav className="navbar">
        {/* Desktop Navigation */}
        <div className="nav-container">
          {/* Left side - Logo and main navigation */}
          <div className="nav-left">
            <Link href="/" className="logo-link">
              <h2 className="logo">{t('Sathya Hardwares')} 🛠️</h2>
            </Link>
            <Link href="/products" className="nav-link desktop-only">
              {t('Shop')}
            </Link>
            <Link href="/about-us" className="nav-link desktop-only">
              {t('About')}
            </Link>
            <Link href="/contact-us" className="nav-link desktop-only">
              {t('Contact')}
            </Link>
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="mobile-menu-btn"
          >
            ☰
          </button>

          {/* Desktop Right side - User actions */}
          <div className="nav-right desktop-only">
            {/* Language Switcher */}
            <LanguageSwitcher />

            {/* Cart */}
            <Link href="/cart" className="cart-link">
              {t('Cart')}
              {cartLoaded && isAuthenticated && cartCount > 0 && (
                <span className="cart-badge">
                  {cartCount}
                </span>
              )}
            </Link>

            {loading ? (
              <span className="loading-text">{t('Loading')}...</span>
            ) : user ? (
              <>
                {/* User is logged in - Show name in top right */}
                <div className="user-info">
                  <span className="user-name">
                    👤 {user.name}
                  </span>
                  
                  {user.role === "ADMIN" && (
                    <Link href="/dashboard">
                      <button className="btn btn-admin">
                        {t('Admin')}
                      </button>
                    </Link>
                  )}

                  <button
                    onClick={handleLogout}
                    className="btn btn-logout"
                  >
                    {t('Logout')}
                  </button>
                </div>
              </>
            ) : (
              <>
                {/* User is not logged in */}
                <Link href="/login">
                  <button className="btn btn-login">
                    {t('Login')}
                  </button>
                </Link>
                <Link href="/register">
                  <button className="btn btn-register">
                    {t('Register')}
                  </button>
                </Link>
              </>
            )}
          </div>
        </div>

        {/* Mobile Navigation Menu */}
        {mobileMenuOpen && (
          <>
            {/* Overlay to prevent clicking through */}
            <div className="mobile-nav-overlay" onClick={() => setMobileMenuOpen(false)}></div>
            <div className="mobile-nav-menu">
              <div className="mobile-nav-content">
                {/* Language Switcher */}
                <div className="mobile-nav-item">
                  <LanguageSwitcher />
                </div>

                {/* Shop Link */}
                <Link href="/products" className="mobile-nav-item" onClick={() => setMobileMenuOpen(false)}>
                  🛍️ {t('Shop')}
                </Link>

                {/* About Link */}
                <Link href="/about-us" className="mobile-nav-item" onClick={() => setMobileMenuOpen(false)}>
                  ℹ️ {t('About')}
                </Link>

                {/* Contact Link */}
                <Link href="/contact-us" className="mobile-nav-item" onClick={() => setMobileMenuOpen(false)}>
                  📞 {t('Contact')}
                </Link>

                {/* Cart */}
                <Link href="/cart" className="mobile-nav-item" onClick={() => setMobileMenuOpen(false)}>
                  <div className="mobile-cart">
                    🛒 {t('Cart')}
                    {cartLoaded && isAuthenticated && cartCount > 0 && (
                      <span className="cart-badge mobile">
                        {cartCount}
                      </span>
                    )}
                  </div>
                </Link>

                {loading ? (
                  <span className="mobile-nav-item">{t('Loading')}...</span>
                ) : user ? (
                  <>
                    {/* User is logged in */}
                    <div className="mobile-user-section">
                      <div className="mobile-welcome">
                        👤 {t('Welcome')}, {user.name}
                      </div>
                      
                      <div className="mobile-user-actions">
                        {user.role === "ADMIN" && (
                          <Link href="/dashboard" onClick={() => setMobileMenuOpen(false)}>
                            <button className="btn mobile-btn btn-admin">
                              🔧 {t('Admin Panel')}
                            </button>
                          </Link>
                        )}

                        <button
                          onClick={handleLogout}
                          className="btn mobile-btn btn-logout"
                        >
                          🚪 {t('Logout')}
                        </button>
                      </div>
                    </div>
                  </>
                ) : (
                  <>
                    {/* User is not logged in */}
                    <div className="mobile-auth-section">
                      <Link href="/login" onClick={() => setMobileMenuOpen(false)}>
                        <button className="btn mobile-btn btn-login">
                          🔑 {t('Login')}
                        </button>
                      </Link>
                      <Link href="/register" onClick={() => setMobileMenuOpen(false)}>
                        <button className="btn mobile-btn btn-register">
                          📝 {t('Register')}
                        </button>
                      </Link>
                    </div>
                  </>
                )}
              </div>
            </div>
          </>
        )}
      </nav>

      <style jsx>{`
        .navbar {
          padding: 10px 15px;
          border-bottom: 1px solid #ccc;
          background-color: white;
          box-shadow: 0 2px 4px rgba(0,0,0,0.1);
          position: relative;
          z-index: 100;
        }

        .nav-container {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .nav-left {
          display: flex;
          gap: 20px;
          align-items: center;
        }

        .logo-link {
          text-decoration: none;
        }

        .logo {
          margin: 0;
          color: #007bff;
          font-size: 20px;
        }

        .nav-link {
          text-decoration: none;
          color: #333;
        }

        .mobile-menu-btn {
          display: none;
          background: none;
          border: none;
          font-size: 24px;
          cursor: pointer;
          padding: 5px;
        }

        .nav-right {
          display: flex;
          gap: 15px;
          align-items: center;
        }

        .cart-link {
          position: relative;
          text-decoration: none;
          color: #333;
        }

        .cart-badge {
          position: absolute;
          top: -8px;
          right: -12px;
          background: red;
          color: white;
          border-radius: 50%;
          padding: 2px 6px;
          font-size: 12px;
          min-width: 18px;
          text-align: center;
        }

        .cart-badge.mobile {
          position: static;
          margin-left: 10px;
        }

        .loading-text {
          color: #666;
        }

        .user-info {
          display: flex;
          gap: 12px;
          align-items: center;
        }

        .user-name {
          color: #333;
          font-weight: 500;
          font-size: 14px;
          padding: 6px 10px;
          background-color: #f8f9fa;
          border-radius: 20px;
          border: 1px solid #e9ecef;
        }

        .btn {
          padding: 6px 12px;
          border: none;
          border-radius: 4px;
          cursor: pointer;
          font-size: 12px;
          text-decoration: none;
          display: inline-block;
          text-align: center;
          font-weight: 500;
          transition: all 0.2s;
        }

        .btn-admin {
          background-color: #28a745;
          color: white;
        }

        .btn-admin:hover {
          background-color: #218838;
        }

        .btn-logout {
          background-color: #dc3545;
          color: white;
        }

        .btn-logout:hover {
          background-color: #c82333;
        }

        .btn-login {
          background-color: #007bff;
          color: white;
          padding: 8px 16px;
        }

        .btn-login:hover {
          background-color: #0056b3;
        }

        .btn-register {
          background-color: #28a745;
          color: white;
          padding: 8px 16px;
        }

        .btn-register:hover {
          background-color: #218838;
        }

        .mobile-btn {
          width: 100%;
          padding: 12px;
          font-size: 14px;
        }

        .mobile-nav-overlay {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background-color: rgba(0, 0, 0, 0.5);
          z-index: 999;
        }

        .mobile-nav-menu {
          position: absolute;
          top: 100%;
          left: 0;
          right: 0;
          background-color: white;
          border: 1px solid #ccc;
          border-top: none;
          padding: 15px;
          z-index: 1000;
          box-shadow: 0 4px 8px rgba(0,0,0,0.1);
          max-height: 80vh;
          overflow-y: auto;
        }

        .mobile-nav-content {
          display: flex;
          flex-direction: column;
          gap: 15px;
        }

        .mobile-nav-item {
          text-decoration: none;
          color: #333;
          padding: 10px;
          border-bottom: 1px solid #eee;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .mobile-cart {
          display: flex;
          align-items: center;
          justify-content: space-between;
          width: 100%;
        }

        .mobile-user-section {
          padding: 10px;
          border-bottom: 1px solid #eee;
        }

        .mobile-welcome {
          margin-bottom: 10px;
          color: #333;
          text-align: center;
          font-weight: 500;
        }

        .mobile-user-actions {
          display: flex;
          flex-direction: column;
          gap: 8px;
        }

        .mobile-auth-section {
          display: flex;
          flex-direction: column;
          gap: 10px;
          padding: 10px;
        }

        .desktop-only {
          display: block;
        }

        @media (max-width: 768px) {
          .logo {
            font-size: 18px;
          }

          .desktop-only {
            display: none !important;
          }

          .mobile-menu-btn {
            display: block !important;
          }

          .user-name {
            display: none;
          }
        }
      `}</style>
    </>
  );
}
