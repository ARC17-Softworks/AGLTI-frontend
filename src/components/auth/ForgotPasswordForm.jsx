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
import { useMutation } from '@apollo/client';
import gql from 'graphql-tag';
import { useToast } from '@chakra-ui/react';

export const ForgotPasswordForm = ({ setModalValues, onOpen, ...props }) => {
  const [email, setEmail] = useState('');

  const toast = useToast();

  const onChange = e => {
    setEmail(e.target.value);
  };

  const [forgotPword, { loading }] = useMutation(FORGOT_PASSWORD, {
    update(proxy, result) {
      setModalValues({
        title: 'Email Sent!',
        body: 'An Email with instructions to reset password has been sent.',
      });
      onOpen();
    },
    variables: { email },
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
    forgotPword();
  };

  return (
    <chakra.form onSubmit={onSubmit} {...props}>
      <Stack spacing="6">
        <Heading textAlign="center" size="xl" fontWeight="extrabold">
          Forgot Password
        </Heading>
        <FormControl id="email">
          <FormLabel>Email address</FormLabel>
          <Input
            name="email"
            type="email"
            autoComplete="email"
            required
            onChange={onChange}
            value={email}
          />
        </FormControl>
        <Button
          type="submit"
          colorScheme="green"
          size="lg"
          fontSize="md"
          isLoading={loading}
          loadingText="Submitting"
          spinnerPlacement="end"
        >
          Send Email
        </Button>
      </Stack>
    </chakra.form>
  );
};

const FORGOT_PASSWORD = gql`
  mutation forgotPassword($email: String!) {
    forgotPassword(email: $email)
  }
`;
