import React, { useState } from 'react';
import {
  Button,
  chakra,
  FormControl,
  FormLabel,
  Stack,
  useToast,
  Radio,
  RadioGroup,
  Heading,
} from '@chakra-ui/react';
import { useMutation, gql } from '@apollo/client';
import MultiSelect from '../form/MultiSelect';

export const DeleteColumnForm = ({ column, columns, onClose, ...props }) => {
  const [values, setValues] = useState({
    deleteTasks: false,
    shiftColumn: '',
  });

  const toast = useToast();

  const [deleteColumn, { loading }] = useMutation(DELETE_COLUMN, {
    update(proxy, result) {
      onClose();
    },
    variables: {
      column: column,
      deleteTasks: values.deleteTasks,
      shiftColumn: values.shiftColumn,
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

  const onChange = value => {
    setValues({
      ...values,
      deleteTasks: value === 'true' ? true : false,
    });
  };

  const multiSelectOnchange = value => {
    setValues({ ...values, shiftColumn: value.value });
  };

  const onSubmit = e => {
    e.preventDefault();
    deleteColumn();
  };

  return (
    <chakra.form onSubmit={onSubmit} {...props}>
      <Stack spacing="6" my="6">
        <Heading>Delete {column}?</Heading>
        <FormControl id="columnName" isRequired>
          <FormLabel>Delete tasks as well?</FormLabel>
          <RadioGroup onChange={onChange} value={values.deleteTasks.toString()}>
            <Stack direction="row">
              <Radio value="true">Yes</Radio>
              <Radio value="false">No</Radio>
            </Stack>
          </RadioGroup>
        </FormControl>
        <FormControl
          id="position"
          isRequired={!values.deleteTasks}
          isDisabled={values.deleteTasks}
        >
          <FormLabel>Move tasks in {column} to...</FormLabel>
          <MultiSelect
            name="position"
            placeholder="Column"
            options={columns.reduce((placePositions, currCol) => {
              if (currCol !== column) {
                placePositions.push({
                  value: currCol,
                  label: currCol,
                });
              }
              return placePositions;
            }, [])}
            isDisabled={values.deleteTasks}
            onChange={multiSelectOnchange}
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
          Save
        </Button>
      </Stack>
    </chakra.form>
  );
};

const DELETE_COLUMN = gql`
  mutation deleteColumn(
    $column: String!
    $deleteTasks: Boolean!
    $shiftColumn: String
  ) {
    deleteColumn(
      column: $column
      deleteTasks: $deleteTasks
      shiftColumn: $shiftColumn
    )
  }
`;
