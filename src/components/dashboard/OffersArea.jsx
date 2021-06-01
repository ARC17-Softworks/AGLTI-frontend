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
  ButtonGroup,
  Wrap,
  WrapItem,
  Badge,
  Link,
  Spacer,
  Circle,
  HStack,
  useColorModeValue,
} from '@chakra-ui/react';
import { AuthContext } from '../../context/auth';
import { ExternalLinkIcon } from '@chakra-ui/icons';
import { Link as RouterLink } from 'react-router-dom';
import { useQuery, NetworkStatus, useMutation, gql } from '@apollo/client';
import { DASHBOARD_QUERY, MARK_READ } from '../../graphql';
import { DashboardContext } from '../../context/dashboard';
import { Loading } from '../Loading';

export const OffersArea = ({ setProjectEnrolled }) => {
  const authContext = useContext(AuthContext);
  const { setOffers } = useContext(DashboardContext);
  const [positionId, setPositionId] = useState('');
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
  const dotBg = useColorModeValue('blue.400', 'blue.200');

  const toast = useToast();

  const { data, loading, refetch, networkStatus } = useQuery(DASHBOARD_QUERY, {
    fetchPolicy: 'cache-and-network',
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

  const [rejectOffer, { loading: rejectLoading }] = useMutation(REJECT_OFFER, {
    update(proxy, result) {
      toast({
        title: 'Offer Rejected',
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
  });

  const [acceptOffer, { loading: acceptLoading }] = useMutation(ACCEPT_OFFER, {
    update(proxy, result) {
      toast({
        title: 'Offer Accepted',
        status: 'success',
        duration: 3000,
        isClosable: true,
        position: 'bottom-left',
      });
      authContext.setProfile({ ...authContext.profile, activeProject: true });
      refetch();
      setProjectEnrolled(true);
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

  const profile = data ? data.getMe.profile : null;

  useEffect(() => {
    if (profile && !profile.activeProject && profile.offers.length > 0) {
      const unreadOffers = profile.offers.filter(
        offer => offer.read === false
      ).length;
      setOffers(unreadOffers);
      markRead({ variables: { path: 'offers' } });
    }
  }, [profile, setOffers, markRead]);

  if (loading && networkStatus !== NetworkStatus.refetch) {
    return <Loading />;
  }

  return (
    <VStack w="full" mt={4}>
      <VStack w="full" alignItems="start">
        {' '}
        <Heading>Offered Positions</Heading>
        <Divider />{' '}
      </VStack>
      {profile.offers.length > 0 ? (
        profile.offers.map(offers => (
          <LinkBox
            key={offers.position.id}
            w="full"
            p="3"
            borderWidth="1px"
            rounded="md"
          >
            <Flex
              direction="row"
              justifyContent="space-between"
              alignItems="center"
            >
              <LinkOverlay
                cursor="pointer"
                onClick={() => {
                  setModalValues(offers.position);
                  onOpen();
                }}
                fontSize="2xl"
              >
                {' '}
                <HStack>
                  {!offers.read && <Circle size="2" bg={dotBg} />}
                  <Heading size="md" my="2">
                    {offers.position.title}
                  </Heading>
                </HStack>
              </LinkOverlay>
              <Spacer />
              <ButtonGroup spacing="0.5">
                <Button
                  colorScheme="green"
                  isLoading={positionId === offers.position.id && acceptLoading}
                  loadingText="Accepting..."
                  spinnerPlacement="end"
                  mr={3}
                  onClick={() => {
                    setPositionId(offers.position.id);
                    acceptOffer({
                      variables: { positionId: offers.position.id },
                    });
                  }}
                >
                  Accept
                </Button>
                <Button
                  colorScheme="red"
                  isLoading={positionId === offers.position.id && rejectLoading}
                  loadingText="Rejecting..."
                  spinnerPlacement="end"
                  mr={3}
                  onClick={() => {
                    setPositionId(offers.position.id);
                    rejectOffer({
                      variables: { positionId: offers.position.id },
                    });
                  }}
                >
                  Reject
                </Button>
              </ButtonGroup>
            </Flex>

            <Wrap>
              {offers.position.skills.map(skill => (
                <WrapItem key={skill}>
                  <Badge>{skill}</Badge>
                </WrapItem>
              ))}
            </Wrap>
            <Text color="gray.500" isTruncated>
              {offers.position.description}
            </Text>
          </LinkBox>
        ))
      ) : (
        <Text fontSize="xl"> You do not have any offers.</Text>
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
            <ButtonGroup spacing="0.5">
              <Button
                colorScheme="green"
                isLoading={positionId === modalValues.id && acceptLoading}
                loadingText="Accepting..."
                spinnerPlacement="end"
                mr={3}
                onClick={() => {
                  setPositionId(modalValues.id);
                  acceptOffer({
                    variables: { positionId: modalValues.id },
                  });
                  onClose();
                }}
              >
                Accept
              </Button>
              <Button
                colorScheme="red"
                isLoading={positionId === modalValues.id && rejectLoading}
                loadingText="Rejecting..."
                spinnerPlacement="end"
                mr={3}
                onClick={() => {
                  setPositionId(modalValues.id);
                  rejectOffer({
                    variables: { positionId: modalValues.id },
                  });
                  onClose();
                }}
              >
                Reject
              </Button>
            </ButtonGroup>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </VStack>
  );
};

const ACCEPT_OFFER = gql`
  mutation acceptOffer($positionId: String!) {
    acceptOffer(positionId: $positionId)
  }
`;
const REJECT_OFFER = gql`
  mutation rejectOffer($positionId: String!) {
    rejectOffer(positionId: $positionId)
  }
`;
