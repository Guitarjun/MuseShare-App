import React, { useState } from "react"; //import React Component
import 'firebase/auth';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';

export function SignUpPage(props) {

    // Need to allow user to sign up, log in, log out
    // This page should double as a sign up page and a login page

    // All of these undefined fields should be set with forms that the user can enter information into
    let email = null;
    let password = null;
    let username = null;
    let photoURL = null;
    let introduction = null;

    firebase.auth().createUserWithEmailAndPassword(email, password)
    .then((userCredentials) => {
        let user = userCredentials.user; //access the newly created user
        console.log('User created: '+user.uid);
    }).then((firebaseUser) => {
        firebaseUser.updateProfie({
            displayName: username,
            photoURL: photoURL
        })
        // Need to add public fields to realtime database and image path to cloud storage
        let userUrl = email.substring(0, email.indexOf("@"));
        // Add introduction, username, userUrl, email to REALTIME DATABASE
        // Add photoUrl to CLOUD STORAGE
        
    })
    .catch((error) => { //report any errors
        console.log(error.message);
    });
    return (
        <body>
            <header className="signup-page"> 
            </header>
        </body>
    );
}