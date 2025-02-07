// src/routes/ProtectedRoute.tsx
import React from 'react';
import { Navigate } from 'react-router-dom';
import { isLoggedIn } from '../src/utils/auth';

interface ProtectedRouteProps {
  children: JSX.Element;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  if (!isLoggedIn()) {
    return <Navigate to="/" />;
  }

  return children;
};

export default ProtectedRoute;
