import { chakra, Flex, Box, Spacer } from '@chakra-ui/react';
import * as React from 'react';
import { ColorModeSwitcher } from '../../ColorModeSwitcher';

export const SignedOutNav = () => (
  <chakra.header w="full" pb={10}>
    <Flex>
      <Box></Box>
      <Spacer />
      <ColorModeSwitcher />
    </Flex>
  </chakra.header>
);
