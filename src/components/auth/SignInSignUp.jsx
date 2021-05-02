import { Box, Tabs, Tab, TabList, TabPanels, TabPanel } from '@chakra-ui/react';
import * as React from 'react';
import { LoginForm } from './LoginForm';
import { RegisterForm } from './RegisterForm';
import { ForgotPasswordForm } from './ForgotPasswordForm';

export const SignInSignUp = props => (
  <Box minW="lg" overflow="hidden" padding="3" h="70vh">
    <Tabs defaultIndex={0}>
      <TabList>
        <Tab>Register</Tab>
        <Tab>Log In</Tab>
        <Tab>Forgot Password</Tab>
      </TabList>
      <TabPanels>
        <TabPanel>
          <RegisterForm />
        </TabPanel>
        <TabPanel>
          <LoginForm />
        </TabPanel>
        <TabPanel>
          <ForgotPasswordForm />
        </TabPanel>
      </TabPanels>
    </Tabs>
  </Box>
);
