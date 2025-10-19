import React from 'react';
import { toast } from 'react-toastify';
import awash from '../assets/payments/awash.jpg';
import wegagen from '../assets/payments/wegagen.jpg';
import birhan from '../assets/payments/birhan.jpg';
import debub from '../assets/payments/debub.jpg';
import zemen from '../assets/payments/zemen.jpg';
import dashen from '../assets/payments/dashen.png';
import cbe from '../assets/payments/cbe.png';
import '../assets/css/BankTransferPage.css'
import { useNavigate } from 'react-router-dom';

const BankAccountsPage = () => {
  const navigate=useNavigate()
  const ethiopianBanks = [
    {
      id: 1,
      name: "Awash Bank",
      code: "AWASH",
      accountNumber: "01304611678000",
      accountName: "Atomic Educational Materials Supply P.L.C",
      logo: awash,
      color: "#1c7fe3ff",
      gradient: "linear-gradient(135deg, #e4edf3ff, #1d87f9ff)"
    },
    {
      id: 2,
      name: "Wegagen Bank",
      code: "WEGAGEN",
      accountNumber: "00789185005",
      accountName: "Atomic Educational Materials Supply P.L.C",
      logo: wegagen,
      color: "#f2780dff",
      gradient: "linear-gradient(135deg, #f67811ff, #e4ebeaff)"
    },
    {
      id: 3,
      name: "Bank of Abyssinia",
      code: "BOA",
      accountNumber: "72627218",
      accountName: "Atomic Educational Materials Supply P.L.C",
      logo: birhan,
      color: "#e8ef0dff",
      gradient: "linear-gradient(135deg, #c9b411ff, #bdd61cff)"
    },
    {
      id: 4,
      name: "Nib International Bank",
      code: "NIB",
      accountNumber: "2600160003769",
      accountName: "Atomic Educational Materials Supply P.L.C",
      logo: debub,
      color: "#FF6B35",
      gradient: "linear-gradient(135deg, #FF6B35, #FFA07A)"
    },
    {
      id: 5,
      name: "Zemen Bank",
      code: "ZEMEN",
      accountNumber: "144110376159012",
      accountName: "Atomic Educational Materials Supply P.L.C",
      logo: zemen,
      color: "#6A0572",
      gradient: "linear-gradient(135deg, #6A0572, #9D4EDD)"
    },
    {
      id: 6,
      name: "Dashen Bank",
      code: "DASHEN",
      accountNumber: "1252105861751",
      accountName: "Atomic Educational Materials Supply P.L.C",
      logo: dashen,
      color: "#118AB2",
      gradient: "linear-gradient(135deg, #118AB2, #06D6A0)"
    },
    {
      id: 7,
      name: "Commercial Bank of Ethiopia",
      code: "CBE",
      accountNumber: "1000123456789",
      accountName: "Atomic Educational Materials Supply P.L.C",
      logo: cbe,
      color: "#073B4C",
      gradient: "linear-gradient(135deg, #073B4C, #118AB2)"
    }
  ];

  const handleCopyAccountNumber = (accountNumber, bankName) => {
    navigator.clipboard.writeText(accountNumber);
    toast.success(`✅ ${bankName} account number copied!`);
  };

  const handleCopyAccountName = (accountName) => {
    navigator.clipboard.writeText(accountName);
    toast.success(`✅ Account name copied!`);
  };

  return (
    <div className="bank-accounts-page">
      {/* Header Section */}
      <div className="accounts-header">
        <div className="header-background">
          <div className="floating-shapes">
            <div className="shape shape-1"></div>
            <div className="shape shape-2"></div>
            <div className="shape shape-3"></div>
          </div>
        </div>
        <div className="header-content">
          <h1 className="main-title">
            <span className="title-gradient">Bank Accounts</span>
          </h1>
          <p className="subtitle">
            Official bank accounts for <strong>Atomic Educational Materials Supply P.L.C</strong>
          </p>
          <button 
            className="not-found-btn me-1"
            onClick={() => navigate(-1)}
          >
            <span className="btn-icon">↩️</span>
            Go Back
          </button>
          <div className="company-badge">
            
            <i className="fas fa-building"></i>
            Atomic Educational Materials Supply P.L.C
          </div>
        </div>
      </div>

      {/* Bank Cards Grid */}
      <div className="bank-accounts-container">
        <div className="accounts-grid">
          {ethiopianBanks.map((bank) => (
            <div 
              key={bank.id} 
              className="bank-account-card"
              // style={{ '--bank-color': bank.color, '--bank-gradient': bank.gradient }}
            >
              {/* Bank Header with Logo */}
             <div className="bank-card-header">
  <div className="bank-logo-container">
    <div
      className="logo-background"
     
    >
      {/* Logo image fits inside the placeholder */}
      <img
        src={bank.logo}
        alt={`${bank.name} logo`}
        className="bank-logo"
      />
    </div>
  </div>
  <div className="bank-title">
    <h3 className="bank-name">{bank.name}</h3>
    <span className="bank-code" style={{ color: bank.color }}>
      {bank.code}
    </span>
  </div>
</div>


              {/* Account Details */}
              <div className="account-details-section">
                <div className="detail-group">
                  <label className="detail-label">
                    <i className="fas fa-user-tie"></i>
                    Account Name
                  </label>
                  <div className="detail-value-container">
                    <span className="detail-value">{bank.accountName}</span>
                    <button 
                      className="copy-btn account-name-copy"
                      onClick={() => handleCopyAccountName(bank.accountName)}
                      title="Copy account name"
                    >
                      <i className="fas fa-copy"></i>
                    </button>
                  </div>
                </div>

                <div className="detail-group">
                  <label className="detail-label">
                    <i className="fas fa-hashtag"></i>
                    Account Number
                  </label>
                  <div className="detail-value-container">
                    <span className="detail-value account-number">{bank.accountNumber}</span>
                    <button 
                      className="copy-btn account-number-copy"
                      onClick={() => handleCopyAccountNumber(bank.accountNumber, bank.name)}
                      title="Copy account number"
                    >
                      <i className="fas fa-copy"></i>
                    </button>
                  </div>
                </div>
              </div>

              {/* Quick Actions */}
              <div className="card-actions">
                <button 
                  className="action-btn copy-all-btn"
                  onClick={() => {
                    handleCopyAccountName(bank.accountName);
                    setTimeout(() => handleCopyAccountNumber(bank.accountNumber, bank.name), 300);
                  }}
                >
                  <i className="fas fa-copy"></i>
                  Copy All Details
                </button>
              </div>

              {/* Decorative Bank Element */}
              <div 
                className="bank-color-accent"
                style={{ background: bank.gradient }}
              ></div>
            </div>
          ))}
        </div>

        {/* Information Section */}
        <div className="info-section">
          <div className="info-card">
            <div className="info-icon">
              <i className="fas fa-info-circle"></i>
            </div>
            <div className="info-content">
              <h3>Payment Instructions</h3>
              <ul className="info-list">
                <li>Use any of the above bank accounts for payments</li>
                <li>Its very recommendable if you save the screenshot of the receipt</li>
                <li>If possible its good to include your order ID as reference</li>
                <li>Contact support after making payment</li>
              </ul>
            </div>
          </div>

          <div className="info-card support-card">
            <div className="info-icon">
              <i className="fas fa-headset"></i>
            </div>
            <div className="info-content">
              <h3>Need Help?</h3>
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
  );
};

export default BankAccountsPage;