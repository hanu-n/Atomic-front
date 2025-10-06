// import { Link, useNavigate } from "react-router-dom";
// import { useAuth } from "../context/AuthContext";
// import { useState,useEffect } from "react";
// import {useCart} from '../context/CartContext'

// const TopHeader = () => {
//     const { user, logout } = useAuth()
//    const [showDropdown, setShowDropdown] = useState(false);
//    const [showMobileSearch, setShowMobileSearch] = useState(false);
//    const [isMobile, setIsMobile] = useState(typeof window !== 'undefined' ? window.innerWidth < 992 : false);


//    const {cartItems}=useCart()
//    const cartCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);

//    // Debug logging
//    console.log('Cart items:', cartItems);
//    console.log('Cart count:', cartCount);

//    //////////////////////////////search-bar/////////////////////////
//  const [keyword, setKeyword] = useState("");
//  const navigate =useNavigate()


//  const handleSearch = () => {
//         if (keyword.trim()) {
//             navigate(`/products?search=${encodeURIComponent(keyword.trim())}`);
//             setKeyword(""); // Clear search after navigation
//             setShowMobileSearch(false); // Hide mobile search after search
//         }
//     };

//     const handleKeyDown = (e) => {
//     if (e.key === "Enter") {
//       handleSearch();
//     }
//   };

//    useEffect(() => {
//         const handleResize = () => {
//             setIsMobile(window.innerWidth < 992);
//             if (window.innerWidth >= 992) {
//                 setShowMobileSearch(false);
//             }
//         };

//         window.addEventListener('resize', handleResize);
//         // initialize once on mount
//         handleResize();
//         return () => window.removeEventListener('resize', handleResize);
//     }, []);

//     // Close dropdown when clicking outside
//     useEffect(() => {
//         const handleClickOutside = (e) => {
//             if (showDropdown && !e.target.closest('.user-dropdown')) {
//                 setShowDropdown(false);
//             }
//         };

//         document.addEventListener('mousedown', handleClickOutside);
//         return () => document.removeEventListener('mousedown', handleClickOutside);
//     }, [showDropdown]);

//   ///////////////////////////////////////////////////////
//   return (
//     <div className="top-header">
//       <div className="container">
//         {/* Search Box */}
//         <div className="d-flex align-items-center" style={{ flex: 1 }}>
         
          
//     <div className="search-box">
//       <i className="fas fa-bars me-2 text-muted"></i>
//       <input
//         type="text"
//         className="form-control border-0"
//         placeholder="Search for desired product"
//         style={{ boxShadow: 'none', background: 'transparent' }}
//         value={keyword}
//         onChange={(e) => setKeyword(e.target.value)}
//         onKeyDown={handleKeyDown}
//       />
//       <i
//         className="fas fa-search ms-2 text-success"
//         style={{ cursor: "pointer" }}
//         onClick={handleSearch}
//       ></i>
//     </div>
  
//         </div>

//         {/* Contact Info + Icons */}
//         <div className="contact-info d-flex align-items-center gap-3" style={{ flex: 1, justifyContent: 'flex-end' }}>
//           <a className="text-dark text-decoration-none d-flex align-items-center" href="tel:+251911488462">
//             <i className="fa-solid fa-phone me-1" style={{ color: '#e83e8c' }}></i>
//             011 416 2168/+251 911 488 462
//           </a>
//           <a className="text-dark text-decoration-none d-flex align-items-center" href="mailto:contact@atomicLab.com">
//             <i className="fa-solid fa-envelope me-1" style={{ color: '#b197fc' }}></i>
//             contact@atomicLab.com
//           </a>

//           {/* Cart Icon */}
//           <div className="nav-icons d-flex align-items-center position-relative">
//                           <Link to="/cart" className="position-relative text-dark me-3">
//                 <i className="fa-solid fa-cart-shopping fs-5"></i>
//                 {cartCount > 0 && (
//                   <span className="position-absolute cart-count top-0 start-100 translate-middle badge rounded-pill bg-danger">
//                     {cartCount}
//                   </span>
//                 )}
//               </Link>

//             {/* User Icon with Dropdown */}
//             <div className="user-dropdown position-relative">
//               <i
//                 className="fa-solid fa-user fs-5 text-dark"
//                 style={{ cursor: "pointer" }}
//                 onClick={() => setShowDropdown(!showDropdown)}
//               ></i>

//               {showDropdown && (
//                 <div
//                   className="position-absolute bg-white border rounded shadow p-2"
//                   style={{ right: 0, top: "120%" , zIndex: 2000 }}
//                 >
//                   {!user ? (
//                     <>
//                       <Link to="/register" className="dropdown-item text-dark">Register</Link>
//                       <Link to="/login" className="dropdown-item text-dark">Login</Link>
//                     </>
//                   ) : (
//                     <>
                      
