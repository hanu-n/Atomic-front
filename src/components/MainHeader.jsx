import { Link } from "react-router-dom";
import logo from '../assets/logo.jpg'
import { useEffect, useState } from "react";
import axios from "axios";

const MainHeader = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        setLoading(true);
        const { data } = await axios.get("https://atomic-7jgw.onrender.com/api/categories");
        console.log("Fetched categories:", data);
        setCategories(Array.isArray(data) ? data : []);
      } catch (err) {
        console.error("Error fetching categories:", err);
        setCategories([]);
      } finally {
        setLoading(false);
      }
    };
    fetchCategories();
  }, []);

  if (loading) {
    return (
      <nav className="navbar navbar-expand-lg navbar-light" style={{ backgroundColor: "rgba(226, 227, 226, 1)" }}>
        <div className="container d-flex align-items-center justify-content-between" style={{ minHeight: 70 }}>
          <Link to="/" className="navbar-brand">
            <img src={logo} alt="logo" width="100" height="60" id="logo"/>
          </Link>

          {/* Minimal spinner to avoid visual noise */}
          <div className="ms-auto d-flex align-items-center">
            <div className="spinner-border text-success" role="status" aria-label="Loading categories" style={{ width: 20, height: 20, borderWidth: 2 }}>
              <span className="visually-hidden">Loading...</span>
            </div>
          </div>
        </div>
      </nav>
    );
  }

  return (
    <>
      <style>
        {`
          .dropdown-submenu {
            position: absolute;
            left: 100%;
            top: 0;
            margin-top: -1px;
            min-width: 200px;
          }
          
          .dropend:hover > .dropdown-menu {
            display: block;
          }
          
          .dropdown-item:hover {
            background-color: #f8f9fa;
          }
          
          .dropdown-toggle::after {
            margin-left: 0.5em;
          }
        `}
      </style>
      
      <nav className="navbar navbar-expand-lg navbar-light" style={{ backgroundColor: "rgba(226, 227, 226, 1)" }}>
        <div className="container d-flex align-items-center justify-content-between">
          {/* Logo */}
          <Link to="/" className="navbar-brand">
            <img src={logo} alt="logo" width="100" height="60" id="logo"/>
          </Link>

          {/* Hamburger icon (for mobile) */}
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#mainNavbar"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          {/* Main Nav Links */}
          <div className="collapse navbar-collapse" id="mainNavbar">
            <ul className="navbar-nav fw-bold ms-auto gap-3">
              <li className="nav-item">
                <Link to="/" className="nav-link active">Home</Link>
              </li>

              {/* Dynamic Categories */}
              {categories.map((category) => (
                <li key={category._id} className="nav-item dropdown">
                  <Link
                    to="#"
                    className="nav-link dropdown-toggle"
                    data-bs-toggle="dropdown"
                  >
                    {category.name}
                  </Link>
                  <ul className="dropdown-menu">
                    {/* All option for main category */}
                    <li>
                      <Link 
                        className="dropdown-item"
                        to={`/products/category/${category.slug}`}
 
                        // to={`/category/${category.slug}`}
                      >
                        All {category.name}
                      </Link>
                    </li>
                    
                    {/* Subcategories with nested dropdowns */}
                    {category.subCategories && category.subCategories.map((subCategory) => (
                      <li key={subCategory.slug} className="dropend">
                        <Link 
                          className="dropdown-item dropdown-toggle" 
                          to="#"
                          data-bs-toggle="dropdown"
                          data-bs-auto-close="outside"
                        >
                          {subCategory.name} →
                        </Link>
                        <ul className="dropdown-menu dropdown-submenu">
                          {/* All option for subcategory */}
                          <li>
                            <Link 
                              className="dropdown-item" 
                              to={`/products/category/${category.slug}/${subCategory.slug}`}

                              // to={`/category/${category.slug}/${subCategory.slug}`}
                            >
                              All {subCategory.name}
                            </Link>
                          </li>
                          
                          {/* Sub-subcategories */}
                          {subCategory.subCategories && subCategory.subCategories.map((subSubCategory) => (
                            <li key={subSubCategory.slug}>
                              <Link 
                                className="dropdown-item" 
                                to={`/products/category/${category.slug}/${subCategory.slug}/${subSubCategory.slug}`}

                                // to={`/category/${category.slug}/${subCategory.slug}/${subSubCategory.slug}`}
                              >
                                {subSubCategory.name}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      </li>
                    ))}
                  </ul>
                </li>
              ))}

              <li className="nav-item">
                <Link to="/about" className="nav-link">About</Link>
              </li>

              <li className="nav-item">
                <Link to="/contact" className="nav-link">Contact</Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
};

export default MainHeader;
