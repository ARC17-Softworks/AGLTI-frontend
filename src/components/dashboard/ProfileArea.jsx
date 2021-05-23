import React, { useContext, useEffect, useState } from 'react';
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
  LinkBox,
  LinkOverlay,
  Heading,
  Box,
  useToast,
} from '@chakra-ui/react';
import {
  EditIcon,
  ExternalLinkIcon,
  AddIcon,
  DeleteIcon,
} from '@chakra-ui/icons';
import {
  MapPin,
  Globe,
  GithubLogo,
  LinkedinLogo,
  DribbbleLogo,
} from 'phosphor-react';
import { AuthContext } from '../../context/auth';
import {
  useQuery,
  useApolloClient,
  NetworkStatus,
  useMutation,
  gql,
} from '@apollo/client';
import { DASHBOARD_QUERY, GET_GITHUB_REPOS } from '../../graphql';
import { Loading } from '../Loading';
import { DashboardContext } from '../../context/dashboard';
import { SetProfileForm } from '../profile/SetProfileForm';
import { AddExperienceForm } from '../profile/AddExperienceForm';
import { AddEducationForm } from '../profile/AddEducationForm';

export const ProfileArea = () => {
  const authContext = useContext(AuthContext);
  const { setOffers } = useContext(DashboardContext);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const {
    isOpen: expIsOpen,
    onOpen: expOnOpen,
    onClose: expOnClose,
  } = useDisclosure();
  const {
    isOpen: eduIsOpen,
    onOpen: eduOnOpen,
    onClose: eduOnClose,
  } = useDisclosure();

  const [githubRepos, setGithubRepos] = useState([]);

  const toast = useToast();

  const client = useApolloClient();
  const { data, loading, refetch, networkStatus } = useQuery(DASHBOARD_QUERY, {
    fetchPolicy: 'cache-and-network',
  });

  const [removeExperience] = useMutation(REMOVE_EXPERIENCE, {
    update(proxy, result) {
      refetch();
    },
    onError(err) {
      console.log(err.networkError.result);
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

  const [removeEducation] = useMutation(REMOVE_EDUCATION, {
    update(proxy, result) {
      refetch();
    },
    onError(err) {
      console.log(err.networkError.result);
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

  const profile = data ? data.getMe.profile : null;
  const offers = profile ? profile.offers : [];
  useEffect(() => {
    if (offers) {
      const unreadOffers = offers.map(offer => offer.read === false).length;

      setOffers(unreadOffers);
    }
    //eslint-disable-next-line
  }, [offers]);

  useEffect(() => {
    async function fetchData() {
      if (!(loading || networkStatus === NetworkStatus.refetch)) {
        if (data.getMe.profile.links.github) {
          const username = data.getMe.profile.links.github.split(
            'https://github.com/'
          )[1];
          const { data: gitHubReposData } = await client.query({
            query: GET_GITHUB_REPOS,
            variables: { username },
            fetchPolicy: 'no-cache',
          });
          setGithubRepos(gitHubReposData.getGitHubRepos.repositories);
        } else {
          setGithubRepos([]);
        }
      }
    }
    fetchData();
  }, [client, data, loading, networkStatus]);

  if (loading && networkStatus !== NetworkStatus.refetch) {
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
          <Text>
            <Icon as={MapPin} weight="fill" /> {profile.location}{' '}
          </Text>
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
            <IconButton
              onClick={expOnOpen}
              icon={<AddIcon />}
              variant="outline"
            />
          </Tooltip>
          <Modal
            isOpen={expIsOpen}
            onClose={expOnClose}
            size="3xl"
            scrollBehavior="outside"
          >
            <ModalOverlay />
            <ModalContent>
              <ModalCloseButton />
              <ModalBody>
                <AddExperienceForm refetch={refetch} onClose={expOnClose} />
              </ModalBody>
            </ModalContent>
          </Modal>
        </Flex>
        <Divider />
        {profile.experience.length > 0 && (
          <>
            {profile.experience.map(experience => (
              <Box
                w="full"
                p="3"
                borderWidth="1px"
                rounded="md"
                key={experience.id}
              >
                <Flex w="full">
                  <Text size="md" my="2">
                    <Text as="span" fontWeight="bold">
                      {experience.title}
                    </Text>{' '}
                    - {experience.company}
                  </Text>
                  <Spacer />
                  <Text fontStyle="italic">
                    {
                      new Date(experience.from)
                        .toLocaleString('en-GB')
                        .split(',')[0]
                    }{' '}
                    -{' '}
                    {experience.to
                      ? new Date(experience.to)
                          .toLocaleString('en-GB')
                          .split(',')[0]
                      : 'current'}
                  </Text>
                </Flex>
                {experience.location && (
                  <Text>
                    <Icon as={MapPin} weight="fill" /> {experience.location}
                  </Text>
                )}
                <Flex direction="row" justifyContent="flex-end">
                  <IconButton
                    size="sm"
                    colorScheme="red"
                    icon={<DeleteIcon />}
                    onClick={() =>
                      removeExperience({ variables: { expId: experience.id } })
                    }
                    variant="outline"
                  />
                </Flex>
              </Box>
            ))}
          </>
        )}
        <Flex w="full" mt={4}>
          <Text fontSize="4xl">Education</Text>
          <Spacer />
          <Tooltip hasArrow label="Add Education">
            <IconButton
              onClick={eduOnOpen}
              icon={<AddIcon />}
              variant="outline"
            />
          </Tooltip>
          <Modal
            isOpen={eduIsOpen}
            onClose={eduOnClose}
            size="3xl"
            scrollBehavior="outside"
          >
            <ModalOverlay />
            <ModalContent>
              <ModalCloseButton />
              <ModalBody>
                <AddEducationForm refetch={refetch} onClose={eduOnClose} />
              </ModalBody>
            </ModalContent>
          </Modal>
        </Flex>
        <Divider />
        {profile.education.length > 0 && (
          <>
            {profile.education.map(education => (
              <Box
                w="full"
                p="3"
                borderWidth="1px"
                rounded="md"
                key={education.id}
              >
                <Flex w="full">
                  <Text size="md" my="2">
                    <Text as="span" fontWeight="bold">
                      {education.school}
                    </Text>{' '}
                    - {education.degree}
                  </Text>
                  <Spacer />
                  <Text fontStyle="italic">
                    {
                      new Date(education.from)
                        .toLocaleString('en-GB')
                        .split(',')[0]
                    }{' '}
                    -{' '}
                    {education.to
                      ? new Date(education.to)
                          .toLocaleString('en-GB')
                          .split(',')[0]
                      : 'current'}
                  </Text>
                </Flex>

                <Flex direction="row" justifyContent="flex-end">
                  <IconButton
                    size="sm"
                    colorScheme="red"
                    icon={<DeleteIcon />}
                    onClick={() =>
                      removeEducation({ variables: { eduId: education.id } })
                    }
                    variant="outline"
                  />
                </Flex>
              </Box>
            ))}
          </>
        )}
        {githubRepos.length > 0 && (
          <>
            <Text fontSize="4xl">GitHub Repositories</Text>
            <Divider />
            {githubRepos.map(repo => (
              <LinkBox
                w="full"
                p="3"
                borderWidth="1px"
                rounded="md"
                key={repo.url}
              >
                <Heading size="md" my="2">
                  <LinkOverlay href={repo.url}>{repo.name}</LinkOverlay>
                </Heading>
                {repo.primaryLanguage && (
                  <Badge>{repo.primaryLanguage.name}</Badge>
                )}
                <Text fontStyle="italic">
                  {repo.description ? repo.description : 'no description'}
                </Text>
              </LinkBox>
            ))}
          </>
        )}
      </VStack>
    </HStack>
  );
};

const REMOVE_EXPERIENCE = gql`
  mutation removeExperience($expId: String!) {
    removeExperience(expId: $expId)
  }
`;
const REMOVE_EDUCATION = gql`
  mutation removeEducation($eduId: String!) {
    removeEducation(eduId: $eduId)
  }
`;
