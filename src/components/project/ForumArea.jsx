import React, { useContext, useEffect, useState } from 'react';
import {
  Flex,
  VStack,
  Box,
  LinkBox,
  LinkOverlay,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  useColorModeValue,
  useToast,
  Text,
  Divider,
  Heading,
  Button,
  ButtonGroup,
  Badge,
  Spacer,
  Avatar,
  HStack,
} from '@chakra-ui/react';
import { AddIcon } from '@chakra-ui/icons';
import { useQuery, gql, NetworkStatus } from '@apollo/client';
import { AuthContext } from '../../context/auth';
import { Loading } from '../Loading';
import { SinglePost } from './SinglePost';
import { CreatePostForm } from './CreatePostForm';

export const ForumArea = () => {
  const authContext = useContext(AuthContext);
  const bg = useColorModeValue('gray.50', 'gray.700');

  const initialRef = React.useRef();

  const [page, setPage] = useState(1);
  const [buttonState, setButtonState] = useState([false, false]);
  const [selectedPostId, setSelectedPostId] = useState('');

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

  if (error) {
    toast({
      title: error.message,
      status: 'error',
      duration: 3000,
      isClosable: true,
      position: 'bottom-left',
    });
  }

  const postList = posts && (
    <VStack mt="2">
      {posts.length > 0 ? (
        posts.map(post => (
          <LinkBox key={post.id} w="full" p="3" bg={bg} rounded="md">
            <LinkOverlay
              cursor="pointer"
              onClick={() => {
                setSelectedPostId(post.id);
                postOnOpen();
              }}
            >
              <Heading>{post.title}</Heading>
            </LinkOverlay>
            <Flex>
              <HStack>
                <Avatar size="xs" src={post.user.avatar} mb={1} />
                <Text>{post.user.name}</Text>
                <Badge>
                  {members.find(member => member.dev.id === post.user.id)
                    ? members.find(member => member.dev.id === post.user.id)
                        .title
                    : 'Project Owner'}
                </Badge>
                <Text color="gray.500">
                  On {new Date(post.date).toLocaleString('en-GB')}
                </Text>
              </HStack>
              <Spacer />
              <Text>
                {post.commentCount}{' '}
                {post.commentCount === 1 ? 'comment' : 'comments'}
              </Text>
            </Flex>
          </LinkBox>
        ))
      ) : (
        <Text>no posts to show</Text>
      )}
    </VStack>
  );

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
      {loading || networkStatus === NetworkStatus.refetch ? (
        <Loading />
      ) : (
        postList
      )}
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
      <Modal
        initialFocusRef={initialRef}
        isOpen={postIsOpen}
        onClose={() => {
          postOnClose();
          refetch();
        }}
        size="6xl"
        scrollBehavior="inside"
      >
        <ModalOverlay />
        <ModalContent>
          <ModalCloseButton />
          <ModalBody>
            <SinglePost
              postId={selectedPostId}
              onClose={() => {
                postOnClose();
                refetch();
              }}
              initialRef={initialRef}
            />
          </ModalBody>
        </ModalContent>
      </Modal>
      <Modal
        isOpen={createIsOpen}
        onClose={createOnClose}
        size="3xl"
        scrollBehavior="outside"
      >
        <ModalOverlay />
        <ModalContent>
          <ModalCloseButton />
          <ModalBody>
            <CreatePostForm onClose={createOnClose} refetch={refetch} />
          </ModalBody>
        </ModalContent>
      </Modal>
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
        commentCount
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
