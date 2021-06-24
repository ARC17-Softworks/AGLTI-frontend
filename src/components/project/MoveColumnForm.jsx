import React, { useState } from 'react';
import {
  Button,
  chakra,
  FormControl,
  FormLabel,
  Stack,
  useToast,
  Heading,
} from '@chakra-ui/react';
import { useMutation, gql } from '@apollo/client';
import MultiSelect from '../form/MultiSelect';

export const MoveColumnForm = ({ column, columns, onClose, ...props }) => {
  const [values, setValues] = useState({
    position: columns.length - 1,
  });

  const toast = useToast();

  const [moveColumn, { loading }] = useMutation(MOVE_COLUMN, {
    update(proxy, result) {
      onClose();
    },
    variables: { column: column, columnPos: values.position },
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
    setValues({ ...values, position: value.value });
  };

  const onSubmit = e => {
    e.preventDefault();
    moveColumn();
  };

  return (
    <chakra.form onSubmit={onSubmit} {...props}>
      <Stack spacing="6" my="6">
        <Heading>Move {column}?</Heading>
        <FormControl id="position" isRequired>
          <FormLabel>Place {column}...</FormLabel>
          <MultiSelect
            name="position"
            placeholder="Column Position"
            defaultValue={{
              value: values.position,
              label: `Before ${columns[values.position]}`,
            }}
            options={columns.reduce((placePositions, currCol, index) => {
              if (currCol !== column) {
                placePositions.push({
                  value: index,
                  label: `Before ${columns[index]}`,
                });
              }
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

const MOVE_COLUMN = gql`
  mutation moveColumn($column: String!, $columnPos: Float!) {
    moveColumn(column: $column, columnPos: $columnPos)
  }
`;
