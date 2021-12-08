import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
import { BrowserRouter } from 'react-router-dom';
import "./App.css";
import firebase from "firebase/compat/app";

// User and project data
import projectsData from './data/projects.json';
import userData from './data/users.json';

// Firebase MusheShare app credentials
const firebaseConfig = {
  apiKey: "AIzaSyCpC441zDhyzmLRQst5scMgsRtRXz1CHZ0",
  authDomain: "museshare-5e6ed.firebaseapp.com",
  databaseURL: "https://museshare-5e6ed-default-rtdb.firebaseio.com",
  projectId: "museshare-5e6ed",
  storageBucket: "museshare-5e6ed.appspot.com",
  messagingSenderId: "446196761869",
  appId: "1:446196761869:web:719ba043119b5f10241c44",
  measurementId: "G-WKJ5Y4S4F1"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

let database = firebase.database();


ReactDOM.render(
    <BrowserRouter><App database={database}/></BrowserRouter>,
  document.getElementById('root')
);
