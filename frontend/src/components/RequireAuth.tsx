// src/components/RequireAuth.tsx
import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';
import { RootState } from '../store';

interface RequireAuthProps {
  children?: React.ReactNode; // Optional, falls keine Kinder übergeben werden
}

const RequireAuth: React.FC<RequireAuthProps> = ({ children }) => {
  const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated);
  
  if (!isAuthenticated) {
    // Umleitung zur Login-Seite, wenn nicht authentifiziert
    return <Navigate to="/" />;
  }

  // Render the children or an Outlet for nested routes
  return children ? <>{children}</> : <Outlet />;
};

export default RequireAuth;
