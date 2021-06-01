import React, { useContext, useEffect, useState } from 'react';
import {
  chakra,
  FormControl,
  FormLabel,
  Input,
  Textarea,
  VStack,
  Flex,
  Box,
  Text,
  Divider,
  Heading,
  Link,
  Avatar,
  Spacer,
  Button,
  useDisclosure,
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
  AlertDialogCloseButton,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalBody,
  ModalCloseButton,
  useToast,
  Tooltip,
  IconButton,
  useColorModeValue,
  Wrap,
  WrapItem,
  Badge,
  Circle,
  LinkBox,
  LinkOverlay,
  ButtonGroup,
  ModalHeader,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  HStack,
  Stack,
} from '@chakra-ui/react';
import {
  ExternalLinkIcon,
  AddIcon,
  ArrowRightIcon,
  DeleteIcon,
  SearchIcon,
  CheckIcon,
  ArrowLeftIcon,
} from '@chakra-ui/icons';
import { useQuery, useMutation, gql, NetworkStatus } from '@apollo/client';
import { PROJECT_DASHBOARD_QUERY, MARK_READ } from '../../graphql';
import { ProjectDashboardContext } from '../../context/projectDashboard';
import { AuthContext } from '../../context/auth';
import { Link as RouterLink, Redirect } from 'react-router-dom';
import { Loading } from '../Loading';
import { AddTaskForm } from './AddTaskForm';
import { ReturnTaskForm } from './ReturnTaskForm';

