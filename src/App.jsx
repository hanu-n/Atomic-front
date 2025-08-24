import React from 'react'
import { Routes ,Route, useLocation } from 'react-router-dom'
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { getAuth, onAuthStateChanged } from 'firebase/auth';

import Home from './pages/Home'
import About from './pages/About'
import ProductList from './pages/ProductList';
import Contact from './pages/Contact'
import Login from './pages/Login';
import Cart from './pages/Cart';
import Header from './components/Header'
import Footer from './components/Footer'
import ProductDetail from './pages/ProductDetail';
import Register from './pages/Register';
import Logout from './pages/Logout';
import VerifyEmail from './pages/VerifyEmail';
import Section2 from './pages/Section2';
import Section3 from './pages/Section3';
import PlaceOrder from './pages/PlaceOrder';
import ThankYou from './pages/ThankYou';
import DeleteAccount from './pages/DeleteAccount'; 
import CategoryPage from './pages/CategoryPage';
//=================ADMIN=====================
import PrivateAdminRoute from './admin/PrivateAdminRoute';
import AdminDashboard from './admin/AdminDashboard';
import OrderList from './admin/components/AdminOrders';
import SearchResults from './pages/SearchResults';
import ProductList2 from './admin/components/ProductList2';




const App = () => {
 
  return (
 <>
    <Header/>
        <Routes>
            <Route path='/' element={<Home/>} ></Route>
            <Route path='/about' element={<About/>} ></Route>
            <Route path='/contact' element={<Contact/>} ></Route>
            <Route path='/products' element={<ProductList/>} ></Route>
            <Route path='/product/:id' element={<ProductDetail/>} ></Route>
            <Route path='/login' element={<Login/>} ></Route>
            <Route path='/cart' element={<Cart/>} ></Route>
            <Route path='/register' element={<Register/>} ></Route>
            <Route path='/logout' element={<Logout/>} ></Route>
            <Route path='/verify-email' element={<VerifyEmail/>} ></Route>
            <Route path='/place-order' element={<PlaceOrder/>} ></Route>
            <Route path='/thank-you' element={<ThankYou/>} ></Route>
            <Route path='/DeleteAccount' element={<DeleteAccount/>} ></Route>
            <Route path='/admin/orders' element={<OrderList/>} ></Route>
            <Route path="/admin"element={<PrivateAdminRoute><AdminDashboard/></PrivateAdminRoute>}/>
            <Route path="/search/:keyword" element={<SearchResults />} />
            <Route path="/admin/pro-list" element={<ProductList2 />} />
            <Route path="/category/:categoryName" element={<CategoryPage />} />
            <Route path="/category/:categoryName/:subCategoryName" element={<CategoryPage />} />


                      <Route path="*" element={<div >404 Not Found</div>} />
                    
        </Routes>

          <ToastContainer position="top-right" draggable
        theme="light" autoClose={1500}/>
    
       <Footer/>
       
      
   </> 
  )
}

export default App