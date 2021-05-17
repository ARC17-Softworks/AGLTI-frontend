import React, { useContext } from 'react';
import { Redirect } from 'react-router-dom';
import { AuthContext } from '../../context/auth';

export const Dashboard = () => {
  const context = useContext(AuthContext);

  if (!context.profile) {
    return <Redirect to="/createprofile" />;
  }

  return <div>Dashboard</div>;
};
