import React from 'react';
import { ChakraProvider } from '@chakra-ui/react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import theme from './theme';
import { UnAuthenticatedRoute, AuthenticatedRoute } from './utils/Routes';
import { Navbar } from './components/layout/Navbar';
import { Landing } from './pages/Landing';
import { Register } from './pages/Register';
import { ResetPassword } from './pages/ResetPassword';
import { NotFound } from './pages/NotFound';
import { Dashboard } from './pages/LogedIn/Dashboard';

import { AuthProvider } from './context/auth';
import { CreateProfile } from './pages/LogedIn/CreateProfile';
import { ChangePassword } from './pages/LogedIn/ChangePassword';

function App() {
  return (
    <AuthProvider>
      <ChakraProvider theme={theme}>
        <Router>
          <Navbar />
          <Switch>
            <UnAuthenticatedRoute exact path="/" component={Landing} />
            <UnAuthenticatedRoute exact path="/register" component={Register} />
            <UnAuthenticatedRoute
              exact
              path="/resetpassword"
              component={ResetPassword}
            />
            <AuthenticatedRoute exact path="/dashboard" component={Dashboard} />
            <AuthenticatedRoute
              exact
              path="/createprofile"
              component={CreateProfile}
            />
            <AuthenticatedRoute
              exact
              path="/user/changepassword"
              component={ChangePassword}
            />
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
