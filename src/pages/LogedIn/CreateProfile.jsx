import React, { useContext } from 'react';
import { Redirect } from 'react-router-dom';
import { AuthContext } from '../../context/auth';
import { Box } from '@chakra-ui/react';
import { CreateProfileForm } from '../../components/profile/CreateProfileForm';

export const CreateProfile = () => {
  const context = useContext(AuthContext);

  if (context.profile) {
    return <Redirect to="/dashboard" />;
  }
  return (
    <Box maxWidth="container.xl" h="50vh" margin="auto" pt={3} px={10}>
      <CreateProfileForm />
    </Box>
  );
};
