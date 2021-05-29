import React, { useContext, useEffect, useState } from 'react';
import {
  chakra,
  Stack,
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
  useToast,
  Tooltip,
  IconButton,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalBody,
  ModalCloseButton,
  FormControl,
  FormLabel,
  Input,
  Textarea,
} from '@chakra-ui/react';
import { EditIcon } from '@chakra-ui/icons';
import { useQuery, useMutation, gql, NetworkStatus } from '@apollo/client';
import { PROJECT_DASHBOARD_QUERY } from '../../graphql';
import { ProjectDashboardContext } from '../../context/projectDashboard';
import { AuthContext } from '../../context/auth';
import { Link as RouterLink } from 'react-router-dom';
import { Loading } from '../Loading';

export const InfoArea = props => {
  const authContext = useContext(AuthContext);
  const { isOpen, onOpen, onClose } = useDisclosure();

  const {
    isOpen: isEditOpen,
    onOpen: onEditOpen,
    onClose: onEditClose,
  } = useDisclosure();
  const cancelRef = React.useRef();
  const { setApplicants } = useContext(ProjectDashboardContext);

  const toast = useToast();

  const { data, loading, refetch, networkStatus } = useQuery(
    PROJECT_DASHBOARD_QUERY,
    {
      fetchPolicy: 'cache-and-network',
    }
  );

  const project = data ? data.currentProject.project : null;

  const [values, setValues] = useState({
    title: project.title || '',
    description: project.description || '',
  });

  const [closeProject, { loading: closeLoading }] = useMutation(CLOSE_PROJECT, {
    update(proxy, result) {
      authContext.setProfile({
        ...authContext.profile,
        activeProject: false,
        projectOwner: false,
      });
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

  const [editProject, { loading: editLoading }] = useMutation(EDIT_PROJECT, {
    update(proxy, result) {
      refetch();
      toast({
        title: 'project updated',
        status: 'success',
        duration: 3000,
        isClosable: true,
        position: 'bottom-left',
      });
    },
    variables: {
      title: values.title,
      description: values.description,
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
    }
  }, [project, setApplicants, authContext]);

  const onChange = e => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const onSubmit = e => {
    e.preventDefault();
    editProject();
    onEditClose();
  };

  if (loading || networkStatus === NetworkStatus.refetch) {
    return <Loading />;
  }

  return (
    <Box w="full" p={'6'} borderWidth="1px" rounded="md">
      <Flex w="full">
        <Heading>{project.title}</Heading>
        <Spacer />
        {authContext.profile.projectOwner ? (
          <Tooltip hasArrow label="Edit Project">
            <IconButton
              onClick={onEditOpen}
              icon={<EditIcon />}
              variant="outline"
            />
          </Tooltip>
        ) : (
          <Box></Box>
        )}
        <Modal
          isOpen={isEditOpen}
          onClose={onEditClose}
          size="3xl"
          scrollBehavior="inside"
        >
          <ModalOverlay />
          <ModalContent>
            <ModalCloseButton />
            <ModalBody>
              <chakra.form onSubmit={onSubmit} {...props}>
                <Stack spacing="6">
                  <Heading textAlign="center" size="xl" fontWeight="extrabold">
                    Create Project
                  </Heading>
                  <FormControl id="title">
                    <FormLabel>Title</FormLabel>
                    <Input
                      name="title"
                      type="text"
                      value={values.title}
                      onChange={onChange}
                      required
                    />
                  </FormControl>
                  <FormControl id="description">
                    <FormLabel>Description</FormLabel>
                    <Textarea
                      name="description"
                      value={values.description}
                      onChange={onChange}
                    />
                  </FormControl>
                  <Button
                    type="submit"
                    colorScheme="green"
                    size="lg"
                    fontSize="md"
                    isLoading={editLoading}
                    loadingText="Updating..."
                    spinnerPlacement="end"
                  >
                    Update Project
                  </Button>
                </Stack>
              </chakra.form>
            </ModalBody>
          </ModalContent>
        </Modal>
      </Flex>
      <Text mt={6} py={2} fontSize="xl" fontWeight="black">
        description:
      </Text>
      <Text fontStyle="italic">"{project.description}"</Text>
      <Divider py={3} />
      <Flex pt={1} alignItems="end" w="full" justify="space-between">
        <VStack alignItems="start">
          <Text fontStyle="italic" fontWeight="bold">
            created by:
          </Text>
          <VStack justifyContent="center">
            <Link isExternal as={RouterLink} to={`/user/${project.owner.id}`}>
              <Avatar size="xl" src={project.owner.avatar} mb={1} />
            </Link>
          </VStack>
          <Text fontSize="md">{project.owner.name}</Text>
          <Text fontSize="sm">
            created on{' '}
            {new Date(project.createdAt).toLocaleString('en-GB').split(',')[0]}
          </Text>
        </VStack>
        <Spacer />
        {authContext.profile.projectOwner ? (
          <Button colorScheme="red" onClick={onOpen}>
            Close Project
          </Button>
        ) : (
          <Box></Box>
        )}
        <AlertDialog
          motionPreset="slideInBottom"
          leastDestructiveRef={cancelRef}
          onClose={onClose}
          isOpen={isOpen}
          isCentered
        >
          <AlertDialogOverlay />

          <AlertDialogContent>
            <AlertDialogHeader>Close Project?</AlertDialogHeader>
            <AlertDialogCloseButton />
            <AlertDialogBody>
              Are you sure you want to close your project? This action can not
              be undone.
            </AlertDialogBody>
            <AlertDialogFooter>
              <Button ref={cancelRef} onClick={onClose}>
                No
              </Button>
              <Button
                colorScheme="red"
                size="lg"
                fontSize="md"
                isLoading={closeLoading}
                loadingText="Closing..."
                spinnerPlacement="end"
                onClick={() => {
                  closeProject();
                  onClose();
                }}
              >
                Yes
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </Flex>
    </Box>
  );
};

const CLOSE_PROJECT = gql`
  mutation closeProject {
    closeProject
  }
`;

const EDIT_PROJECT = gql`
  mutation editProject($title: String!, $description: String!) {
    editProject(title: $title, description: $description)
  }
`;
