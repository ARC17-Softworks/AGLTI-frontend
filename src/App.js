import React from 'react';
import { ChakraProvider } from '@chakra-ui/react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import theme from './theme';
import { Landing } from './pages/Landing';
import { Register } from './pages/Register';
import { ResetPassword } from './pages/ResetPassword';
import { NotFound } from './pages/NotFound';

function App() {
  return (
    <ChakraProvider theme={theme}>
      <Router>
        <Route exact path="/" component={Landing} />
        <Route exact path="/register" component={Register} />
        <Route exact path="/resetpassword" component={ResetPassword} />
        <Route exact path="/notfound" component={NotFound} />
      </Router>
    </ChakraProvider>
  );
}

export default App;
