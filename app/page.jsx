"use client";

import Link from "next/link";
import { useTranslation } from "../lib/translationContext";

export default function HomePage() {
  const { t } = useTranslation();

  return (
    <>
      <main className="homepage">
        {/* Hero Section */}
        <div className="hero-section">
          <h1 className="hero-title">
            {t('Sathya Hardwares')} 🛠️
          </h1>
          <p className="hero-description">
            {t('Your one-stop destination for quality electrical & hardware items. From LED bulbs to circuit breakers, we have everything you need for your projects.')}
          </p>
          
          <div className="hero-buttons">
            <Link href="/products">
              <button className="btn btn-primary">
                {t('Shop Now')}
              </button>
            </Link>
            
            <Link href="/register">
              <button className="btn btn-secondary">
                {t('Create Account')}
              </button>
            </Link>
          </div>
        </div>

        {/* Features Section */}
        <div className="section">
          <h2 className="section-title">{t('Why Choose Us?')}</h2>
          <div className="features-grid">
            <div className="feature-card">
              <div className="feature-icon">⚡</div>
              <h3 className="feature-title">{t('Quality Products')}</h3>
              <p className="feature-description">
                {t('Premium electrical and hardware items from trusted brands')}
              </p>
            </div>

            <div className="feature-card">
              <div className="feature-icon">🚚</div>
              <h3 className="feature-title">{t('Fast Delivery')}</h3>
              <p className="feature-description">
                {t('Quick and reliable delivery to your doorstep')}
              </p>
            </div>

            <div className="feature-card">
              <div className="feature-icon">💰</div>
              <h3 className="feature-title">{t('Best Prices')}</h3>
              <p className="feature-description">
                {t('Competitive pricing with great value for money')}
              </p>
            </div>

            <div className="feature-card">
              <div className="feature-icon">🛡️</div>
              <h3 className="feature-title">{t('Secure Shopping')}</h3>
              <p className="feature-description">
                {t('Safe and secure online shopping experience')}
              </p>
            </div>
          </div>
        </div>

        {/* Categories Section */}
        <div className="section">
          <h2 className="section-title">{t('Shop by Category')}</h2>
          <div className="categories-grid">
            {[
              { name: t('Lighting'), icon: "💡", description: t('LED bulbs, fixtures & more') },
              { name: t('Electrical'), icon: "🔌", description: t('Switches, sockets & wiring') },
              { name: t('Protection'), icon: "⚡", description: t('Circuit breakers & safety') },
              { name: t('Accessories'), icon: "🔧", description: t('Extension cords & tools') }
            ].map((category) => (
              <Link key={category.name} href="/products">
                <div className="category-card">
                  <div className="category-icon">{category.icon}</div>
                  <h4 className="category-title">{category.name}</h4>
                  <p className="category-description">
                    {category.description}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <div className="cta-section">
          <h2 className="cta-title">{t('Ready to Start Shopping?')}</h2>
          <p className="cta-description">
            {t('Browse our extensive collection of hardware and electrical items')}
          </p>
          <Link href="/products">
            <button className="btn btn-cta">
              {t('View All Products')}
            </button>
          </Link>
        </div>
      </main>

      <style jsx>{`
        .homepage {
          padding: 15px;
          max-width: 1200px;
          margin: 0 auto;
        }

        .hero-section {
          text-align: center;
          padding: 30px 15px;
          background-color: #f8f9fa;
          border-radius: 12px;
          margin-bottom: 30px;
        }

        .hero-title {
          font-size: 2rem;
          margin: 0 0 20px 0;
          color: #007bff;
        }

        .hero-description {
          font-size: 1rem;
          color: #666;
          margin-bottom: 25px;
          line-height: 1.5;
          max-width: 600px;
          margin-left: auto;
          margin-right: auto;
        }

        .hero-buttons {
          display: flex;
          gap: 15px;
          justify-content: center;
          flex-wrap: wrap;
        }

        .section {
          margin-bottom: 30px;
        }

        .section-title {
          text-align: center;
          margin-bottom: 25px;
          font-size: 1.5rem;
          color: #333;
        }

        .features-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
          gap: 20px;
        }

        .feature-card {
          text-align: center;
          padding: 20px;
          background-color: white;
          border-radius: 8px;
          box-shadow: 0 2px 8px rgba(0,0,0,0.1);
        }

        .feature-icon {
          font-size: 2.5rem;
          margin-bottom: 15px;
        }

        .feature-title {
          color: #007bff;
          margin-bottom: 10px;
          font-size: 1.2rem;
        }

        .feature-description {
          color: #666;
          line-height: 1.6;
          font-size: 14px;
        }

        .categories-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
          gap: 15px;
        }

        .category-card {
          padding: 20px;
          background-color: #f8f9fa;
          border-radius: 8px;
          text-align: center;
          cursor: pointer;
          transition: transform 0.2s;
          border: 1px solid #e9ecef;
          text-decoration: none;
          color: inherit;
        }

        .category-card:hover {
          transform: translateY(-2px);
          box-shadow: 0 4px 8px rgba(0,0,0,0.15);
        }

        .category-icon {
          font-size: 2rem;
          margin-bottom: 10px;
        }

        .category-title {
          margin: 0 0 8px 0;
          color: #007bff;
          font-size: 1.1rem;
        }

        .category-description {
          margin: 0;
          font-size: 13px;
          color: #666;
        }

        .cta-section {
          text-align: center;
          padding: 30px 20px;
          background-color: #007bff;
          color: white;
          border-radius: 12px;
        }

        .cta-title {
          margin: 0 0 15px 0;
          font-size: 1.5rem;
        }

        .cta-description {
          margin: 0 0 20px 0;
          font-size: 1rem;
          line-height: 1.5;
        }

        .btn {
          padding: 12px 25px;
          font-size: 16px;
          border: none;
          border-radius: 8px;
          cursor: pointer;
          font-weight: bold;
          text-decoration: none;
          display: inline-block;
          min-width: 150px;
        }

        .btn-primary {
          background-color: #007bff;
          color: white;
        }

        .btn-secondary {
          background-color: #28a745;
          color: white;
        }

        .btn-cta {
          background-color: white;
          color: #007bff;
          min-width: 180px;
        }

        @media (max-width: 768px) {
          .homepage {
            padding: 10px;
          }

          .hero-section {
            padding: 25px 15px;
            margin-bottom: 25px;
          }

          .hero-title {
            font-size: 1.8rem;
          }

          .hero-description {
            font-size: 0.9rem;
          }

          .hero-buttons {
            flex-direction: column;
            align-items: center;
          }

          .btn {
            width: 100%;
            max-width: 250px;
          }

          .section-title {
            font-size: 1.3rem;
          }

          .features-grid {
            grid-template-columns: 1fr;
            gap: 15px;
          }

          .categories-grid {
            grid-template-columns: repeat(2, 1fr);
            gap: 10px;
          }

          .category-card {
            padding: 15px;
          }

          .category-icon {
            font-size: 1.5rem;
          }

          .category-title {
            font-size: 1rem;
          }

          .category-description {
            font-size: 12px;
          }

          .cta-section {
            padding: 25px 15px;
          }

          .cta-title {
            font-size: 1.3rem;
          }

          .cta-description {
            font-size: 0.9rem;
          }
        }

        @media (max-width: 480px) {
          .categories-grid {
            grid-template-columns: 1fr;
          }

          .hero-title {
            font-size: 1.6rem;
          }

          .feature-card {
            padding: 15px;
          }

          .feature-icon {
            font-size: 2rem;
          }
        }
      `}</style>
    </>
  );
}
