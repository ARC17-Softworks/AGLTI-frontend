import React from 'react';
import { Box, Flex, Spacer, Center } from '@chakra-ui/react';
import { SignInSignUp } from '../components/auth/SignInSignUp';
import { ReactComponent as Logo } from '../logo.svg';

export const Landing = props => {
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
