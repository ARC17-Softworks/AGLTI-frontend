import React, { useContext, useEffect, useState } from 'react';
import {
  Flex,
  VStack,
  LinkBox,
  LinkOverlay,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  useToast,
  Text,
  Divider,
  Heading,
  Button,
  Wrap,
  WrapItem,
  Badge,
  Link,
  Spacer,
} from '@chakra-ui/react';
import { ExternalLinkIcon } from '@chakra-ui/icons';
import { Link as RouterLink } from 'react-router-dom';
import { useQuery, NetworkStatus, useMutation, gql } from '@apollo/client';
import { DASHBOARD_QUERY } from '../../graphql';
import { DashboardContext } from '../../context/dashboard';
import { Loading } from '../Loading';

export const OffersArea = () => {
  return <div></div>;
};
