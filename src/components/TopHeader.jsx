import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useState } from "react";
import {useCart} from '../context/CartContext'

const TopHeader = () => {
    const { user, logout } = useAuth()
   const [showDropdown, setShowDropdown] = useState(false);

   const {cartItems}=useCart()
   const cartCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);

   //////////////////////////////search-bar/////////////////////////
 const [keyword, setKeyword] = useState("");
 const navigate =useNavigate()

  const handleSearch = () => {
    if (keyword.trim()) {
      navigate(`/products?search=${keyword}`);
    }
  };

    const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };
  ///////////////////////////////////////////////////////
  return (
    <div className="top-header">
      <div className="container">
        {/* Search Box */}
        <div className="d-flex align-items-center" style={{ flex: 1 }}>
          {/* <div className="search-box">
            <i className="fas fa-bars me-2 text-muted"></i>
            <input
              type="text"
              className="form-control border-0"
              placeholder="Search for desired product"
              style={{ boxShadow: 'none', background: 'transparent' }}
            />
            <i className="fas fa-search ms-2 text-success" style={{ cursor: "pointer" }}></i>
          </div> */}
          
    <div className="search-box">
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
        <div className="contact-info d-flex align-items-center gap-3" style={{ flex: 1, justifyContent: 'flex-end' }}>
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
              {cartCount>0 && 
              (<span className="position-absolute cart-count top-0 start-100 translate-middle badge rounded-pill bg-danger"> {cartCount}</span> )}
              {/* <span className="badge bg-danger cart-count position-absolute">0</span> */}
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
                  {!user ? (
                    <>
                      <Link to="/register" className="dropdown-item text-dark">Register</Link>
                      <Link to="/login" className="dropdown-item text-dark">Login</Link>
                    </>
                  ) : (
                    <>
                      
                      <Link to="/logout" className="dropdown-item text-danger text-bold btn btn-sm">
                                Logout
                                  </Link>
                                  <Link to= '/DeleteAccount'className="dropdown-item text-danger text-bold btn btn-sm">Delete-Account</Link>
                                  
                                   
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
