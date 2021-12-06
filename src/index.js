import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
import { BrowserRouter } from 'react-router-dom';
import "./App.css";
import { initializeApp } from 'firebase/app';

// User and project data
import projectsData from './data/projects.json';
import userData from './data/users.json';



ReactDOM.render(
    <BrowserRouter><App users={userData} projects={projectsData}/></BrowserRouter>,
  document.getElementById('root')
);
