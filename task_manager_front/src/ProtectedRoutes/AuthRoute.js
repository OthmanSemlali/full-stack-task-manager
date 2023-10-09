import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export const AuthRoute = ({ children }) => {
  const { isAuthenticated } = useAuth();

  // If the user is already authenticated, redirect to the dashboard
  if (isAuthenticated) {
    return <Navigate to="/dashboard" />;
  }

  // Otherwise render the login or register page
  return children;
}

