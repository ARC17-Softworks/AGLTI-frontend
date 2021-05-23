import {
  Button,
  chakra,
  FormControl,
  FormLabel,
  Input,
  Stack,
  Heading,
  InputGroup,
  InputRightElement,
  IconButton,
  useToast,
} from '@chakra-ui/react';
import { CloseIcon } from '@chakra-ui/icons';
import React, { useState, useContext } from 'react';
import { PasswordField } from '../form/PasswordField';
import { useMutation, useApolloClient, gql } from '@apollo/client';

import { AuthContext } from '../../context/auth';

export const LoginForm = props => {
  const context = useContext(AuthContext);

  const [values, setValues] = useState({
    email: '',
    password: '',
  });

  const [validEmail, setValidEmail] = useState(false);
  const [load, setload] = useState(false);

  const client = useApolloClient();

  const toast = useToast();

  const [loginUser, { loading }] = useMutation(LOGIN_USER, {
    update(proxy, result) {
      context.login({
        user: {
          id: result.data.login.user.id,
          name: result.data.login.user.name,
          avatar: result.data.login.user.avatar,
        },
        profile: result.data.login.profile
          ? {
              skills: result.data.login.profile.skills,
              activeProject: result.data.login.profile.activeProject
                ? result.data.login.profile.activeProject.title
                : result.data.login.profile.activeProject,
            }
          : null,
      });
    },
    variables: values,
    onError(err) {
      if (err.graphQLErrors[0]) {
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
      } else {
        toast({
          title: err.message,
          status: 'error',
          duration: 3000,
          isClosable: true,
          position: 'bottom-left',
        });
      }
    },
  });

  const onSubmit = async e => {
    e.preventDefault();
    if (!validEmail) {
      try {
        setload(true);
        const { data } = await client.query({
          query: AUTH_EMAIL,
          variables: { email: values.email },
        });
        setload(false);
        if (data.authenticateEmail) {
          setValidEmail(true);
        } else {
          toast({
            title: 'invalid email',
            status: 'error',
            duration: 3000,
            isClosable: true,
            position: 'bottom-left',
          });
        }
      } catch (error) {
        if (error.graphQLErrors) {
          if (error.graphQLErrors[0].message === 'Argument Validation Error') {
            toast({
              title: Object.values(
                error.graphQLErrors[0].extensions.exception.validationErrors[0]
                  .constraints
              )[0],
              status: 'error',
              duration: 3000,
              isClosable: true,
              position: 'bottom-left',
            });
          } else {
            toast({
              title: error.graphQLErrors[0].message,
              status: 'error',
              duration: 3000,
              isClosable: true,
              position: 'bottom-left',
            });
          }
        }
      }
    } else {
      loginUser();
    }
  };

  const onChange = e => {
    e.preventDefault();
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const onEmailCancelClick = e => {
    e.preventDefault();
    setValues({
      email: '',
      password: '',
    });
    setValidEmail(false);
  };

  return (
    <chakra.form onSubmit={onSubmit} {...props}>
      <Stack spacing="6">
        <Heading textAlign="center" size="xl" fontWeight="extrabold">
          Log In
        </Heading>
        <FormControl id="email">
          <FormLabel>Email address</FormLabel>
          <InputGroup>
            <Input
              name="email"
              type="email"
              autoComplete="email"
              value={values.email}
              onChange={onChange}
              isDisabled={validEmail}
              required
            />
            {validEmail && (
              <InputRightElement>
                <IconButton
                  type="button"
                  bg="transparent !important"
                  variant="ghost"
                  onClick={onEmailCancelClick}
                  icon={<CloseIcon />}
                />
              </InputRightElement>
            )}
          </InputGroup>
        </FormControl>
        {validEmail && (
          <PasswordField
            label={'Password'}
            value={values.password}
            onChange={onChange}
            required
          />
        )}
        <Button
          type="submit"
          colorScheme="green"
          size="lg"
          fontSize="md"
          isLoading={load || loading}
          loadingText="Submitting"
          spinnerPlacement="end"
        >
          Login
        </Button>
      </Stack>
    </chakra.form>
  );
};

const AUTH_EMAIL = gql`
  query authenticateEmail($email: String!) {
    authenticateEmail(email: $email)
  }
`;

const LOGIN_USER = gql`
  mutation login($email: String!, $password: String!) {
    login(input: { email: $email, password: $password }) {
      user {
        id
        name
        avatar
      }

      profile {
        skills
        activeProject {
          title
        }
      }
    }
  }
`;