export const TasksArea = () => {
  const authContext = useContext(AuthContext);
  const { setApplicants, setTasks } = useContext(ProjectDashboardContext);
  const toast = useToast();

  const dotBg = useColorModeValue('blue.400', 'blue.200');
  const cardBg = useColorModeValue('white', 'gray.700');
  const borderColor = useColorModeValue('gray.200', 'gray.700');

  const [tasksUnread, setTasksUnread] = useState([]);
  const [clickedTaskId, setClickedTaskId] = useState('');

  const {
    isOpen: detailsIsOpen,
    onOpen: detailsOnOpen,
    onClose: detailsOnClose,
  } = useDisclosure();

  const {
    isOpen: addIsOpen,
    onOpen: addOnOpen,
    onClose: addOnClose,
  } = useDisclosure();

  const {
    isOpen: deleteIsOpen,
    onOpen: deleteOnOpen,
    onClose: deleteOnClose,
  } = useDisclosure();
  const cancelRef = React.useRef();

  const {
    isOpen: returnIsOpen,
    onOpen: returnOnOpen,
    onClose: returnOnClose,
  } = useDisclosure();

  const [modalValues, setModalValues] = useState({
    id: '',
    title: '',
    description: '',
    dev: null,
    note: '',
    status: '',
    startDate: Date.now(),
    dueDate: Date.now(),
    read: false,
  });

  const { data } = useQuery(PROJECT_DASHBOARD_QUERY, {
    pollInterval: 500,
    fetchPolicy: 'no-cache',
  });

  const [markRead] = useMutation(MARK_READ, {
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

  const [pushTask, { loading: pushLoading }] = useMutation(PUSH_TASK, {
    update(proxy, result) {
      setTasksUnread([]);
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

  const [closeTask, { loading: closeLoading }] = useMutation(CLOSE_TASK, {
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

  const project = data ? data.currentProject.project : null;

  useEffect(() => {
    if (
      project &&
      authContext.profile.projectOwner &&
      project.applicants.length > 0
    ) {
      const unreadApplicants = project.applicants.filter(
        applicant => applicant.read === false
      ).length;
      setApplicants(unreadApplicants);
    }
    if (
      project &&
      authContext.profile.activeProject &&
      project.tasks.length > 0
    ) {
      const unreadTasks = project.tasks.filter(
        task => task.read === false && authContext.user.id === task.dev.id
      ).length;
      setTasks(unreadTasks);

      for (const task of project.tasks) {
        if (task.read === false && authContext.user.id === task.dev.id) {
          tasksUnread.push(task.id);
        }
      }

      markRead({ variables: { path: 'tasks' } });
    }
  }, [project, setApplicants, authContext, setTasks, markRead, tasksUnread]);

  if (!data) {
    return <Loading />;
  }
  return (
    <Box>
      <Flex w="full" mt={4} alignItems="center">
        <Heading pt={4} as="h1" size="2xl">
          Tasks
        </Heading>
        <Spacer />
        <Box>
          {authContext.profile.projectOwner && (
            <>
              <Button
                onClick={addOnOpen}
                leftIcon={<AddIcon />}
                variant="outline"
              >
                Add Task
              </Button>
              <Modal
                isOpen={addIsOpen}
                onClose={addOnClose}
                size="3xl"
                scrollBehavior="outside"
              >
                <ModalOverlay />
                <ModalContent>
                  <ModalCloseButton />
                  <ModalBody>
                    <AddTaskForm
                      members={project.members}
                      onClose={addOnClose}
                    />
                  </ModalBody>
                </ModalContent>
              </Modal>
            </>
          )}
        </Box>
      </Flex>
      <Divider />
      <HStack spacing={12} mt={4} alignItems="start">
        {project.taskColumns.map(column => (
          <VStack key={column} w="xs">
            <Heading w="full" as="h2" size="md">
              {column}
            </Heading>
            <Divider />
            {project.tasks.reduce((taskList, task) => {
              if (task.status === column) {
                taskList.push(
                  <LinkBox
                    p="3"
                    w="xs"
                    h="28"
                    rounded="lg"
                    borderWidth="1px"
                    borderColor={borderColor}
                    boxShadow="xl"
                    bg={cardBg}
                    key={task.id}
                  >
                    {' '}
                    <Flex
                      direction="column"
                      alignItems="start"
                      w="full"
                      h="full"
                    >
                      <LinkOverlay
                        cursor="pointer"
                        onClick={() => {
                          setModalValues(task);
                          detailsOnOpen();
                        }}
                      >
                        <Text w="full" isTruncated fontWeight="semibold">
                          {tasksUnread.includes(task.id) && (
                            <>
                              <Circle
                                size="2"
                                bg={dotBg}
                                display="inline-block"
                              />{' '}
                            </>
                          )}
                          {task.title}
                        </Text>
                      </LinkOverlay>
                      <Text
                        w="full"
                        color="gray.500"
                        fontStyle="italic"
                        fontSize="sm"
                        isTruncated
                      >
                        {task.description}
                      </Text>
                      <Text w="full" fontSize="sm" fontStyle="italic">
                        {task.startDate &&
                          task.dueDate &&
                          `${
                            new Date(task.startDate)
                              .toLocaleString('en-GB')
                              .split(',')[0]
                          } -  ${
                            new Date(task.dueDate)
                              .toLocaleString('en-GB')
                              .split(',')[0]
                          }`}
                        {!task.startDate &&
                          task.dueDate &&
                          `Due: ${
                            new Date(task.dueDate)
                              .toLocaleString('en-GB')
                              .split(',')[0]
                          }`}
                      </Text>
                      <Flex w="full" flexGrow={1} alignItems="end">
                        <Tooltip hasArrow label={task.dev.name}>
                          <Avatar size="xs" src={task.dev.avatar} />
                        </Tooltip>
                        <Spacer />
                        {!authContext.profile.projectOwner &&
                          authContext.user.id === task.dev.id &&
                          task.status !== 'DONE' &&
                          task.status !== 'COMPLETE' && (
                            <Tooltip hasArrow label="Push Task">
                              <IconButton
                                size="xs"
                                icon={<ArrowRightIcon />}
                                variant="outline"
                                isLoading={
                                  pushLoading && clickedTaskId === task.id
                                }
                                onClick={() => {
                                  setClickedTaskId(task.id);
                                  pushTask({ variables: { taskId: task.id } });
                                }}
                              />
                            </Tooltip>
                          )}
                        {authContext.profile.projectOwner &&
                          task.status !== 'COMPLETE' && (
                            <ButtonGroup size="xs" isAttached variant="outline">
                              {/* <Tooltip hasArrow label="Delete Task">
                                <IconButton
                                  colorScheme="red"
                                  icon={<DeleteIcon />}
                                  variant="outline"
                                  // isLoading={
                                  //   pushLoading && clickedTaskId === task.id
                                  // }
                                  onClick={deleteOnOpen}
                                />
                              </Tooltip> */}

                              {task.status === 'DONE' && (
                                <>
                                  <Tooltip hasArrow label="Send Task Back">
                                    <IconButton
                                      colorScheme="orange"
                                      icon={<ArrowLeftIcon />}
                                      variant="outline"
                                      onClick={() => {
                                        setClickedTaskId(task.id);
                                        returnOnOpen();
                                      }}
                                    />
                                  </Tooltip>
                                  <Tooltip hasArrow label="Close Task">
                                    <IconButton
                                      colorScheme="green"
                                      icon={<CheckIcon />}
                                      variant="outline"
                                      isLoading={
                                        closeLoading &&
                                        clickedTaskId === task.id
                                      }
                                      onClick={() => {
                                        setClickedTaskId(task.id);
                                        closeTask({
                                          variables: { taskId: task.id },
                                        });
                                      }}
                                    />
                                  </Tooltip>
                                </>
                              )}
                            </ButtonGroup>
                          )}
                      </Flex>
                    </Flex>
                  </LinkBox>
                );
              }
              return taskList;
            }, [])}
          </VStack>
        ))}
      </HStack>
      <Modal
        isOpen={detailsIsOpen}
        onClose={detailsOnClose}
        size="5xl"
        scrollBehavior="inside"
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>{modalValues.title}</ModalHeader>
          <ModalCloseButton />
          <ModalBody px={8}>
            <Text pt={2} pb={6}>
              {modalValues.description}
            </Text>
            <Text fontWeight="bold" fontStyle="italic">
              Start Date:{' '}
              <Text as="span" color="gray.500">
                {modalValues.startDate
                  ? new Date(modalValues.startDate)
                      .toLocaleString('en-GB')
                      .split(',')[0]
                  : 'N/A'}
              </Text>{' '}
              Due Date:
              <Text as="span" color="gray.500">
                {modalValues.dueDate
                  ? new Date(modalValues.dueDate)
                      .toLocaleString('en-GB')
                      .split(',')[0]
                  : 'N/A'}
              </Text>
            </Text>
            {modalValues.note && (
              <Text fontWeight="bold" fontStyle="italic">
                Note: <Text as="span">{modalValues.note}</Text>
              </Text>
            )}
            <HStack mt="4" alignItems="center">
              <Text fontWeight="bold">Asignee: </Text>{' '}
              {modalValues.dev && (
                <Tooltip hasArrow label={modalValues.dev.name}>
                  <Avatar size="sm" src={modalValues.dev.avatar} />
                </Tooltip>
              )}
            </HStack>
          </ModalBody>
        </ModalContent>
      </Modal>
      <AlertDialog
        motionPreset="slideInBottom"
        leastDestructiveRef={cancelRef}
        onClose={deleteOnClose}
        isOpen={deleteIsOpen}
      >
        <AlertDialogOverlay />

        <AlertDialogContent>
          <AlertDialogHeader>Delete Task?</AlertDialogHeader>
          <AlertDialogCloseButton />
          <AlertDialogBody>
            Are you sure you want to delete this Task?
          </AlertDialogBody>
          <AlertDialogFooter>
            <Button ref={cancelRef} onClick={deleteOnClose}>
              No
            </Button>
            <Button
              colorScheme="red"
              fontSize="md"
              onClick={() => {
                deleteOnClose();
              }}
            >
              Yes
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
      <Modal
        isOpen={returnIsOpen}
        onClose={returnOnClose}
        size="3xl"
        scrollBehavior="outside"
      >
        <ModalOverlay />
        <ModalContent>
          <ModalCloseButton />
          <ModalBody>
            <ReturnTaskForm taskId={clickedTaskId} onClose={returnOnClose} />
          </ModalBody>
        </ModalContent>
      </Modal>
    </Box>
  );
};

const PUSH_TASK = gql`
  mutation pushTask($taskId: String!) {
    pushTask(taskId: $taskId)
  }
`;
const CLOSE_TASK = gql`
  mutation closeTask($taskId: String!) {
    closeTask(taskId: $taskId)
  }
`;
