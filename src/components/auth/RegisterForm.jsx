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

export const RegisterForm = props => (
  <chakra.form
    onSubmit={e => {
      e.preventDefault();
      // your login logic here
    }}
    {...props}
  >
    <Stack spacing="6">
      <Heading textAlign="center" size="xl" fontWeight="extrabold">
        Register Account
      </Heading>
      <FormControl id="name">
        <FormLabel>Name</FormLabel>
        <Input name="name" type="text" required />
      </FormControl>
      <FormControl id="email">
        <FormLabel>Email address</FormLabel>
        <Input name="email" type="email" autoComplete="email" required />
      </FormControl>
      <PasswordField label={'Password'} />
      <Button type="submit" colorScheme="blue" size="lg" fontSize="md">
        Register
      </Button>
    </Stack>
  </chakra.form>
);
