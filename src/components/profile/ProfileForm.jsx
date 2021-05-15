import React, { useState } from 'react';
import { useToast } from '@chakra-ui/react';
import MultiSelect from '../form/MultiSelect';
import { skillsList } from '../../data/skillsList';

export const ProfileForm = props => {
  const [values, setValues] = useState({
    skills: [],
    localtion: '',
    bio: '',
    website: '',
    github: '',
    linkedIn: '',
    dribble: '',
  });

  const multiSelectOnchange = value => {
    setValues({ ...values, skills: value.map(v => v.value) });
    console.log(values);
  };

  const onChange = e => {
    e.preventDefault();
    setValues({ ...values, [e.target.name]: e.target.value });
  };
  return (
    <chakra.form /*onSubmit={onSubmit}*/ {...props}>
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
            value={values.skills}
          />
        </FormControl>
        <FormControl id="location">
          <FormLabel>Location</FormLabel>
          <Input
            name="location"
            type="text"
            value={values.localtion}
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
              value={values.linkedIn}
              onChange={onChange}
            />
          </InputGroup>
          <InputGroup marginTop="2">
            <InputLeftAddon children="dribbble.com/" />
            <Input
              name="dribbble"
              type="text"
              value={values.email}
              onChange={onChange}
            />
          </InputGroup>
        </FormControl>
        <Button
          type="submit"
          colorScheme="green"
          size="lg"
          fontSize="md"
          //   isLoading={loading}
          loadingText="Submitting"
          spinnerPlacement="end"
        >
          Register
        </Button>
      </Stack>
    </chakra.form>
  );
};
