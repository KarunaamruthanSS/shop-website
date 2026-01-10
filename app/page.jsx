"use client";

import { useRouter } from "next/navigation";
import { useTranslation } from "../lib/translationContext";

export default function HomePage() {
  const { t } = useTranslation();
  const router = useRouter();

  return (
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
          <button 
            className="btn btn-primary" 
            onClick={() => router.push('/products')}
            type="button"
          >
            {t('Shop Now')}
          </button>
          
          <button 
            className="btn btn-secondary" 
            onClick={() => router.push('/register')}
            type="button"
          >
            {t('Create Account')}
          </button>
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
            <div 
              key={category.name} 
              className="category-card"
              onClick={() => router.push('/products')}
              role="button"
              tabIndex={0}
              onKeyPress={(e) => {
                if (e.key === 'Enter') router.push('/products');
              }}
            >
              <div className="category-icon">{category.icon}</div>
              <h4 className="category-title">{category.name}</h4>
              <p className="category-description">
                {category.description}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* CTA Section */}
      <div className="cta-section">
        <h2 className="cta-title">{t('Ready to Start Shopping?')}</h2>
        <p className="cta-description">
          {t('Browse our extensive collection of hardware and electrical items')}
        </p>
        <button 
          className="btn btn-cta"
          onClick={() => router.push('/products')}
          type="button"
        >
          {t('View All Products')}
        </button>
      </div>
    </main>
  );
}
