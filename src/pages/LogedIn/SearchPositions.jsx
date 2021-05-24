import React, { useContext, useState, useEffect } from 'react';
import {
  Flex,
  VStack,
  Grid,
  GridItem,
  Box,
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
  useColorModeValue,
  useToast,
  Text,
  Divider,
  Checkbox,
  CheckboxGroup,
  Heading,
  Button,
  ButtonGroup,
  Wrap,
  WrapItem,
  Badge,
  Link,
  Spacer,
} from '@chakra-ui/react';
import { ExternalLinkIcon } from '@chakra-ui/icons';
import { useQuery, NetworkStatus, useMutation, gql } from '@apollo/client';
import { Link as RouterLink, Redirect } from 'react-router-dom';
import { AuthContext } from '../../context/auth';
import { Loading } from '../../components/Loading';

export const SearchPositions = props => {
  const context = useContext(AuthContext);
  const bg = useColorModeValue('gray.50', 'gray.700');
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
  const [skills, setSkills] = useState([...context.profile.skills]);
  const [page, setPage] = useState(1);
  const [buttonState, setButtonState] = useState([false, false]);

  const { data, loading, refetch, networkStatus, error } = useQuery(
    SEARCH_POSITIONS,
    {
      variables: { qskills: skills, page },
      skip: !context.profile.skills || context.profile.skills.length === 0,
      fetchPolicy: 'no-cache',
    }
  );

  const [apply, { loading: applyLoading }] = useMutation(APPLY, {
    update(proxy, result) {
      toast({
        title: 'Applied',
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

  const toast = useToast();

  const positions =
    data && data.searchPositions ? data.searchPositions.positions : null;

  const pagination =
    data && data.searchPositions ? data.searchPositions.pagination : null;

  useEffect(() => {
    if (skills.length === 0) {
      toast({
        title: 'please select atleast one skill',
        status: 'error',
        duration: 3000,
        isClosable: true,
        position: 'bottom-left',
      });
    } else {
      refetch();
    }
  }, [skills, toast, refetch]);

  useEffect(() => {
    if (pagination && !loading && networkStatus !== NetworkStatus.refetch) {
      if (pagination.pages === 0) {
        setButtonState([false, false]);
      } else if (page === 1 && page === pagination.pages) {
        setButtonState([false, false]);
      } else if (page === pagination.pages) {
        setButtonState([true, false]);
      } else if (page === 1) {
        setButtonState([false, true]);
      } else {
        setButtonState([true, true]);
      }
    } else {
      setButtonState([false, false]);
    }
  }, [pagination, setButtonState, page, loading, networkStatus]);

  const onNextClick = () => {
    setPage(page + 1);
    refetch();
  };

  const onPrevClick = () => {
    setPage(page - 1);
    refetch();
  };

  const positionsList = positions && (
    <VStack mt="2">
      {positions.length > 0 ? (
        positions.map(position => (
          <LinkBox
            key={position.id}
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
                    setModalValues(position);
                    onOpen();
                  }}
                  fontSize="2xl"
                >
                  {position.title}
                </LinkOverlay>
                <Spacer />
                <Button
                  colorScheme="green"
                  isLoading={applyLoading}
                  loadingText="Applying..."
                  spinnerPlacement="end"
                  mr={3}
                  onClick={() => {
                    apply({ variables: { positionId: position.id } });
                  }}
                >
                  Apply
                </Button>
              </Flex>
            </Heading>
            <Wrap>
              {position.skills.map(skill => (
                <WrapItem key={skill}>
                  <Badge>{skill}</Badge>
                </WrapItem>
              ))}
            </Wrap>
            <Text color="gray.500" isTruncated>
              {position.description}
            </Text>
          </LinkBox>
        ))
      ) : (
        <Text fontSize="xl">
          {' '}
          Sorry, no positions availible at this time. Please check back later.
        </Text>
      )}
    </VStack>
  );

  if (error) {
    toast({
      title: error.message,
      status: 'error',
      duration: 3000,
      isClosable: true,
      position: 'bottom-left',
    });
  }

  if (!context.profile.skills || context.profile.skills.length === 0) {
    return <Redirect to="/dashboard" />;
  }
  if (context.profile.activeProject) {
    return <Redirect to="/dashboard" />;
  }
  return (
    <Box>
      <Grid templateColumns={{ md: '250px auto', sm: '70px auto' }}>
        <GridItem>
          <Flex
            bg={bg}
            as="aside"
            top="56px"
            h="calc(100vh - 56px)"
            position="sticky"
            w={{ lg: '250px', sm: '70px', md: '250px' }}
            direction="column"
            justifyContent="space-between"
            py={2}
            px={6}
          >
            <VStack pt={2} w="full">
              <Text fontSize="2xl">Skills</Text>
              <Divider />
              <VStack alignItems="start">
                <CheckboxGroup
                  defaultValue={skills}
                  onChange={value => setSkills(value)}
                >
                  {context.profile.skills.map(skill => (
                    <Checkbox key={skill} value={skill}>
                      {skill}
                    </Checkbox>
                  ))}
                </CheckboxGroup>
              </VStack>
            </VStack>
          </Flex>
        </GridItem>
        <GridItem>
          <Box maxW="container.xl" px={10} pt={2} mx="auto">
            <Heading>Availible Positions</Heading>
            {pagination && (
              <Flex direction="row" justifyContent="space-between">
                <Text color="gray.500" fontSize="md">
                  total results: {pagination.total}
                </Text>
                <Spacer />
                <Text color="gray.500" fontSize="md">
                  page {page} of {pagination.pages}
                </Text>
              </Flex>
            )}
            <Divider />
            {loading || networkStatus === NetworkStatus.refetch ? (
              <Loading />
            ) : (
              positionsList
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
                    Project: {modalValues.project.title}{' '}
                    <ExternalLinkIcon mx="2px" />
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
                    {
                      new Date(modalValues.date)
                        .toLocaleString('en-GB')
                        .split(',')[0]
                    }
                  </Text>
                </ModalBody>

                <ModalFooter>
                  <Button
                    colorScheme="green"
                    isLoading={applyLoading}
                    loadingText="Applying..."
                    spinnerPlacement="end"
                    mr={3}
                    onClick={() => {
                      apply({ variables: { positionId: modalValues.id } });
                      onClose();
                    }}
                  >
                    Apply
                  </Button>
                </ModalFooter>
              </ModalContent>
            </Modal>
            <Flex direction="row" justify="center">
              <ButtonGroup
                mt="4"
                isAttached
                alignItems="center"
                colorScheme="blue"
                variant="outline"
              >
                <Button isDisabled={!buttonState[0]} onClick={onPrevClick}>
                  Prev
                </Button>
                <Button isDisabled={!buttonState[1]} onClick={onNextClick}>
                  Next
                </Button>
              </ButtonGroup>
            </Flex>
          </Box>
        </GridItem>
      </Grid>
    </Box>
  );
};

const SEARCH_POSITIONS = gql`
  query searchPositions($qskills: [String!]!, $page: Float) {
    searchPositions(input: { qskills: $qskills, page: $page }) {
      positions {
        id
        project {
          id
          title
        }
        title
        skills
        description
        date
      }
      pagination {
        pages
        next {
          page
          limit
        }
        prev {
          page
          limit
        }
        total
        count
      }
    }
  }
`;

const APPLY = gql`
  mutation apply($positionId: String!) {
    apply(positionId: $positionId)
  }
`;
