import React, { useContext } from 'react';
import { Redirect } from 'react-router-dom';
import { AuthContext } from '../../context/auth';

export const Dashboard = () => {
  const context = useContext(AuthContext);

  if (!context.user) {
    return <Redirect to="/" />;
  }

  return <div>Dashboard</div>;
};
