import React, { useContext, useEffect, useState } from 'react';
import {
  Flex,
  VStack,
  LinkBox,
  LinkOverlay,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  useToast,
  Text,
  Divider,
  Heading,
  Button,
  Wrap,
  WrapItem,
  Badge,
  Link,
  Spacer,
} from '@chakra-ui/react';
import { ExternalLinkIcon, CloseIcon } from '@chakra-ui/icons';
import { Link as RouterLink } from 'react-router-dom';
import { useQuery, NetworkStatus, useMutation, gql } from '@apollo/client';
import { DASHBOARD_QUERY } from '../../graphql';
import { DashboardContext } from '../../context/dashboard';
import { Loading } from '../Loading';

export const AppliedArea = () => {
  const { setOffers } = useContext(DashboardContext);
  const [cancelId, setCancelId] = useState('');
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [modalValues, setModalValues] = useState({
    id: '',
    title: '',
    skills: [],
    description: '',
    project: {
      id: '',
      title: '',
    },
    date: '',
  });

  const toast = useToast();

  const { data, loading, refetch, networkStatus } = useQuery(DASHBOARD_QUERY, {
    fetchPolicy: 'cache-and-network',
  });

  const [cancelApplication, { loading: cancelLoading }] = useMutation(
    CANCEL_APPLICATION,
    {
      update(proxy, result) {
        toast({
          title: 'Application Cancelled',
          status: 'success',
          duration: 3000,
          isClosable: true,
          position: 'bottom-left',
        });
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

  const profile = data ? data.getMe.profile : null;

  useEffect(() => {
    if (profile && !profile.activeProject && profile.offers.length > 0) {
      const unreadOffers = profile.offers.map(
        offer => offer.read === false
      ).length;
      setOffers(unreadOffers);
    }
  }, [profile, setOffers]);

  if (loading && networkStatus !== NetworkStatus.refetch) {
    return <Loading />;
  }
  return (
    <VStack w="full" mt={4}>
      <VStack w="full" alignItems="start">
        {' '}
        <Heading>Applied Positions</Heading>
        <Divider />{' '}
      </VStack>
      {profile.applied.length > 0 ? (
        profile.applied.map(applied => (
          <LinkBox
            key={applied.position.id}
            w="full"
            p="3"
            borderWidth="1px"
            rounded="md"
          >
            <Heading size="md" my="2">
              <Flex
                direction="row"
                justifyContent="space-between"
                alignItems="center"
              >
                <LinkOverlay
                  href="#"
                  onClick={() => {
                    setModalValues(applied.position);
                    onOpen();
                  }}
                  fontSize="2xl"
                >
                  {applied.position.title}
                </LinkOverlay>
                <Spacer />
                <Button
                  leftIcon={<CloseIcon />}
                  colorScheme="gray"
                  isLoading={cancelId === applied.position.id && cancelLoading}
                  loadingText="Cancelling..."
                  spinnerPlacement="end"
                  mr={3}
                  onClick={() => {
                    setCancelId(applied.position.id);
                    cancelApplication({
                      variables: { positionId: applied.position.id },
                    });
                  }}
                >
                  Cancel Application
                </Button>
              </Flex>
            </Heading>
            <Wrap>
              {applied.position.skills.map(skill => (
                <WrapItem key={skill}>
                  <Badge>{skill}</Badge>
                </WrapItem>
              ))}
            </Wrap>
            <Text color="gray.500" isTruncated>
              {applied.position.description}
            </Text>
          </LinkBox>
        ))
      ) : (
        <Text fontSize="xl"> You have not applied anywhere yet.</Text>
      )}
      <Modal
        isOpen={isOpen}
        onClose={onClose}
        size="3xl"
        scrollBehavior="inside"
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>{modalValues.title}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Wrap pb="2">
              {modalValues.skills.map(skill => (
                <WrapItem key={skill}>
                  <Badge>{skill}</Badge>
                </WrapItem>
              ))}
            </Wrap>
            <Link
              isExternal
              as={RouterLink}
              fontWeight="bold"
              to={`/project/${modalValues.project.id}`}
            >
              Project: {modalValues.project.title} <ExternalLinkIcon mx="2px" />
            </Link>
            <Text pt={2} fontWeight="bold">
              Job Description:
            </Text>
            <Text pt={2} pb={6}>
              {' '}
              {modalValues.description}
            </Text>
            <Text color="gray.500" fontStyle="italic" fontSize="sm">
              Posted on:{' '}
              {new Date(modalValues.date).toLocaleString('en-GB').split(',')[0]}
            </Text>
          </ModalBody>

          <ModalFooter>
            <Button
              leftIcon={<CloseIcon />}
              colorScheme="gray"
              isLoading={cancelId === modalValues.id && cancelLoading}
              loadingText="Cancelling..."
              spinnerPlacement="end"
              mr={3}
              onClick={() => {
                setCancelId(modalValues.id);
                cancelApplication({
                  variables: { positionId: modalValues.id },
                });
                onClose();
              }}
            >
              Cancel Application
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </VStack>
  );
};

const CANCEL_APPLICATION = gql`
  mutation cancelApplication($positionId: String!) {
    cancelApplication(positionId: $positionId)
  }
`;
