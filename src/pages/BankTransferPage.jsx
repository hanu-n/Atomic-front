import { useLocation, useNavigate } from 'react-router-dom';
import '../assets/css/BankTransferPage.css';
import awash from '../assets/payments/awash.jpg';
import birhan from '../assets/payments/birhan.jpg';
import dashen from '../assets/payments/dashen.png';
import debub from '../assets/payments/debub.jpg';
import wegagen from '../assets/payments/wegagen.jpg';
import zemen from '../assets/payments/zemen.jpg';
import cbe from '../assets/payments/cbe.png';
import { toast } from 'react-toastify';

const BankTransferPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { orderTotal } = location.state || { orderTotal: 0 };

  // Ethiopian banks data with placeholder logos
  const ethiopianBanks = [
    {
      id: 1,
      name: "Awash Bank",
      code: "AWASH",
      accountNumber: "01304611678000",
      accountName: "Atomic Educational Materials Supply P.L.C",
      logo: awash 
    },
    {
      id: 2,
      name: "Wegagen Bank",
      code: "WEGAGEN",
      accountNumber: "00789185005",
      accountName: "Atomic Educational Materials Supply P.L.C",
      logo: wegagen
    },
    {
      id: 3,
      name: "Bank of Abyssinia",
      code: "BOA",
      accountNumber: "72627218",
      accountName: "Atomic Educational Materials Supply P.L.C",
      logo: "/logos/boa-bank.png"
    },
    {
      id: 4,
      name: "Nib International Bank",
      code: "NIB",
      accountNumber: "2600160003769",
      accountName: "Atomic Educational Materials Supply P.L.C",
      logo: "/logos/nib-bank.png"
    },
    {
      id: 5,
      name: "Zemen Bank",
      code: "ZEMEN",
      accountNumber: "144110376159012",
      accountName: "Atomic Educational Materials Supply P.L.C",
      logo: zemen
    },
    {
      id: 6,
      name: "Hibret Bank",
      code: "HIBRET",
      accountNumber: "1271814100934018",
      accountName: "Atomic Educational Materials Supply P.L.C",
      logo: "/logos/hibret-bank.png"
    },
    {
      id: 7,
      name: "Commercial Bank of Ethiopia",
      code: "CBE",
      accountNumber: "1000123456789",
      accountName: "Atomic Educational Materials Supply P.L.C",
      logo: cbe
    },
    {
      id: 8,
      name: "Dashen Bank",
      code: "DASHEN",
      accountNumber: "1252105861751",
      accountName: "Atomic Educational Materials Supply P.L.C",
      logo: dashen
    },
    {
      id: 9,
      name: "Abyssinia Bank",
      code: "ABYSSINIA",
      accountNumber: "000290157007",
      accountName: "Atomic Educational Materials Supply P.L.C",
      logo: "/logos/abyssinia-bank.png"
    }
  ];

  const handleCopyAccountNumber = (accountNumber) => {
    navigator.clipboard.writeText(accountNumber);
   toast.success('Account number copied to clipboard!')
  };

  const handleBackToCheckout = () => {
    navigate('/checkout');
  };

  return (
    <div className="bank-transfer-page">
      <div className="bank-transfer-container">
        {/* Header */}
        <div className="bank-transfer-header">
          <button className="back-btn" onClick={handleBackToCheckout}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
              <path d="M19 12H5M12 19l-7-7 7-7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            Back to Checkout
          </button>
          <h1 className="page-title">Bank Transfer</h1>
          <div className="order-summary">
            <span className="total-label">Transfer Amount:</span>
            <span className="total-amount">${orderTotal.toFixed(2)}</span>
          </div>
        </div>

        {/* Instructions */}
        <div className="instructions-card">
          <h3>How to Pay via Bank Transfer</h3>
          <div className="instructions-steps">
            <div className="step">
              <span className="step-number">1</span>
              <span className="step-text">Select your preferred bank from the list below</span>
            </div>
            <div className="step">
              <span className="step-number">2</span>
              <span className="step-text">Copy the account number and account name</span>
            </div>
            <div className="step">
              <span className="step-number">3</span>
              <span className="step-text">Transfer ${orderTotal.toFixed(2)} to the selected bank account</span>
            </div>
            <div className="step">
              <span className="step-number">4</span>
              <span className="step-text">Keep your transaction receipt for verification</span>
            </div>
          </div>
        </div>

        {/* Banks Grid */}
        <div className="banks-section">
          <h2 className="section-title">Select Your Bank</h2>
          <div className="banks-grid">
            {ethiopianBanks.map((bank) => (
              <div key={bank.id} className="bank-card">
                <div className="bank-header">
                  <div className="bank-logo">
                    {/* Placeholder logo - replace with actual image */}
                    <div className="logo-placeholder">
                      {bank.code}
                    </div>
                    {/* Uncomment when you have actual logos */}
                    {<img src={bank.logo} alt={`${bank.name} logo`} /> }
                  </div>
                  <div className="bank-info">
                    <h3 className="bank-name">{bank.name}</h3>
                    <span className="bank-code">{bank.code}</span>
                  </div>
                </div>
                
                <div className="account-details">
                  <div className="account-field">
                    <span className="field-label">Account Name:</span>
                    <span className="field-value">{bank.accountName}</span>
                  </div>
                  <div className="account-field">
                    <span className="field-label">Account Number:</span>
                    <div className="account-number-container">
                      <span className="field-value account-number">{bank.accountNumber}</span>
                      <button 
                        className="copy-btn"
                        onClick={() => handleCopyAccountNumber(bank.accountNumber)}
                        title="Copy account number"
                      >
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                          <rect x="9" y="9" width="13" height="13" rx="2" stroke="currentColor" strokeWidth="2"/>
                          <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" stroke="currentColor" strokeWidth="2"/>
                        </svg>
                      </button>
                    </div>
                  </div>
                  <div className="account-field">
                    <span className="field-label">Amount to Transfer:</span>
                    <span className="field-value amount">${orderTotal.toFixed(2)}</span>
                  </div>
                </div>

                <div className="bank-actions">
                  <button 
                    className="select-btn"
                    onClick={() => handleCopyAccountNumber(bank.accountNumber)}
                  >
                    Select This Bank
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Important Notes */}
        <div className="notes-card">
          <h3>Important Notes</h3>
          <ul className="notes-list">
            <li>Please transfer the exact amount of <strong>${orderTotal.toFixed(2)}</strong></li>
            <li>Use your order ID as the payment reference if possible</li>
            <li>Bank transfers may take 1-2 business days to process</li>
            <li>Your order will be processed once payment is confirmed</li>
            <li>Contact support if you don't receive order confirmation within 48 hours</li>
          </ul>
        </div>

        {/* Support Section */}
        <div className="support-section">
          <h3>Need Help?</h3>
          <p>Contact our support team for assistance with bank transfers</p>
          <div className="support-contacts">
            <a href="tel:+251911488462" className="support-link">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" stroke="currentColor" strokeWidth="2"/>
              </svg>
              +251 911 488 462
            </a>
            <a href="mailto:contact@atomicLab.com" className="support-link">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" stroke="currentColor" strokeWidth="2"/>
                <polyline points="22,6 12,13 2,6" stroke="currentColor" strokeWidth="2"/>
              </svg>
              contact@atomicLab.com
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BankTransferPage;