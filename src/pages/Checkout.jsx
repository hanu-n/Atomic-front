import React, { useState } from "react";
import PayPalButton from "../components/PayPalButton";
import { useCart } from "../context/CartContext";
import { useNavigate } from "react-router-dom";
import '../assets/css/Checkout.css';
import { toast } from "react-toastify";

import BankAccountsPage from './BankTransferPage'

const Checkout = () => {
  const { cartItems = [] } = useCart();
  const [activePayment, setActivePayment] = useState(null);
  const [uploadedReceipt, setUploadedReceipt] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [showReceiptSection, setShowReceiptSection] = useState(false);
  const [showBankModal, setShowBankModal] = useState(false);
  const navigate = useNavigate();

  const orderTotal = cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  // Quick preview banks data
  const quickBanks = [
    {
       id: 1,
      name: "CBE",
      code: "CBE", 
      accountNumber: "1000123456789",
      color: "#073B4C",
      gradient: "linear-gradient(135deg, #073B4C, #118AB2)"
    },
    {
      id: 2,
           name: "Bank of Abyssinia",
           code: "BOA",
           accountNumber: "72627218",
           accountName: "Atomic Educational Materials Supply P.L.C",
           color: "#e8ef0dff",
           gradient: "linear-gradient(135deg, #c9b411ff, #bdd61cff)"
    }
  ];

  const handlePaymentSelect = (method) => {
    setActivePayment(activePayment === method ? null : method);
    setUploadedReceipt(null);
    setShowReceiptSection(false);
  };

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        toast.error("File size too large. Please upload image under 5MB.");
        return;
      }
      
      if (!file.type.startsWith('image/')) {
        toast.error("Please upload an image file.");
        return;
      }

      const reader = new FileReader();
      reader.onload = (e) => {
        setUploadedReceipt({
          file,
          preview: e.target.result,
          name: file.name
        });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemoveReceipt = () => {
    setUploadedReceipt(null);
  };

  const handlePaymentConfirmation = async () => {
    if ((activePayment === "telebirr" || activePayment === "bank") && !uploadedReceipt) {
      toast.error("Please upload your payment receipt first.");
      return;
    }

    setIsProcessing(true);
    
    try {
      await new Promise(resolve => setTimeout(resolve, 2000));
      toast.success(`🎉 ${activePayment} payment confirmed! Processing your order...`);
      
      setTimeout(() => {
        navigate('/place-order');
      }, 1500);
      
    } catch (error) {
      toast.error("Payment confirmation failed. Please try again.");
    } finally {
      setIsProcessing(false);
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const files = e.dataTransfer.files;
    if (files.length > 0) {
      handleFileUpload({ target: { files } });
    }
  };

  const handleConfirmPaymentClick = () => {
    if (!activePayment) {
      toast.error("Please select a payment method first.");
      return;
    }
    setShowReceiptSection(true);
    toast.info("Please upload your payment receipt to complete the process.");
  };

  const handleCopyAccountNumber = (accountNumber, bankName) => {
    navigator.clipboard.writeText(accountNumber);
    toast.success(`✅ ${bankName} account number copied!`);
  };

  // Unified payment instructions component
  const renderPaymentInstructions = (method) => {
    const instructions = {
      telebirr: {
        title: "Make Payment via Telebirr",
        steps: [
          "Open your Telebirr app",
          `Send etb-${orderTotal.toFixed(2)} to the number below`,
          "Take a screenshot of the payment confirmation"
        ],
        details: [
          { label: "Send to:", value: "0911-234-567" },
          { label: "Amount:", value: `etb-${orderTotal.toFixed(2)}`, highlight: true },
          { label: "Reference:", value: `ORDER-${Date.now().toString().slice(-6)}` }
        ]
      },
      bank: {
        title: "Make Bank Transfer",
        steps: [
          "Choose your preferred bank from the list",
          `Transfer etb-${orderTotal.toFixed(2)} to the account`,
          "Take a screenshot of the transfer confirmation"
        ],
        details: [
          { label: "Account Name:", value: "Atomic Educational Materials Supply P.L.C" },
          { label: "Amount:", value: `etb-${orderTotal.toFixed(2)}`, highlight: true },
          { label: "Reference:", value: `ORDER-${Date.now().toString().slice(-6)}` }
        ]
      },
      paypal: {
        title: "Pay with PayPal",
        steps: [
          "Click the PayPal button below",
          "Complete your payment in the PayPal window",
          "You'll be redirected back after successful payment"
        ],
        details: []
      }
    };

    const current = instructions[method];

    return (
      <div className="payment-instructions">
        <h5>{current.title}</h5>
        
        {/* Steps */}
        <div className="instruction-steps">
          {current.steps.map((step, index) => (
            <div key={index} className="step">
              <span className="step-number">{index + 1}</span>
              <span>{step}</span>
            </div>
          ))}
        </div>

        {/* Payment Details */}
        {current.details.length > 0 && (
          <div className="payment-details">
            <div className="detail-card">
              {current.details.map((detail, index) => (
                <div key={index} className="detail-item">
                  <span className="label">{detail.label}</span>
                  <span className={`value ${detail.highlight ? 'highlight' : ''}`}>
                    {detail.value}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* PayPal Button */}
        {method === 'paypal' && (
          <div className="paypal-container">
            <PayPalButton 
              total={orderTotal} 
              onSuccess={() => handlePaymentConfirmation()} 
            />
          </div>
        )}
      </div>
    );
  };

  // Quick banks preview component
  const renderQuickBanks = () => (
    <div className="quick-banks-section">
      <div className="quick-banks-header">
        <h5>Quick Transfer</h5>
        <p>Click any bank to copy account number instantly</p>
      </div>
      
      <div className="quick-banks-grid">
        {quickBanks.map((bank) => (
          <div 
            key={bank.id} 
            className="quick-bank-card"
            style={{ '--bank-gradient': bank.gradient }}
            onClick={() => handleCopyAccountNumber(bank.accountNumber, bank.name)}
          >
            <div className="quick-bank-color" style={{ background: bank.gradient }}></div>
            <div className="quick-bank-content">
              <div className="quick-bank-icon">
                <i className="fas fa-university"></i>
              </div>
              <div className="quick-bank-info">
                <h6>{bank.name}</h6>
                <span className="quick-bank-number">{bank.accountNumber}</span>
              </div>
              <div className="quick-copy-indicator">
                <i className="fas fa-copy"></i>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      <button 
        className="btn-view-all-banks"
        onClick={() => setShowBankModal(true)}
      >
        <i className="fas fa-external-link-alt"></i>
        View All  Bank Accounts 
      </button>
    </div>
  );

  // Unified receipt upload component
  const renderReceiptUpload = () => (
    <div className="receipt-upload-section">
      <div className="section-header">
        <h5>Upload Payment Receipt</h5>
        <p>Please upload a screenshot of your payment confirmation</p>
      </div>

      {!uploadedReceipt ? (
        <div 
          className="upload-zone"
          onDragOver={handleDragOver}
          onDrop={handleDrop}
          onClick={() => document.getElementById('receiptUpload').click()}
        >
          <div className="upload-placeholder">
            <i className="fas fa-cloud-upload-alt"></i>
            <p>Drag & drop receipt screenshot or click to browse</p>
            <span className="upload-hint">PNG, JPG up to 5MB</span>
          </div>
          <input
            id="receiptUpload"
            type="file"
            accept="image/*"
            onChange={handleFileUpload}
            style={{ display: 'none' }}
          />
        </div>
      ) : (
        <div className="receipt-preview">
          <div className="preview-container">
            <img src={uploadedReceipt.preview} alt="Receipt preview" />
            <button className="remove-receipt" onClick={handleRemoveReceipt}>
              <i className="fas fa-times"></i>
            </button>
          </div>
          <p className="file-name">{uploadedReceipt.name}</p>
        </div>
      )}
    </div>
  );

  return (
    <div className="checkout-page">
      <div className="checkout-container">
        {/* Header - Fixed overlapping */}
        <div className="checkout-header">
          <div className="header-content">
            <div className="header-top">
              <button 
                className="back-btn"
                onClick={() => navigate(-1)}
              >
                <i className="fas fa-arrow-left"></i>
                Go Back
              </button>
            </div>
            <h1 className="checkout-title">Complete Your Order</h1>
            <div className="checkout-progress">
              <div className="progress-step completed">
                <div className="step-indicator">
                  <i className="fas fa-shopping-cart"></i>
                </div>
                <span className="step-label">Cart</span>
              </div>
              <div className="progress-step completed">
                <div className="step-indicator">
                  <i className="fas fa-user"></i>
                </div>
                <span className="step-label">Details</span>
              </div>
              <div className="progress-step active">
                <div className="step-indicator">
                  <i className="fas fa-credit-card"></i>
                </div>
                <span className="step-label">Payment</span>
              </div>
              <div className="progress-step">
                <div className="step-indicator">
                  <i className="fas fa-check"></i>
                </div>
                <span className="step-label">Confirm</span>
              </div>
            </div>
          </div>
        </div>

        <div className="checkout-content">
          {/* Order Summary */}
          <div className="order-summary-section">
            <div className="summary-card">
              <div className="summary-header">
                <h3>
                  <i className="fas fa-receipt"></i>
                  Order Summary
                </h3>
                <span className="items-badge">{cartItems.length} items</span>
              </div>
              
              <div className="order-items">
                {cartItems.map((item) => (
                  <div key={item.id} className="order-item">
                    <div className="item-image">
                      <div className="image-placeholder">
                        <i className="fas fa-flask"></i>
                      </div>
                    </div>
                    <div className="item-details">
                      <span className="item-name">{item.name}</span>
                      <span className="item-quantity">Qty: {item.quantity}</span>
                    </div>
                    <span className="item-price">etb-{(item.price * item.quantity).toFixed(2)}</span>
                  </div>
                ))}
              </div>

              <div className="order-totals">
                <div className="total-line">
                  <span>Subtotal</span>
                  <span>etb-{orderTotal.toFixed(2)}</span>
                </div>
                <div className="total-line">
                  <span>Shipping</span>
                  <span className="free-shipping">Free</span>
                </div>
                <div className="total-line grand-total">
                  <span>Total Amount</span>
                  <span className="total-amount">etb-{orderTotal.toFixed(2)}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Payment Section */}
          <div className="payment-section">
            <div className="payment-container">
              <div className="payment-header">
                <h2>
                  <i className="fas fa-lock"></i>
                  Secure Payment
                </h2>
                <div className="security-badge">
                  <i className="fas fa-shield-alt"></i>
                  256-bit SSL Encrypted
                </div>
              </div>

              {/* Choose Payment Method Title */}
              <div className="choose-payment-title">
                <h3>Choose Payment Method</h3>
                <p>Select your preferred payment option</p>
              </div>

              {/* PayPal Option */}
              <div className={`payment-option ${activePayment === 'paypal' ? 'active' : ''}`}>
                <div className="option-header" onClick={() => handlePaymentSelect('paypal')}>
                  <div className="option-main">
                    <div className="payment-logo paypal">
                      <i className="fab fa-paypal"></i>
                    </div>
                    <div className="payment-info">
                      <h4>PayPal</h4>
                      <p>Pay with PayPal or credit card</p>
                    </div>
                  </div>
                  <div className="option-toggle">
                    <i className={`fas fa-chevron-${activePayment === 'paypal' ? 'down' : 'down'}`}></i>
                  </div>
                </div>

                {activePayment === 'paypal' && (
                  <div className="option-content">
                    {renderPaymentInstructions('paypal')}
                  </div>
                )}
              </div>

              {/* Telebirr Option */}
              <div className={`payment-option ${activePayment === 'telebirr' ? 'active' : ''}`}>
                <div className="option-header" onClick={() => handlePaymentSelect('telebirr')}>
                  <div className="option-main">
                    <div className="payment-logo telebirr">
                      <i className="fas fa-mobile-alt"></i>
                    </div>
                    <div className="payment-info">
                      <h4>Telebirr</h4>
                      <p>Instant mobile money payment</p>
                    </div>
                  </div>
                  <div className="option-toggle">
                    <i className={`fas fa-chevron-${activePayment === 'telebirr' ? 'down' : 'down'}`}></i>
                  </div>
                </div>

                {activePayment === 'telebirr' && (
                  <div className="option-content">
                    {renderPaymentInstructions('telebirr')}
                  </div>
                )}
              </div>

              {/* Bank Transfer Option */}
              <div className={`payment-option ${activePayment === 'bank' ? 'active' : ''}`}>
                <div className="option-header" onClick={() => handlePaymentSelect('bank')}>
                  <div className="option-main">
                    <div className="payment-logo bank">
                      <i className="fas fa-university"></i>
                    </div>
                    <div className="payment-info">
                      <h4>Bank Transfer</h4>
                      <p>Transfer directly to our bank account</p>
                    </div>
                  </div>
                  <div className="option-toggle">
                    <i className={`fas fa-chevron-${activePayment === 'bank' ? 'down' : 'down'}`}></i>
                  </div>
                </div>

                {activePayment === 'bank' && (
                  <div className="option-content">
                    {renderQuickBanks()}
                    {renderPaymentInstructions('bank')}
                  </div>
                )}
              </div>

              {/* Main Confirm Payment Button - Shows below all options */}
              {activePayment && activePayment !== 'paypal' && (
                <div className="main-confirm-section">
                  <button 
                    className="btn-main-confirm"
                    onClick={handleConfirmPaymentClick}
                  >
                    <i className="fas fa-credit-card"></i>
                    Confirm Payment
                  </button>
                </div>
              )}

              {/* Receipt Upload Section - Shows after clicking Confirm Payment */}
              {showReceiptSection && activePayment && activePayment !== 'paypal' && (
                <div className="receipt-section-main">
                  {renderReceiptUpload()}
                  
                  {/* Final Confirmation Button */}
                  <div className="final-confirm-section">
                    <button 
                      className="btn-final-confirm"
                      onClick={handlePaymentConfirmation}
                      disabled={!uploadedReceipt || isProcessing}
                    >
                      {isProcessing ? (
                        <>
                          <i className="fas fa-spinner fa-spin"></i>
                          Processing...
                        </>
                      ) : (
                        <>
                          <i className="fas fa-check-circle"></i>
                          Complete {activePayment === 'telebirr' ? 'Telebirr' : 'Bank Transfer'} Payment
                        </>
                      )}
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Support Section */}
            <div className="support-section">
              <div className="support-card">
                <div className="support-icon">
                  <i className="fas fa-headset"></i>
                </div>
                <div className="support-content">
                  <h4>Need Help with Payment?</h4>
                  <p>Our support team is here to assist you</p>
                  <div className="support-contacts">
                    <a href="tel:+251911488462" className="support-link">
                      <i className="fas fa-phone"></i>
                      +251 911 488 462
                    </a>
                    <a href="mailto:contact@atomicLab.com" className="support-link">
                      <i className="fas fa-envelope"></i>
                      contact@atomicLab.com
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bank Accounts Modal */}
      {showBankModal && (
        <div className="bank-modal-overlay">
          <div className="bank-modal-content">
            <div className="bank-modal-header">
              <h2>All Bank Accounts</h2>
              <button 
                className="close-modal-btn"
                onClick={() => setShowBankModal(false)}
              >
                <i className="fas fa-times"></i>
              </button>
            </div>
            <div className="bank-modal-body">
              <BankAccountsPage />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Checkout;