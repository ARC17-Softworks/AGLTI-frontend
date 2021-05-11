import * as React from 'react';
import { Box, Flex, Spacer, Center } from '@chakra-ui/react';
import { SignInSignUp } from '../components/auth/SignInSignUp';
import { SignedOutNav } from '../components/layout/SignedOutNav';
import { ReactComponent as Logo } from '../logo.svg';

export const Landing = props => (
  <Box px={10} py={3}>
    <SignedOutNav />
    <Flex>
      <Center w="60vw" h="50vh">
        <Logo width="80%" fill="currentColor" />
      </Center>
      <Spacer />
      <SignInSignUp />
    </Flex>
  </Box>
);
