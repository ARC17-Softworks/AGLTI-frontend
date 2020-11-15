import React from 'react';
import HeaderBar from './components/HeaderSection';
import Navbar from './components/Navbar';
import ProjectInfoSection from './components/Project/ProjectInfo';
import ProjectPositionsSection from './components/Project/ProjectPositions';
import './App.css';

function App() {
  return (
    <div className="App">
      <ProjectPositionsSection />
    </div>
  );
}

export default App;
