import React, { useContext, useEffect } from 'react';
import {
  Image,
  HStack,
  Text,
  Badge,
  VStack,
  IconButton,
  Flex,
  Spacer,
  Tooltip,
  Link,
  Icon,
} from '@chakra-ui/react';
import { EditIcon, ExternalLinkIcon } from '@chakra-ui/icons';
import {
  MapPin,
  Globe,
  GithubLogo,
  LinkedinLogo,
  DribbbleLogo,
} from 'phosphor-react';
import { AuthContext } from '../../context/auth';
import { useQuery } from '@apollo/client';
import { DASHBOARD_QUERY } from '../../graphql';
import { Loading } from '../Loading';
import { DashboardContext } from '../../context/dashboard';

export const ProfileArea = () => {
  const authContext = useContext(AuthContext);
  const { setOffers } = useContext(DashboardContext);
  const { data, loading } = useQuery(DASHBOARD_QUERY, {
    fetchPolicy: 'cache-and-network',
  });

  const profile = data ? data.getMe.profile : null;
  const offers = profile ? profile.offers : [];
  useEffect(() => {
    if (offers) {
      const unreadOffers = offers.map(offer => offer.read === false).length;

      setOffers(unreadOffers);
    }
    //eslint-disable-next-line
  }, [offers]);

  if (loading) {
    return <Loading />;
  }

  return (
    <HStack spacing={10} alignItems="flex-start" mt={4}>
      <Image boxSize="200px" src={authContext.user.avatar} />
      <VStack alignItems="start" w="full" justify="center">
        <Flex w="full">
          <Text fontSize="5xl">{authContext.user.name}</Text>
          <Spacer />
          <Tooltip hasArrow label="Edit Profile">
            <IconButton icon={<EditIcon />} variant="outline" />
          </Tooltip>
        </Flex>
        <HStack>
          {profile.skills.map(skill => (
            <Badge key={skill}>{skill}</Badge>
          ))}
        </HStack>
        {profile.location && (
          <HStack>
            <MapPin weight="fill" />
            <Text>{profile.location} </Text>
          </HStack>
        )}
        {profile.bio && <Text fontStyle="italic">"{profile.bio}"</Text>}
        {profile.links &&
          Object.values(profile.links).some(
            val => val && val.length > 0 && val !== 'Links'
          ) && (
            <HStack spacing={3}>
              {profile.links.website && (
                <Link href={profile.links.website} isExternal>
                  <Globe /> Website/Blog <ExternalLinkIcon mx="2px" />
                </Link>
              )}
              {profile.links.github && (
                <Link href={profile.links.github} isExternal>
                  <Icon as={GithubLogo} weight="fill" /> GitHub{' '}
                  <ExternalLinkIcon mx="2px" />
                </Link>
              )}
              {profile.links.linkedin && (
                <Link href={profile.links.linkedin} isExternal>
                  <Icon as={LinkedinLogo} weight="fill" /> LinkedIn{' '}
                  <ExternalLinkIcon mx="2px" />
                </Link>
              )}
              {profile.links.dribble && (
                <Link href={profile.links.dribble} isExternal>
                  <Icon as={DribbbleLogo} weight="fill" /> GitHub{' '}
                  <ExternalLinkIcon mx="2px" />
                </Link>
              )}
            </HStack>
          )}
      </VStack>
    </HStack>
  );
};
