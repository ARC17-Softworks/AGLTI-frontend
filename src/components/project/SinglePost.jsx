import React, { useState, useContext, useEffect } from 'react';
import {
  Flex,
  VStack,
  Box,
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
  Textarea,
  Tooltip,
  IconButton,
} from '@chakra-ui/react';
import { EditIcon, DeleteIcon, CloseIcon, CheckIcon } from '@chakra-ui/icons';
import { useQuery, useMutation, gql, NetworkStatus } from '@apollo/client';
import { Loading } from '../Loading';
import { AuthContext } from '../../context/auth';

export const SinglePost = ({ onClose, postId, initialRef }) => {
  const authContext = useContext(AuthContext);

  const [selectedCommentId, setSelectedCommentId] = useState('');
  const [commentTextAreaValue, setCommentTextAreaValue] = useState('');
  const [editCommentTextAreaValue, setCommentEditTextAreaValue] = useState('');
  const [editPostTextAreaValue, setPostEditTextAreaValue] = useState('');
  const [commentEdit, setCommentEdit] = useState(false);
  const [postEdit, setPostEdit] = useState(false);

  const toast = useToast();

  const { data, loading, refetch, networkStatus, error } = useQuery(GET_POST, {
    variables: { postId },
    fetchPolicy: 'no-cache',
  });

  const members = data && data.getPost ? data.getPost.members : null;

  const post = data && data.getPost ? data.getPost.post : null;

  useEffect(() => {
    if (post && postEdit) {
      setPostEditTextAreaValue(post.text);
    } else if (post && !postEdit) {
      setPostEditTextAreaValue('');
    }
    return () => {
      setPostEditTextAreaValue('');
    };
  }, [post, postEdit, setPostEditTextAreaValue]);

  const [deletePost, { loading: deletePostLoading }] = useMutation(
    DELETE_POST,
    {
      update() {
        onClose();
      },
      variables: { postId },
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

  const [editPost, { loading: editPostLoading }] = useMutation(EDIT_POST, {
    update() {
      setPostEditTextAreaValue('');
      setPostEdit(false);
      refetch();
    },
    variables: { postId, text: editPostTextAreaValue },
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

  const [addComment, { loading: addCommentLoading }] = useMutation(
    CREATE_COMMENT,
    {
      update() {
        setCommentTextAreaValue('');
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

  const [editComment, { loading: editCommentLoading }] = useMutation(
    EDIT_COMMENT,
    {
      update() {
        setCommentEditTextAreaValue('');
        setSelectedCommentId('');
        setCommentEdit(false);
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

  const [deleteComment, { loading: deleteCommentLoading }] = useMutation(
    DELETE_COMMENT,
    {
      update() {
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

  if (error) {
    onClose();
    return null;
  }

  if (loading || networkStatus === NetworkStatus.refetch) {
    return <Loading />;
  }

  return (
    <Box w="full">
      <Flex>
        <Heading mt="6">{post.title}</Heading> <Spacer />
        {authContext.user.id === post.user.id && (
          <ButtonGroup mr="7">
            {postEdit && (
              <Tooltip hasArrow label="Save Post">
                <IconButton
                  size="sm"
                  icon={<CheckIcon />}
                  colorScheme="green"
                  variant="outline"
                  onClick={() => editPost()}
                  isLoading={editPostLoading}
                />
              </Tooltip>
            )}
            <Tooltip hasArrow label="Edit Post">
              <IconButton
                size="sm"
                icon={<EditIcon />}
                variant="outline"
                onClick={() => setPostEdit(!postEdit)}
              />
            </Tooltip>
            <Tooltip hasArrow label="Delete Post">
              <IconButton
                colorScheme="red"
                size="sm"
                icon={<DeleteIcon />}
                variant="outline"
                onClick={() => deletePost()}
                isLoading={deletePostLoading}
              />
            </Tooltip>
          </ButtonGroup>
        )}
      </Flex>
      <HStack>
        <Avatar size="xs" src={post.user.avatar} mb={1} />
        <Text>{post.user.name}</Text>
        <Badge>
          {members.find(member => member.dev.id === post.user.id)
            ? members.find(member => member.dev.id === post.user.id).title
            : 'Project Owner'}
        </Badge>
        <Text color="gray.500">
          On {new Date(post.date).toLocaleString('en-GB')}
          {post.edited && ' (edited)'}
        </Text>
      </HStack>
      <Divider />
      {!postEdit ? (
        <Text pt="6" px="2" mb="4" fontSize="larger">
          {post.text}
        </Text>
      ) : (
        <Textarea
          value={editPostTextAreaValue}
          size="sm"
          resize="vertical"
          mt="2"
          onChange={e => setPostEditTextAreaValue(e.target.value)}
        />
      )}

      <Text pt="3" fontWeight="bold" fontSize="lg">
        Comments
      </Text>
      <Divider />
      <Textarea
        ref={initialRef}
        value={commentTextAreaValue}
        size="sm"
        resize="vertical"
        mt="2"
        onChange={e => setCommentTextAreaValue(e.target.value)}
      />
      <Button
        colorScheme="green"
        fontSize="md"
        size="md"
        mt="1"
        onClick={() => {
          addComment({
            variables: { postId, text: commentTextAreaValue },
          });
        }}
        isLoading={addCommentLoading}
        loadingText="Saving.."
        spinnerPlacement="end"
      >
        Save
      </Button>

      {post.comments.length > 0 && (
        <VStack my="5" w="full">
          {post.comments.map(comment => (
            <VStack w="full" key={comment.id}>
              <HStack w="full">
                <Avatar size="sm" src={comment.user.avatar} />
                <Text>{comment.user.name}</Text>
                <Badge>
                  {members.find(member => member.dev.id === comment.user.id)
                    ? members.find(member => member.dev.id === comment.user.id)
                        .title
                    : 'Project Owner'}
                </Badge>
                <Text fontStyle="italic" color="gray.500">
                  {new Date(comment.date).toLocaleString('en-GB')}{' '}
                  {comment.edited && '(edited)'}
                </Text>
              </HStack>
              {commentEdit && comment.id === selectedCommentId ? (
                <Textarea
                  value={editCommentTextAreaValue}
                  size="sm"
                  resize="vertical"
                  mt="2"
                  onChange={e => setCommentEditTextAreaValue(e.target.value)}
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
                        editComment({
                          variables: {
                            postId,
                            commentId: comment.id,
                            text: editCommentTextAreaValue,
                          },
                        });
                      }}
                      isLoading={
                        editCommentLoading && comment.id === selectedCommentId
                      }
                      colorScheme="green"
                    />
                  </Tooltip>
                )}
                {authContext.user.id === comment.user.id && (
                  <Tooltip hasArrow label={commentEdit ? 'Cancel' : 'Edit'}>
                    <IconButton
                      size="sm"
                      {...(commentEdit
                        ? { icon: <CloseIcon />, colorScheme: 'orange' }
                        : { icon: <EditIcon />, colorScheme: 'gray' })}
                      onClick={() => {
                        if (!commentEdit) {
                          setCommentEdit(true);
                          setSelectedCommentId(comment.id);
                          setCommentEditTextAreaValue(comment.text);
                        } else {
                          setCommentEdit(false);
                          setSelectedCommentId('');
                          setCommentEditTextAreaValue('');
                        }
                        console.log(selectedCommentId);
                        console.log(editCommentTextAreaValue);
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
                        deleteComment({
                          variables: {
                            postId,
                            commentId: comment.id,
                          },
                        });
                      }}
                      isLoading={
                        deleteCommentLoading && comment.id === selectedCommentId
                      }
                    />
                  </Tooltip>
                )}
              </ButtonGroup>
            </VStack>
          ))}
        </VStack>
      )}
    </Box>
  );
};

const GET_POST = gql`
  query getPost($postId: String!) {
    getPost(postId: $postId) {
      members {
        dev {
          id
        }
        title
      }
      post {
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
    }
  }
`;

const EDIT_POST = gql`
  mutation editPost($postId: String!, $text: String!) {
    editPost(postId: $postId, text: $text)
  }
`;

const DELETE_POST = gql`
  mutation deletePost($postId: String!) {
    deletePost(postId: $postId)
  }
`;

const CREATE_COMMENT = gql`
  mutation createComment($postId: String!, $text: String!) {
    createComment(postId: $postId, text: $text)
  }
`;

const EDIT_COMMENT = gql`
  mutation editComment($postId: String!, $commentId: String!, $text: String!) {
    editComment(postId: $postId, commentId: $commentId, text: $text)
  }
`;

const DELETE_COMMENT = gql`
  mutation deleteComment($postId: String!, $commentId: String!) {
    deleteComment(postId: $postId, commentId: $commentId)
  }
`;
