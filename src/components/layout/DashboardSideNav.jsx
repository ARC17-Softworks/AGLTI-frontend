import React, { useContext } from 'react';
import {
  Flex,
  useColorModeValue,
  VStack,
  Button,
  Divider,
} from '@chakra-ui/react';
import { AddIcon, SearchIcon, ArrowRightIcon } from '@chakra-ui/icons';
import { ArchiveTray, PaperPlaneTilt, Users, Chats } from 'phosphor-react';
import { Link as RouterLink } from 'react-router-dom';
import { DividerWithText } from '../misc/DividerWithText';

import { AuthContext } from '../../context/auth';

export const DashboardSideNav = () => {
  const context = useContext(AuthContext);
  const bg = useColorModeValue('gray.200', 'gray.700');
  const toProject = (
    <Button
      rightIcon={<ArrowRightIcon />}
      colorScheme="blue"
      size="sm"
      as={RouterLink}
      to="/project"
    >
      Go To Project
    </Button>
  );

  const noProject = (
    <>
      <Button
        leftIcon={<SearchIcon />}
        colorScheme="teal"
        size="sm"
        w="full"
        as={RouterLink}
        to="/search"
      >
        Search Positions
      </Button>
      <DividerWithText mt="6" w="full">
        or
      </DividerWithText>
      <Button
        leftIcon={<AddIcon />}
        colorScheme="blue"
        size="sm"
        w="full"
        as={RouterLink}
        to="/project"
      >
        Create Project
      </Button>
    </>
  );

  const appliedAndOffers = (
    <>
      <Button
        variant="ghost"
        leftIcon={<PaperPlaneTilt weight="fill" />}
        size="md"
        as={RouterLink}
        to="/dashboard/applied"
        w="full"
      >
        Applied
      </Button>
      <Button
        variant="ghost"
        leftIcon={<ArchiveTray weight="fill" />}
        size="md"
        as={RouterLink}
        to="/dashboard/offers"
        w="full"
      >
        Offers
      </Button>
    </>
  );

  return (
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
      <VStack pt={2} w="full" spacing={6}>
        <VStack pt={2} w="full">
          {context.profile.activeProject ? toProject : noProject}
        </VStack>
        <Divider />
        <VStack pt={2} w="full">
          {!context.profile.activeProject && appliedAndOffers}
          <Button
            variant="ghost"
            leftIcon={<Users weight="fill" />}
            size="md"
            as={RouterLink}
            to="/dashboard/applied"
            w="full"
          >
            Contacts
          </Button>
          <Button
            variant="ghost"
            leftIcon={<Chats weight="fill" />}
            size="md"
            as={RouterLink}
            to="/dashboard/applied"
            w="full"
          >
            Messages
          </Button>
        </VStack>
      </VStack>
    </Flex>
  );
};
