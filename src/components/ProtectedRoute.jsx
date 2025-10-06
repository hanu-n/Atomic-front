import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const ProtectedRoute = ({ children, requireVerification = true }) => {
  const { currentUser, loading, isVerified } = useAuth();
  const location = useLocation();

  // Show loading while checking auth state
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  // If no user, redirect to login
  if (!currentUser) {
    return <Navigate to="/auth" replace state={{ from: location }} />;
  }

  // If verification is required and user is not verified, redirect to verification page
  if (requireVerification && !isVerified) {
    return <Navigate to="/verify-email" replace />;
  }

  // User is authenticated and verified (if required), render children
  return children;
};

export default ProtectedRoute;
