import React, { useState } from 'react';
import {
  Button,
  chakra,
  FormControl,
  FormLabel,
  Input,
  Textarea,
  Stack,
  FormHelperText,
  useToast,
  Avatar,
  Text,
} from '@chakra-ui/react';
import { useMutation, gql } from '@apollo/client';
import MultiSelect from '../form/MultiSelect';
import DatePicker from '../form/DatePicker';

export const AddTaskForm = ({ members, onClose, ...props }) => {
  const [values, setValues] = useState({
    userId: '',
    title: '',
    description: '',
  });

  const [startDate, setStartDate] = useState(new Date());
  const [dueDate, setDueDate] = useState(new Date());

  const toast = useToast();

  const [addTask, { loading }] = useMutation(ADD_TASK, {
    update(proxy, result) {
      onClose();
    },
    variables: { ...values, startDate, dueDate },
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
    setValues({ ...values, userId: value.value });
  };

  const onSubmit = e => {
    e.preventDefault();
    addTask();
  };

  return (
    <chakra.form onSubmit={onSubmit} {...props}>
      <Stack spacing="6" my="6">
        <FormControl id="title" isRequired>
          <FormLabel>Title</FormLabel>
          <Input
            name="title"
            type="text"
            value={values.title}
            onChange={onChange}
          />
        </FormControl>

        <FormControl id="userId" isRequired>
          <FormLabel>Assign To</FormLabel>
          <MultiSelect
            name="userId"
            placeholder="Assign to..."
            options={members.map(member => {
              return {
                value: member.dev.id,
                label: (
                  <Text>
                    <Avatar size="xs" src={member.dev.avatar} />{' '}
                    {member.dev.name}
                  </Text>
                ),
              };
            })}
            onChange={multiSelectOnchange}
          />
        </FormControl>

        <FormControl id="description" isRequired>
          <FormLabel>Description</FormLabel>
          <Textarea
            name="description"
            type="text"
            value={values.description}
            onChange={onChange}
          />
        </FormControl>

        <Stack direction="row">
          <FormControl id="startDate" isRequired>
            <FormLabel>Start Date</FormLabel>
            <DatePicker
              name="startDate"
              dateFormat="dd/MM/yyyy"
              selectedDate={startDate}
              isClearable={true}
              onChange={date => setStartDate(date)}
            />
            <FormHelperText>leave empty no start date</FormHelperText>
          </FormControl>
          <FormControl id="dueDate" isRequired>
            <FormLabel>Due Date</FormLabel>
            <DatePicker
              name="dueDate"
              dateFormat="dd/MM/yyyy"
              selectedDate={dueDate}
              onChange={date => setDueDate(date)}
              isClearable={true}
            />
            <FormHelperText>leave empty no due date</FormHelperText>
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
          Add Task
        </Button>
      </Stack>
    </chakra.form>
  );
};

const ADD_TASK = gql`
  mutation assignTask(
    $userId: String!
    $title: String!
    $description: String!
    $startDate: DateTime
    $dueDate: DateTime
  ) {
    assignTask(
      input: {
        userId: $userId
        title: $title
        description: $description
        startDate: $startDate
        dueDate: $dueDate
      }
    )
  }
`;
