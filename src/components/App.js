// import logo from './logo.svg';
//import './../App.css';  // Get main css for whole project
import { Route, Switch, Redirect } from 'react-router-dom';
import NavBar from './NavBar';
import { ProfilePage } from './ProfilePage';
import { useState } from 'react';
import ProjectList from './projectsPage/ProjectList';
import { ProjectPage } from './projectsPage/ProjectPage';



function App(props) {

  let userData = props.users;
  let projectsData = props.projects; 

  // State and function for handling genre filter
  const [selectedProjects, setSelectedProjects] = useState(projectsData);

  const applyFilter = function(genre) {
    if (genre == 'All') {
      setSelectedProjects(projectsData);
    } else {
      let newData = projectsData.filter((project) => {
        return project.genre == genre;
      });
      setSelectedProjects(newData);
    }
    console.log(genre);
  }

  return (
    <div className="app">
      <NavBar callback={applyFilter} />
      <Switch>
          <Route exact path="/">
            <ProjectList projects={selectedProjects} />
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
