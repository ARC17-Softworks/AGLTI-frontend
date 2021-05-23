import { Button, chakra, Box, Center, Heading, Stack } from '@chakra-ui/react';
import React, { useState } from 'react';
import { useMutation, gql } from '@apollo/client';
import { PasswordField } from '../../components/form/PasswordField';
import { useToast } from '@chakra-ui/react';

export const ChangePassword = ({ to, staticContext, ...props }) => {
  const [values, setValues] = useState({
    currentPassword: '',
    newPassword: '',
    confirmNewPassword: '',
  });

  const toast = useToast();

  const [updatePassword, { loading }] = useMutation(UPDATE_PASSWORD, {
    update(proxy, result) {
      toast({
        title: 'password changed',
        status: 'success',
        duration: 3000,
        isClosable: true,
        position: 'bottom-left',
      });
    },
    variables: {
      currentPassword: values.currentPassword,
      newPassword: values.newPassword,
    },
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

  const onChange = e => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const onSubmit = e => {
    e.preventDefault();
    if (values.newPassword !== values.confirmNewPassword) {
      toast({
        title: 'passwords do not match',
        status: 'error',
        duration: 3000,
        isClosable: true,
        position: 'bottom-left',
      });
    } else if (values.newPassword.length < 6) {
      toast({
        title: 'passwords must be atleast 6 characters',
        status: 'error',
        duration: 3000,
        isClosable: true,
        position: 'bottom-left',
      });
    } else if (values.currentPassword === values.newPassword) {
      toast({
        title: 'new password same as old password',
        status: 'error',
        duration: 3000,
        isClosable: true,
        position: 'bottom-left',
      });
    } else {
      updatePassword();
    }
  };

  return (
    <Box px={10} py={3}>
      <Center
        maxWidth="container.xl"
        h="50vh"
        margin="auto"
        pt={16}
        px={{ lg: 40, md: 50 }}
      >
        <chakra.form onSubmit={onSubmit} {...props}>
          <Stack spacing="6">
            <Heading textAlign="center" size="xl" fontWeight="extrabold">
              Change Password
            </Heading>
            <PasswordField
              label={'Current Password'}
              name={'currentPassword'}
              value={values.currentPassword}
              onChange={onChange}
              required
            />
            <PasswordField
              label={'New Password'}
              name={'newPassword'}
              value={values.newPassword}
              onChange={onChange}
              required
            />
            <PasswordField
              label={'Confirm New Password'}
              name={'confirmNewPassword'}
              value={values.confirmNewPassword}
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
              Change Password
            </Button>
          </Stack>
        </chakra.form>
      </Center>
    </Box>
  );
};

const UPDATE_PASSWORD = gql`
  mutation updatePassword($newPassword: String!, $currentPassword: String!) {
    updatePassword(
      newPassword: $newPassword
      currentPassword: $currentPassword
    ) {
      user {
        id
      }
    }
  }
`;
