"use client";

import React, { createContext, useContext, useState, useEffect } from 'react';

// Translation data
const translations = {
  en: {
    // Navigation
    'Hardware Shop': 'Hardware Shop',
    'Shop': 'Shop',
    'Cart': 'Cart',
    'Login': 'Login',
    'Register': 'Register',
    'Logout': 'Logout',
    'Admin': 'Admin',
    'Welcome': 'Welcome',
    'Loading': 'Loading',
    'Admin Panel': 'Admin Panel',
    'Back to Shop': 'Back to Shop',

    // Homepage
    'Your one-stop destination for quality electrical & hardware items. From LED bulbs to circuit breakers, we have everything you need for your projects.': 'Your one-stop destination for quality electrical & hardware items. From LED bulbs to circuit breakers, we have everything you need for your projects.',
    'Shop Now': 'Shop Now',
    'Create Account': 'Create Account',
    'Why Choose Us?': 'Why Choose Us?',
    'Quality Products': 'Quality Products',
    'Premium electrical and hardware items from trusted brands': 'Premium electrical and hardware items from trusted brands',
    'Fast Delivery': 'Fast Delivery',
    'Quick and reliable delivery to your doorstep': 'Quick and reliable delivery to your doorstep',
    'Best Prices': 'Best Prices',
    'Competitive pricing with great value for money': 'Competitive pricing with great value for money',
    'Secure Shopping': 'Secure Shopping',
    'Safe and secure online shopping experience': 'Safe and secure online shopping experience',
    'Shop by Category': 'Shop by Category',
    'Lighting': 'Lighting',
    'LED bulbs, fixtures & more': 'LED bulbs, fixtures & more',
    'Electrical': 'Electrical',
    'Switches, sockets & wiring': 'Switches, sockets & wiring',
    'Protection': 'Protection',
    'Circuit breakers & safety': 'Circuit breakers & safety',
    'Accessories': 'Accessories',
    'Extension cords & tools': 'Extension cords & tools',
    'Ready to Start Shopping?': 'Ready to Start Shopping?',
    'Browse our extensive collection of hardware and electrical items': 'Browse our extensive collection of hardware and electrical items',
    'View All Products': 'View All Products',

    // Products Page
    'Products': 'Products',
    'Search Products': 'Search Products',
    'Search by name or description...': 'Search by name or description...',
    'Category': 'Category',
    'All Categories': 'All Categories',
    'Sort By': 'Sort By',
    'Name (A-Z)': 'Name (A-Z)',
    'Price (Low to High)': 'Price (Low to High)',
    'Price (High to Low)': 'Price (High to Low)',
    'Stock (High to Low)': 'Stock (High to Low)',
    'Clear Filters': 'Clear Filters',
    'Add to Cart': 'Add to Cart',
    'View Details': 'View Details',
    'Out of Stock': 'Out of Stock',
    'in stock': 'in stock',
    'No products found': 'No products found',
    'Try adjusting your search or filter criteria.': 'Try adjusting your search or filter criteria.',
    'Show All Products': 'Show All Products',

    // Authentication
    'Email': 'Email',
    'Password': 'Password',
    'Full Name': 'Full Name',
    'Phone Number': 'Phone Number',
    'Date of Birth (optional)': 'Date of Birth (optional)',
    'Password (min 6 characters)': 'Password (min 6 characters)',
    'Logging in...': 'Logging in...',
    'Creating Account...': 'Creating Account...',
    'Registration Successful!': 'Registration Successful!',
    'Redirecting to login page...': 'Redirecting to login page...',
    'Don\'t have an account?': 'Don\'t have an account?',
    'Register here': 'Register here',
    'Already have an account?': 'Already have an account?',
    'Login here': 'Login here',
    'Test Accounts': 'Test Accounts',

    // Admin
    'Dashboard': 'Dashboard',
    'Orders': 'Orders',
    'Users': 'Users',
    'Analytics': 'Analytics',
    'Email Test': 'Email Test',
    'SMS Test': 'SMS Test',

    // Toast Messages
    'Login successful!': 'Login successful!',
    'Logout successful!': 'Logout successful!',
    'Product added to cart!': 'Product added to cart!',
    'Order placed successfully!': 'Order placed successfully!',
    'Payment confirmed!': 'Payment confirmed!',
    'Item removed from cart': 'Item removed from cart',
    'Cart cleared': 'Cart cleared',
    'Registration successful!': 'Registration successful!',

    // Language Names
    'Tamil': 'Tamil',
    'Eng': 'Eng',

    // Session Messages
    'Session expired. Please login again.': 'Session expired. Please login again.'
  },
  
  ta: {
    // Navigation
    'Hardware Shop': 'வன்பொருள் கடை',
    'Shop': 'கடை',
    'Cart': 'வண்டி',
    'Login': 'உள்நுழைவு',
    'Register': 'பதிவு செய்யுங்கள்',
    'Logout': 'வெளியேறு',
    'Admin': 'நிர்வாகி',
    'Welcome': 'வரவேற்கிறோம்',
    'Loading': 'ஏற்றுகிறது',
    'Admin Panel': 'நிர்வாக பேனல்',
    'Back to Shop': 'கடைக்கு திரும்பு',

    // Homepage
    'Your one-stop destination for quality electrical & hardware items. From LED bulbs to circuit breakers, we have everything you need for your projects.': 'தரமான மின்சார மற்றும் வன்பொருள் பொருட்களுக்கான உங்கள் ஒரே இடம். LED விளக்குகள் முதல் சர்க்யூட் பிரேக்கர்கள் வரை, உங்கள் திட்டங்களுக்கு தேவையான அனைத்தும் எங்களிடம் உள்ளது.',
    'Shop Now': 'இப்போது வாங்குங்கள்',
    'Create Account': 'கணக்கு உருவாக்குங்கள்',
    'Why Choose Us?': 'எங்களை ஏன் தேர்வு செய்ய வேண்டும்?',
    'Quality Products': 'தரமான பொருட்கள்',
    'Premium electrical and hardware items from trusted brands': 'நம்பகமான பிராண்டுகளின் உயர்தர மின்சார மற்றும் வன்பொருள் பொருட்கள்',
    'Fast Delivery': 'விரைவான டெலிவரி',
    'Quick and reliable delivery to your doorstep': 'உங்கள் வீட்டு வாசலில் விரைவான மற்றும் நம்பகமான டெலிவரி',
    'Best Prices': 'சிறந்த விலைகள்',
    'Competitive pricing with great value for money': 'பணத்திற்கு சிறந்த மதிப்புடன் போட்டி விலை',
    'Secure Shopping': 'பாதுகாப்பான ஷாப்பிங்',
    'Safe and secure online shopping experience': 'பாதுகாப்பான மற்றும் நம்பகமான ஆன்லைன் ஷாப்பிங் அனுபவம்',
    'Shop by Category': 'வகை அடிப்படையில் வாங்குங்கள்',
    'Lighting': 'விளக்குகள்',
    'LED bulbs, fixtures & more': 'LED விளக்குகள், பொருத்துதல்கள் மற்றும் பலவும்',
    'Electrical': 'மின்சாரம்',
    'Switches, sockets & wiring': 'சுவிட்சுகள், சாக்கெட்டுகள் மற்றும் வயரிங்',
    'Protection': 'பாதுகாப்பு',
    'Circuit breakers & safety': 'சர்க்யூட் பிரேக்கர்கள் மற்றும் பாதுகாப்பு',
    'Accessories': 'துணைப்பொருட்கள்',
    'Extension cords & tools': 'நீட்டிப்பு கம்பிகள் மற்றும் கருவிகள்',
    'Ready to Start Shopping?': 'ஷாப்பிங் தொடங்க தயாரா?',
    'Browse our extensive collection of hardware and electrical items': 'எங்கள் விரிவான வன்பொருள் மற்றும் மின்சார பொருட்களின் தொகுப்பை உலாவுங்கள்',
    'View All Products': 'அனைத்து பொருட்களையும் பார்க்கவும்',

    // Products Page
    'Products': 'பொருட்கள்',
    'Search Products': 'பொருட்களை தேடுங்கள்',
    'Search by name or description...': 'பெயர் அல்லது விளக்கத்தின் மூலம் தேடுங்கள்...',
    'Category': 'வகை',
    'All Categories': 'அனைத்து வகைகள்',
    'Sort By': 'வரிசைப்படுத்து',
    'Name (A-Z)': 'பெயர் (அ-ஃ)',
    'Price (Low to High)': 'விலை (குறைவு முதல் அதிகம்)',
    'Price (High to Low)': 'விலை (அதிகம் முதல் குறைவு)',
    'Stock (High to Low)': 'இருப்பு (அதிகம் முதல் குறைவு)',
    'Clear Filters': 'வடிப்பான்களை அழிக்கவும்',
    'Add to Cart': 'வண்டியில் சேர்க்கவும்',
    'View Details': 'விவரங்களை பார்க்கவும்',
    'Out of Stock': 'இருப்பில் இல்லை',
    'in stock': 'இருப்பில் உள்ளது',
    'No products found': 'பொருட்கள் எதுவும் கிடைக்கவில்லை',
    'Try adjusting your search or filter criteria.': 'உங்கள் தேடல் அல்லது வடிப்பான் அளவுகோல்களை சரிசெய்ய முயற்சிக்கவும்.',
    'Show All Products': 'அனைத்து பொருட்களையும் காட்டு',

    // Authentication
    'Email': 'மின்னஞ்சல்',
    'Password': 'கடவுச்சொல்',
    'Full Name': 'முழு பெயர்',
    'Phone Number': 'தொலைபேசி எண்',
    'Date of Birth (optional)': 'பிறந்த தேதி (விருப்பம்)',
    'Password (min 6 characters)': 'கடவுச்சொல் (குறைந்தது 6 எழுத்துகள்)',
    'Logging in...': 'உள்நுழைகிறது...',
    'Creating Account...': 'கணக்கு உருவாக்குகிறது...',
    'Registration Successful!': 'பதிவு வெற்றிகரமாக முடிந்தது!',
    'Redirecting to login page...': 'உள்நுழைவு பக்கத்திற்கு திருப்பி விடுகிறது...',
    'Don\'t have an account?': 'கணக்கு இல்லையா?',
    'Register here': 'இங்கே பதிவு செய்யுங்கள்',
    'Already have an account?': 'ஏற்கனவே கணக்கு உள்ளதா?',
    'Login here': 'இங்கே உள்நுழையுங்கள்',
    'Test Accounts': 'சோதனை கணக்குகள்',

    // Admin
    'Dashboard': 'டாஷ்போர்டு',
    'Orders': 'ஆர்டர்கள்',
    'Users': 'பயனர்கள்',
    'Analytics': 'பகுப்பாய்வு',
    'Email Test': 'மின்னஞ்சல் சோதனை',
    'SMS Test': 'SMS சோதனை',

    // Toast Messages
    'Login successful!': 'உள்நுழைவு வெற்றிகரமாக முடிந்தது!',
    'Logout successful!': 'வெளியேறுதல் வெற்றிகரமாக முடிந்தது!',
    'Product added to cart!': 'பொருள் வண்டியில் சேர்க்கப்பட்டது!',
    'Order placed successfully!': 'ஆர்டர் வெற்றிகரமாக வைக்கப்பட்டது!',
    'Payment confirmed!': 'பணம் செலுத்துதல் உறுதிப்படுத்தப்பட்டது!',
    'Item removed from cart': 'பொருள் வண்டியிலிருந்து அகற்றப்பட்டது',
    'Cart cleared': 'வண்டி காலி செய்யப்பட்டது',
    'Registration successful!': 'பதிவு வெற்றிகரமாக முடிந்தது!',

    // Language Names
    'Tamil': 'தமிழ்',
    'Eng': 'ஆங்',

    // Session Messages
    'Session expired. Please login again.': 'அமர்வு காலாவதியானது. மீண்டும் உள்நுழையவும்.'
  }
};

const TranslationContext = createContext();

export const useTranslation = () => {
  const context = useContext(TranslationContext);
  if (!context) {
    throw new Error('useTranslation must be used within a TranslationProvider');
  }
  return context;
};

export const TranslationProvider = ({ children }) => {
  const [language, setLanguage] = useState('en');

  useEffect(() => {
    // Load saved language from localStorage
    const savedLanguage = localStorage.getItem('language');
    if (savedLanguage && translations[savedLanguage]) {
      setLanguage(savedLanguage);
    }
  }, []);

  const changeLanguage = (newLanguage) => {
    if (translations[newLanguage]) {
      setLanguage(newLanguage);
      localStorage.setItem('language', newLanguage);
    }
  };

  const t = (key) => {
    return translations[language]?.[key] || translations['en'][key] || key;
  };

  return (
    <TranslationContext.Provider value={{ language, changeLanguage, t }}>
      {children}
    </TranslationContext.Provider>
  );
};