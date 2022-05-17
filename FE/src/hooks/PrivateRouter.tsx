import React from 'react';
import { Navigate, useParams, RouteProps, useLocation } from 'react-router-dom';
import { ACCESS_TOKEN } from 'constants/headers';

interface Props {
  children: React.ReactNode;
}

function PrivateOutlet({ children }: Props) {
  const isLogin = ACCESS_TOKEN;
  const param = useParams();
  const location = useLocation();

  return isLogin ? { children } : <Navigate to="/login" />;
}

export default PrivateOutlet;
