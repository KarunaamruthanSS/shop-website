"use client";

import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { createSession, getSession, clearSession, updateSessionActivity, getSessionUser } from './sessionManager';
import { useToast } from './toastContext';
import { useTranslation } from './translationContext';

const SessionContext = createContext();

export const useSession = () => {
  const context = useContext(SessionContext);
  if (!context) {
    throw new Error('useSession must be used within a SessionProvider');
  }
  return context;
};

export const SessionProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const { showWarning } = useToast();
  const { t } = useTranslation();

  // Check session on mount and set up periodic checks
  useEffect(() => {
    checkSession();
    
    // Check session every 30 seconds
    const interval = setInterval(checkSession, 30000);
    
    // Update activity on user interactions
    const updateActivity = () => {
      if (user) {
        const stillValid = updateSessionActivity();
        if (!stillValid) {
          handleSessionExpired();
        }
      }
    };

    // Add event listeners for user activity
    const events = ['mousedown', 'mousemove', 'keypress', 'scroll', 'touchstart', 'click'];
    events.forEach(event => {
      document.addEventListener(event, updateActivity, true);
    });

    return () => {
      clearInterval(interval);
      events.forEach(event => {
        document.removeEventListener(event, updateActivity, true);
      });
    };
  }, [user]);

  const checkSession = useCallback(() => {
    const sessionUser = getSessionUser();
    if (sessionUser && !user) {
      setUser(sessionUser);
    } else if (!sessionUser && user) {
      handleSessionExpired();
    }
    setLoading(false);
  }, [user]);

  const handleSessionExpired = useCallback(() => {
    setUser(null);
    clearSession();
    showWarning(t('Session expired. Please login again.'));
  }, [showWarning, t]);

  const login = useCallback((userData) => {
    const session = createSession(userData);
    setUser(userData);
    return session;
  }, []);

  const logout = useCallback(async () => {
    try {
      // Call logout API to clear server-side token
      await fetch('/api/auth/logout', {
        method: 'POST',
        credentials: 'include'
      });
    } catch (error) {
      console.error('Logout API error:', error);
    } finally {
      // Always clear client-side session
      setUser(null);
      clearSession();
    }
  }, []);

  const refreshSession = useCallback(() => {
    if (user) {
      const stillValid = updateSessionActivity();
      if (!stillValid) {
        handleSessionExpired();
        return false;
      }
      return true;
    }
    return false;
  }, [user, handleSessionExpired]);

  return (
    <SessionContext.Provider value={{
      user,
      loading,
      login,
      logout,
      refreshSession,
      isAuthenticated: !!user
    }}>
      {children}
    </SessionContext.Provider>
  );
};