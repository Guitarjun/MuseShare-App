// import logo from './logo.svg';
//import './../App.css';  // Get main css for whole project
import { Route, Switch, Link, Redirect } from 'react-router-dom';
import Navbar from './Navbar';
import FilterDropdown from './FilterDropdown';
import ProjectsPanel from './projectsPage/ProjectsPanel';
import projectsData from './../data/projects.json';
import { useState } from 'react';

function App() {
  const [selectedProjects, setselectedProjects] = useState(projectsData);

  console.log(selectedProjects);
  // need prop for which projects to show based on genre

  // const [footer, setFooter] = useState(false); // For controlling footer width

  return (
    <div className="app">
      <Navbar />
      <ProjectsPanel projects={selectedProjects} />
      <footer className="margin-200">
          <p><a href="mailto:arj1@uw.edu"><span className="material-icons">email</span> arj1@uw.edu</a></p>
          <p>&copy; Arjun, Rhea, Kyle</p>
      </footer>
    </div>
  );
}

export default App;
