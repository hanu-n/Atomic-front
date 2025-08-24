import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import { getAuth } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import {toast} from 'react-toastify'

const PlaceOrder = () => {
  const { cartItems, totalPrice, dispatch } = useCart();
  const navigate = useNavigate();
  const auth = getAuth();

  const [shippingInfo, setShippingInfo] = useState({
    fullName: '',
    address: '',
    city: '',
    phone: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setShippingInfo({ ...shippingInfo, [name]: value });
  };

  const handlePlaceOrder = async (e) => {
    e.preventDefault();

    const { fullName, address, city, phone } = shippingInfo;
    if (!fullName || !address || !city || !phone) {
      toast.error('Please fill in all fields');
      return;
    }

    try {
      const user = auth.currentUser;
      if (!user) {
        toast.error('User not authenticated');
        return;
      }
      const token = await user.getIdToken();
      const response = await axios.post(
        'http://localhost:5000/api/orders',
        {
          cartItems,
          shippingInfo,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      toast.success('Order placed successfully!');
      dispatch({ type: 'CLEAR_CART' });
      navigate('/thank-you');
    } catch (error) {
      console.error('Order error:', error);
      const msg = error?.response?.data?.message || 'Something went wrong.';
      alert(msg);
    }
  };

  return (
    <div className="container my-5">
      <div className="row g-4">
        {/* Shipping Form */}
        <div className="col-md-6">
          <div className="card shadow-sm">
            <div className="card-body">
              <h4 className="card-title mb-4 text-success fw-bold">Shipping Information</h4>
              <form onSubmit={handlePlaceOrder}>
                <div className="mb-3">
                  <input
                    type="text"
                    name="fullName"
                    className="form-control"
                    placeholder="Full Name"
                    value={shippingInfo.fullName}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="mb-3">
                  <input
                    type="text"
                    name="address"
                    className="form-control"
                    placeholder="Address"
                    value={shippingInfo.address}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="mb-3">
                  <input
                    type="text"
                    name="city"
                    className="form-control"
                    placeholder="City"
                    value={shippingInfo.city}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="mb-3">
                  <input
                    type="tel"
                    name="phone"
                    className="form-control"
                    placeholder="Phone Number"
                    value={shippingInfo.phone}
                    onChange={handleChange}
                    required
                  />
                </div>

                <button type="submit" className="btn btn-success w-100">
                  Place Order
                </button>
              </form>
            </div>
          </div>
        </div>

        {/* Order Summary */}
        <div className="col-md-6">
          <div className="card shadow-sm">
            <div className="card-body">
              <h4 className="card-title mb-3 text-primary fw-bold">Order Summary</h4>
              <ul className="list-group mb-3">
                {cartItems.map((item, index) => (
                  <li key={index} className="list-group-item d-flex justify-content-between align-items-center">
                    <span>{item.name} x {item.quantity}</span>
                    <span className="text-muted">${(item.price * item.quantity).toFixed(2)}</span>
                  </li>
                ))}
              </ul>
              <h5 className="text-end fw-bold">
                Total: <span className="text-success">${totalPrice.toFixed(2)}</span>
              </h5>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlaceOrder;
