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
import { PasswordField } from './PasswordField';

export const LoginForm = props => (
  <chakra.form
    onSubmit={e => {
      e.preventDefault();
      // your login logic here
    }}
    {...props}
  >
    <Stack spacing="6">
      <Heading textAlign="center" size="xl" fontWeight="extrabold">
        Log In
      </Heading>
      <FormControl id="email">
        <FormLabel>Email address</FormLabel>
        <Input name="email" type="email" autoComplete="email" required />
      </FormControl>
      <PasswordField label={'Password'} />
      <Button type="submit" colorScheme="blue" size="lg" fontSize="md">
        Login
      </Button>
    </Stack>
  </chakra.form>
);
