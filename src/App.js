import React from 'react';
import { ChakraProvider } from '@chakra-ui/react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import theme from './theme';
import { Landing } from './components/pages/Landing';

function App() {
  return (
    <ChakraProvider theme={theme}>
      <Router>
        <Route exact path="/" component={Landing} />
      </Router>
    </ChakraProvider>
  );
}

export default App;
