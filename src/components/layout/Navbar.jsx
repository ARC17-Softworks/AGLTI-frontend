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
    <chakra.header w="full" pb={10}>
      <Flex>
        <Box></Box>
        <Spacer />
        <ColorModeSwitcher />
      </Flex>
    </chakra.header>
  );
};
