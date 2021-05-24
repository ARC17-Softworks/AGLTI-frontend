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

export const AddExperienceForm = ({ refetch, onClose, ...props }) => {
  const [values, setValues] = useState({
    title: '',
    company: '',
    location: '',
  });

  const [from, setFrom] = useState(new Date());
  const [to, setTo] = useState(new Date());

  const toast = useToast();

  const [addExperience, { loading }] = useMutation(ADD_EXPERIENCE, {
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
    addExperience();
  };

  return (
    <chakra.form onSubmit={onSubmit} {...props}>
      <Stack spacing="6" my="6">
        <FormControl id="title" isRequired>
          <FormLabel>Job Title</FormLabel>
          <Input
            name="title"
            type="text"
            value={values.title}
            onChange={onChange}
          />
        </FormControl>

        <FormControl id="company" isRequired>
          <FormLabel>Company</FormLabel>
          <Input
            name="company"
            type="text"
            value={values.company}
            onChange={onChange}
          />
        </FormControl>

        <FormControl id="location">
          <FormLabel>Location</FormLabel>
          <Input
            name="location"
            type="text"
            value={values.location}
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
          Add Experience
        </Button>
      </Stack>
    </chakra.form>
  );
};

const ADD_EXPERIENCE = gql`
  mutation addExperience(
    $title: String!
    $company: String!
    $location: String
    $from: DateTime!
    $to: DateTime
  ) {
    addExperience(
      input: {
        title: $title
        company: $company
        location: $location
        from: $from
        to: $to
      }
    )
  }
`;
