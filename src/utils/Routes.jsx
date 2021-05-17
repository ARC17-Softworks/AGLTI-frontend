import React, { useContext } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { AuthContext } from '../context/auth';

export const UnAuthenticatedRoute = props => {
  const context = useContext(AuthContext);

  if (context.user) {
    return <Redirect to="/dashboard" />;
  }
  return <Route {...props} />;
};

export const AuthenticatedRoute = props => {
  const context = useContext(AuthContext);

  if (!context.user) {
    return <Redirect to="/" />;
  }
  return <Route {...props} />;
};
