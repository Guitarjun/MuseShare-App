import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
import { BrowserRouter } from 'react-router-dom';
import firebase from 'firebase/app';


ReactDOM.render(
    <BrowserRouter><App /></BrowserRouter>,
  document.getElementById('root')
);

