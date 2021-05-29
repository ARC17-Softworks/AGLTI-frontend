import React, { useContext, useEffect } from 'react';
import {
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
} from '@chakra-ui/react';
import { useQuery, useMutation, gql } from '@apollo/client';
import { PROJECT_DASHBOARD_QUERY } from '../../graphql';
import { ProjectDashboardContext } from '../../context/projectDashboard';
import { AuthContext } from '../../context/auth';
import { Link as RouterLink } from 'react-router-dom';
import { Loading } from '../Loading';

export const OpeningsArea = () => {
  const authContext = useContext(AuthContext);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef = React.useRef();
  const { setApplicants } = useContext(ProjectDashboardContext);

  const toast = useToast();

  const { data, loading } = useQuery(PROJECT_DASHBOARD_QUERY, {
    fetchPolicy: 'cache-and-network',
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
  }, [project, setApplicants, authContext]);

  if (loading) {
    return <Loading />;
  }

  return (
    <Box w="full" p={'6'} borderWidth="1px" rounded="md">
      <Heading as="h1" size="2xl">
        {project.title}
      </Heading>

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
        <Button colorScheme="red" onClick={onOpen}>
          Close Project
        </Button>
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
                ml={3}
                onClick={() => {
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
