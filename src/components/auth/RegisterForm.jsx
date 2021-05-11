import {
  Button,
  chakra,
  FormControl,
  FormLabel,
  Input,
  Stack,
  Heading,
} from '@chakra-ui/react';
import React, { useState } from 'react';
import { PasswordField } from './PasswordField';
import { useMutation } from '@apollo/client';
import gql from 'graphql-tag';
import { useToast } from '@chakra-ui/react';

export const RegisterForm = props => {
  const [values, setValues] = useState({
    name: '',
    email: '',
    password: '',
  });

  const toast = useToast();

  const onChange = e => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const [beginReg, { loading }] = useMutation(REGISTER_USER, {
    update(proxy, result) {
      console.log(result);
      props.setModalValues({
        title: 'Email Sent!',
        body:
          'Thank you for signing up. An email has been sent to you with further signup instructions. Please also check your junk folder.',
      });
      props.onOpen();
    },
    variables: values,
    onError(err) {
      if (err.graphQLErrors) {
        if (err.graphQLErrors[0].message === 'Argument Validation Error') {
          toast({
            title: Object.values(
              err.graphQLErrors[0].extensions.exception.validationErrors[0]
                .constraints
            )[0],
            status: 'error',
            duration: 3000,
            isClosable: true,
            position: 'bottom-left',
          });
        } else {
          toast({
            title: err.graphQLErrors[0].message,
            status: 'error',
            duration: 3000,
            isClosable: true,
            position: 'bottom-left',
          });
        }
      }
    },
  });

  const onSubmit = e => {
    e.preventDefault();
    beginReg();
  };

  return (
    <chakra.form onSubmit={onSubmit} {...props}>
      <Stack spacing="6">
        <Heading textAlign="center" size="xl" fontWeight="extrabold">
          Register Account
        </Heading>
        <FormControl id="name">
          <FormLabel>Name</FormLabel>
          <Input
            name="name"
            type="text"
            value={values.name}
            onChange={onChange}
            required
          />
        </FormControl>
        <FormControl id="email">
          <FormLabel>Email address</FormLabel>
          <Input
            name="email"
            type="email"
            autoComplete="email"
            value={values.email}
            onChange={onChange}
            required
          />
        </FormControl>
        <PasswordField
          label={'Password'}
          value={values.password}
          onChange={onChange}
        />
        <Button
          type="submit"
          colorScheme="green"
          size="lg"
          fontSize="md"
          isLoading={loading}
          loadingText="Submitting"
          spinnerPlacement="end"
        >
          Register
        </Button>
      </Stack>
    </chakra.form>
  );
};

const REGISTER_USER = gql`
  mutation beginRegistration(
    $name: String!
    $email: String!
    $password: String!
  ) {
    beginRegistration(
      input: { name: $name, email: $email, password: $password }
    )
  }
`;
