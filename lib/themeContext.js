"use client";

import React, { createContext, useContext, useState, useEffect } from 'react';

const ThemeContext = createContext();

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

export const ThemeProvider = ({ children }) => {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    // Load theme from localStorage (only on client side)
    if (typeof window !== 'undefined') {
      const savedTheme = localStorage.getItem('theme');
      if (savedTheme) {
        setIsDark(savedTheme === 'dark');
      } else {
        // Check system preference
        const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        setIsDark(prefersDark);
      }
    }
  }, []);

  useEffect(() => {
    // Apply theme to document (only on client side)
    if (typeof window !== 'undefined') {
      if (isDark) {
        document.documentElement.classList.add('dark-theme');
        document.documentElement.classList.remove('light-theme');
      } else {
        document.documentElement.classList.add('light-theme');
        document.documentElement.classList.remove('dark-theme');
      }
      
      // Save to localStorage
      localStorage.setItem('theme', isDark ? 'dark' : 'light');
    }
  }, [isDark]);

  const toggleTheme = () => {
    setIsDark(!isDark);
  };

  const theme = {
    isDark,
    toggleTheme,
    colors: {
      background: isDark ? '#0d1117' : '#ffffff',
      surface: isDark ? '#161b22' : '#f8f9fa',
      surfaceElevated: isDark ? '#21262d' : '#ffffff',
      text: isDark ? '#f0f6fc' : '#24292f',
      textSecondary: isDark ? '#8b949e' : '#656d76',
      textMuted: isDark ? '#6e7681' : '#8c959f',
      primary: isDark ? '#58a6ff' : '#0969da',
      primaryHover: isDark ? '#79c0ff' : '#0860ca',
      success: isDark ? '#3fb950' : '#1a7f37',
      successHover: isDark ? '#56d364' : '#2da44e',
      warning: isDark ? '#d29922' : '#bf8700',
      warningHover: isDark ? '#e3b341' : '#9a6700',
      danger: isDark ? '#f85149' : '#cf222e',
      dangerHover: isDark ? '#ff7b72' : '#a40e26',
      border: isDark ? '#30363d' : '#d0d7de',
      borderMuted: isDark ? '#21262d' : '#d8dee4',
      shadow: isDark ? 'rgba(0, 0, 0, 0.6)' : 'rgba(31, 35, 40, 0.15)',
      shadowLarge: isDark ? 'rgba(0, 0, 0, 0.8)' : 'rgba(31, 35, 40, 0.25)',
      accent: isDark ? '#fd7e14' : '#fb8500',
      accentHover: isDark ? '#ff922b' : '#fd7e14',
      info: isDark ? '#79c0ff' : '#0969da',
      infoHover: isDark ? '#a5d6ff' : '#218bff'
    }
  };

  return (
    <ThemeContext.Provider value={theme}>
      {children}
    </ThemeContext.Provider>
  );
};