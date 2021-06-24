import React, { useState } from 'react';
import {
  IconButton,
  chakra,
  FormControl,
  HStack,
  useToast,
} from '@chakra-ui/react';
import { CheckIcon } from '@chakra-ui/icons';
import { useMutation, gql } from '@apollo/client';
import MultiSelect from '../form/MultiSelect';

export const SetTaskLabelsForm = ({
  taskId,
  taskLabels,
  labels,
  setEditTaskLabels,
  ...props
}) => {
  const [values, setValues] = useState({
    taskId,
    labels,
  });

  const toast = useToast();

  const [setLabels, { loading }] = useMutation(SET_LABELS, {
    update(proxy, result) {
      setEditTaskLabels(false);
    },
    variables: { ...values },
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

  const multiSelectOnchange = value => {
    setValues({
      ...values,
      labels: value.length > 0 ? value.map(v => v.value) : value,
    });
  };

  const onSubmit = e => {
    e.preventDefault();
    setLabels();
  };

  return (
    <chakra.form onSubmit={onSubmit} {...props}>
      <HStack mb="2">
        <FormControl id="labels" isRequired>
          <MultiSelect
            isMulti
            name="labels"
            placeholder="Add labels..."
            defaultValue={labels.map(label => {
              return { value: label, label: label };
            })}
            options={taskLabels.map(label => {
              return { value: label, label: label };
            })}
            onChange={multiSelectOnchange}
          />
        </FormControl>

        <IconButton
          type="submit"
          icon={<CheckIcon />}
          colorScheme="green"
          size="sm"
          fontSize="md"
          isLoading={loading}
        />
      </HStack>
    </chakra.form>
  );
};

const SET_LABELS = gql`
  mutation setTaskLabels($taskId: String!, $labels: [String]!) {
    setTaskLabels(taskId: $taskId, labels: $labels)
  }
`;
