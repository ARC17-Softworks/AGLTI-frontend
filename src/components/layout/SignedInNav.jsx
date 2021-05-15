import React, { useContext } from 'react';
import {
  chakra,
  Box,
  Flex,
  useColorModeValue,
  VisuallyHidden,
  HStack,
  Button,
  useDisclosure,
  VStack,
  IconButton,
  CloseButton,
  Avatar,
} from '@chakra-ui/react';
import { House } from 'phosphor-react';
import { BellIcon, HamburgerIcon } from '@chakra-ui/icons';
import { AuthContext } from '../../context/auth';
import { ColorModeSwitcher } from '../../ColorModeSwitcher';
import { ReactComponent as Logo } from '../../navlogo.svg';

export const SignedInNav = () => {
  const context = useContext(AuthContext);
  const bg = useColorModeValue('white', 'gray.800');
  const mobileNav = useDisclosure();

  return (
    <React.Fragment>
      <chakra.header
        bg={bg}
        w="full"
        px={{ base: 2, sm: 4 }}
        py={4}
        shadow="md"
      >
        <Flex alignItems="center" justifyContent="space-between" mx="auto">
          <HStack display="flex" spacing={3} alignItems="center">
            <Box display={{ base: 'inline-flex', md: 'none' }}>
              <IconButton
                display={{ base: 'flex', md: 'none' }}
                aria-label="Open menu"
                fontSize="20px"
                color={useColorModeValue('gray.800', 'inherit')}
                variant="ghost"
                icon={<HamburgerIcon />}
                onClick={mobileNav.onOpen}
              />
              <VStack
                pos="absolute"
                top={0}
                left={0}
                right={0}
                display={mobileNav.isOpen ? 'flex' : 'none'}
                flexDirection="column"
                p={2}
                pb={4}
                m={2}
                bg={bg}
                spacing={3}
                rounded="sm"
                shadow="sm"
              >
                <CloseButton
                  aria-label="Close menu"
                  justifySelf="self-start"
                  onClick={mobileNav.onClose}
                />
                <Button
                  w="full"
                  variant="ghost"
                  leftIcon={<House weight="fill" />}
                >
                  Dashboard
                </Button>
              </VStack>
            </Box>

            <Logo width="100px" fill="currentColor" />

            <HStack spacing={3} display={{ base: 'none', md: 'inline-flex' }}>
              <Button
                variant="ghost"
                leftIcon={<House weight="fill" />}
                size="sm"
              >
                Dashboard
              </Button>
            </HStack>
          </HStack>
          <HStack
            spacing={3}
            display={mobileNav.isOpen ? 'none' : 'flex'}
            alignItems="center"
          >
            <ColorModeSwitcher />
            <chakra.a
              p={3}
              color={useColorModeValue('gray.800', 'inherit')}
              rounded="sm"
              _hover={{ color: useColorModeValue('gray.800', 'gray.600') }}
            >
              <BellIcon />
              <VisuallyHidden>Notifications</VisuallyHidden>
            </chakra.a>

            <Avatar size="sm" src={context.user.avatar} />
          </HStack>
        </Flex>
      </chakra.header>
    </React.Fragment>
  );
};
