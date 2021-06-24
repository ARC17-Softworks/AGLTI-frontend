import {
  Button,
  chakra,
  Heading,
  Stack,
  FormControl,
  FormLabel,
  Input,
  useToast,
  Textarea,
} from '@chakra-ui/react';
import React, { useState } from 'react';
import { useMutation, gql } from '@apollo/client';

export const CreatePostForm = ({ onClose, refetch, ...props }) => {
  const [values, setValues] = useState({
    title: '',
    text: '',
  });

  const toast = useToast();

  const [creatPost, { loading }] = useMutation(CREATE_POST, {
    update(proxy, result) {
      refetch();
      onClose();
    },
    variables: {
      title: values.title,
      text: values.text,
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
    creatPost();
  };
  return (
    <chakra.form onSubmit={onSubmit} {...props}>
      <Stack spacing="6">
        <Heading textAlign="center" size="xl" fontWeight="extrabold">
          Create Post
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
        <FormControl id="text">
          <FormLabel>Body</FormLabel>
          <Textarea name="text" value={values.text} onChange={onChange} />
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
          Create Post
        </Button>
      </Stack>
    </chakra.form>
  );
};

const CREATE_POST = gql`
  mutation createPost($title: String!, $text: String!) {
    createPost(input: { title: $title, text: $text })
  }
`;
