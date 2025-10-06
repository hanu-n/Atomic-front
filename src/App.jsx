import React, { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { PayPalScriptProvider } from "@paypal/react-paypal-js";

import Home from './pages/Home';
import ProductList from './pages/ProductList';
import Cart from './pages/Cart';
import Header from './components/Header';
import Footer from './components/Footer';
import ProductDetail from './pages/ProductDetail';
import Logout from './pages/Logout';
import VerifyEmail from './pages/VerifyEmail';
import Section2 from './pages/Section2';
import Section3 from './pages/Section3';
import PlaceOrder from './pages/PlaceOrder';
import ThankYou from './pages/ThankYou';
import DeleteAccount from './pages/DeleteAccount'; 
import CategoryPage from './pages/CategoryPage';
import ProtectedRoute from './components/ProtectedRoute';
import Checkout from './pages/Checkout';
import BankTransferPage from './pages/BankTransferPage';

// Admin
import PrivateAdminRoute from './admin/PrivateAdminRoute';
import AdminDashboard from './admin/AdminDashboard';
import OrderList from './admin/components/AdminOrders';
import SearchResults from './pages/SearchResults';
import ProductList2 from './admin/components/ProductList2';
import NotFoundPage from './pages/NotFoundPage';
import Auth from './pages/Auth';
import Terms from './pages/Terms';
import Privacy from './pages/Privacy ';
import AtomicLoader from './components/loader/AtomicLoader';
import LoaderTest from './components/loader/LoaderTest';
import ScrollToTopButton from './components/ScrollToTopButton';
const App = () => {
  const [showSplash, setShowSplash] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setShowSplash(false), 3000); 
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      {showSplash ? (
        <AtomicLoader />
      ) : (
         <PayPalScriptProvider options={{ "client-id": import.meta.env.VITE_PAYPAL_CLIENT_ID }}>
          <Header />

          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/about' element={<Section2 />} />
            <Route path='/contact' element={<Section3 />} />
            <Route path='/products' element={<ProductList />} />
            <Route path='/products/:id' element={<ProductDetail />} />
            <Route path='/logout' element={<Logout />} />
            <Route path='/auth' element={<Auth />} />
            <Route path='/verify-email' element={<VerifyEmail />} />
            <Route path='/terms' element={<Terms />} />
            <Route path='/policy' element={<Privacy />} />
            <Route path='/checkout' element={<Checkout />} />
            <Route path='/loader-test' element={<LoaderTest />} />
            <Route path='/bank-transfer' element={<BankTransferPage />} />

            {/* Protected Routes */}
            <Route path='/cart' element={<Cart />} />
            <Route path='/place-order' element={<ProtectedRoute><PlaceOrder /></ProtectedRoute>} />
            <Route path='/thank-you' element={<ProtectedRoute><ThankYou /></ProtectedRoute>} />
            <Route path='/DeleteAccount' element={<ProtectedRoute><DeleteAccount /></ProtectedRoute>} />

            {/* Admin Routes */}
            <Route path="/admin/orders" element={<OrderList />} />
            <Route path="/admin" element={<PrivateAdminRoute><AdminDashboard /></PrivateAdminRoute>} />
            <Route path="/admin/pro-list" element={<ProductList2 />} />

            {/* Other Routes */}
            <Route path="/products/search/:keyword" element={<SearchResults />} />
            <Route path='/products/category/:categoryName' element={<CategoryPage />} />
            <Route path='/products/category/:categoryName/:subCategoryName' element={<CategoryPage />} />
            <Route path='/products/category/:categoryName/:subCategoryName/:subSubCategoryName' element={<CategoryPage />} />

            <Route path="*" element={<NotFoundPage />} />
          </Routes>

          <ToastContainer
            position="top-right"
            draggable
            theme="light"
            autoClose={1500}
          />

         
          <Footer />
          <ScrollToTopButton />
        </PayPalScriptProvider>
      )}
    </>
  );
}

export default App;
