import React, { createContext, useContext, useReducer,useEffect } from 'react';
import cartReducer from  '../context/cartReducer.js'

const initialState = {
  cartItems: [],
  shippingInfo: {
    name: '',
    address: '',
    city: '',
    country: '',
  },
  totalPrice: 0,
};

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, initialState);

   useEffect(() => {
    dispatch({ type: 'CALCULATE_TOTAL' });
  }, [state.cartItems]);
  
  return (
    <CartContext.Provider value={{ 
    cartItems: state.cartItems,
    shippingInfo:state.shippingInfo,
    totalPrice:state.totalPrice,
    dispatch }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
