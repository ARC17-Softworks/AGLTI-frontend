import React from 'react';
import { ChakraProvider } from '@chakra-ui/react';
import theme from './theme';
import { Landing } from './components/pages/Landing';

function App() {
  return (
    <ChakraProvider theme={theme}>
      <Landing />
    </ChakraProvider>
  );
}

export default App;
