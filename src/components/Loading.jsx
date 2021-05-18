import React from 'react';

import { Center, Spinner } from '@chakra-ui/react';

export const Loading = () => {
  return (
    <Center maxWidth="container.xl" h="50vh" margin="auto" pt={3} px={10}>
      <Spinner size="xl" />
    </Center>
  );
};
