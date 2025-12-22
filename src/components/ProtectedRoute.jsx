import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAppContext } from '../context/AppContext';

const ProtectedRoute = ({ children, requiredRole }) => {
  const { user, userRole, loading } = useAppContext();

  // 1. Wait for Firebase to check session
  if (loading) return <div className="p-10 text-center">Loading...</div>;

  // 2. Not Logged In? -> Go to Login
  if (!user) {
    return <Navigate to="/" replace />;
  }

  // 3. Logged In but Wrong Role? -> Go to correct dashboard
  if (requiredRole && userRole !== requiredRole) {
    if (userRole === 'admin') return <Navigate to="/admin/dashboard" replace />;
    return <Navigate to="/dashboard" replace />;
  }

  // 4. All Good -> Show the Page
  return children;
};

export default ProtectedRoute;