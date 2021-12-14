// import logo from './logo.svg';
//import './../App.css';  // Get main css for whole project
import { Route, Switch, Redirect } from 'react-router-dom';
import NavBar from './NavBar';
import { ProfilePage } from './ProfilePage';
import { useState, useEffect } from 'react';
import ProjectList from './projects/ProjectList';
import { ProjectPage } from './projects/ProjectPage';
import SignUpPage from './SignUpPage';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import UploadProjectPage from './projects/UploadProjectPage';
import { database } from '..';
import { AuthProvider } from '../contexts/AuthContext';
import LogInPage from './LogInPage';
import PrivateRoute from './PrivateRoute';
import Dashboard from './Dashboard';
import {Link} from "react-router-dom";
import Citations from "./Citations";

// CURRENT SCHEMA USERS/PROJECTS IS NOT EFFICIENT FOR FINDING PROJECTS, NEED TO OPTIMIZE
// Add pagination
// Need to store different versions of projects
// Need to update security
// TODO: comment feature/data structure definitions (add flag), user delete their own account, remove all refs in Cloud Storage
function App(props) {

  const [userData, setUserData] = useState([]);
  const [projectsData, setProjectsData] = useState([]);

  // State and function for handling genre filter
  const [selectedProjects, setSelectedProjects] = useState([]);

  // Current user
  const [currentUser, setCurrentUser] = useState(undefined);
  const [userId, setUserId] = useState(null);

  // Get project data and update state
  useEffect(() => {
    let projectsRef = database.ref('projects/');
    projectsRef.on('value', (snapshot) => {
    const data = snapshot.val();
    setProjectsData(data);
    setSelectedProjects(data);
    });
    return (() => {projectsRef.off()});
  }, []);

  // Get user data and update state
  useEffect(() => {
    let userRef = database.ref('users/');
    userRef.on('value', (snapshot) => {
    const data = snapshot.val();
    setUserData(data);
    });
    return (() => {userRef.off()});
  }, []);

  const applyFilter = (genre) => {
    if (genre === 'All') {
      setSelectedProjects(projectsData);
    } else {
      let newData = {};
      for (let userId in projectsData) {
        let artistProjects = projectsData[String(userId)];
        newData[String(userId)] = {};
        for (let projectId in artistProjects) {
            let project = artistProjects[String(projectId)];
            if (genre === project['genre']) {
              newData[String(userId)][projectId] = project; // Need this to append
            }
        }
      }
      setSelectedProjects(newData);
    }
  }

  const resetFilter = () => {
    setSelectedProjects(projectsData);
  }

  // Check if user is logged in
  useEffect(() => {
    let authUnregFunc = firebase.auth().onAuthStateChanged((firebaseUser) => {
      if(firebaseUser){ //firebaseUser defined: is logged in
          // console.log('logged in');
          setCurrentUser(firebaseUser); // Set current user if logged in
          let email = firebaseUser.email;
          setUserId(email.substring(0, email.indexOf("@")));
      }
      else { //firebaseUser undefined: is not logged in
          // console.log('logged out');
          setCurrentUser(null);
          setUserId(null);
      }
    });
    return authUnregFunc;
  });

  return (
    <div className="app">
      <main>
        <AuthProvider>
          <NavBar currentUser={currentUser} userId={userId} callback={applyFilter} resetFilter={resetFilter} />
          <Switch>
              <Route exact path="/">
                <ProjectList projects={selectedProjects} />
              </Route>
              <Route path="/projects/:userId/:projectId">
                <ProjectPage projects={projectsData} currentUser={currentUser} userId={userId}/>
              </Route>
              <Route path="/profile/:urlUser">
                <ProfilePage projectsData={selectedProjects} userData={userData} currentUser={currentUser} userId={userId}/>
              </Route>
              <PrivateRoute exact path="/dashboard/:userId"> 
                <Dashboard projectsData={selectedProjects} userData={userData} userId={userId} />
              </PrivateRoute>
              <Route exact path="/signup">
                <SignUpPage />
              </Route>
              <Route exact path="/citations">
                <Citations />
              </Route>
              <Route exact path="/login">
                <LogInPage />
              </Route>
              <Route path="/upload">
                <UploadProjectPage currentUser={currentUser} userId={userId}/>
              </Route>
              <Redirect to="/" />
          </Switch>
        </AuthProvider>
      </main>
      <footer>
          <p><a href="mailto:arj1@uw.edu"><span className="material-icons">email</span> arj1@uw.edu</a></p>
          <p>&copy; Arjun, Rhea, Kyle</p>
          <p><Link to="/Citations">Media Citations</Link></p>
      </footer>
    </div>
  );
}

export default App;
