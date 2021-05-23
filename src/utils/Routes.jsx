import React, { useContext } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { Loading } from '../components/Loading';
import { AuthContext } from '../context/auth';
import { useApolloClient } from '@apollo/client';

export const UnAuthenticatedRoute = props => {
  const context = useContext(AuthContext);

  if (context.load) {
    return <Loading />;
  }

  if (context.user) {
    return <Redirect to="/dashboard" />;
  }
  return <Route {...props} />;
};

export const AuthenticatedRoute = props => {
  const context = useContext(AuthContext);
  const client = useApolloClient();

  if (context.load) {
    return <Loading />;
  }

  if (!context.user) {
    client.resetStore();
    return <Redirect to="/" />;
  }
  return <Route {...props} />;
};
