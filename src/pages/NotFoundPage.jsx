import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../assets/css/NotFoundPage.css';

const NotFoundPage = () => {
  const navigate = useNavigate();
  
  return (
    <div className="not-found-container">
      <div className="not-found-content">
        <div className="not-found-graphic">
          <div className="not-found-number">4</div>
          <div className="not-found-planet">
            <div className="planet-crater"></div>
            <div className="planet-crater"></div>
            <div className="planet-crater"></div>
          </div>
          <div className="not-found-number">4</div>
        </div>
        
        <h1 className="not-found-title">Page Not Found</h1>
        
        <p className="not-found-description">
          Oops! The page you're looking for seems to have drifted off into space.
          It might have been moved, deleted, or perhaps you typed the wrong URL.
        </p>
        
        <div className="not-found-actions">
          <button 
            className="not-found-btn primary"
            onClick={() => navigate('/')}
          >
            <span className="btn-icon">🏠</span>
            Go Home
          </button>
          
          <button 
            className="not-found-btn secondary"
            onClick={() => navigate(-1)}
          >
            <span className="btn-icon">↩️</span>
            Go Back
          </button>
          
          <button 
            className="not-found-btn secondary"
            onClick={() => window.location.reload()}
          >
            <span className="btn-icon">🔄</span>
            Reload Page
          </button>
        </div>
       
        
        <div className="not-found-footer">
          <p>Need help? <a href="/contact" className="contact-link">Contact our support team</a></p>
        </div>
      </div>
    </div>
  );
};

export default NotFoundPage;