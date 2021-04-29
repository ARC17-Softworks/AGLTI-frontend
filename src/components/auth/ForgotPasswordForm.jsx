import {
  Button,
  chakra,
  FormControl,
  FormLabel,
  Input,
  Stack,
  Heading,
} from '@chakra-ui/react';
import * as React from 'react';

export const ForgotPasswordForm = props => (
  <chakra.form
    onSubmit={e => {
      e.preventDefault();
      // your login logic here
    }}
    {...props}
  >
    <Stack spacing="6">
      <Heading textAlign="center" size="xl" fontWeight="extrabold">
        Forgot Password
      </Heading>
      <FormControl id="email">
        <FormLabel>Email address</FormLabel>
        <Input name="email" type="email" autoComplete="email" required />
      </FormControl>
      <Button type="submit" colorScheme="blue" size="lg" fontSize="md">
        Send Email
      </Button>
    </Stack>
  </chakra.form>
);
