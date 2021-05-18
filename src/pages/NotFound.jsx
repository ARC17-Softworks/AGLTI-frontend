import { Box, Heading, Text } from '@chakra-ui/react';
import React from 'react';

export const NotFound = () => {
  return (
    <Box maxWidth="container.xl" margin="auto" pt={16}>
      <Heading as="h1" size="3xl" textAlign="center">
        404 Page Not Found
      </Heading>
      <Text textAlign="center" fontSize="xl" mt={12}>
        The page you are looking for is not here.
      </Text>
    </Box>
  );
};
