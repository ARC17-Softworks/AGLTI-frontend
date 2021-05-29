import React, { useContext, useEffect } from 'react';
import {
  VStack,
  Box,
  Divider,
  Heading,
  Wrap,
  WrapItem,
} from '@chakra-ui/react';
import { useQuery, NetworkStatus } from '@apollo/client';
import { PROJECT_DASHBOARD_QUERY } from '../../graphql';
import { ProjectDashboardContext } from '../../context/projectDashboard';
import { AuthContext } from '../../context/auth';
import { Loading } from '../Loading';
import { MemberCard } from './MemberCard';

export const MemberArea = () => {
  const authContext = useContext(AuthContext);
  const { setApplicants } = useContext(ProjectDashboardContext);

  const { data, loading, refetch, networkStatus, error } = useQuery(
    PROJECT_DASHBOARD_QUERY,
    {
      fetchPolicy: 'no-cache',
    }
  );

  const project = data ? data.currentProject.project : null;

  useEffect(() => {
    if (
      project &&
      authContext.profile.projectOwner &&
      project.applicants.length > 0
    ) {
      const unreadApplicants = project.applicants.filter(
        applicant => applicant.read === false
      ).length;
      setApplicants(unreadApplicants);
    }
  }, [project, setApplicants, authContext]);

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
    <VStack mt={4} alignItems="start" w="full" justify="center">
      <Heading pt={4} as="h1" size="2xl">
        Members
      </Heading>
      <Divider />
      {project.members.length > 0 && (
        <Box w="full">
          <Wrap align="center" justify="center" pb="2">
            {project.members.map(member => (
              <WrapItem key={member.dev.id}>
                <MemberCard
                  refetch={refetch}
                  dashboard={true}
                  member={member}
                />
              </WrapItem>
            ))}
          </Wrap>
        </Box>
      )}
      <Heading pt={4} as="h1" size="2xl">
        Previous Members
      </Heading>
      <Divider />
      {project.previousMembers.length > 0 && (
        <Box w="full">
          <Wrap align="center" justify="center" pb="2">
            {project.previousMembers.map(member => (
              <WrapItem key={member.dev.id}>
                <MemberCard member={member} />
              </WrapItem>
            ))}
          </Wrap>
        </Box>
      )}
    </VStack>
  );
};
