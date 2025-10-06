import React, { useState } from "react";
import PayPalButton from "../components/PayPalButton";
import { useCart } from "../context/CartContext";
import { useNavigate } from "react-router-dom";
import '../assets/css/Checkout.css';
import { toast } from "react-toastify";

const Checkout = () => {
  const { cartItems = [] } = useCart();
  const [paymentMethod, setPaymentMethod] = useState(null);
  const navigate = useNavigate();

  const orderTotal = cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  // Ethiopian banks data
  const ethiopianBanks = [
    {
      id: 1,
      name: "Commercial Bank of Ethiopia",
      code: "CBE",
      accountNumber: "1000123456789",
      logo: "/logos/cbe.png"
    },
    {
      id: 2,
      name: "Dashen Bank",
      code: "DASHEN",
      accountNumber: "2000123456789",
      logo: "/logos/dashen.png"
    },
    {
      id: 3,
      name: "Awash Bank",
      code: "AWASH",
      accountNumber: "3000123456789",
      logo: "/logos/awash.png"
    },
    {
      id: 4,
      name: "Abyssinia Bank",
      code: "ABYSSINIA",
      accountNumber: "4000123456789",
      logo: "/logos/abyssinia.png"
    },
    {
      id: 5,
      name: "Bank of Abyssinia",
      code: "BOA",
      accountNumber: "5000123456789",
      logo: "/logos/boa.png"
    },
    {
      id: 6,
      name: "Nib International Bank",
      code: "NIB",
      accountNumber: "6000123456789",
      logo: "/logos/nib.png"
    }
  ];

  const handleBankTransferClick = () => {
    navigate('/bank-transfer', { 
      state: { 
        banks: ethiopianBanks, 
        orderTotal: orderTotal 
      } 
    });
  };

  const handlePaymentConfirmation = (method) => {
    
    toast.success((`Thank you! Please complete your ${method} payment to confirm your order.`))
  };

  return (
    <div className="checkout-page">
      <div className="checkout-container">
        {/* Header */}
        <div className="checkout-header">
          <h1 className="checkout-title">Complete Your Purchase</h1>
          <div className="checkout-progress">
            <div className="progress-step completed">
              <span className="step-number">1</span>
              <span className="step-label">Cart</span>
            </div>
            <div className="progress-step completed">
              <span className="step-number">2</span>
              <span className="step-label">Details</span>
            </div>
            <div className="progress-step active">
              <span className="step-number">3</span>
              <span className="step-label">Payment</span>
            </div>
            <div className="progress-step">
              <span className="step-number">4</span>
              <span className="step-label">Confirm</span>
            </div>
          </div>
        </div>

        <div className="checkout-content">
          {/* Order Summary */}
          <div className="checkout-summary">
            <div className="summary-card">
              <div className="summary-header">
                <h3 className="summary-title">Order Summary</h3>
                <span className="items-count">{cartItems.length} items</span>
              </div>
              
              <div className="order-items">
                {cartItems.map((item) => (
                  <div key={item.id} className="order-item">
                    <div className="item-info">
                      <span className="item-name">{item.name}</span>
                      <span className="item-meta">
                        {item.quantity} × ${item.price}
                      </span>
                    </div>
                    <span className="item-price">
                      ${(item.price * item.quantity).toFixed(2)}
                    </span>
                  </div>
                ))}
              </div>

              <div className="order-total-section">
                <div className="total-line">
                  <span>Subtotal</span>
                  <span>${orderTotal.toFixed(2)}</span>
                </div>
                <div className="total-line">
                  <span>Shipping</span>
                  <span className="free">Free</span>
                </div>
                <div className="total-line main-total">
                  <span>Total Amount</span>
                  <span className="total-amount">${orderTotal.toFixed(2)}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Payment Methods */}
          <div className="payment-section">
            <div className="payment-card">
              <div className="payment-header">
                <h3 className="payment-title">Select Payment Method</h3>
                <div className="secure-badge">
                  <span className="lock-icon">🔒</span>
                  Secure Payment
                </div>
              </div>

              {/* PayPal */}
              <div className="payment-option">
                <div className="option-header">
                  <div className="option-info">
                    <div className="option-logo paypal-logo">
                      <span>PayPal</span>
                    </div>
                    <div className="option-details">
                      <h4>Pay with PayPal</h4>
                      <p>Secure payment with PayPal account or credit card</p>
                    </div>
                  </div>
                </div>
                <div className="option-content">
                  <PayPalButton total={orderTotal} onSuccess={() => handlePaymentConfirmation("PayPal")} />
                </div>
              </div>

              {/* Telebirr */}
              <div className="payment-option">
                <div className="option-header">
                  <div className="option-info">
                    <div className="option-logo telebirr-logo">
                      <span>Telebirr</span>
                    </div>
                    <div className="option-details">
                      <h4>Pay with Telebirr</h4>
                      <p>Instant payment via Telebirr mobile money</p>
                    </div>
                  </div>
                </div>
                <div className="option-content">
                  <div className="payment-instructions">
                    <div className="instruction-steps">
                      <div className="step">
                        <span className="step-number">1</span>
                        <span>Open your Telebirr app</span>
                      </div>
                      <div className="step">
                        <span className="step-number">2</span>
                        <span>Send <strong>${orderTotal.toFixed(2)}</strong> to:</span>
                      </div>
                    </div>
                    <div className="payment-details-card">
                      <div className="detail-row">
                        <span className="detail-label">Phone Number:</span>
                        <span className="detail-value">0911-234-567</span>
                      </div>
                      <div className="detail-row">
                        <span className="detail-label">Amount:</span>
                        <span className="detail-value highlight">${orderTotal.toFixed(2)}</span>
                      </div>
                    </div>
                    <button 
                      className="confirm-payment-btn"
                      onClick={() => handlePaymentConfirmation("Telebirr")}
                    >
                      I've Completed the Payment
                    </button>
                  </div>
                </div>
              </div>

              {/* Bank Transfer */}
              <div className="payment-option">
                <div className="option-header">
                  <div className="option-info">
                    <div className="option-logo bank-logo">
                      <span>Bank Transfer</span>
                    </div>
                    <div className="option-details">
                      <h4>Bank Transfer</h4>
                      <p>Transfer directly to our bank accounts</p>
                    </div>
                  </div>
                  <button 
                    className={`toggle-btn ${paymentMethod === "bank" ? "active" : ""}`}
                    onClick={() => setPaymentMethod(paymentMethod === "bank" ? null : "bank")}
                  >
                    {paymentMethod === "bank" ? "▲" : "▼"}
                  </button>
                </div>
                
                {paymentMethod === "bank" && (
                  <div className="option-content">
                    <div className="bank-transfer-content">
                      <div className="bank-list">
                        <h5>Popular Banks</h5>
                        <div className="banks-grid">
                          {ethiopianBanks.slice(0, 3).map((bank) => (
                            <div key={bank.id} className="bank-card">
                              <div className="bank-logo">
                                <div className="logo-placeholder">
                                  {bank.code}
                                </div>
                              </div>
                              <div className="bank-details">
                                <strong>{bank.name}</strong>
                                <span className="account-number">{bank.accountNumber}</span>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                      <div className="bank-actions">
                        <button 
                          className="view-all-banks-btn"
                          onClick={handleBankTransferClick}
                        >
                          View All 6 Banks
                        </button>
                        <p className="bank-note">
                          Transfer <strong>${orderTotal.toFixed(2)}</strong> to any account above
                        </p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Support Section */}
            <div className="support-section">
              <div className="support-card">
                <h4>Need Help?</h4>
                <p>Our support team is here to assist you</p>
                <div className="support-contacts">
                  <a href="tel:+251911488462" className="support-link">
                    📞 +251 911 488 462
                  </a>
                  <a href="mailto:contact@atomicLab.com" className="support-link">
                    ✉️ contact@atomicLab.com
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;