import React, { useContext } from 'react';
import { Redirect } from 'react-router-dom';
import { Box, Flex, Spacer, Center } from '@chakra-ui/react';
import { SignInSignUp } from '../components/auth/SignInSignUp';
import { ReactComponent as Logo } from '../logo.svg';

import { AuthContext } from '../context/auth';

export const Landing = props => {
  const context = useContext(AuthContext);

  if (context.user) {
    return <Redirect to="/dashboard" />;
  }

  return (
    <Box px={10} py={3}>
      <Flex>
        <Center w="60vw" h="50vh">
          <Logo width="80%" fill="currentColor" />
        </Center>
        <Spacer />
        <SignInSignUp />
      </Flex>
    </Box>
  );
};
