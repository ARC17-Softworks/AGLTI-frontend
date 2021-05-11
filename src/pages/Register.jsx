import { Box, Center, Spinner, Heading, Text, Stack } from '@chakra-ui/react';
import React, { useState, useEffect } from 'react';
import queryString from 'query-string';
import { useMutation, gql } from '@apollo/client';
import { SignedOutNav } from '../components/layout/SignedOutNav';
import { ReactComponent as Logo } from '../logo.svg';

export const Register = props => {
  const parsed = queryString.parse(props.location.search);

  const [errorMessage, setErrorMessage] = useState('');

  const [completeReg, { loading, data, error }] = useMutation(
    COMPLETE_REGISTRATION,
    {
      variables: { webtoken: parsed.token },
      onError(err) {
        if (err.graphQLErrors) {
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

  return (
    <Box px={10} py={3}>
      <SignedOutNav />
      <Center maxWidth="container.xl" h="50vh" margin="auto" pt={16} px={40}>
        <Stack spacing="12" align="center" justify="center">
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
