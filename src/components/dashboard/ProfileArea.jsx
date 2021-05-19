import React, { useContext } from 'react';
import { Image } from '@chakra-ui/react';
import { AuthContext } from '../../context/auth';

export const ProfileArea = () => {
  const context = useContext(AuthContext);
  return <Image boxSize="200px" src={context.user.avatar} />;
};
