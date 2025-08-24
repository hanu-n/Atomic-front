import React from 'react';
import { Link } from 'react-router-dom';

const ThankYou = () => {
  return (
    <div className="container d-flex align-items-center justify-content-center min-vh-90 bg-light mt-3">
      <div className="text-center bg-white p-5 rounded shadow-lg" style={{ maxWidth: '500px' }}>
        {/* Celebration animation or emoji */}
        <div className="mb-3">
          <span style={{ fontSize: '3rem' }}>🎉</span>
        </div>

        {/* Checkmark icon */}
        <div className="mb-3">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="60"
            height="60"
            fill="green"
            className="bi bi-check-circle-fill"
            viewBox="0 0 16 16"
          >
            <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM6.97 10.03a.75.75 0 0 0 1.07 0l3.992-3.992a.75.75 0 1 0-1.06-1.06L7.5 8.439 5.53 6.47a.75.75 0 0 0-1.06 1.06l2.5 2.5z" />
          </svg>
        </div>

        <h2 className="text-success fw-bold">Thank You!</h2>
        <p className="text-secondary mb-4">Your order has been placed successfully.</p>

        <Link to="/" className="btn btn-success px-4">
          Back to Home
        </Link>
      </div>
    </div>
  );
};

export default ThankYou;
