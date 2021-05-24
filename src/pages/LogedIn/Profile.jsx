import React, { useEffect, useState } from 'react';
import {
  Image,
  HStack,
  Text,
  Badge,
  VStack,
  Flex,
  Spacer,
  Link,
  Icon,
  Divider,
  LinkBox,
  LinkOverlay,
  Heading,
  Box,
  Wrap,
  WrapItem,
} from '@chakra-ui/react';
import { ExternalLinkIcon } from '@chakra-ui/icons';
import {
  MapPin,
  Globe,
  GithubLogo,
  LinkedinLogo,
  DribbbleLogo,
} from 'phosphor-react';
import { useQuery, useApolloClient, gql } from '@apollo/client';
import { GET_GITHUB_REPOS } from '../../graphql';
import { Loading } from '../../components/Loading';
import { NotFound } from '../NotFound';

export const Profile = props => {
  const { userId } = props.match.params;
  const [githubRepos, setGithubRepos] = useState([]);

  const client = useApolloClient();
  const { data, loading, error } = useQuery(GET_PROFILE, {
    variables: { userId },
    skip: !userId,
    fetchPolicy: 'no-cache',
  });

  const profile = data ? data.getProfile.profile : null;

  useEffect(() => {
    async function fetchData() {
      if (!loading && !error) {
        if (
          data.getProfile.profile.links &&
          data.getProfile.profile.links.github
        ) {
          const username = data.getProfile.profile.links.github.split(
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
  }, [client, data, loading, error]);

  if (loading) {
    return <Loading />;
  }

  if (error || !userId) {
    return <NotFound />;
  }

  return (
    <Box maxW="container.xl" px={10} pt={2} mx="auto">
      <HStack spacing={10} alignItems="flex-start" mt={4}>
        <Image boxSize="200px" src={profile.user.avatar} />
        <VStack alignItems="start" w="full" justify="center">
          <Text fontSize="5xl">{profile.user.name}</Text>
          <Wrap>
            {profile.skills.map(skill => (
              <WrapItem key={skill}>
                <Badge>{skill}</Badge>
              </WrapItem>
            ))}
          </Wrap>
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
                {profile.links && profile.links.website && (
                  <Link href={profile.links.website} isExternal>
                    <Icon as={Globe} /> Website/Blog{' '}
                    <ExternalLinkIcon mx="2px" />
                  </Link>
                )}
                {profile.links && profile.links.github && (
                  <Link href={profile.links.github} isExternal>
                    <Icon as={GithubLogo} weight="fill" /> GitHub{' '}
                    <ExternalLinkIcon mx="2px" />
                  </Link>
                )}
                {profile.links && profile.links.linkedin && (
                  <Link href={profile.links.linkedin} isExternal>
                    <Icon as={LinkedinLogo} weight="fill" /> LinkedIn{' '}
                    <ExternalLinkIcon mx="2px" />
                  </Link>
                )}
                {profile.links && profile.links.dribble && (
                  <Link href={profile.links.dribble} isExternal>
                    <Icon as={DribbbleLogo} weight="fill" /> Dribbble{' '}
                    <ExternalLinkIcon mx="2px" />
                  </Link>
                )}
              </HStack>
            )}

          {profile.experience.length > 0 && (
            <>
              <Text fontSize="4xl">Expierience</Text>
              <Divider />
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
                </Box>
              ))}
            </>
          )}
          {profile.education.length > 0 && (
            <>
              <Text fontSize="4xl">Education</Text>
              <Divider />
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
                    <LinkOverlay isExternal href={repo.url}>
                      {repo.name}
                    </LinkOverlay>
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
    </Box>
  );
};

const GET_PROFILE = gql`
  query getProfile($userId: String!) {
    getProfile(userId: $userId) {
      profile {
        user {
          id
          name
          avatar
        }
        bio
        location
        skills
        projects {
          title
        }
        experience {
          id
          title
          company
          location
          from
          to
        }
        education {
          id
          school
          degree
          from
          to
        }
        links {
          website
          github
          linkedin
          dribble
        }
      }
    }
  }
`;
