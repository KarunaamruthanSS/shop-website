"use client";

import { useTheme } from "../lib/themeContext";

export default function ThemeToggle() {
  const { isDark, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className="theme-toggle"
      title={isDark ? "Switch to Light Mode" : "Switch to Dark Mode"}
      aria-label={isDark ? "Switch to Light Mode" : "Switch to Dark Mode"}
    >
      <span style={{ 
        display: 'inline-block',
        transition: 'transform 0.3s ease',
        transform: isDark ? 'rotate(0deg)' : 'rotate(180deg)'
      }}>
        {isDark ? "☀️" : "🌙"}
      </span>
    </button>
  );
}