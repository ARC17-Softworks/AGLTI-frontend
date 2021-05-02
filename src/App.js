import React from 'react';
import { ChakraProvider } from '@chakra-ui/react';
import theme from './theme';
import { Landing } from './components/pages/Landing';
import { AlertProvider } from './context/alerts';

function App() {
  return (
    <ChakraProvider theme={theme}>
      <AlertProvider>
        <Landing />
      </AlertProvider>
    </ChakraProvider>
  );
}

export default App;
