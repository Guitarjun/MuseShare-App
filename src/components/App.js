// import logo from './logo.svg';
//import './../App.css';  // Get main css for whole project
import { Route, Switch, Redirect } from 'react-router-dom';
import NavBar from './NavBar';
import { ProfilePage } from './ProfilePage';
import { useState, useEffect } from 'react';
import ProjectList from './projects/ProjectList';
import { ProjectPage } from './projects/ProjectPage';
import { SignUpPage } from './SignUpPage';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';

function App(props) {
  let database = props.database;

  let userData = database.ref('users'); // This refers to the extra user data stored in the realtime database, not the official Firebase user data
  let projectsData = database.ref('projects');   // Project data in realtime database (not including reference to the image and audio file)

  // State and function for handling genre filter
  const [selectedProjects, setSelectedProjects] = useState(projectsData);

  // Current user
  const [currentUser, setCurrentUser] = useState(undefined);

  const applyFilter = function(genre) {
    if (genre == 'All') {
      setSelectedProjects(projectsData);
    } else {
      let newData = projectsData.filter((project) => {
        return project.genre == genre;
      });
      setSelectedProjects(newData);
    }
  }

  // Check if user is logged in
  useEffect(() => {
    let authUnregFunc = firebase.auth().onAuthStateChanged((firebaseUser) => {
      if(firebaseUser){ //firebaseUser defined: is logged in
          console.log('logged in');
          setCurrentUser(firebaseUser); // Set current user if logged in
      }
      else { //firebaseUser undefined: is not logged in
          console.log('logged out');
          setCurrentUser(null);
      }
  });
});

  return (
    <div className="app">
      <NavBar user={currentUser} callback={applyFilter} loggedIn={currentUser}/>
      <Switch>
          <Route exact path="/">
            <ProjectList projects={selectedProjects} />
          </Route>
          <Route path="/projects/:url">
            <ProjectPage projects={projectsData}/>
          </Route>
          <Route path="/profile/:urlUser">
            <ProfilePage users={userData} projects={selectedProjects} />
          </Route>
          <Route path="/signup">
            <SignUpPage />
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
