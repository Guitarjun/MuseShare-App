// import logo from './logo.svg';
//import './../App.css';  // Get main css for whole project
import { Route, Switch, Link, Redirect } from 'react-router-dom';
import NavBar from './NavBar';
import { ProfilePage } from './ProfilePage';
import { useState } from 'react';
import ProjectsPanel from './projectsPage/ProjectsPanel';
import { ProjectPage } from './projectsPage/ProjectPage';

// User and project data
import projectsData from './../data/projects.json';
import userData from './../data/users.json';

function App() {
  const [selectedProjects, setSelectedProjects] = useState(projectsData);

  console.log(selectedProjects);
  // need prop for which projects to show based on genre

  return (
    <div className="app">
      <NavBar />
      <Switch>
          <Route exact path="/">
            <ProjectsPanel projects={selectedProjects} />
          </Route>
          <Route path="/projects/:url">
            <ProjectPage projects={projectsData}/>
          </Route>
          <Route path="/profile/:urlUser">
            <ProfilePage users={userData} />
          </Route>
          <Route path="/about">
            
          </Route>
          <Redirect to="/" />
      </Switch>
      
      <footer className="margin-200">
          <p><a href="mailto:arj1@uw.edu"><span className="material-icons">email</span> arj1@uw.edu</a></p>
          <p>&copy; Arjun, Rhea, Kyle</p>
      </footer>
    </div>
  );
}

export default App;
