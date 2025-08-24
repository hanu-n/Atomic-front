import { Link } from 'react-router-dom'
import arif from '../assets/payments/arif.png'
import cbe from '../assets/payments/cbe.png'
import dash from '../assets/payments/dashen.png'
import telebirr from '../assets/payments/telebrr.png'
const Footer = () => {
  return (
   <footer className="bg-dark text-white pt-4 mt-5">
  <div className="container">
    <div className="row">
      {/* <!-- Company Info --> */}
      <div className="col-md-4 mb-4">
        <h5 className="text-success">Atomic PLC</h5>
        <p >Your trusted supplier of educational and laboratory materials in Ethiopia.</p>
        <h5 className="text-success">Our Partners</h5>
        <a className='me-3' href="https://combanketh.et/"><img src={cbe} alt="" width="50" height="50"/></a>
        <a  className='me-3' href="https://www.ethiotelecom.et/telebirr/"><img src={telebirr} alt=""width="50" height="50"/></a>
        <a  className='me-3' href="https://arifpay.net/"><img src={arif} alt=""width="80" height="50" /></a>
        <a  className='me-3' href="https://dashenbanksc.com/"><img src={dash} alt=""width="50" height="50"/></a>
      </div>
{/* <!-- Quick Links --> */}
      <div className="col-md-4 mb-4">
        <h5 className="text-success">Quick Links</h5>
        <ul className="list-unstyled ">
          <li><Link to={'/'}>Home</Link></li>
          <li><Link to={'/cart'}>Shop</Link></li>
         <li><Link to={'/about'}>About Us</Link></li>
      <li><Link to={'/contact'}>Contact</Link></li>
        </ul >
      </div>

      {/* <!-- Contact Info --> */}
      <div className="col-md-4 mb-4">
        <h5 className="text-success">Contact Us</h5>
        <p className="mb-1"><i className="bi bi-geo-alt"></i> Kirkos Subcity, Addis Ababa</p>
        <p className="mb-1"><i className="bi bi-telephone"></i> 011 416 2168/+251 911 488 462</p>
        <p className="mb-0"><i className="bi bi-envelope"></i> info@atomicplc.com</p>
      </div>
    </div>

    {/* <!-- Social Media Icons --> */}
    <div className="text-center mb-3">
      <a href="#" className="text-white me-3 fs-5"><i className="bi bi-facebook"></i></a>
      <a href="#" className="text-white me-3 fs-5"><i className="bi bi-twitter"></i></a>
      <a href="#" className="text-white me-3 fs-5"><i className="bi bi-instagram"></i></a>
      <a href="#" className="text-white fs-5"><i className="bi bi-linkedin"></i></a>
    </div>

    {/* <!-- Bottom Line --> */}
    <div className="text-center border-top border-secondary pt-2 pb-3">
      <small>&copy; 2025 Atomic PLC. All rights reserved.</small>
    </div>
  </div>
</footer>
  )
}

export default Footer