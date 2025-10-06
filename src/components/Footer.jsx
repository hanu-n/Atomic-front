import { Link } from 'react-router-dom'
import cbe from '../assets/payments/cbe.png'
import dash from '../assets/payments/dashen.png'
import telebirr from '../assets/payments/telebrr.png'

const Footer = () => {
  return (
    <footer className="bg-dark text-white pt-5 mt-5">
      <div className="container">
        {/* Main Footer Content */}
        <div className="row g-4">
          {/* Company Info & Description */}
          <div className="col-lg-4 col-md-6 mb-4">
            <div className="mb-4">
              <h4 className="text-success fw-bold mb-3">Atomic PLC</h4>
              <p className="text-light mb-3">
                Your trusted supplier of educational and laboratory materials in Ethiopia. 
                We provide high-quality equipment for schools, universities, and research institutions.
              </p>
              <div className="d-flex align-items-center mb-3">
                <i className="fas fa-shield-alt text-success me-2 fs-5"></i>
                <span className="text-light">Quality Guaranteed</span>
              </div>
              <div className="d-flex align-items-center mb-3">
                <i className="fas fa-truck text-success me-2 fs-5"></i>
                <span className="text-light">Fast Delivery</span>
              </div>
              <div className="d-flex align-items-center">
                <i className="fas fa-headset text-success me-2 fs-5"></i>
                <span className="text-light">24/7 Support</span>
              </div>
            </div>
            
            {/* Payment Partners */}
            <div>
              <h6 className="text-success mb-3">Secure Payment Partners</h6>
              <div className="d-flex flex-wrap gap-2">
                <a href="https://combanketh.et/" target="_blank" rel="noopener noreferrer">
                  <img src={cbe} alt="Commercial Bank of Ethiopia" className="img-fluid" style={{height: '40px', width: 'auto'}}/>
                </a>
                <a href="https://www.ethiotelecom.et/telebirr/" target="_blank" rel="noopener noreferrer">
                  <img src={telebirr} alt="Telebirr" className="img-fluid" style={{height: '40px', width: 'auto'}}/>
                </a>
               
                <a href="https://dashenbanksc.com/" target="_blank" rel="noopener noreferrer">
                  <img src={dash} alt="Dashen Bank" className="img-fluid" style={{height: '40px', width: 'auto'}}/>
                </a>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div className="col-lg-2 col-md-6 mb-4">
            <h6 className="text-success fw-bold mb-3">Quick Links</h6>
            <ul className="list-unstyled">
              <li className="mb-2">
                <Link to="/" className="text-light text-decoration-none hover-success">
                  <i className="fas fa-home me-2"></i>Home
                </Link>
              </li>
              <li className="mb-2">
                <Link to="/products" className="text-light text-decoration-none hover-success">
                  <i className="fas fa-th me-2"></i>Products
                </Link>
              </li>
              <li className="mb-2">
                <Link to="/about" className="text-light text-decoration-none hover-success">
                  <i className="fas fa-info-circle me-2"></i>About Us
                </Link>
              </li>
              <li className="mb-2">
                <Link to="/contact" className="text-light text-decoration-none hover-success">
                  <i className="fas fa-envelope me-2"></i>Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Customer Service */}
          <div className="col-lg-2 col-md-6 mb-4">
            <h6 className="text-success fw-bold mb-3">Customer Service</h6>
            <ul className="list-unstyled">
              <li className="mb-2">
                <Link to="/cart" className="text-light text-decoration-none hover-success">
                  <i className="fas fa-shopping-cart me-2"></i>Shopping Cart
                </Link>
              </li>
              <li className="mb-2">
                <a href="#" className="text-light text-decoration-none hover-success">
                  <i className="fas fa-question-circle me-2"></i>Help Center
                </a>
              </li>
              <li className="mb-2">
                <a href="#" className="text-light text-decoration-none hover-success">
                  <i className="fas fa-truck me-2"></i>Shipping Info
                </a>
              </li>
              <li className="mb-2">
                <a href="#" className="text-light text-decoration-none hover-success">
                  <i className="fas fa-undo me-2"></i>Returns
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="col-lg-4 col-md-6 mb-4">
            <h6 className="text-success fw-bold mb-3">Contact Information</h6>
            <div className="mb-4">
              <div className="d-flex align-items-start mb-3">
                <i className="fas fa-map-marker-alt text-success me-3 mt-1"></i>
                <div>
                  <strong>Address:</strong><br/>
                  <span className="text-light">Kirkos Subcity, Addis Ababa, Ethiopia</span>
                </div>
              </div>
              <div className="d-flex align-items-center mb-3">
                <i className="fas fa-phone text-success me-3"></i>
                <div>
                  <strong>Phone:</strong><br/>
                  <span className="text-light">011 416 2168 / +251 911 488 462</span>
                </div>
              </div>
              <div className="d-flex align-items-center mb-3">
                <i className="fas fa-envelope text-success me-3"></i>
                <div>
                  <strong>Email:</strong><br/>
                  <span className="text-light">info@atomicplc.com</span>
                </div>
              </div>
              <div className="d-flex align-items-center">
                <i className="fas fa-clock text-success me-3"></i>
                <div>
                  <strong>Business Hours:</strong><br/>
                  <span className="text-light">Mon-Fri: 8:00 AM - 6:00 PM</span>
                </div>
              </div>
            </div>

           
           
          </div>
        </div>

        {/* Social Media & Bottom Section */}
        <div className="border-top border-secondary pt-4">
          {/* Social Media */}
          <div className="text-center mb-3">
            <h6 className="text-success mb-3">Follow Us</h6>
            <div className="d-flex justify-content-center gap-3">
              <a href="#" className="text-white text-decoration-none hover-success" aria-label="Facebook">
                <i className="fab fa-facebook fs-4"></i>
              </a>
              <a href="#" className="text-white text-decoration-none hover-success" aria-label="Twitter">
                <i className="fab fa-twitter fs-4"></i>
              </a>
              <a href="#" className="text-white text-decoration-none hover-success" aria-label="Instagram">
                <i className="fab fa-instagram fs-4"></i>
              </a>
              <a href="#" className="text-white text-decoration-none hover-success" aria-label="LinkedIn">
                <i className="fab fa-linkedin fs-4"></i>
              </a>
             
            </div>
          </div>

          {/* Copyright */}
          <div className="text-center border-top border-secondary pt-3 pb-2">
            <small className="text-light">
              &copy; 2025 Atomic PLC. All rights reserved. | 
              <a href="#" className="text-light text-decoration-none ms-2">Privacy Policy</a> | 
              <a href="#" className="text-light text-decoration-none ms-2">Terms of Service</a>
            </small>
          </div>
        </div>
      </div>

      {/* Custom CSS for hover effects */}
      <style jsx>{`
        .hover-success:hover {
          color: #198754 !important;
          transition: color 0.3s ease;
        }
        
        .footer a:hover {
          color: #198754 !important;
        }
        
        @media (max-width: 768px) {
          .footer .col-md-6 {
            text-align: center;
          }
        }
      `}</style>
    </footer>
  )
}

export default Footer