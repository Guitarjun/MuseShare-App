// import logo from './logo.svg';
import './../App.css';  // Get main css for whole project
import { Route, Switch, Link, Redirect } from 'react-router-dom';
import { NavBar } from './NavBar';
import { SideBar } from './SideBar';
import { ProjectPage } from './Project';
import projects from './../data/projects.json';
import { useState } from 'react';

function App() {
  // need prop for which projects to show based on genre

  // const [footer, setFooter] = useState(false); // For controlling footer width

  return (
    <div>
      <NavBar />
        <Switch>
          <Route exact path="/">
            {/* {setFooter(true)} */}
            <header className="main-page margin-200">
              <div className="container">
                <h1>MuseShare</h1>
                <p className="motto">An open-source music collaboration platform!</p>
              </div>
            </header>
            <SideBar />
            
          </Route>
          <Route path="/projects/:url">
            {/* {setFooter(false)} */}
            <ProjectPage projects={projects}/>
          </Route>
          <Route path="/profile">

          </Route>
          <Redirect to="/" />
      </Switch>
      {/* <footer className={footer ? "margin-200" : ""}> */}
      <footer className="margin-200">
        <div className="container">
            <p><a href="mailto:arj1@uw.edu"><span className="material-icons">email</span> arj1@uw.edu</a></p>
            <p>&copy; Arjun, Rhea, Kyle</p>
        </div>
    </footer>
  </div>

  );
}

export default App;
