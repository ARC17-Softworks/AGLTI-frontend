import { Box, Center, Spinner, Heading, Text, Stack } from '@chakra-ui/react';
import React, { useState, useEffect, useContext } from 'react';
import { Redirect } from 'react-router-dom';
import queryString from 'query-string';
import { useMutation, gql } from '@apollo/client';
import { ReactComponent as Logo } from '../logo.svg';

import { AuthContext } from '../context/auth';

export const Register = props => {
  const context = useContext(AuthContext);
  const parsed = queryString.parse(props.location.search);

  const [errorMessage, setErrorMessage] = useState('');

  const [completeReg, { loading, data, error }] = useMutation(
    COMPLETE_REGISTRATION,
    {
      update(proxy, result) {
        context.login({
          user: {
            id: result.data.completeRegistration.user.id,
            name: result.data.completeRegistration.user.name,
            avatar: result.data.completeRegistration.user.avatar,
          },
          profile: null,
        });
      },
      variables: { webtoken: parsed.token },
      onError(err) {
        if (err.graphQLErrors[0]) {
          if (err.graphQLErrors[0].message === 'Argument Validation Error') {
            setErrorMessage(
              Object.values(
                err.graphQLErrors[0].extensions.exception.validationErrors[0]
                  .constraints
              )
            );
          } else if (err.graphQLErrors[0].message === 'jwt expired') {
            setErrorMessage('link expired. please register again.');
          } else {
            setErrorMessage(err.graphQLErrors[0].message);
          }
        } else {
          setErrorMessage(err.message);
        }
      },
    }
  );
  useEffect(() => {
    completeReg();
  }, [completeReg]);

  if (!parsed.token) {
    return <Redirect to="/" />;
  }

  return (
    <Box px={10} py={3}>
      <Center maxWidth="container.xl" h="50vh" margin="auto" pt={16} px={40}>
        <Stack spacing="6" align="center" justify="center">
          <Logo width="80%" fill="currentColor" />
          {loading && <Spinner size="xl" />}
          {data && <Heading>Account created successfully!</Heading>}
          {error && (
            <>
              <Heading>Something went wrong.</Heading>
              <Text>{errorMessage}</Text>{' '}
            </>
          )}
        </Stack>
      </Center>
    </Box>
  );
};

const COMPLETE_REGISTRATION = gql`
  mutation completeRegistration($webtoken: String!) {
    completeRegistration(input: $webtoken) {
      user {
        id
        name
        avatar
      }
    }
  }
`;
