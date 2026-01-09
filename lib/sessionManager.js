// Simple session management with 7-minute timeout
const SESSION_TIMEOUT = 7 * 60 * 1000; // 7 minutes in milliseconds

export function createSession(user) {
  const session = {
    user,
    loginTime: Date.now(),
    lastActivity: Date.now()
  };
  
  localStorage.setItem('session', JSON.stringify(session));
  return session;
}

export function getSession() {
  try {
    const sessionData = localStorage.getItem('session');
    if (!sessionData) return null;
    
    const session = JSON.parse(sessionData);
    const now = Date.now();
    
    // Check if session has expired (7 minutes since last activity)
    if (now - session.lastActivity > SESSION_TIMEOUT) {
      clearSession();
      return null;
    }
    
    // Update last activity time
    session.lastActivity = now;
    localStorage.setItem('session', JSON.stringify(session));
    
    return session;
  } catch (error) {
    console.error('Error getting session:', error);
    clearSession();
    return null;
  }
}

export function updateSessionActivity() {
  try {
    const sessionData = localStorage.getItem('session');
    if (!sessionData) return false;
    
    const session = JSON.parse(sessionData);
    const now = Date.now();
    
    // Check if session has expired
    if (now - session.lastActivity > SESSION_TIMEOUT) {
      clearSession();
      return false;
    }
    
    // Update last activity time
    session.lastActivity = now;
    localStorage.setItem('session', JSON.stringify(session));
    return true;
  } catch (error) {
    console.error('Error updating session activity:', error);
    clearSession();
    return false;
  }
}

export function clearSession() {
  localStorage.removeItem('session');
  localStorage.removeItem('user'); // Also clear old user data
}

export function isSessionValid() {
  const session = getSession();
  return session !== null;
}

export function getSessionUser() {
  const session = getSession();
  return session ? session.user : null;
}

export function getSessionTimeRemaining() {
  const session = getSession();
  if (!session) return 0;
  
  const elapsed = Date.now() - session.lastActivity;
  const remaining = SESSION_TIMEOUT - elapsed;
  return Math.max(0, remaining);
}