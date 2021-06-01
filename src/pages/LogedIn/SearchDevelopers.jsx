import React, { useContext, useState, useEffect } from 'react';
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
  useToast,
  useColorModeValue,
  Wrap,
  WrapItem,
  Badge,
  ButtonGroup,
  HStack,
  Grid,
  GridItem,
} from '@chakra-ui/react';
import { ExternalLinkIcon, ArrowBackIcon } from '@chakra-ui/icons';
import { useQuery, NetworkStatus, useMutation, gql } from '@apollo/client';
import { Link as RouterLink, Redirect } from 'react-router-dom';
import { AuthContext } from '../../context/auth';
import { Loading } from '../../components/Loading';

export const SearchDevelopers = props => {
  const { positionId } = props.match.params;
  const context = useContext(AuthContext);
  const [page, setPage] = useState(1);
  const [buttonState, setButtonState] = useState([false, false]);
  const [offerId, setOfferId] = useState('');

  const carBg = useColorModeValue('white', 'gray.700');

  const toast = useToast();

  const { data, loading, refetch, networkStatus, error } = useQuery(
    SEARCH_DEVELOPERS,
    {
      variables: { positionId, page },
      skip: !positionId,
      fetchPolicy: 'no-cache',
    }
  );

  const [offer, { loading: offerLoading }] = useMutation(OFFER, {
    update(proxy, result) {
      toast({
        title: 'Position Offered',
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

  const profiles =
    data && data.searchDevelopers ? data.searchDevelopers.profiles : null;

  const position =
    data && data.searchDevelopers ? data.searchDevelopers.position : null;

  const pagination =
    data && data.searchDevelopers ? data.searchDevelopers.pagination : null;

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

  if (error || !positionId) {
    if (error) {
      toast({
        title: error.message,
        status: 'error',
        duration: 3000,
        isClosable: true,
        position: 'bottom-left',
      });
    }
    return <Redirect to="/projectdashboard/openings" />;
  }

  if (!(context.profile.activeProject && context.profile.projectOwner)) {
    return <Redirect to="/dashboard" />;
  }

  return (
    <Box maxW="container.xl" px={10} pt={2} mx="auto">
      <VStack w="full">
        <Button
          leftIcon={<ArrowBackIcon />}
          alignSelf="flex-start"
          as={RouterLink}
          to="/projectdashboard/openings"
        >
          Back to Project
        </Button>
        <Heading alignSelf="flex-start">Availible Developers</Heading>
        {pagination && (
          <Flex w="full" direction="row" justifyContent="space-between">
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
        <Grid
          templateColumns="1fr 4fr"
          gap={5}
          alignItems="flex-start"
          mt={4}
          overflow="hidden"
          h="70vh"
        >
          <GridItem top="0" position="sticky">
            <Box p="3" w="full" rounded="lg" boxShadow="2xl" bg={carBg}>
              {position && (
                <VStack>
                  <Heading textAlign="center" size="lg">
                    {position.title}
                  </Heading>
                  <Wrap>
                    {position.skills.map(skill => (
                      <WrapItem key={skill}>
                        <Badge>{skill}</Badge>
                      </WrapItem>
                    ))}
                  </Wrap>
                  <Text textAlign="center">{position.description}</Text>
                </VStack>
              )}
            </Box>
          </GridItem>
          <GridItem overflowY="auto" h="70vh">
            <VStack alignItems="start" w="full" justify="center">
              {loading || networkStatus === NetworkStatus.refetch ? (
                <Loading />
              ) : (
                <VStack w="full" mt="2">
                  {profiles.length > 0 ? (
                    profiles.map(profile => (
                      <Box
                        key={profile.user.id}
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
                          <HStack>
                            <Avatar size="sm" src={profile.user.avatar} />
                            <Link
                              isExternal
                              as={RouterLink}
                              fontWeight="bold"
                              to={`/user/${profile.user.id}`}
                            >
                              {profile.user.name} <ExternalLinkIcon mx="2px" />
                            </Link>
                          </HStack>
                          <Spacer />
                          <Button
                            colorScheme="green"
                            loadingText="Offering..."
                            isLoading={
                              offerId === profile.user.id && offerLoading
                            }
                            spinnerPlacement="end"
                            mr={3}
                            onClick={() => {
                              setOfferId(profile.user.id);
                              offer({
                                variables: {
                                  positionId: position.id,
                                  userId: profile.user.id,
                                },
                              });
                            }}
                          >
                            Offer
                          </Button>
                        </Flex>
                        <Wrap>
                          {profile.skills.map(skill => (
                            <WrapItem key={skill}>
                              <Badge>{skill}</Badge>
                            </WrapItem>
                          ))}
                        </Wrap>
                      </Box>
                    ))
                  ) : (
                    <Text fontSize="xl">
                      {' '}
                      Sorry, no developers availible at this time. Please check
                      back later.
                    </Text>
                  )}
                </VStack>
              )}
            </VStack>
          </GridItem>
        </Grid>
        <Divider />
        <Flex
          w="full"
          direction="row"
          justifyContent="center"
          alignItems="center"
        >
          <ButtonGroup
            my="2"
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
      </VStack>
    </Box>
  );
};

const SEARCH_DEVELOPERS = gql`
  query searchDevelopers($positionId: String!, $page: Float) {
    searchDevelopers(input: { page: $page, positionId: $positionId }) {
      position {
        id
        title
        skills
        description
      }
      profiles {
        user {
          id
          name
          avatar
        }
        skills
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

const OFFER = gql`
  mutation offer($userId: String!, $positionId: String!) {
    offer(userId: $userId, positionId: $positionId)
  }
`;
