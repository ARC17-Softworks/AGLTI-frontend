import React, { useContext, useEffect, useState } from 'react';
import {
  Input,
  InputGroup,
  InputRightElement,
  VStack,
  Flex,
  Box,
  Text,
  Divider,
  Heading,
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
  HStack,
  Stack,
  Drawer,
  DrawerBody,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  Checkbox,
  Textarea,
} from '@chakra-ui/react';
import {
  AddIcon,
  DeleteIcon,
  EditIcon,
  CheckIcon,
  HamburgerIcon,
  CloseIcon,
} from '@chakra-ui/icons';
import { useQuery, useMutation, gql } from '@apollo/client';
import { PROJECT_DASHBOARD_QUERY, MARK_READ } from '../../graphql';
import { ProjectDashboardContext } from '../../context/projectDashboard';
import { AuthContext } from '../../context/auth';
import { Loading } from '../Loading';
import { AddTaskForm } from './AddTaskForm';
import { EditTaskForm } from './EditTaskForm';
import { SetTaskLabelsForm } from './SetTaskLabelsForm';
import MultiSelect from '../form/MultiSelect';

export const TasksArea = () => {
  const authContext = useContext(AuthContext);
  const { setApplicants, setTasks } = useContext(ProjectDashboardContext);
  const toast = useToast();

  const dotBg = useColorModeValue('blue.400', 'blue.200');
  const cardBg = useColorModeValue('white', 'gray.700');
  const borderColor = useColorModeValue('gray.200', 'gray.700');
  const labelColor = useColorModeValue('gray.200', 'gray.800');

  const [tasksUnread, setTasksUnread] = useState([]);
  const [labelValue, setLabelValue] = useState('');
  const [deleteLabelValue, setDeleteLabelValue] = useState('');
  const [editTaskLabels, setEditTaskLabels] = useState(false);
  const [checkListItem, setCheckListItem] = useState('');
  const [checkListId, setCheckListId] = useState('');
  const [selectedCommentId, setSelectedCommentId] = useState('');
  const [textAreaValue, setTextAreaValue] = useState('');
  const [editTextAreaValue, setEditTextAreaValue] = useState('');
  const [moveTo, setMoveTo] = useState('');
  const [commentEdit, setCommentEdit] = useState(false);

  const initialRef = React.useRef();

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
    isOpen: editIsOpen,
    onOpen: editOnOpen,
    onClose: editOnClose,
  } = useDisclosure();

  const {
    isOpen: labelDrawerIsOpen,
    onOpen: labelDrawerOnOpen,
    onClose: labelDrawerOnClose,
  } = useDisclosure();

  const [modalValues, setModalValues] = useState({
    id: '',
    title: '',
    description: '',
    dev: null,
    labels: [],
    status: '',
    startDate: Date.now(),
    dueDate: Date.now(),
    checkList: [],
    comments: [],
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

  const [moveTask, { loading: moveTaskLoading }] = useMutation(MOVE_TASK, {
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

  const [deleteTask] = useMutation(DELETE_TASK, {
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

  const [closeTask] = useMutation(CLOSE_TASK, {
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

  const [addLabel, { loading: addLabelLoading }] = useMutation(ADD_LABEL, {
    update() {
      setLabelValue('');
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

  const [deleteLabel, { loading: deleteLabelLoading }] = useMutation(
    DELETE_LABEL,
    {
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
    }
  );

  const [addCheckListItem, { loading: addCheckListItemLoading }] = useMutation(
    ADD_CHECKLIST_ITEM,
    {
      update() {
        setCheckListItem('');
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
    }
  );

  const [removeCheckListItem, { loading: removeCheckListItemLoading }] =
    useMutation(REMOVE_CHECKLIST_ITEM, {
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

  const [checkCheckListItem] = useMutation(CHECK_CHECKLIST_ITEM, {
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

  const [addTaskComment, { loading: addTaskCommentLoading }] = useMutation(
    CREATE_TASK_COMMENT,
    {
      update() {
        setTextAreaValue('');
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
    }
  );

  const [editTaskComment, { loading: editTaskCommentLoading }] = useMutation(
    EDIT_TASK_COMMENT,
    {
      update() {
        setEditTextAreaValue('');
        setSelectedCommentId('');
        setCommentEdit(false);
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
    }
  );

  const [deleteTaskComment, { loading: deleteTaskCommentLoading }] =
    useMutation(DELETE_TASK_COMMENT, {
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
    setMoveTo(value.value);
  };

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

  useEffect(() => {
    if (project && authContext.profile.activeProject && detailsIsOpen) {
      setModalValues(project.tasks.find(task => task.id === modalValues.id));
    }
  }, [project, setModalValues, authContext, detailsIsOpen, modalValues]);

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
              <ButtonGroup variant="outline" spacing="3">
                <Button
                  onClick={labelDrawerOnOpen}
                  leftIcon={<HamburgerIcon />}
                >
                  Labels
                </Button>
                <Button onClick={addOnOpen} leftIcon={<AddIcon />}>
                  Add Task
                </Button>
              </ButtonGroup>
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
                          setMoveTo('');
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
                      {task.labels.length > 0 && (
                        <HStack>
                          {' '}
                          <Badge>{task.labels[0]}</Badge>{' '}
                          {task.labels.length > 1 && (
                            <Text fontSize="small" color="gray.500">
                              +{task.labels.length - 1}
                            </Text>
                          )}
                        </HStack>
                      )}
                      <Text
                        w="full"
                        color="gray.500"
                        fontStyle="italic"
                        fontSize="sm"
                        isTruncated
                      >
                        {task.description}
                      </Text>

                      <Flex w="full" flexGrow={1} alignItems="center">
                        <Tooltip hasArrow label={task.dev.name}>
                          <Avatar size="xs" src={task.dev.avatar} />
                        </Tooltip>
                        <Spacer />
                        <Text fontSize="xs" fontStyle="italic">
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
        initialFocusRef={initialRef}
        isOpen={detailsIsOpen}
        onClose={detailsOnClose}
        size="5xl"
        scrollBehavior="inside"
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>
            <Flex
              w="full"
              pr={8}
              alignItems="start"
              justifyContent="space-between"
            >
              <Heading>{modalValues.title}</Heading>
              <Spacer />
              {authContext.profile.projectOwner &&
                modalValues.status !== 'COMPLETE' && (
                  <ButtonGroup>
                    <Tooltip hasArrow label="Edit Task">
                      <IconButton
                        size="sm"
                        icon={<EditIcon />}
                        variant="outline"
                        onClick={editOnOpen}
                      />
                    </Tooltip>
                    <Tooltip hasArrow label="Delete Task">
                      <IconButton
                        colorScheme="red"
                        size="sm"
                        icon={<DeleteIcon />}
                        variant="outline"
                        onClick={deleteOnOpen}
                      />
                    </Tooltip>
                  </ButtonGroup>
                )}
            </Flex>
          </ModalHeader>
          <ModalCloseButton mt={1.5} />
          <ModalBody px={8}>
            {modalValues.labels.length > 0 && !editTaskLabels && (
              <Wrap mb="3">
                {modalValues.labels.map(label => (
                  <WrapItem key={label}>
                    <Badge>{label}</Badge>
                  </WrapItem>
                ))}
              </Wrap>
            )}
            {authContext.profile.projectOwner && editTaskLabels && (
              <SetTaskLabelsForm
                taskId={modalValues.id}
                taskLabels={project.taskLabels}
                labels={modalValues.labels}
                setEditTaskLabels={setEditTaskLabels}
              />
            )}
            {authContext.profile.projectOwner &&
              modalValues.status !== 'COMPLETE' && (
                <Button
                  size="sm"
                  onClick={() => setEditTaskLabels(!editTaskLabels)}
                >
                  {editTaskLabels ? 'Cancel' : 'Edit Labels'}
                </Button>
              )}
            <Text pt={2} pb={6}>
              {modalValues.description}
            </Text>
            {modalValues.checkList.length > 0 && (
              <VStack w="xl" mb="2" alignItems="start">
                {modalValues.checkList.map(item => (
                  <Stack
                    w="full"
                    direction="row"
                    key={item.id}
                    justifyContent="space-between"
                  >
                    <Checkbox
                      {...(authContext.user.id !== modalValues.dev.id && {
                        isReadOnly: true,
                      })}
                      isChecked={item.checked}
                      onChange={e =>
                        checkCheckListItem({
                          variables: {
                            taskId: modalValues.id,
                            checklistId: item.id,
                            checkState: e.target.checked,
                          },
                        })
                      }
                    >
                      {item.description}
                    </Checkbox>
                    <Spacer />
                    {authContext.profile.projectOwner &&
                      modalValues.status !== 'COMPLETE' && (
                        <IconButton
                          colorScheme="red"
                          size="sm"
                          icon={<DeleteIcon />}
                          variant="ghost"
                          onClick={() => {
                            setCheckListId(item.id);
                            removeCheckListItem({
                              variables: {
                                taskId: modalValues.id,
                                checklistId: item.id,
                              },
                            });
                          }}
                          isLoading={
                            removeCheckListItemLoading &&
                            item.id === checkListId
                          }
                        />
                      )}
                  </Stack>
                ))}
              </VStack>
            )}
            {authContext.profile.projectOwner &&
              modalValues.status !== 'COMPLETE' && (
                <InputGroup w="xl" mb="2" size="md" alignItems="center">
                  <Input
                    type="text"
                    placeholder="Add Checklist item"
                    value={checkListItem}
                    onChange={e => setCheckListItem(e.target.value)}
                  />
                  <IconButton
                    colorScheme="green"
                    size="sm"
                    variant="ghost"
                    icon={<CheckIcon />}
                    onClick={() => {
                      addCheckListItem({
                        variables: {
                          taskId: modalValues.id,
                          description: checkListItem,
                        },
                      });
                    }}
                    isLoading={addCheckListItemLoading}
                  />
                </InputGroup>
              )}
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
            <Stack
              direction="row"
              alignItems="center"
              justifyContent="space-between"
            >
              <HStack mt="4" alignItems="center">
                <Text fontWeight="bold">Asignee: </Text>{' '}
                {modalValues.dev && (
                  <Tooltip hasArrow label={modalValues.dev.name}>
                    <Avatar size="sm" src={modalValues.dev.avatar} />
                  </Tooltip>
                )}
              </HStack>
              <Spacer />
              {modalValues.dev && authContext.user.id === modalValues.dev.id && (
                <HStack>
                  <Box w="sm">
                    <MultiSelect
                      name="userId"
                      placeholder="Move to..."
                      options={project.taskColumns.reduce(
                        (columnList, column) => {
                          if (
                            column !== 'COMPLETE' &&
                            column !== modalValues.status
                          ) {
                            columnList.push({
                              value: column,
                              label: column,
                            });
                          }
                          return columnList;
                        },
                        []
                      )}
                      onChange={multiSelectOnchange}
                    />
                  </Box>
                  <Tooltip hasArrow label="Move Task To Column">
                    <IconButton
                      icon={<CheckIcon />}
                      onClick={() => {
                        moveTask({
                          variables: {
                            taskId: modalValues.id,
                            column: moveTo,
                          },
                        });
                      }}
                      isLoading={moveTaskLoading}
                      colorScheme="green"
                      isDisabled={moveTo.length === 0}
                    />
                  </Tooltip>
                </HStack>
              )}
            </Stack>
            <Text pt="3" fontWeight="bold" fontSize="lg">
              Comments
            </Text>
            <Divider />
            <Textarea
              value={textAreaValue}
              size="sm"
              resize="vertical"
              ref={initialRef}
              mt="2"
              onChange={e => setTextAreaValue(e.target.value)}
            />
            <Button
              colorScheme="green"
              fontSize="md"
              size="md"
              mt="1"
              onClick={() => {
                addTaskComment({
                  variables: { taskId: modalValues.id, text: textAreaValue },
                });
              }}
              isLoading={addTaskCommentLoading}
              loadingText="Saving.."
              spinnerPlacement="end"
            >
              Save
            </Button>

            {modalValues.comments.length > 0 && (
              <VStack my="5" w="full">
                {modalValues.comments.map(comment => (
                  <VStack w="full" key={comment.id}>
                    <HStack w="full">
                      <Avatar size="sm" src={comment.user.avatar} />
                      <Text>{comment.user.name}</Text>
                      <Badge>
                        {comment.user.id === project.owner.id
                          ? 'Project Owner'
                          : project.members.find(
                              member => member.dev.id === comment.user.id
                            ).title}
                      </Badge>
                      <Text fontStyle="italic" color="gray.500">
                        {new Date(comment.date).toLocaleString('en-GB')}{' '}
                        {comment.edited && '(edited)'}
                      </Text>
                    </HStack>
                    {commentEdit && comment.id === selectedCommentId ? (
                      <Textarea
                        value={editTextAreaValue}
                        size="sm"
                        resize="vertical"
                        mt="2"
                        onChange={e => setEditTextAreaValue(e.target.value)}
                      />
                    ) : (
                      <Box
                        rounded={'lg'}
                        borderWidth="1px"
                        borderColor="gray.500"
                        w="full"
                        px="3"
                        py="2"
                      >
                        <Text>{comment.text}</Text>
                      </Box>
                    )}
                    <ButtonGroup
                      w="full"
                      justifyContent="end"
                      spacing="0.5"
                      variant="ghost"
                    >
                      {commentEdit && comment.id === selectedCommentId && (
                        <Tooltip hasArrow label="Save">
                          <IconButton
                            size="sm"
                            icon={<CheckIcon />}
                            onClick={() => {
                              editTaskComment({
                                variables: {
                                  taskId: modalValues.id,
                                  commentId: comment.id,
                                  text: editTextAreaValue,
                                },
                              });
                            }}
                            isLoading={
                              editTaskCommentLoading &&
                              comment.id === selectedCommentId
                            }
                            colorScheme="green"
                          />
                        </Tooltip>
                      )}
                      {authContext.user.id === comment.user.id && (
                        <Tooltip
                          hasArrow
                          label={commentEdit ? 'Cancel' : 'Edit'}
                        >
                          <IconButton
                            size="sm"
                            {...(commentEdit
                              ? { icon: <CloseIcon />, colorScheme: 'orange' }
                              : { icon: <EditIcon />, colorScheme: 'gray' })}
                            onClick={() => {
                              if (!commentEdit) {
                                setCommentEdit(true);
                                setSelectedCommentId(comment.id);
                                setEditTextAreaValue(comment.text);
                              } else {
                                setCommentEdit(false);
                                setSelectedCommentId('');
                                setEditTextAreaValue('');
                              }
                              console.log(selectedCommentId);
                              console.log(editTextAreaValue);
                              console.log(comment);
                            }}
                          />
                        </Tooltip>
                      )}
                      {(authContext.user.id === comment.user.id ||
                        authContext.profile.projectOwner) && (
                        <Tooltip hasArrow label="Delete">
                          <IconButton
                            colorScheme="red"
                            size="sm"
                            icon={<DeleteIcon />}
                            onClick={() => {
                              setSelectedCommentId(comment.id);
                              deleteTaskComment({
                                variables: {
                                  taskId: modalValues.id,
                                  commentId: comment.id,
                                },
                              });
                            }}
                            isLoading={
                              deleteTaskCommentLoading &&
                              comment.id === selectedCommentId
                            }
                          />
                        </Tooltip>
                      )}
                    </ButtonGroup>
                  </VStack>
                ))}
              </VStack>
            )}
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
                deleteTask({ variables: { taskId: modalValues.id } });
                deleteOnClose();
                detailsOnClose();
              }}
            >
              Yes
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
      <Modal
        isOpen={editIsOpen}
        onClose={editOnClose}
        size="3xl"
        scrollBehavior="outside"
      >
        <ModalOverlay />
        <ModalContent>
          <ModalCloseButton />
          <ModalBody>
            <EditTaskForm
              taskValues={modalValues}
              members={project.members}
              onClose={editOnClose}
            />
          </ModalBody>
        </ModalContent>
      </Modal>
      <Drawer
        isOpen={labelDrawerIsOpen}
        placement="right"
        onClose={labelDrawerOnClose}
      >
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>Labels</DrawerHeader>

          <DrawerBody>
            <InputGroup size="md">
              <Input
                type="text"
                placeholder="Add Label"
                value={labelValue}
                onChange={e => setLabelValue(e.target.value)}
              />
              <InputRightElement>
                <IconButton
                  colorScheme="green"
                  size="sm"
                  icon={<CheckIcon />}
                  variant="ghost"
                  onClick={() => {
                    addLabel({ variables: { label: labelValue } });
                  }}
                  isLoading={addLabelLoading}
                />
              </InputRightElement>
            </InputGroup>
            <VStack mt="6" w="full">
              {project.taskLabels.map(label => (
                <Box
                  rounded={'md'}
                  w="full"
                  p="1"
                  bg={labelColor}
                  boxShadow={'2xl'}
                  key={label}
                >
                  <Stack direction="row" justifyContent="space-between">
                    <Text pl={1}>{label}</Text>
                    <Spacer />
                    <IconButton
                      colorScheme="red"
                      size="sm"
                      icon={<DeleteIcon />}
                      variant="ghost"
                      onClick={() => {
                        setDeleteLabelValue(label);
                        deleteLabel({ variables: { label } });
                      }}
                      isLoading={
                        deleteLabelLoading && label === deleteLabelValue
                      }
                    />
                  </Stack>
                </Box>
              ))}
            </VStack>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </Box>
  );
};

const MOVE_TASK = gql`
  mutation moveTask($taskId: String!, $column: String!) {
    moveTask(taskId: $taskId, column: $column)
  }
`;

const DELETE_TASK = gql`
  mutation deleteTask($taskId: String!) {
    deleteTask(taskId: $taskId)
  }
`;

const CLOSE_TASK = gql`
  mutation closeTask($taskId: String!) {
    closeTask(taskId: $taskId)
  }
`;

const ADD_LABEL = gql`
  mutation addLabel($label: String!) {
    addLabel(label: $label)
  }
`;

const DELETE_LABEL = gql`
  mutation deleteLabel($label: String!) {
    deleteLabel(label: $label)
  }
`;

const ADD_CHECKLIST_ITEM = gql`
  mutation addCheckListItem($taskId: String!, $description: String!) {
    addCheckListItem(taskId: $taskId, description: $description)
  }
`;

const REMOVE_CHECKLIST_ITEM = gql`
  mutation removeCheckListItem($taskId: String!, $checklistId: String!) {
    removeCheckListItem(taskId: $taskId, checklistId: $checklistId)
  }
`;

const CHECK_CHECKLIST_ITEM = gql`
  mutation checkCheckListItem(
    $taskId: String!
    $checklistId: String!
    $checkState: Boolean!
  ) {
    checkCheckListItem(
      taskId: $taskId
      checklistId: $checklistId
      checkState: $checkState
    )
  }
`;

const CREATE_TASK_COMMENT = gql`
  mutation createTaskComment($taskId: String!, $text: String!) {
    createTaskComment(taskId: $taskId, text: $text)
  }
`;

const EDIT_TASK_COMMENT = gql`
  mutation editTaskComment(
    $taskId: String!
    $commentId: String!
    $text: String!
  ) {
    editTaskComment(taskId: $taskId, commentId: $commentId, text: $text)
  }
`;

const DELETE_TASK_COMMENT = gql`
  mutation deleteTaskComment($taskId: String!, $commentId: String!) {
    deleteTaskComment(taskId: $taskId, commentId: $commentId)
  }
`;
