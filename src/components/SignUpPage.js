import React, { useState } from "react"; //import React Component
import 'firebase/auth';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';

export function SignUpPage(props) {

    // This page will double as a sign up and a login page
    // Something like ("already have an account? Login instead...")

    // All of these  fields should be set with forms that the user can enter information into (hence what the sign up page is for)
    let email = null;
    let password = null;
    let displayName = null;
    let photoURL = null;
    let introduction = null;

    // For sign up
    firebase.auth().createUserWithEmailAndPassword(email, password)
    .then((userCredentials) => {
        let user = userCredentials.user; //access the newly created user
        console.log('User created: '+user.uid);
    }).then((firebaseUser) => {
        firebaseUser.updateProfie({
            displayName: displayName,
            photoURL: photoURL
        })
        let userUrl = email.substring(0, email.indexOf("@"));
        // Add introduction, displayName, userUrl, email to REALTIME DATABASE
        // Add photoUrl to CLOUD STORAGE
        
    })
    .catch((error) => { //report any errors
        console.log(error.message);
    });

    // For login
    // ...

    return (
        <body>
            <header className="signup-page"> 
            </header>
        </body>
    );
}