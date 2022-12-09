import React, { useContext } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { AuthContext } from '../auth/context';

export const PrivateRoute = ({
  children,
}: {
  children: React.ReactElement[] | React.ReactElement;
}) => {
  const authContext = useContext(AuthContext);
  const location = useLocation();

  const lastPath = location.pathname + location.search;
  localStorage.setItem('lastPath', lastPath);
  
  console.log('Private route re render');
  return (
    <>{authContext.authSte.logged ? children : <Navigate to={'/login'} />}</>
  );
};
