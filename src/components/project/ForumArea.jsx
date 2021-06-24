import React, { useContext, useEffect, useState } from 'react';
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
import { AddIcon } from '@chakra-ui/icons';
import { useQuery, useMutation, gql, NetworkStatus } from '@apollo/client';
import { ProjectDashboardContext } from '../../context/projectDashboard';
import { AuthContext } from '../../context/auth';
import { Loading } from '../Loading';

export const ForumArea = () => {
  const authContext = useContext(AuthContext);
  const { setApplicants, setTasks } = useContext(ProjectDashboardContext);

  const [page, setPage] = useState(1);
  const [buttonState, setButtonState] = useState([false, false]);

  const {
    isOpen: createIsOpen,
    onOpen: createOnOpen,
    onClose: createOnClose,
  } = useDisclosure();

  const {
    isOpen: postIsOpen,
    onOpen: postOnOpen,
    onClose: postOnClose,
  } = useDisclosure();

  const toast = useToast();

  const { data, loading, refetch, networkStatus, error } = useQuery(GET_POSTS, {
    variables: { page },
    fetchPolicy: 'no-cache',
  });

  const members = data && data.getPosts ? data.getPosts.members : null;

  const posts = data && data.getPosts ? data.getPosts.posts : null;

  const pagination = data && data.getPosts ? data.getPosts.pagination : null;

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

  if (error && error.message === 'Not authorised to access this resource') {
    authContext.setProfile({
      ...authContext.profile,
      activeProject: false,
      projectOwner: false,
    });

    return <Loading />;
  }

  if (loading || networkStatus === NetworkStatus.refetch) {
    return <Loading />;
  }

  return (
    <Box maxW="container.xl" px={10} pt={2} mx="auto">
      <Box pt={6} w="full">
        <Flex w="full">
          <Heading>Project Forum</Heading>
          <Spacer />
          <Button
            onClick={createOnOpen}
            leftIcon={<AddIcon />}
            variant="outline"
          >
            Create Post
          </Button>
        </Flex>
        <Divider />
      </Box>
      <Flex direction="row" justify="center">
        <ButtonGroup
          my="4"
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
  );
};

const GET_POSTS = gql`
  query getPosts($page: Float) {
    getPosts(input: { page: $page }) {
      members {
        dev {
          id
        }
        title
      }
      posts {
        id
        user {
          id
          name
          avatar
        }
        title
        text
        edited
        date
        comments {
          id
          user {
            id
            name
            avatar
          }
          text
          edited
          date
        }
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
