import React, { createContext, useContext, useReducer, useEffect } from 'react';
import cartReducer from '../context/cartReducer.js'

// Load cart from localStorage or use initial state
const loadCartFromStorage = () => {
  try {
    const savedCart = localStorage.getItem('cart');
    return savedCart ? JSON.parse(savedCart) : {
      cartItems: [],
      shippingInfo: {
        name: '',
        address: '',
        city: '',
        country: '',
      },
      totalPrice: 0,
    };
  } catch (error) {
    console.error('Error loading cart from localStorage:', error);
    return {
      cartItems: [],
      shippingInfo: {
        name: '',
        address: '',
        city: '',
        country: '',
      },
      totalPrice: 0,
    };
  }
};

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, loadCartFromStorage());

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(state));
  }, [state]);

  // Calculate total whenever cartItems change
  useEffect(() => {
    const total = state.cartItems.reduce(
      (acc, item) => acc + (item.price * item.quantity),
      0
    );
    
    if (total !== state.totalPrice) {
      dispatch({ type: 'CALCULATE_TOTAL' });
    }
  }, [state.cartItems, state.totalPrice]);
  
  return (
    <CartContext.Provider value={{ 
      cartItems: state.cartItems,
      shippingInfo: state.shippingInfo,
      totalPrice: state.totalPrice,
      dispatch 
    }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
