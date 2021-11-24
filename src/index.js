import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
import { BrowserRouter } from 'react-router-dom';
import "./App.css";
import firebase from 'firebase/app';


ReactDOM.render(
    <BrowserRouter><App /></BrowserRouter>,
  document.getElementById('root')
);

