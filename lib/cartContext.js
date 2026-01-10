"use client";

import { createContext, useContext, useState, useEffect, useRef } from "react";
import { useSession } from "./sessionContext";

const CartContext = createContext();

export function CartProvider({ children }) {
  const [cart, setCart] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const { user, isAuthenticated } = useSession();
  const prevUserIdRef = useRef(null);

  // Load cart from localStorage based on user authentication
  useEffect(() => {
    if (typeof window === 'undefined') {
      setIsLoaded(true);
      return;
    }

    // Only reload if user actually changed
    const currentUserId = user?.id || null;
    if (prevUserIdRef.current === currentUserId && isLoaded) {
      return;
    }
    prevUserIdRef.current = currentUserId;

    try {
      // Clean up old generic cart data (only once)
      if (!isLoaded) {
        localStorage.removeItem('cart');
      }
      
      if (!isAuthenticated || !user) {
        // No user logged in - cart should be empty
        setCart([]);
        setIsLoaded(true);
        return;
      }

      // User is logged in - load their specific cart
      const cartKey = `cart_${user.id}`;
      const savedCart = localStorage.getItem(cartKey);
      
      if (savedCart && savedCart !== 'undefined' && savedCart !== 'null') {
        const parsedCart = JSON.parse(savedCart);
        if (Array.isArray(parsedCart)) {
          setCart(parsedCart);
        } else {
          setCart([]);
        }
      } else {
        setCart([]);
      }
    } catch (error) {
      console.error('Error loading cart from localStorage:', error);
      setCart([]);
    } finally {
      setIsLoaded(true);
    }
  }, [user?.id, isAuthenticated, isLoaded]);

  // Save cart to localStorage whenever cart changes
  useEffect(() => {
    if (!isLoaded || typeof window === 'undefined') {
      return;
    }

    if (!isAuthenticated || !user) {
      return;
    }

    try {
      const cartKey = `cart_${user.id}`;
      localStorage.setItem(cartKey, JSON.stringify(cart));
    } catch (error) {
      console.error('Error saving cart to localStorage:', error);
    }
  }, [cart, isLoaded, user?.id, isAuthenticated]);

  function addToCart(product) {
    if (!isAuthenticated || !user) {
      console.warn('User must be logged in to add items to cart');
      return false;
    }

    setCart((prev) => {
      const existing = prev.find((p) => p.id === product.id);
      let newCart;
      if (existing) {
        newCart = prev.map((p) =>
          p.id === product.id
            ? { ...p, quantity: p.quantity + 1 }
            : p
        );
      } else {
        newCart = [...prev, { ...product, quantity: 1 }];
      }
      return newCart;
    });
    return true;
  }

  function removeFromCart(id) {
    if (!isAuthenticated || !user) {
      return false;
    }
    setCart((prev) => prev.filter((p) => p.id !== id));
    return true;
  }

  function clearCart() {
    setCart([]);
    
    if (isAuthenticated && user && typeof window !== 'undefined') {
      try {
        const cartKey = `cart_${user.id}`;
        localStorage.removeItem(cartKey);
      } catch (error) {
        console.error('Error clearing cart from localStorage:', error);
      }
    }
  }

  function updateQuantity(id, quantity) {
    if (!isAuthenticated || !user) {
      return false;
    }

    if (quantity <= 0) {
      removeFromCart(id);
      return true;
    }
    
    setCart((prev) => 
      prev.map((p) =>
        p.id === id ? { ...p, quantity } : p
      )
    );
    return true;
  }

  const cartCount = cart.reduce((sum, i) => sum + i.quantity, 0);

  return (
    <CartContext.Provider
      value={{ 
        cart, 
        addToCart, 
        removeFromCart, 
        clearCart, 
        updateQuantity,
        cartCount,
        isLoaded,
        isAuthenticated 
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  return useContext(CartContext);
}