//                       <Link to="/logout" className="dropdown-item text-danger text-bold btn btn-sm">
//                                 Logout
//                                   </Link>
//                                   <Link to= '/DeleteAccount'className="dropdown-item text-danger text-bold btn btn-sm">Delete-Account</Link>
                                  
                                   
//                     </>
//                   )}
//                 </div>
//               )}
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );

// };

// export default TopHeader;

import { Link, useNavigate } from "react-router-dom"; 
import { useAuth } from "../context/AuthContext";
import { useState, useEffect } from "react";
import { useCart } from '../context/CartContext';

const TopHeader = () => {
  const { currentUser, logout } = useAuth();
  const [showDropdown, setShowDropdown] = useState(false);
  const [showMobileSearch, setShowMobileSearch] = useState(false);
  const [isMobile, setIsMobile] = useState(typeof window !== 'undefined' ? window.innerWidth < 992 : false);

  const { cartItems } = useCart();
  const cartCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  const [keyword, setKeyword] = useState("");
  const navigate = useNavigate();

  const handleSearch = () => {
    if (keyword.trim()) {
      navigate(`/products/search/${encodeURIComponent(keyword.trim())}`);
      setKeyword(""); 
      setShowMobileSearch(false); 
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") handleSearch();
  };

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 992);
      if (window.innerWidth >= 992) setShowMobileSearch(false);
    };
    window.addEventListener('resize', handleResize);
    handleResize();
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (showDropdown && !e.target.closest('.user-dropdown')) setShowDropdown(false);
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [showDropdown]);

  useEffect(() => {
  const delayDebounce = setTimeout(() => {
    if(keyword.trim()) {
      navigate(`/products/search/${encodeURIComponent(keyword.trim())}`);
    }
  }, 500);

  return () => clearTimeout(delayDebounce);
}, [keyword]);


  return (
    <div className="top-header">
      <div className="container d-flex align-items-center justify-content-between flex-wrap">

        {/* Search Box */}
        <div className={`d-flex align-items-center flex-grow-1 ${isMobile && !showMobileSearch ? ' fa-search' : ''}`}>
          <div className="search-box  d-flex align-items-center">
            <i className="fas fa-bars me-2 text-muted"></i>
            <input
              type="text"
              className="form-control border-0"
              placeholder="Search for desired product"
              style={{ boxShadow: 'none', background: 'transparent' }}
              value={keyword}
              onChange={(e) => setKeyword(e.target.value)}
              onKeyDown={handleKeyDown}
            />
            <i
              className="fas fa-search ms-2 text-success"
              style={{ cursor: "pointer" }}
              onClick={handleSearch}
            ></i>
          </div>
        </div>

        {/* Contact Info + Icons */}
        <div className="contact-info d-flex align-items-center gap-3" style={{justifyContent: 'flex-end' }}>
          <a className="text-dark text-decoration-none d-flex align-items-center" href="tel:+251911488462">
            <i className="fa-solid fa-phone me-1" style={{ color: '#e83e8c' }}></i>
            011 416 2168/+251 911 488 462
          </a>
          <a className="text-dark text-decoration-none d-flex align-items-center" href="mailto:contact@atomicLab.com">
            <i className="fa-solid fa-envelope me-1" style={{ color: '#b197fc' }}></i>
            contact@atomicLab.com
          </a>

          {/* Cart Icon */}
          <div className="nav-icons d-flex align-items-center position-relative">
            <Link to="/cart" className="position-relative text-dark me-3">
              <i className="fa-solid fa-cart-shopping fs-5"></i>
              {cartCount > 0 && (
                <span className="position-absolute cart-count top-0 start-100 translate-middle badge rounded-pill bg-danger">
                  {cartCount}
                </span>
              )}
            </Link>

            {/* User Icon with Dropdown */}
            <div className="user-dropdown position-relative">
              <i
                className="fa-solid fa-user fs-5 text-dark"
                style={{ cursor: "pointer" }}
                onClick={() => setShowDropdown(!showDropdown)}
              ></i>

              {showDropdown && (
                <div
                  className="position-absolute bg-white border rounded shadow p-2"
                  style={{ right: 0, top: "120%" , zIndex: 2000 }}
                >
                  {!currentUser ? (
                    <Link to="/auth" className="dropdown-item text-dark">Login / Register</Link>
                  ) : (
                    <>
                      <span className="dropdown-item text-success">Logged in as {currentUser.email}</span>
                      <button onClick={logout} className="dropdown-item text-danger btn btn-sm w-100">Logout</button>
                    </>
                  )}
                </div>
              )}
            </div>
            

      

          </div>
        </div>
      </div>
    </div>
  );
};

export default TopHeader;
