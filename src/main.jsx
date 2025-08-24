import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import "bootstrap/dist/css/bootstrap.min.css";
import App from './App.jsx';
import './assets/css/custom.css';
import { AuthProvider } from './context/AuthContext.jsx';

import { BrowserRouter } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import '@fortawesome/fontawesome-free/css/all.min.css';
import { CartProvider } from './context/CartContext.jsx';


createRoot(document.getElementById('root')).render(
  <BrowserRouter>
  <AuthProvider>
    <CartProvider> 
    <App />
     </CartProvider> 
    </AuthProvider>
  </BrowserRouter>,
)
