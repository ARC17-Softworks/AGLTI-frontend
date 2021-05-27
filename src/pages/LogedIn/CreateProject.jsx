import {
  Button,
  chakra,
  Box,
  Heading,
  Stack,
  FormControl,
  FormLabel,
  Input,
  useToast,
  Textarea,
} from '@chakra-ui/react';
import { Redirect } from 'react-router-dom';
import React, { useState, useContext } from 'react';
import { useMutation, gql } from '@apollo/client';
import { AuthContext } from '../../context/auth';

export const CreateProject = props => {
  const context = useContext(AuthContext);
  const [values, setValues] = useState({
    title: '',
    description: '',
  });

  const toast = useToast();

  const [createProject, { loading }] = useMutation(CREATE_PROJECT, {
    update(proxy, result) {
      context.setProfile({
        ...context.profile,
        activeProject: true,
        projectOwner: true,
      });
      toast({
        title: 'project created',
        status: 'success',
        duration: 3000,
        isClosable: true,
        position: 'bottom-left',
      });
    },
    variables: {
      title: values.title,
      description: values.description,
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
    createProject();
  };

  if (context.profile.activeProject) {
    return <Redirect to="/projectdashboard" />;
  }

  return (
    <Box px={10} py={3}>
      <Box
        maxWidth="container.xl"
        h="50vh"
        margin="auto"
        pt={16}
        px={{ lg: 40, md: 50 }}
      >
        <chakra.form onSubmit={onSubmit} {...props}>
          <Stack spacing="6">
            <Heading textAlign="center" size="xl" fontWeight="extrabold">
              Create Project
            </Heading>
            <FormControl id="title">
              <FormLabel>Title</FormLabel>
              <Input
                name="title"
                type="text"
                value={values.title}
                onChange={onChange}
                required
              />
            </FormControl>
            <FormControl id="description">
              <FormLabel>Description</FormLabel>
              <Textarea
                name="description"
                value={values.description}
                onChange={onChange}
              />
            </FormControl>
            <Button
              type="submit"
              colorScheme="green"
              size="lg"
              fontSize="md"
              isLoading={loading}
              loadingText="Creating..."
              spinnerPlacement="end"
            >
              Create Project
            </Button>
          </Stack>
        </chakra.form>
      </Box>
    </Box>
  );
};

const CREATE_PROJECT = gql`
  mutation createProject($title: String!, $description: String!) {
    createProject(title: $title, description: $description)
  }
`;
