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
import { useAlertContext, ADD } from '../../context/alerts';
// import { Formik } from 'formik';

export const RegisterForm = props => {
  const [values, setValues] = useState({
    name: '',
    email: '',
    password: '',
  });

  const { alertDispatch } = useAlertContext();

  const onChange = e => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const [beginReg, { loading }] = useMutation(REGISTER_USER, {
    update(proxy, result) {
      console.log(result);
      alertDispatch({
        type: ADD,
        payload: { message: 'email sent', status: 'success' },
      });
    },
    variables: values,
    onError(err) {
      console.log(err.graphQLErrors[0].message);

      if (err.graphQLErrors[0].message === 'Argument Validation Error') {
        console.log(
          Object.values(
            err.graphQLErrors[0].extensions.exception.validationErrors[0]
              .constraints
          )[0]
        );

        alertDispatch({
          type: ADD,
          payload: {
            message: Object.values(
              err.graphQLErrors[0].extensions.exception.validationErrors[0]
                .constraints
            )[0],
            status: 'error',
          },
        });
      } else {
        alertDispatch({
          type: ADD,
          payload: {
            message: err.graphQLErrors[0].message,
            status: 'error',
          },
        });
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
