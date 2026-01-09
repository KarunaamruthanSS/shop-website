"use client";

import { useTranslation } from "../lib/translationContext";

export default function LanguageSwitcher() {
  const { language, changeLanguage, t } = useTranslation();

  return (
    <>
      <div className="language-switcher">
        <button 
          className="language-btn"
          onClick={() => changeLanguage(language === 'en' ? 'ta' : 'en')}
          title={language === 'en' ? 'Switch to Tamil' : 'Switch to English'}
        >
          <span className="flag">
            {language === 'en' ? '🇮🇳' : '🇺🇸'}
          </span>
          <span className="lang-text">
            {language === 'en' ? t('Tamil') : t('Eng')}
          </span>
        </button>
      </div>

      <style jsx>{`
        .language-switcher {
          display: flex;
          align-items: center;
        }

        .language-btn {
          display: flex;
          align-items: center;
          gap: 6px;
          padding: 6px 12px;
          background-color: #f8f9fa;
          border: 1px solid #dee2e6;
          border-radius: 20px;
          cursor: pointer;
          transition: all 0.2s;
          font-size: 14px;
          color: #495057;
        }

        .language-btn:hover {
          background-color: #e9ecef;
          border-color: #adb5bd;
          transform: translateY(-1px);
        }

        .flag {
          font-size: 16px;
        }

        .lang-text {
          font-weight: 500;
          white-space: nowrap;
        }

        @media (max-width: 768px) {
          .language-btn {
            padding: 8px 10px;
            font-size: 12px;
          }

          .lang-text {
            font-size: 11px;
          }

          .flag {
            font-size: 16px;
          }
        }
      `}</style>
    </>
  );
}