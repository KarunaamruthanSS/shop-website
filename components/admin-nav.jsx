"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTranslation } from "../lib/translationContext";

export default function AdminNav() {
  const pathname = usePathname();
  const { t } = useTranslation();

  const navItems = [
    { href: "/dashboard", label: t('Dashboard'), icon: "📊" },
    { href: "/admin-products", label: t('Products'), icon: "📦" },
    { href: "/orders", label: t('Orders'), icon: "📋" },
    { href: "/users", label: t('Users'), icon: "👥" },
    { href: "/analytics", label: t('Analytics'), icon: "📈" }
    /*{ href: "/email-test", label: t('Email Test'), icon: "📧" },
    { href: "/sms-test", label: t('SMS Test'), icon: "📱" }*/
  ];

  return (
    <>
      <div className="admin-nav">
        <span className="admin-nav-title">{t('Admin Panel')}:</span>
        
        <div className="admin-nav-items">
          {navItems.map((item) => (
            <Link key={item.href} href={item.href}>
              <div className={`admin-nav-item ${pathname === item.href ? 'active' : ''}`}>
                <span className="nav-icon">{item.icon}</span>
                <span className="nav-label">{item.label}</span>
              </div>
            </Link>
          ))}
          
          <Link href="/">
            <div className="admin-nav-item back-to-shop">
              <span className="nav-icon">←</span>
              <span className="nav-label">{t('Back to Shop')}</span>
            </div>
          </Link>
        </div>
      </div>

      <style jsx>{`
        .admin-nav {
          background-color: #f8f9fa;
          padding: 15px 20px;
          border-bottom: 1px solid #e9ecef;
          display: flex;
          align-items: center;
          gap: 20px;
          overflow-x: auto;
        }

        .admin-nav-title {
          font-weight: bold;
          color: #495057;
          white-space: nowrap;
          margin-right: 10px;
        }

        .admin-nav-items {
          display: flex;
          gap: 15px;
          align-items: center;
          overflow-x: auto;
          flex: 1;
        }

        .admin-nav-item {
          padding: 8px 16px;
          border-radius: 6px;
          background-color: white;
          color: #495057;
          border: 1px solid #dee2e6;
          cursor: pointer;
          transition: all 0.2s;
          white-space: nowrap;
          display: flex;
          align-items: center;
          gap: 6px;
          font-size: 14px;
          text-decoration: none;
          min-width: fit-content;
        }

        .admin-nav-item:hover {
          background-color: #e9ecef;
        }

        .admin-nav-item.active {
          background-color: #007bff;
          color: white;
        }

        .admin-nav-item.back-to-shop {
          background-color: #6c757d;
          color: white;
          border-color: #6c757d;
        }

        .nav-icon {
          font-size: 14px;
        }

        .nav-label {
          font-size: 14px;
        }

        @media (max-width: 768px) {
          .admin-nav {
            padding: 10px 15px;
            gap: 10px;
          }

          .admin-nav-title {
            font-size: 14px;
            margin-right: 5px;
          }

          .admin-nav-items {
            gap: 8px;
          }

          .admin-nav-item {
            padding: 6px 10px;
            font-size: 12px;
            gap: 4px;
          }

          .nav-label {
            display: none;
          }

          .nav-icon {
            font-size: 28px;
          }
        }

        @media (max-width: 580px) {
          .admin-nav {
            padding: 8px 10px;
          }

          .admin-nav-title {
            display: none;
          }

          .admin-nav-item {
            padding: 8px;
            min-width: 40px;
            justify-content: center;
          }
        }
      `}</style>
    </>
  );
}