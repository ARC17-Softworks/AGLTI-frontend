import React, { useState } from 'react';
import {
  Button,
  chakra,
  FormControl,
  FormLabel,
  Textarea,
  Stack,
  useToast,
} from '@chakra-ui/react';
import { useMutation, gql } from '@apollo/client';

export const ReturnTaskForm = ({ taskId, onClose, ...props }) => {
  const [values, setValues] = useState({
    note: '',
  });

  const toast = useToast();

  const [returnTask, { loading }] = useMutation(RETURN_TASK, {
    update(proxy, result) {
      onClose();
    },
    variables: { ...values, taskId },
    onError(err) {
      console.log(err.networkError.result);
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
    returnTask();
  };

  return (
    <chakra.form onSubmit={onSubmit} {...props}>
      <Stack spacing="6" my="6">
        <FormControl id="note" isRequired>
          <FormLabel>Note</FormLabel>
          <Textarea
            name="note"
            type="text"
            value={values.note}
            onChange={onChange}
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
          Return Task
        </Button>
      </Stack>
    </chakra.form>
  );
};

const RETURN_TASK = gql`
  mutation returnTask($taskId: String!, $note: String!) {
    returnTask(taskId: $taskId, note: $note)
  }
`;
