import React, { useState } from 'react';
import {
  Button,
  chakra,
  FormControl,
  FormLabel,
  Input,
  Stack,
  useToast,
} from '@chakra-ui/react';
import { useMutation, gql } from '@apollo/client';
import MultiSelect from '../form/MultiSelect';

export const AddColumnForm = ({ columns, onClose, ...props }) => {
  const [values, setValues] = useState({
    columnName: '',
    position: columns.length - 1,
  });

  const toast = useToast();

  const [addColumn, { loading }] = useMutation(ADD_COLUMN, {
    update(proxy, result) {
      onClose();
    },
    variables: { column: values.columnName, columnPos: values.position },
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

  const multiSelectOnchange = value => {
    setValues({ ...values, position: value.value });
  };

  const onSubmit = e => {
    e.preventDefault();
    addColumn();
  };

  return (
    <chakra.form onSubmit={onSubmit} {...props}>
      <Stack spacing="6" my="6">
        <FormControl id="columnName" isRequired>
          <FormLabel>Column Name</FormLabel>
          <Input
            name="columnName"
            type="text"
            value={values.columnName}
            onChange={onChange}
          />
        </FormControl>

        <FormControl id="position" isRequired>
          <FormLabel>Place Column...</FormLabel>
          <MultiSelect
            name="position"
            placeholder="Column Position"
            defaultValue={{
              value: values.position,
              label: `Before ${columns[values.position]}`,
            }}
            options={columns.reduce((placePositions, currCol, index) => {
              placePositions.push({
                value: index,
                label: `Before ${columns[index]}`,
              });
              return placePositions;
            }, [])}
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

const ADD_COLUMN = gql`
  mutation addColumn($column: String!, $columnPos: Float!) {
    addColumn(column: $column, columnPos: $columnPos)
  }
`;
