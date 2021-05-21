import React, { useContext } from 'react';
import {
  chakra,
  Flex,
  useColorModeValue,
  HStack,
  Button,
  IconButton,
  Avatar,
  Menu,
  MenuButton,
  MenuList,
  MenuGroup,
  MenuItem,
  MenuDivider,
  useToast,
} from '@chakra-ui/react';
import { House } from 'phosphor-react';
import { Link as RouterLink } from 'react-router-dom';
import { AuthContext } from '../../context/auth';
import { ColorModeSwitcher } from '../../ColorModeSwitcher';
import { ReactComponent as Logo } from '../../navlogo.svg';
import { useMutation, useApolloClient, gql } from '@apollo/client';

export const SignedInNav = () => {
  const context = useContext(AuthContext);
  const bg = useColorModeValue('white', 'gray.900');
  const toast = useToast();
  const client = useApolloClient();

  const [logoutUser] = useMutation(LOGOUT_USER, {
    update() {
      context.logout();
      client.resetStore();
    },
    onError(err) {
      if (err.graphQLErrors) {
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
      }
    },
  });

  return (
    <chakra.header
      bg={bg}
      w="full"
      h="56px"
      px={4}
      py={2}
      shadow="md"
      position="sticky"
      top="0"
    >
      <Flex alignItems="center" justifyContent="space-between" mx="auto">
        <HStack display="flex" spacing={3} alignItems="center">
          <Logo width="100px" fill="currentColor" />

          <HStack spacing={3}>
            <Button
              variant="ghost"
              leftIcon={<House weight="fill" />}
              size="sm"
              as={RouterLink}
              to="/dashboard"
            >
              Dashboard
            </Button>
          </HStack>
        </HStack>
        <HStack spacing={3} alignItems="center">
          <ColorModeSwitcher />

          <Menu>
            <MenuButton
              as={IconButton}
              variant="ghost"
              isRound={true}
              size="sm"
            >
              <Avatar size="sm" src={context.user.avatar} />
            </MenuButton>
            <MenuList>
              <MenuGroup title={context.user.name}>
                <MenuItem>My Profile</MenuItem>
              </MenuGroup>
              <MenuDivider />
              <MenuGroup>
                <MenuItem as={RouterLink} to="/user/changepassword">
                  Change Password
                </MenuItem>
                <MenuItem onClick={() => logoutUser()}>Logout</MenuItem>
              </MenuGroup>
            </MenuList>
          </Menu>
        </HStack>
      </Flex>
    </chakra.header>
  );
};

const LOGOUT_USER = gql`
  mutation logout {
    logout
  }
`;
