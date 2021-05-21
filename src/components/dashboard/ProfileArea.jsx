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
  Divider,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
} from '@chakra-ui/react';
import { EditIcon, ExternalLinkIcon, AddIcon } from '@chakra-ui/icons';
import {
  MapPin,
  Globe,
  GithubLogo,
  LinkedinLogo,
  DribbbleLogo,
} from 'phosphor-react';
import { AuthContext } from '../../context/auth';
import { useQuery, NetworkStatus } from '@apollo/client';
import { DASHBOARD_QUERY } from '../../graphql';
import { Loading } from '../Loading';
import { DashboardContext } from '../../context/dashboard';
import { SetProfileForm } from '../profile/SetProfileForm';

export const ProfileArea = () => {
  const authContext = useContext(AuthContext);
  const { setOffers } = useContext(DashboardContext);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { data, loading, refetch, networkStatus } = useQuery(DASHBOARD_QUERY, {
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

  if (loading || networkStatus === NetworkStatus.refetch) {
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
            <IconButton
              onClick={onOpen}
              icon={<EditIcon />}
              variant="outline"
            />
          </Tooltip>
          <Modal
            isOpen={isOpen}
            onClose={onClose}
            size="3xl"
            scrollBehavior="inside"
          >
            <ModalOverlay />
            <ModalContent>
              <ModalCloseButton />
              <ModalBody>
                <SetProfileForm
                  formTitle="Edit Profile"
                  buttonText="Save"
                  initialValues={{
                    skills: profile.skills,
                    location: profile.location ? profile.location : '',
                    bio: profile.bio ? profile.bio : '',
                    website: profile.links.website ? profile.links.website : '',
                    github: profile.links.github
                      ? profile.links.github.split('https://github.com/')[1]
                      : '',
                    linkedin: profile.links.linkedin
                      ? profile.links.linkedin.split(
                          'https://linkedin.com/in/'
                        )[1]
                      : '',
                    dribble: profile.links.dribble
                      ? profile.links.dribble.split('https://dribbble.com/')[1]
                      : '',
                  }}
                  refetch={refetch}
                  onClose={onClose}
                />
              </ModalBody>
            </ModalContent>
          </Modal>
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
                  <Icon as={Globe} /> Website/Blog <ExternalLinkIcon mx="2px" />
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
                  <Icon as={DribbbleLogo} weight="fill" /> Dribbble{' '}
                  <ExternalLinkIcon mx="2px" />
                </Link>
              )}
            </HStack>
          )}
        <Flex w="full" mt={4}>
          <Text fontSize="4xl">Expierience</Text>
          <Spacer />
          <Tooltip hasArrow label="Add Experience">
            <IconButton icon={<AddIcon />} variant="outline" />
          </Tooltip>
        </Flex>
        <Divider />
        <Flex w="full" mt={4}>
          <Text fontSize="4xl">Education</Text>
          <Spacer />
          <Tooltip hasArrow label="Add Education">
            <IconButton icon={<AddIcon />} variant="outline" />
          </Tooltip>
        </Flex>
        <Divider />
      </VStack>
    </HStack>
  );
};
