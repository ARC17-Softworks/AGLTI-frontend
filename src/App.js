import React from 'react';
import { ChakraProvider } from '@chakra-ui/react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import theme from './theme';
import { Navbar } from './components/layout/Navbar';
import { Landing } from './pages/Landing';
import { Register } from './pages/Register';
import { ResetPassword } from './pages/ResetPassword';
import { NotFound } from './pages/NotFound';
import { Dashboard } from './pages/LogedIn/Dashboard';

import { AuthProvider } from './context/auth';

function App() {
  return (
    <AuthProvider>
      <ChakraProvider theme={theme}>
        <Router>
          <Navbar />
          <Switch>
            <Route exact path="/">
              <Landing />
            </Route>
            <Route exact path="/register">
              <Register />
            </Route>
            <Route exact path="/resetpassword">
              <ResetPassword />
            </Route>
            <Route exact path="/dashboard">
              <Dashboard />
            </Route>
            <Route>
              <NotFound />
            </Route>
          </Switch>
        </Router>
      </ChakraProvider>
    </AuthProvider>
  );
}

export default App;
