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
import UploadProjectPage from './projects/UploadProjectPage';

function App(props) {
  let database = props.database;
  let storage = props.storage;

  let userData = database.ref('users/'); // User data stored in the realtime database, not the official Firebase user data
  let userStorage = storage.ref('users/'); // User data in cloud storage (profile image)
  let projectsData = database.ref('projects/');   // Project data in realtime database (not including reference to the image and audio file)
  let projectsStorage = storage.ref('projects/'); // Project data in cloud storage (audio file and image)

  // State and function for handling genre filter
  const [selectedProjects, setSelectedProjects] = useState(projectsData);

  // Current user
  const [currentUser, setCurrentUser] = useState(undefined);

  const applyFilter = function(genre) {
    if (genre == 'All') {
      setSelectedProjects(projectsData);
    } else {
      // THIS LOGIC NEEDS TO CHANGE NOW THAT WE ARE USING FIREBASE
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
      <NavBar user={currentUser} callback={applyFilter}/>
      <Switch>
          <Route exact path="/">
            <ProjectList projects={selectedProjects} projectsData={projectsData} projectsStorage={projectsStorage}/>
          </Route>
          <Route path="/projects/:url">
            <ProjectPage projects={projectsData}/>
          </Route>
          <Route path="/profile/:urlUser">
            <ProfilePage userData={userData} userStorage={userStorage} projectsData={selectedProjects} user={currentUser}/>
          </Route>
          <Route path="/login">
            <SignUpPage />
          </Route>
          <Route path="/upload">
            <UploadProjectPage />
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
