import React, { useState } from 'react';
import {
  Button,
  chakra,
  FormControl,
  FormLabel,
  Input,
  Stack,
  FormHelperText,
  useToast,
} from '@chakra-ui/react';
import { useMutation, gql } from '@apollo/client';
import DatePicker from '../form/DatePicker';

export const AddEducationForm = ({ refetch, onClose, ...props }) => {
  const [values, setValues] = useState({
    school: '',
    degree: '',
  });

  const [from, setFrom] = useState(new Date());
  const [to, setTo] = useState(new Date());

  const toast = useToast();

  const [addEducation, { loading }] = useMutation(ADD_EDUCATION, {
    update(proxy, result) {
      refetch();
      onClose();
    },
    variables: { ...values, from, to },
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
    addEducation();
  };

  return (
    <chakra.form onSubmit={onSubmit} {...props}>
      <Stack spacing="6" my="6">
        <FormControl id="school" isRequired>
          <FormLabel>School</FormLabel>
          <Input
            name="school"
            type="text"
            value={values.school}
            onChange={onChange}
          />
        </FormControl>

        <FormControl id="degree" isRequired>
          <FormLabel>Degree</FormLabel>
          <Input
            name="degree"
            type="text"
            value={values.degree}
            onChange={onChange}
          />
        </FormControl>

        <Stack direction="row">
          <FormControl id="from" isRequired>
            <FormLabel>from</FormLabel>
            <DatePicker
              name="from"
              dateFormat="dd/MM/yyyy"
              selectedDate={from}
              onChange={date => setFrom(date)}
            />
          </FormControl>
          <FormControl id="to" isRequired>
            <FormLabel>to</FormLabel>
            <DatePicker
              name="to"
              dateFormat="dd/MM/yyyy"
              selectedDate={to}
              onChange={date => setTo(date)}
              isClearable={true}
            />
            <FormHelperText>leave empty if ongoing</FormHelperText>
          </FormControl>
        </Stack>

        <Button
          type="submit"
          colorScheme="green"
          size="lg"
          fontSize="md"
          isLoading={loading}
          loadingText="Submitting"
          spinnerPlacement="end"
        >
          Add Education
        </Button>
      </Stack>
    </chakra.form>
  );
};

const ADD_EDUCATION = gql`
  mutation addEducation(
    $school: String!
    $degree: String!
    $from: DateTime!
    $to: DateTime
  ) {
    addEducation(
      input: { school: $school, degree: $degree, from: $from, to: $to }
    )
  }
`;
