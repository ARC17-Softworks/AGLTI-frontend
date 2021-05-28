import React, { useContext } from 'react';
import {
  Flex,
  useColorModeValue,
  VStack,
  Button,
  Circle,
} from '@chakra-ui/react';
import { AlignTop, Users, ArchiveTray, Info, Chats } from 'phosphor-react'; //Users, Chats
import { Link as RouterLink } from 'react-router-dom';

import { AuthContext } from '../../context/auth';
import { ProjectDashboardContext } from '../../context/projectDashboard';

export const ProjectDashboardSideNav = () => {
  const authContext = useContext(AuthContext);
  const dashboardContext = useContext(ProjectDashboardContext);
  const bg = useColorModeValue('gray.50', 'gray.700');

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
      <VStack pt={16} w="full" spacing={6}>
        <VStack pt={2} w="full">
          <Button
            variant="ghost"
            justifyContent="start"
            leftIcon={<Info weight="fill" />}
            size="md"
            as={RouterLink}
            to="/projectdashboard/info"
            w="full"
          >
            Project Info
          </Button>
          <Button
            variant="ghost"
            leftIcon={<Users weight="fill" />}
            justifyContent="start"
            size="md"
            as={RouterLink}
            to="/projectdashboard/members"
            w="full"
          >
            Members
          </Button>
          {authContext.profile.projectOwner && (
            <Button
              variant="ghost"
              justifyContent="start"
              leftIcon={<ArchiveTray weight="fill" />}
              size="md"
              as={RouterLink}
              to="/projectdashboard/openings"
              w="full"
            >
              Open Positions{' '}
              {dashboardContext.applicants > 0 && (
                <Circle bg="red" size={4} color="white" fontSize="14px">
                  {dashboardContext.applicants}
                </Circle>
              )}
            </Button>
          )}
          <Button
            variant="ghost"
            leftIcon={<AlignTop weight="fill" />}
            justifyContent="start"
            size="md"
            as={RouterLink}
            to="/projectdashboard"
            w="full"
          >
            Tasks
          </Button>
          <Button
            variant="ghost"
            leftIcon={<Chats weight="fill" />}
            justifyContent="start"
            size="md"
            as={RouterLink}
            to="/projectdashboard/fourm"
            w="full"
          >
            Forum
          </Button>
        </VStack>
      </VStack>
    </Flex>
  );
};
