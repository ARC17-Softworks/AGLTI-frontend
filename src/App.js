import React, { Fragment } from 'react';
import HeaderBar from './components/HeaderSection';
import Navbar from './components/Navbar';
import ProjectInfoSection from './components/Project/ProjectInfo';
import ProjectMembersSection from './components/ProjectMembersPage/ProjectMembers';
import ProjectPositionsSection from './components/ProjectPositionsPage/ProjectPositions';
import DiscussionSection from './components/Project/Discussions';
import Kanban from './components/Kanban';
import {BrowserRouter as Router ,Route, Switch} from 'react-router-dom';
import './App.css';

function App() {
  return (
    <div className="App">
      <HeaderBar />  
      <Router>
        <Navbar />
          <Switch>
            <Route exact path='/info' component={ProjectInfoSection}  />
            <Route exact path='/member' component={ProjectMembersSection}  />
            <Route exact path='/position' component={ProjectPositionsSection}  />
            <Route exact path='/kanban' component={Kanban}  />
            <Route exact path='/disccussion' component={DiscussionSection}  />
          </Switch>
      </Router>
    </div>
  );
}

export default App;
