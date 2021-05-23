import React, { useContext } from 'react';
import { Redirect } from 'react-router-dom';
import { AuthContext } from '../../context/auth';
import { Box } from '@chakra-ui/react';
import { SetProfileForm } from '../../components/dashboard/SetProfileForm';

export const CreateProfile = () => {
  const context = useContext(AuthContext);

  if (context.profile) {
    return <Redirect to="/dashboard" />;
  }
  return (
    <Box maxWidth="container.xl" h="50vh" margin="auto" pt={3} px={10}>
      <SetProfileForm />
    </Box>
  );
};
