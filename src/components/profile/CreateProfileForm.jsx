import React, { useState, useContext } from 'react';
import {
  Button,
  chakra,
  FormControl,
  FormLabel,
  Input,
  Stack,
  Heading,
  useToast,
  Textarea,
  InputGroup,
  InputLeftAddon,
} from '@chakra-ui/react';
import MultiSelect from '../form/MultiSelect';
import { skillsList } from '../../data/skillsList';
import { useMutation, gql } from '@apollo/client';
import { AuthContext } from '../../context/auth';

export const CreateProfileForm = props => {
  const context = useContext(AuthContext);
  const [values, setValues] = useState({
    skills: [],
  });

  const toast = useToast();

  const [createProfile, { loading }] = useMutation(CREATE_PROFILE, {
    update(proxy, result) {
      context.setProfile({
        skills: result.data.setProfile.profile.skills,
        activeProject: result.data.setProfile.profile.activeProject
          ? result.data.setProfile.profile.activeProject.title
          : result.data.setProfile.profile.activeProject,
      });
    },
    variables: values,
    onError(err) {
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

  const multiSelectOnchange = value => {
    setValues({ ...values, skills: value.map(v => v.label) });
  };

  const onChange = e => {
    e.preventDefault();
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const onSubmit = e => {
    if (values.github) values.github = `github.com/${values.github}`;
    if (values.linkedin) values.linkedin = `linkedin.com/in/${values.linkedin}`;
    if (values.dribble) values.dribble = `dribbble.com/${values.dribble}`;
    e.preventDefault();
    createProfile();
  };

  return (
    <chakra.form onSubmit={onSubmit} {...props}>
      <Stack spacing="6">
        <Heading textAlign="center" size="xl" fontWeight="extrabold">
          Create Profile
        </Heading>
        <FormControl id="skills" isRequired>
          <FormLabel>Skills</FormLabel>
          <MultiSelect
            name="skills"
            options={skillsList}
            isMulti
            placeholder="Select your skills"
            closeMenuOnSelect={false}
            onChange={multiSelectOnchange}
          />
        </FormControl>
        <FormControl id="location">
          <FormLabel>Location</FormLabel>
          <Input
            name="location"
            type="text"
            value={values.location}
            onChange={onChange}
          />
        </FormControl>
        <FormControl id="bio">
          <FormLabel>Bio</FormLabel>
          <Textarea name="bio" value={values.bio} onChange={onChange} />
        </FormControl>
        <FormControl id="links">
          <FormLabel>Links</FormLabel>
          <Input
            name="website"
            type="text"
            placeholder="your website"
            value={values.website}
            onChange={onChange}
          />
          <InputGroup marginTop="2">
            <InputLeftAddon children="github.com/" />
            <Input
              name="github"
              type="text"
              value={values.github}
              onChange={onChange}
            />
          </InputGroup>
          <InputGroup marginTop="2">
            <InputLeftAddon children="linkedin.com/in/" />
            <Input
              name="linkedin"
              type="text"
              value={values.linkedin}
              onChange={onChange}
            />
          </InputGroup>
          <InputGroup marginTop="2">
            <InputLeftAddon children="dribbble.com/" />
            <Input
              name="dribble"
              type="text"
              value={values.dribble}
              onChange={onChange}
            />
          </InputGroup>
        </FormControl>
        <Button
          type="submit"
          colorScheme="green"
          size="lg"
          fontSize="md"
          isLoading={loading}
          loadingText="Submitting"
          spinnerPlacement="end"
        >
          Register
        </Button>
      </Stack>
    </chakra.form>
  );
};

const CREATE_PROFILE = gql`
  mutation setProfile(
    $name: String
    $bio: String
    $location: String
    $skills: [String!]!
    $website: String
    $github: String
    $linkedIn: String
    $dribble: String
  ) {
    setProfile(
      input: {
        name: $name
        bio: $bio
        location: $location
        skills: $skills
        links: {
          website: $website
          github: $github
          linkedin: $linkedIn
          dribble: $dribble
        }
      }
    ) {
      profile {
        skills
        activeProject {
          title
        }
      }
    }
  }
`;
