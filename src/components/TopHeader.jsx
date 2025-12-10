// import { Link, useNavigate } from "react-router-dom"; 
// import { useAuth } from "../context/AuthContext";
// import { useState, useEffect } from "react";
// import { useCart } from '../context/CartContext';
// import '../assets/css/header.css';
// const TopHeader = () => {
//   const { currentUser, logout } = useAuth();
//   const [showDropdown, setShowDropdown] = useState(false);
//   const [showMobileSearch, setShowMobileSearch] = useState(false);
//   const [isMobile, setIsMobile] = useState(typeof window !== 'undefined' ? window.innerWidth < 992 : false);

//   const { cartItems } = useCart();
//   const cartCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);

//   const [keyword, setKeyword] = useState("");
//   const navigate = useNavigate();

//   const handleSearch = () => {
//     if (keyword.trim()) {
//       navigate(`/products/search/${encodeURIComponent(keyword.trim())}`);
//       setKeyword(""); 
//       setShowMobileSearch(false); 
//     }
//   };

//   const handleKeyDown = (e) => {
//     if (e.key === "Enter") handleSearch();
//   };

//   useEffect(() => {
//     const handleResize = () => {
//       setIsMobile(window.innerWidth < 992);
//       if (window.innerWidth >= 992) setShowMobileSearch(false);
//     };
//     window.addEventListener('resize', handleResize);
//     handleResize();
//     return () => window.removeEventListener('resize', handleResize);
//   }, []);

//   useEffect(() => {
//     const handleClickOutside = (e) => {
//       if (showDropdown && !e.target.closest('.user-dropdown')) setShowDropdown(false);
//     };
//     document.addEventListener('mousedown', handleClickOutside);
//     return () => document.removeEventListener('mousedown', handleClickOutside);
//   }, [showDropdown]);

//   useEffect(() => {
//     const delayDebounce = setTimeout(() => {
//       if(keyword.trim()) {
//         navigate(`/products/search/${encodeURIComponent(keyword.trim())}`);
//       }
//     }, 500);

//     return () => clearTimeout(delayDebounce);
//   }, [keyword]);

//   const handleLogout = () => {
//     logout();
//     setShowDropdown(false);
//   };

//   // Get user's first name for personalization
//   const getUserName = () => {
//     if (!currentUser) return "User";
//     // Extract first name from email or use first part before @
//     return currentUser.email.split('@')[0].split('.')[0];
//   };



//   return (
//     <div className="top-header">
//       <div className="container d-flex align-items-center justify-content-between flex-wrap">

//         {/* Search Box */}
//         <div className={`d-flex align-items-center flex-grow-1 ${isMobile && !showMobileSearch ? ' fa-search' : ''}`}>
//           <div className="search-box  d-flex align-items-center">
//             <i className="fas fa-bars me-2 text-muted"></i>
//             <input
//               type="text"
//               className="form-control border-0"
//               placeholder="Search for desired product"
//               style={{ boxShadow: 'none', background: 'transparent' }}
//               value={keyword}
//               onChange={(e) => setKeyword(e.target.value)}
//               onKeyDown={handleKeyDown}
//             />
//             <i
//               className="fas fa-search ms-2 text-success"
//               style={{ cursor: "pointer" }}
//               onClick={handleSearch}
//             ></i>
//           </div>
//         </div>

//         {/* Contact Info + Icons */}
//         <div className="contact-info d-flex align-items-center gap-3" style={{justifyContent: 'flex-end' }}>
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
//             <Link to="/cart" className="position-relative text-dark me-3">
//               <i className="fa-solid fa-cart-shopping fs-5"></i>
//               {cartCount > 0 && (
//                 <span className="position-absolute cart-count top-0 start-100 translate-middle badge rounded-pill bg-danger">
//                   {cartCount}
//                 </span>
//               )}
//             </Link>

//             {/* Enhanced User Icon with Professional Dropdown */}
//             <div className="user-dropdown position-relative">
//               <div 
//                 className="user-trigger d-flex align-items-center"
//                 style={{ cursor: "pointer" }}
//                 onClick={() => setShowDropdown(!showDropdown)}
//               >
//                 <i className="fa-solid fa-user fs-5 text-dark me-2"></i>
//                 {currentUser && (
//                   <span className="user-greeting d-none d-sm-inline">
//                     Hi, {getUserName()}!
//                   </span>
//                 )}
//               </div>

//               {showDropdown && (
//                 <div className="user-dropdown-menu">
//                   {!currentUser ? (
//                     <Link 
//                       to="/auth" 
//                       className="dropdown-auth-link"
//                       onClick={() => setShowDropdown(false)}
//                     >
//                       <i className="fas fa-sign-in-alt"></i>
//                       Login / Register
//                     </Link>
//                   ) : (
//                     <div className="dropdown-content">
//                       {/* User Header */}
//                       <div className="user-header">
//                         <div className="user-avatar">
//                           <i className="fas fa-user"></i>
//                         </div>
//                         <div className="user-info">
//                           <div className="user-name">{getUserName()}</div>
//                           <div className="user-email">{currentUser.email}</div>
//                         </div>
//                       </div>

