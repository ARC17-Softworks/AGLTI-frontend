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
  DeleteIcon,
  SearchIcon,
} from '@chakra-ui/icons';
import { useQuery, useMutation, gql, NetworkStatus } from '@apollo/client';
import { PROJECT_DASHBOARD_QUERY, MARK_READ } from '../../graphql';
import { ProjectDashboardContext } from '../../context/projectDashboard';
import { AuthContext } from '../../context/auth';
import { Link as RouterLink, Redirect } from 'react-router-dom';
import { Loading } from '../Loading';
import MultiSelect from '../form/MultiSelect';
import { skillsList } from '../../data/skillsList';

export const OpeningsArea = () => {
  const authContext = useContext(AuthContext);

  const { isOpen, onOpen, onClose } = useDisclosure();
  const [positionValues, setPositionValues] = useState({
    title: '',
    description: '',
    skills: '',
  });
  const {
    isOpen: detailsIsOpen,
    onOpen: detailsOnOpen,
    onClose: detailsOnClose,
  } = useDisclosure();
  const {
    isOpen: deleteIsOpen,
    onOpen: deleteOnOpen,
    onClose: deleteOnClose,
  } = useDisclosure();
  const cancelRef = React.useRef();
  const initialRef = React.useRef();

  const { setApplicants } = useContext(ProjectDashboardContext);

  const [devId, setDevId] = useState('');

  const [modalValues, setModalValues] = useState({
    id: '',
    title: '',
    skills: [],
    description: '',
    date: Date.now(),
  });

  const dotBg = useColorModeValue('blue.400', 'blue.200');
  const cardBg = useColorModeValue('white', 'gray.700');
  const toast = useToast();

  const { data, loading, refetch, networkStatus } = useQuery(
    PROJECT_DASHBOARD_QUERY,
    {
      fetchPolicy: 'no-cache',
    }
  );

  const project = data ? data.currentProject.project : null;

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

  const [addPosition, { loading: addPositionLoading }] = useMutation(
    ADD_POSITION,
    {
      update(proxy, result) {
        onClose();
        refetch();
        setPositionValues({
          title: '',
          description: '',
          skills: '',
        });
      },
      variables: {
        skills: positionValues.skills,
        title: positionValues.title,
        description: positionValues.description,
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

  const multiSelectOnchange = value => {
    setPositionValues({ ...positionValues, skills: value.map(v => v.label) });
  };

  const onChange = e => {
    e.preventDefault();
    setPositionValues({ ...positionValues, [e.target.name]: e.target.value });
  };

  const onSubmit = e => {
    e.preventDefault();
    addPosition();
  };

  const [deletePosition, { loading: deleteLoading }] = useMutation(
    REMOVE_POSITION,
    {
      update(proxy, result) {
        detailsOnClose();
        refetch();
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

  const [rejectApplication, { loading: rejectLoading }] = useMutation(
    REJECT_APPLICATION,
    {
      update(proxy, result) {
        refetch();
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

  const [acceptApplication, { loading: acceptLoading }] = useMutation(
    ACCEPT_APPLICATION,
    {
      update(proxy, result) {
        refetch();
        detailsOnClose();
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

  const [cancelOffer, { loading: cancelLoading }] = useMutation(CANCEL_OFFER, {
    update(proxy, result) {
      refetch();
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
      markRead({ variables: { path: 'applicants' } });
    }
  }, [project, setApplicants, authContext, markRead]);

  if (loading && networkStatus !== NetworkStatus.refetch) {
    return <Loading />;
  }

  if (!authContext.profile.projectOwner) {
    <Redirect to="/dashboard/info" />;
  }

  return (
    <VStack w="full" p={'6'}>
      <Flex w="full">
        <Text fontSize="5xl">Open Positions</Text>
        <Spacer />
        <Tooltip hasArrow label="Add Position">
          <IconButton onClick={onOpen} icon={<AddIcon />} variant="outline" />
        </Tooltip>
      </Flex>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Add Position</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <chakra.form onSubmit={onSubmit}>
              <Stack spacing="6">
                <FormControl id="title" isRequired>
                  <FormLabel>Title</FormLabel>
                  <Input
                    name="title"
                    type="text"
                    value={positionValues.title}
                    onChange={onChange}
                  />
                </FormControl>
                <FormControl id="skills" isRequired>
                  <FormLabel>Skills</FormLabel>
                  <MultiSelect
                    name="skills"
                    options={skillsList}
                    isMulti
                    placeholder="Select skills required for position"
                    closeMenuOnSelect={false}
                    onChange={multiSelectOnchange}
                  />
                </FormControl>
                <FormControl id="description" isRequired>
                  <FormLabel>Description</FormLabel>
                  <Textarea
                    name="description"
                    type="text"
                    value={positionValues.description}
                    onChange={onChange}
                  />
                </FormControl>

                <Button
                  type="submit"
                  colorScheme="green"
                  size="lg"
                  fontSize="md"
                  isLoading={addPositionLoading}
                  loadingText="Adding..."
                  spinnerPlacement="end"
                >
                  Add Position
                </Button>
              </Stack>
            </chakra.form>
          </ModalBody>
        </ModalContent>
      </Modal>
      <Divider />
      <Wrap>
        {project.openings.length > 0 ? (
          project.openings.map(opening => (
            <WrapItem key={opening.position.id}>
              <LinkBox
                maxW={'320px'}
                w={'full'}
                h={'full'}
                bg={cardBg}
                boxShadow={'2xl'}
                rounded={'lg'}
                p={6}
                textAlign={'center'}
              >
                <VStack h={'full'}>
                  <LinkOverlay
                    cursor="pointer"
                    onClick={() => {
                      setModalValues(opening.position);
                      detailsOnOpen();
                    }}
                  >
                    <Heading fontSize={'2xl'}>{opening.position.title}</Heading>
                  </LinkOverlay>
                  <Wrap>
                    {opening.position.skills.map(skill => (
                      <WrapItem key={skill}>
                        <Badge>{skill}</Badge>
                      </WrapItem>
                    ))}
                  </Wrap>
                  <Flex
                    direction="column"
                    justifyContent="space-between"
                    h={'full'}
                  >
                    <Text noOfLines={3} mb={4}>
                      {opening.position.description}
                    </Text>
                    <Spacer />
                    <VStack>
                      <Divider />
                      <Text mb={4}>
                        {project.applicants.some(
                          applicant =>
                            applicant.read === false &&
                            applicant.position.id === opening.position.id
                        ) && (
                          <>
                            <Circle
                              size="2"
                              bg={dotBg}
                              display="inline-block"
                            />{' '}
                          </>
                        )}
                        Applicants:{' '}
                        {
                          project.applicants.filter(
                            applicant =>
                              applicant.position.id === opening.position.id
                          ).length
                        }
                      </Text>
                      <Divider />
                      <Text mb={4}>
                        Offered to:{' '}
                        {
                          project.offered.filter(
                            offer => offer.position.id === opening.position.id
                          ).length
                        }
                      </Text>
                      <Divider />
                      <Button
                        leftIcon={<SearchIcon />}
                        colorScheme="blue"
                        size="lg"
                        fontSize="md"
                        variant="outline"
                        w="full"
                        as={RouterLink}
                        to={`/developer/search/${modalValues.id}`}
                      >
                        Search for Developer
                      </Button>
                    </VStack>
                  </Flex>
                </VStack>
              </LinkBox>
            </WrapItem>
          ))
        ) : (
          <WrapItem>
            <Text>Add positions to get people into your project.</Text>
          </WrapItem>
        )}
      </Wrap>
      <Modal
        isOpen={detailsIsOpen}
        initialFocusRef={initialRef}
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
              <ButtonGroup>
                <Tooltip hasArrow label="Delete Position">
                  <IconButton
                    icon={<DeleteIcon />}
                    colorScheme="red"
                    isLoading={deleteLoading}
                    variant="outline"
                    size="sm"
                    onClick={deleteOnOpen}
                  />
                </Tooltip>
              </ButtonGroup>
            </Flex>
          </ModalHeader>
          <ModalCloseButton mt={1.5} />
          <ModalBody px={8}>
            <Wrap pb="2">
              {modalValues.skills.map(skill => (
                <WrapItem key={skill}>
                  <Badge>{skill}</Badge>
                </WrapItem>
              ))}
            </Wrap>

            <Text pt={2} pb={6}>
              {modalValues.description}
            </Text>
            <Button
              leftIcon={<SearchIcon />}
              colorScheme="blue"
              size="lg"
              fontSize="md"
              variant="outline"
              ref={initialRef}
              as={RouterLink}
              to={`/developer/search/${modalValues.id}`}
            >
              Search for Developer
            </Button>
            <Accordion defaultIndex={[0, 1]} allowMultiple mt={4}>
              <AccordionItem>
                <h2>
                  <AccordionButton>
                    <Box flex="1" textAlign="left">
                      {project.applicants.some(
                        applicant =>
                          applicant.read === false &&
                          applicant.position.id === modalValues.id
                      ) && (
                        <>
                          <Circle size="2" bg={dotBg} display="inline-block" />{' '}
                        </>
                      )}
                      Applicants:{' '}
                      {
                        project.applicants.filter(
                          applicant => applicant.position.id === modalValues.id
                        ).length
                      }
                    </Box>
                    <AccordionIcon />
                  </AccordionButton>
                </h2>
                <AccordionPanel pb={4}>
                  {project.applicants.length > 0 &&
                  project.applicants.some(
                    applicant => applicant.position.id === modalValues.id
                  ) ? (
                    project.applicants.reduce((boxes, applicant) => {
                      if (applicant.position.id === modalValues.id) {
                        boxes.push(
                          <Box
                            key={applicant.dev.id}
                            w="full"
                            p="3"
                            my="1"
                            borderWidth="1px"
                            rounded="md"
                          >
                            <Flex
                              direction="row"
                              justifyContent="space-between"
                            >
                              <HStack>
                                <Avatar size="sm" src={applicant.dev.avatar} />
                                <Link
                                  isExternal
                                  as={RouterLink}
                                  fontWeight="bold"
                                  to={`/user/${applicant.dev.id}`}
                                >
                                  {applicant.read === false && (
                                    <>
                                      <Circle
                                        size="2"
                                        bg={dotBg}
                                        display="inline-block"
                                      />{' '}
                                    </>
                                  )}
                                  {applicant.dev.name}{' '}
                                  <ExternalLinkIcon mx="2px" />
                                </Link>
                              </HStack>{' '}
                              <Spacer />
                              <ButtonGroup spacing="0.5">
                                <Button
                                  colorScheme="green"
                                  isLoading={
                                    devId === applicant.dev.id && acceptLoading
                                  }
                                  loadingText="Accepting..."
                                  spinnerPlacement="end"
                                  mr={3}
                                  onClick={() => {
                                    setDevId(applicant.dev.id);
                                    acceptApplication({
                                      variables: {
                                        userId: applicant.dev.id,
                                        positionId: applicant.position.id,
                                      },
                                    });
                                  }}
                                >
                                  Accept
                                </Button>
                                <Button
                                  colorScheme="red"
                                  isLoading={
                                    devId === applicant.dev.id && rejectLoading
                                  }
                                  loadingText="Rejecting..."
                                  spinnerPlacement="end"
                                  mr={3}
                                  onClick={() => {
                                    setDevId(applicant.dev.id);
                                    rejectApplication({
                                      variables: {
                                        userId: applicant.dev.id,
                                        positionId: applicant.position.id,
                                      },
                                    });
                                  }}
                                >
                                  Reject
                                </Button>
                              </ButtonGroup>{' '}
                            </Flex>
                          </Box>
                        );
                      }
                      return boxes;
                    }, [])
                  ) : (
                    <Text>No applicants yet</Text>
                  )}
                </AccordionPanel>
              </AccordionItem>

              <AccordionItem>
                <h2>
                  <AccordionButton>
                    <Box flex="1" textAlign="left">
                      Offered to:{' '}
                      {
                        project.offered.filter(
                          offer => offer.position.id === modalValues.id
                        ).length
                      }
                    </Box>
                    <AccordionIcon />
                  </AccordionButton>
                </h2>
                <AccordionPanel pb={4}>
                  {project.offered.length > 0 &&
                  project.offered.some(
                    offer => offer.position.id === modalValues.id
                  ) ? (
                    project.offered.reduce((boxes, offer) => {
                      if (offer.position.id === modalValues.id) {
                        boxes.push(
                          <Box
                            key={offer.dev.id}
                            w="full"
                            p="3"
                            my="1"
                            borderWidth="1px"
                            rounded="md"
                          >
                            <Flex
                              direction="row"
                              justifyContent="space-between"
                            >
                              <HStack>
                                <Avatar size="sm" src={offer.dev.avatar} />
                                <Link
                                  isExternal
                                  as={RouterLink}
                                  fontWeight="bold"
                                  to={`/user/${offer.dev.id}`}
                                >
                                  {offer.dev.name} <ExternalLinkIcon mx="2px" />
                                </Link>
                              </HStack>{' '}
                              <Spacer />
                              <Button
                                colorScheme="gray"
                                variant="outline"
                                isLoading={
                                  devId === offer.dev.id && cancelLoading
                                }
                                loadingText="Cancelling..."
                                spinnerPlacement="end"
                                mr={3}
                                onClick={() => {
                                  setDevId(offer.dev.id);
                                  cancelOffer({
                                    variables: {
                                      userId: offer.dev.id,
                                      positionId: offer.position.id,
                                    },
                                  });
                                }}
                              >
                                Cancel Offer
                              </Button>
                            </Flex>
                          </Box>
                        );
                      }
                      return boxes;
                    }, [])
                  ) : (
                    <Text>You have not offered anyone this position yet</Text>
                  )}
                </AccordionPanel>
              </AccordionItem>
            </Accordion>
          </ModalBody>
        </ModalContent>
        <AlertDialog
          motionPreset="slideInBottom"
          leastDestructiveRef={cancelRef}
          onClose={deleteOnClose}
          isOpen={deleteIsOpen}
          isCentered
        >
          <AlertDialogOverlay />

          <AlertDialogContent>
            <AlertDialogHeader>Delete Position?</AlertDialogHeader>
            <AlertDialogCloseButton />
            <AlertDialogBody>
              Are you sure you want to delete this Position?
            </AlertDialogBody>
            <AlertDialogFooter>
              <Button ref={cancelRef} onClick={deleteOnClose}>
                No
              </Button>
              <Button
                colorScheme="red"
                size="lg"
                fontSize="md"
                onClick={() => {
                  deletePosition({
                    variables: {
                      positionId: modalValues.id,
                    },
                  });
                  deleteOnClose();
                }}
              >
                Yes
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </Modal>
    </VStack>
  );
};

const REMOVE_POSITION = gql`
  mutation removePosition($positionId: String!) {
    removePosition(positionId: $positionId)
  }
`;

const CANCEL_OFFER = gql`
  mutation cancelOffer($userId: String!, $positionId: String!) {
    cancelOffer(userId: $userId, positionId: $positionId)
  }
`;

const REJECT_APPLICATION = gql`
  mutation rejectApplication($userId: String!, $positionId: String!) {
    rejectApplication(userId: $userId, positionId: $positionId)
  }
`;

const ACCEPT_APPLICATION = gql`
  mutation acceptApplication($userId: String!, $positionId: String!) {
    acceptApplication(userId: $userId, positionId: $positionId)
  }
`;

const ADD_POSITION = gql`
  mutation addPosition(
    $title: String!
    $skills: [String!]!
    $description: String!
  ) {
    addPosition(
      input: { title: $title, skills: $skills, description: $description }
    )
  }
`;
