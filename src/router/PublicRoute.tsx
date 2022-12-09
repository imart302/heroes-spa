import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from '../auth/context';

export const PublicRoute = ({
  children,
}: {
  children: React.ReactElement[] | React.ReactElement;
}) => {
  const authContext = useContext(AuthContext);
  return (
    <>{ (authContext.authSte.logged) ? <Navigate to={'/marvel'} /> : children }</>
  );
};