//                       <div className="dropdown-divider"></div>

//                       {/* Menu Items */}
//                       <Link 
//                         className="dropdown-item"
//                         onClick={() => setShowDropdown(false)}
//                       >
//                         <i className="fas fa-user"></i>
//                         My Profile
//                       </Link>

//                       <Link 
//                         to="/cart" 
//                         className="dropdown-item"
//                         onClick={() => setShowDropdown(false)}
//                       >
//                         <i className="fas fa-shopping-bag"></i>
//                         My Orders
//                       </Link>

//                       <div className="dropdown-divider"></div>

//                       {/* Actions */}
//                       <button 
//                         onClick={handleLogout}
//                         className="dropdown-item logout-btn"
//                       >
//                         <i className="fas fa-sign-out-alt"></i>
//                         Logout
//                       </button>

//                       <Link 
//                         to="/deleteaccount" 
//                         className="dropdown-item delete-account-btn"
//                         onClick={() => setShowDropdown(false)}
//                       >
//                         <i className="fas fa-trash"></i>
//                         Delete Account
//                       </Link>
//                     </div>
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
import { useCart } from "../context/CartContext";
import "../assets/css/header.css";

const TopHeader = () => {
  const { currentUser, logout } = useAuth();
  const { cartItems } = useCart();
  const navigate = useNavigate();

  const cartCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  const [keyword, setKeyword] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);
  const [showMobileSearch, setShowMobileSearch] = useState(false);
  const [showPhoneInfo, setShowPhoneInfo] = useState(false);
  const [showEmailInfo, setShowEmailInfo] = useState(false);

  const [isMobile, setIsMobile] = useState(
    typeof window !== "undefined" ? window.innerWidth < 992 : false
  );

  const handleSearch = () => {
    if (keyword.trim()) {
      navigate(`/products/search/${encodeURIComponent(keyword.trim())}`);
      if (isMobile) setShowMobileSearch(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") handleSearch();
  };

  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth < 992;
      setIsMobile(mobile);
      if (!mobile) {
        setShowMobileSearch(false);
        setShowPhoneInfo(false);
        setShowEmailInfo(false);
      }
    };
    window.addEventListener("resize", handleResize);
    handleResize();
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (showDropdown && !e.target.closest(".user-dropdown")) {
        setShowDropdown(false);
      }
      if (!e.target.closest(".contact-icon-wrapper")) {
        setShowPhoneInfo(false);
        setShowEmailInfo(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [showDropdown]);

  const handleLogout = () => {
    logout();
    setShowDropdown(false);
  };

  const getUserName = () => {
    if (!currentUser) return "User";
    return currentUser.email.split("@")[0].split(".")[0];
  };

  return (
    <div className="top-header">
      <div className="container d-flex align-items-center justify-content-between flex-wrap">

        {/* Mobile Search Icon */}
        {isMobile && !showMobileSearch && (
          <div className="w-100 d-flex justify-content-between align-items-center mb-2">
            <i
              className="fas fa-search fs-5 text-dark"
              style={{ cursor: "pointer" }}
              onClick={() => setShowMobileSearch(true)}
            ></i>

            <div className="nav-icons d-flex align-items-center gap-3">

              {/* Phone Icon */}
              <div
                className="contact-icon-wrapper"
                onClick={() => setShowPhoneInfo(!showPhoneInfo)}
              >
                <i className="fa-solid fa-phone me-3 fs-5 text-dark"></i>
                {showPhoneInfo && (
                  <div className="contact-popup">011 416 2168 / +251 911 488 462</div>
                )}
              </div>

              {/* Email Icon */}
              <div
                className="contact-icon-wrapper"
                onClick={() => setShowEmailInfo(!showEmailInfo)}
              >
                <i className="fa-solid fa-envelope me-5 fs-5 text-dark"></i>
                {showEmailInfo && (
                  <div className="contact-popup">contact@atomicLab.com</div>
                )}
              </div>

              {/* Cart */}
              <Link to="/cart" className="position-relative text-dark me-2">
                <i className="fa-solid fa-cart-shopping fs-5"></i>
                {cartCount > 0 && (
                  <span className="position-absolute cart-count top-0 start-100 translate-middle badge rounded-pill bg-danger">
                    {cartCount}
                  </span>
                )}
              </Link>

              {/* User Dropdown */}
              <div className="user-dropdown position-relative">
                <i
                  className="fa-solid fa-user fs-5 text-dark"
                  style={{ cursor: "pointer" }}
                  onClick={() => setShowDropdown(!showDropdown)}
                ></i>
                {showDropdown && (
                  <div className="user-dropdown-menu">
                    {!currentUser ? (
                      <Link
                        to="/auth"
                        className="dropdown-auth-link"
                        onClick={() => setShowDropdown(false)}
                      >
                        <i className="fas fa-sign-in-alt"></i>
                        Login / Register
                      </Link>
                    ) : (
                      <div className="dropdown-content">
                        <div className="user-header">
                          <div className="user-avatar">
                            <i className="fas fa-user"></i>
                          </div>
                          <div className="user-info">
                            <div className="user-name">{getUserName()}</div>
                            <div className="user-email">{currentUser.email}</div>
                          </div>
                        </div>

                        <div className="dropdown-divider"></div>

                        <Link
                          to="/cart"
                          className="dropdown-item"
                          onClick={() => setShowDropdown(false)}
                        >
                          <i className="fas fa-shopping-bag"></i>
                          My Orders
                        </Link>

                        <div className="dropdown-divider"></div>

                        <button
                          onClick={handleLogout}
                          className="dropdown-item logout-btn"
                        >
                          <i className="fas fa-sign-out-alt"></i>
                          Logout
                        </button>

                        <Link
                          to="/deleteaccount"
                          className="dropdown-item delete-account-btn"
                          onClick={() => setShowDropdown(false)}
                        >
                          <i className="fas fa-trash"></i>
                          Delete Account
                        </Link>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Search Box */}
        {(!isMobile || showMobileSearch) && (
          <div
            className={`search-box d-flex align-items-center mb-2 position-relative 
            ${isMobile ? "mobile-active" : "desktop-search"}`}
          >
            {!isMobile && <i className="fas fa-bars me-2 text-muted"></i>}

            <input
              type="text"
              className="form-control border-0 search-input"
              placeholder="Search for desired product"
              value={keyword}
              onChange={(e) => setKeyword(e.target.value)}
              onKeyDown={handleKeyDown}
            />

            <i className="fas fa-search search-icon" onClick={handleSearch}></i>

            {isMobile && (
              <i
                className="fas fa-times close-icon"
                onClick={() => {
                  setKeyword("");
                  setShowMobileSearch(false);
                }}
              ></i>
            )}
          </div>
        )}

        {/* Desktop Contact + Icons */}
        {!isMobile && (
          <div className="contact-info d-flex align-items-center gap-3">
            <a
              className="text-dark text-decoration-none d-flex align-items-center"
              href="tel:+251911488462"
            >
              <i className="fa-solid fa-phone me-1" style={{ color: "#e83e8c" }}></i>
              011 416 2168 / +251 911 488 462
            </a>

            <a
              className="text-dark text-decoration-none d-flex align-items-center"
              href="mailto:contact@atomicLab.com"
            >
              <i className="fa-solid fa-envelope me-1" style={{ color: "#b197fc" }}></i>
              contact@atomicLab.com
            </a>

            <div className="nav-icons d-flex align-items-center position-relative">
              <Link to="/cart" className="position-relative text-dark me-3">
                <i className="fa-solid fa-cart-shopping fs-5"></i>
                {cartCount > 0 && (
                  <span className="position-absolute cart-count top-0 start-100 translate-middle badge rounded-pill bg-danger">
                    {cartCount}
                  </span>
                )}
              </Link>

              <div className="user-dropdown position-relative">
                <div
                  className="user-trigger d-flex align-items-center"
                  style={{ cursor: "pointer" }}
                  onClick={() => setShowDropdown(!showDropdown)}
                >
                  <i className="fa-solid fa-user fs-5 text-dark me-2"></i>
                  {currentUser && (
                    <span className="user-greeting d-none d-sm-inline">
                      Hi, {getUserName()}!
                    </span>
                  )}
                </div>

                {showDropdown && (
                  <div className="user-dropdown-menu">
                    {!currentUser ? (
                      <Link
                        to="/auth"
                        className="dropdown-auth-link"
                        onClick={() => setShowDropdown(false)}
                      >
                        <i className="fas fa-sign-in-alt"></i>
                        Login / Register
                      </Link>
                    ) : (
                      <div className="dropdown-content">
                        <div className="user-header">
                          <div className="user-avatar">
                            <i className="fas fa-user"></i>
                          </div>
                          <div className="user-info">
                            <div className="user-name">{getUserName()}</div>
                            <div className="user-email">{currentUser.email}</div>
                          </div>
                        </div>

                        <div className="dropdown-divider"></div>

                        <Link
                          to="/cart"
                          className="dropdown-item"
                          onClick={() => setShowDropdown(false)}
                        >
                          <i className="fas fa-shopping-bag"></i>
                          My Orders
                        </Link>

                        <div className="dropdown-divider"></div>

                        <button
                          onClick={handleLogout}
                          className="dropdown-item logout-btn"
                        >
                          <i className="fas fa-sign-out-alt"></i>
                          Logout
                        </button>

                        <Link
                          to="/deleteaccount"
                          className="dropdown-item delete-account-btn"
                          onClick={() => setShowDropdown(false)}
                        >
                          <i className="fas fa-trash"></i>
                          Delete Account
                        </Link>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default TopHeader;
