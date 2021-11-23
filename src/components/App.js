// import logo from './logo.svg';
import './../App.css';  // Get main css for whole project
import { Route, Switch, Link, Redirect } from 'react-router-dom';
import { NavBar } from './NavBar';
import { SideBar } from './SideBar';
import { ProjectPage } from './Project';

function App() {
  // need prop for which projects to show based on genre
  
  return (
    <div>
      <NavBar />
        <Switch>
          <Route exact path="/">
            <header className="main-page margin-200">
              <div className="container">
                <h1>MuseShare</h1>
                <p className="motto">An open-source music collaboration platform!</p>
              </div>
            </header>
            <SideBar />
          </Route>
          <Route path="/projects/:name">
            <ProjectPage />  
          </Route>
          <Redirect to="/" />
      </Switch>
  </div>

  );
}

export default App;
