import React, { useContext } from 'react';
import {
  Heading,
  Avatar,
  LinkBox,
  LinkOverlay,
  Center,
  Text,
  Badge,
  useColorModeValue,
  Wrap,
  WrapItem,
  Button,
  VStack,
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
import { Link as RouterLink } from 'react-router-dom';
import { useMutation, gql } from '@apollo/client';
import { AuthContext } from '../../context/auth';

export const MemberCard = ({ refetch, member, dashboard }) => {
  const authContext = useContext(AuthContext);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef = React.useRef();

  const toast = useToast();

  const [removeDeveloper, { loading }] = useMutation(REMOVE_DEVELOPER, {
    onCompleted(proxy, result) {
      refetch();
    },
    variables: {
      userId: member.dev.id,
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

  return (
    <Center py={6}>
      <LinkBox
        maxW={'320px'}
        w={'full'}
        bg={useColorModeValue('white', 'gray.700')}
        boxShadow={'2xl'}
        rounded={'lg'}
        p={6}
        textAlign={'center'}
      >
        <VStack>
          <Avatar size={'xl'} src={member.dev.avatar} mb={4} />
          <LinkOverlay as={RouterLink} isExternal to={`/user/${member.dev.id}`}>
            <Heading fontSize={'2xl'}>{member.dev.name}</Heading>
          </LinkOverlay>
          <Text fontWeight={600} color={'gray.500'} mb={4}>
            {member.title}
          </Text>

          <Wrap>
            {member.skills.map(skill => (
              <WrapItem key={skill}>
                <Badge>{skill}</Badge>
              </WrapItem>
            ))}
          </Wrap>
          {authContext.profile.projectOwner && dashboard && (
            <Button
              colorScheme="red"
              size="lg"
              fontSize="md"
              variant="outline"
              isLoading={loading}
              loadingText="Removing..."
              spinnerPlacement="end"
              onClick={onOpen}
            >
              Remove Developer
            </Button>
          )}
        </VStack>
      </LinkBox>
      <AlertDialog
        motionPreset="slideInBottom"
        leastDestructiveRef={cancelRef}
        onClose={onClose}
        isOpen={isOpen}
        isCentered
      >
        <AlertDialogOverlay />

        <AlertDialogContent>
          <AlertDialogHeader>Remove Developer?</AlertDialogHeader>
          <AlertDialogCloseButton />
          <AlertDialogBody>
            Are you sure you want to remove {member.dev.name}?
          </AlertDialogBody>
          <AlertDialogFooter>
            <Button ref={cancelRef} onClick={onClose}>
              No
            </Button>
            <Button
              colorScheme="red"
              size="lg"
              fontSize="md"
              onClick={() => {
                removeDeveloper();
                onClose();
              }}
            >
              Yes
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </Center>
  );
};

const REMOVE_DEVELOPER = gql`
  mutation removeDeveloper($userId: String!) {
    removeDeveloper(userId: $userId)
  }
`;
