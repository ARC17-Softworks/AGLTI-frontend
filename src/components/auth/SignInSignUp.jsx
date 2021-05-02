import {
  Box,
  Tabs,
  Tab,
  TabList,
  TabPanels,
  TabPanel,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  useDisclosure,
  VStack,
} from '@chakra-ui/react';
import { CheckCircleIcon } from '@chakra-ui/icons';
import React, { useState } from 'react';
import { LoginForm } from './LoginForm';
import { RegisterForm } from './RegisterForm';
import { ForgotPasswordForm } from './ForgotPasswordForm';

export const SignInSignUp = props => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [modalValues, setModalValues] = useState({});
  return (
    <Box minW="lg" overflow="hidden" padding="3" h="70vh">
      {Object.keys(modalValues).length > 0 && (
        <Modal
          isOpen={isOpen}
          onClose={onClose}
          size="3xl"
          isCentered
          closeOnOverlayClick={false}
        >
          <ModalOverlay />
          <ModalContent>
            <VStack align="center">
              <CheckCircleIcon w={10} h={10} marginTop={6} />
              <ModalHeader>{modalValues.title}</ModalHeader>
            </VStack>
            <ModalCloseButton />
            <ModalBody>{modalValues.body}</ModalBody>
            <ModalFooter></ModalFooter>
          </ModalContent>
        </Modal>
      )}
      <Tabs defaultIndex={0}>
        <TabList>
          <Tab>Register</Tab>
          <Tab>Log In</Tab>
          <Tab>Forgot Password</Tab>
        </TabList>
        <TabPanels>
          <TabPanel>
            <RegisterForm setModalValues={setModalValues} onOpen={onOpen} />
          </TabPanel>
          <TabPanel>
            <LoginForm setModalValues={setModalValues} />
          </TabPanel>
          <TabPanel>
            <ForgotPasswordForm setModalValues={setModalValues} />
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Box>
  );
};
