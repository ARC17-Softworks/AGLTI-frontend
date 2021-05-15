import { Button, chakra, Box, Center, Heading, Stack } from '@chakra-ui/react';
import React, { useState, useContext } from 'react';
import { Redirect } from 'react-router-dom';
import queryString from 'query-string';
import { useMutation, gql } from '@apollo/client';
import { PasswordField } from '../components/auth/PasswordField';
import { useToast } from '@chakra-ui/react';
import { useLocation } from 'react-router-dom';
import { AuthContext } from '../context/auth';

export const ResetPassword = props => {
  const context = useContext(AuthContext);
  const [values, setValues] = useState({
    password: '',
    confirmPassword: '',
  });

  const parsed = queryString.parse(useLocation().search);

  const toast = useToast();

  const [resetPword, { loading }] = useMutation(RESET_PASSWORD, {
    update(proxy, result) {
      context.login({
        id: result.data.resetPassword.user.id,
        name: result.data.resetPassword.user.name,
        avatar: result.data.resetPassword.user.avatar,
      });
      toast({
        title: 'password reset',
        status: 'success',
        duration: 3000,
        isClosable: true,
        position: 'bottom-left',
      });
    },
    variables: { resettoken: parsed.token, newPassword: values.password },
    onError(err) {
      console.log(err);
      if (err.graphQLErrors) {
        console.log(err.graphQLErrors);
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
        } else if (err.graphQLErrors[0].message === 'invalid token') {
          toast({
            title: 'link expired.',
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

  const onChange = e => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const onSubmit = e => {
    e.preventDefault();
    if (values.password !== values.confirmPassword) {
      toast({
        title: 'passwords do not match',
        status: 'error',
        duration: 3000,
        isClosable: true,
        position: 'bottom-left',
      });
    } else if (values.password.length < 6) {
      toast({
        title: 'passwords must be atleast 6 characters',
        status: 'error',
        duration: 3000,
        isClosable: true,
        position: 'bottom-left',
      });
    } else {
      resetPword();
    }
  };

  if (context.user) {
    return <Redirect to="/dashboard" />;
  }

  if (!parsed.token) {
    return <Redirect to="/" />;
  }

  return (
    <Box px={10} py={3}>
      <Center maxWidth="container.xl" h="50vh" margin="auto" pt={16} px={40}>
        <chakra.form onSubmit={onSubmit} {...props}>
          <Stack spacing="6">
            <Heading textAlign="center" size="xl" fontWeight="extrabold">
              Reset Password
            </Heading>
            <PasswordField
              label={'Password'}
              value={values.password}
              onChange={onChange}
              required
            />
            <PasswordField
              label={'Confirm Password'}
              name={'confirmPassword'}
              value={values.confirmPassword}
              onChange={onChange}
              required
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
              Reset
            </Button>
          </Stack>
        </chakra.form>
      </Center>
    </Box>
  );
};

const RESET_PASSWORD = gql`
  mutation resetPassword($newPassword: String!, $resettoken: String!) {
    resetPassword(newPassword: $newPassword, resettoken: $resettoken) {
      user {
        id
        name
        avatar
      }
    }
  }
`;
