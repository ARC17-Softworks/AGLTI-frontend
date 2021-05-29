import React, { useContext } from 'react';
import {
  Flex,
  useColorModeValue,
  VStack,
  Button,
  Divider,
  Circle,
} from '@chakra-ui/react';
import { AddIcon, SearchIcon, ArrowRightIcon } from '@chakra-ui/icons';
import { ArchiveTray, PaperPlaneTilt } from 'phosphor-react'; //Users, Chats
import { Link as RouterLink } from 'react-router-dom';
import { DividerWithText } from '../misc/DividerWithText';

import { AuthContext } from '../../context/auth';
import { DashboardContext } from '../../context/dashboard';

export const DashboardSideNav = () => {
  const authContext = useContext(AuthContext);
  const dashboardContext = useContext(DashboardContext);
  const bg = useColorModeValue('gray.50', 'gray.700');
  const toProject = (
    <Button
      rightIcon={<ArrowRightIcon />}
      colorScheme="blue"
      size="sm"
      as={RouterLink}
      to="/projectdashboard"
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
        to="/position/search"
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
        to="/createproject"
      >
        Create Project
      </Button>
    </>
  );

  const appliedAndOffers = (
    <>
      <Button
        variant="ghost"
        justifyContent="start"
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
        justifyContent="start"
        leftIcon={<ArchiveTray weight="fill" />}
        size="md"
        as={RouterLink}
        to="/dashboard/offers"
        w="full"
      >
        Offers{' '}
        {dashboardContext.offers > 0 && (
          <Circle bg="red" size={4} color="white" fontSize="14px">
            {dashboardContext.offers}
          </Circle>
        )}
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
          {authContext.profile.activeProject ? toProject : noProject}
        </VStack>
        <Divider />
        <VStack pt={2} w="full">
          {!authContext.profile.activeProject && appliedAndOffers}
          {/* <Button
            variant="ghost"
            justifyContent="start"
            leftIcon={<Users weight="fill" />}
            size="md"
            // as={RouterLink}
            // to="/dashboard/contacts"
            w="full"
          >
            Contacts
          </Button>
          <Button
            variant="ghost"
            justifyContent="start"
            leftIcon={<Chats weight="fill" />}
            size="md"
            // as={RouterLink}
            // to="/dashboard/messages"
            w="full"
          >
            Messages
          </Button> */}
        </VStack>
      </VStack>
    </Flex>
  );
};
