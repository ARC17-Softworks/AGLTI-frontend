import React from 'react';
import {
  Heading,
  Avatar,
  LinkBox,
  LinkOverlay,
  Center,
  Text,
  Badge,
  useColorModeValue,
  Wrap,
  WrapItem,
} from '@chakra-ui/react';
import { Link as RouterLink } from 'react-router-dom';

export const MemberCard = ({ member }) => {
  return (
    <Center py={6}>
      <LinkBox
        maxW={'320px'}
        w={'full'}
        bg={useColorModeValue('gray.50', 'gray.700')}
        boxShadow={'2xl'}
        rounded={'lg'}
        p={6}
        textAlign={'center'}
      >
        <Avatar size={'xl'} src={member.dev.avatar} mb={4} />
        <LinkOverlay as={RouterLink} isExternal href={`/user/${member.dev.id}`}>
          <Heading fontSize={'2xl'}>{member.dev.name}</Heading>
        </LinkOverlay>
        <Text fontWeight={600} color={'gray.500'} mb={4}>
          {member.title}
        </Text>

        <Wrap>
          {member.skills.map(skill => (
            <WrapItem key={skill}>
              <Badge>{skill}</Badge>
            </WrapItem>
          ))}
        </Wrap>
      </LinkBox>
    </Center>
  );
};
