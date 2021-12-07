import React, { useState } from "react"; //import React Component
import 'firebase/auth';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';

export function SignUpPage() {


    // Need to allow user to sign up, log in, log out

    firebase.auth().createUserWithEmailAndPassword(email, password)
    .then((userCredentials) => {
        let user = userCredentials.user; //access the newly created user
        console.log('User created: '+user.uid);
    }).then((firebaseUser) => {
        firebaseUser.updateProfie({
            displayName: username,
            photoURL: url
        })
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