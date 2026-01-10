"use client";

import { useRouter } from "next/navigation";
import { useTranslation } from "../lib/translationContext";
import { useState } from "react";

// FAQ Item Component
function FAQItem({ question, answer }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="faq-item">
      <button
        className={`faq-question ${isOpen ? 'active' : ''}`}
        onClick={() => setIsOpen(!isOpen)}
        type="button"
      >
        <span>{question}</span>
        <span className={`faq-icon ${isOpen ? 'rotate' : ''}`}>▼</span>
      </button>
      {isOpen && (
        <div className="faq-answer">
          <p>{answer}</p>
        </div>
      )}
    </div>
  );
}

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
        <h2 className="hero-title">
          {t('Why hardwares are important?')} 🛠️
        </h2>
        <p className="hero-description">
          {t('Hardware products play a vital role in construction, maintenance, and everyday repairs in homes and businesses. Quality hardware items such as electrical fittings, tools, fasteners, and plumbing materials ensure safety and long-lasting performance. Reliable hardware is essential for building strong infrastructure and maintaining modern living standards. Hardware stores provide essential materials that support residential, commercial, and industrial development. Using the right hardware helps reduce repair costs and improves energy efficiency. Professionals and homeowners rely on hardware products for installation, upgrades, and maintenance work. Proper hardware selection prevents accidents and improves overall system reliability. Modern hardware solutions support smart technology and sustainable construction practices. Hardware products contribute significantly to economic growth and job creation. Without dependable hardware, daily operations in construction, electrical, and mechanical fields would not be possible.')}
        </p>
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
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  router.push('/products');
                }
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

      {/* FAQ Section */}
      <div className="section">
        <h2 className="section-title">{t('Frequently Asked Questions')}</h2>
        <div className="faq-container">
          {[
            {
              question: t('What are hardware products used for?'),
              answer: t('Hardware products are used for construction, electrical work, plumbing, repairs, and maintenance in homes, offices, and industrial buildings.')
            },
            {
              question: t('Why is quality hardware important?'),
              answer: t('Quality hardware ensures safety, durability, and long-term performance, reducing the need for frequent repairs and replacements.')
            },
            {
              question: t('How do I choose the right hardware products?'),
              answer: t('Choosing the right hardware depends on the type of work, material quality, compatibility, and safety standards required for the project.')
            },
            {
              question: t('Can hardware products improve safety in buildings?'),
              answer: t('Yes, using proper and certified hardware products helps prevent electrical faults, structural failures, and other safety risks.')
            },
            {
              question: t('Are hardware products necessary for everyday home maintenance?'),
              answer: t('Hardware products are essential for daily maintenance tasks such as fixing electrical fittings, plumbing issues, and household installations.')
            }
          ].map((faq, index) => (
            <FAQItem key={index} question={faq.question} answer={faq.answer} />
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
