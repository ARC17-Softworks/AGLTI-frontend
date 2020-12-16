import React, { Fragment } from 'react';
import HeaderBar from './components/HeaderSection';
import Navbar from './components/Navbar';
import ProjectInfoSection from './components/Project/ProjectInfo';
import ProjectMembersSection from './components/Project/ProjectMembers';
import ProjectPositionsSection from './components/Project/ProjectPositions';
import DiscussionSection from './components/Project/Discussions';
import Kanban from './components/Kanban';
import './App.css';

function App() {
  return (
    <div className="App">
      <HeaderBar />
      <Navbar />
      <ProjectMembersSection />
    </div>
  );
}

export default App;
