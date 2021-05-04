import React, { Fragment, useState } from 'react';
import ApolloClient from 'apollo-boost';
import { ApolloProvider} from 'react-apollo';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import HeaderBar from './components/HeaderSection';
import Navbar from './components/Navbar';
import ProjectInfoSection from './components/Project/ProjectInfo';
import ProjectMembersSection from './components/ProjectMembersPage/ProjectMembers';
import ProjectPositionsSection from './components/ProjectPositionsPage/ProjectPositions';
import DiscussionSection from './components/DiscussionPage/Discussions';
import Kanban from './components/Kanban';
import {BrowserRouter as Router ,Route, Switch} from 'react-router-dom';
import useToken from './useToken';
import './App.css';

const client = new ApolloClient({
  uri: 'http://localhost:5000/graphql',
  onError: (e) => { console.log(e) },
});

function App() {
  const { token, setToken } = useToken();

  if(!token) {
    return <Login setToken={setToken} />
  }

  return (
    <ApolloProvider client={client}>
    <div className="wrapper">
      
      {/* <HeaderBar />  
      <Router>
        <Navbar />
          <Switch>
            <Route exact path='/info' component={ProjectInfoSection}  />
            <Route exact path='/member' component={ProjectMembersSection}  />
            <Route exact path='/position' component={ProjectPositionsSection}  />
            <Route exact path='/kanban' component={Kanban}  />
            <Route exact path='/disccussion' component={DiscussionSection}  />
          </Switch>
      </Router> */}
    </div>
    </ApolloProvider>
  );
}

export default App;
