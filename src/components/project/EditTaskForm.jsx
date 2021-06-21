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

export const EditTaskForm = ({ taskValues, members, onClose, ...props }) => {
  const [values, setValues] = useState({
    taskId: taskValues.id,
    userId: taskValues.dev.id,
    title: taskValues.title,
    description: taskValues.description,
  });

  const [startDate, setStartDate] = useState(
    taskValues.startDate ? new Date(taskValues.startDate) : null
  );
  const [dueDate, setDueDate] = useState(
    taskValues.dueDate ? new Date(taskValues.dueDate) : null
  );

  const toast = useToast();

  const [editTask, { loading }] = useMutation(EDIT_TASK, {
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
    editTask();
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
            defaultValue={{
              value: taskValues.dev.id,
              label: (
                <Text>
                  <Avatar size="xs" src={taskValues.dev.avatar} />{' '}
                  {taskValues.dev.name}{' '}
                  <Text as="span" color="gray.500">
                    {' '}
                    {
                      members.find(
                        member => member.dev.id === taskValues.dev.id
                      ).title
                    }
                  </Text>
                </Text>
              ),
            }}
            options={members.map(member => {
              return {
                value: member.dev.id,
                label: (
                  <Text>
                    <Avatar size="xs" src={member.dev.avatar} />{' '}
                    {member.dev.name}{' '}
                    <Text as="span" color="gray.500">
                      {' '}
                      {member.title}
                    </Text>
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
              {...(startDate && { selectedDate: startDate })}
              // selectedDate={startDate}
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
              {...(dueDate && { selectedDate: dueDate })}
              // selectedDate={dueDate}
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
          Save
        </Button>
      </Stack>
    </chakra.form>
  );
};

const EDIT_TASK = gql`
  mutation editTask(
    $taskId: String!
    $userId: String!
    $title: String!
    $description: String!
    $startDate: DateTime
    $dueDate: DateTime
  ) {
    editTask(
      taskId: $taskId
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
