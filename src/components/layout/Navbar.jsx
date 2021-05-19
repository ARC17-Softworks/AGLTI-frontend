import { chakra, Box, Flex, Spacer } from '@chakra-ui/react';
import React, { useContext } from 'react';
import { ColorModeSwitcher } from '../../ColorModeSwitcher';

import { AuthContext } from '../../context/auth';
import { SignedInNav } from './SignedInNav';

export const Navbar = props => {
  const context = useContext(AuthContext);
  if (context.user) {
    return <SignedInNav />;
  }

  return (
    <chakra.header w="full" px={4} py={2} shadow="md">
      <Flex>
        <Box></Box>
        <Spacer />
        <ColorModeSwitcher />
      </Flex>
    </chakra.header>
  );
};
