import React, { useState } from "react"; //import React Component
import 'firebase/auth';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import { database } from "..";
import { storage } from "..";

export function SignUpPage(props) {

    // This page will double as a sign up and a login page
    // Something like ("Sign up [sign up logic and forms]! Already have an account? Login instead... [login logic and forms]")
    // TODO: All the UI, Add sign up page itself, add login page and login firebase logic. All database handling is complete :)
        // Add loading spinners to UI

    // React UI stuff to retrieve the below fields...
    // Make sure to use form validation (homework 6 problem b for reference)




    // All of these  fields should be set according to the user input into the UI (DON'T CHANGE THESE FIELD NAMES)
    let email = null; 
    let password = null;
    let displayName = null; // Username
    let about = null;    // About user
    let photoFile = null; // Profile picture file

    // MODIFY ABOVE FOR REACT STRUCTURE/UI, DO NOT MODIFY BELOW!



    // Non-user-inputted fields
    let userId = email.substring(0, email.indexOf("@"));   // User key
    let photoURL = 'users/'+userId+'/profilePicture/'+photoFile;    // The purpose of this field is to store a reference in the realtime database to the image file (which exists in the cloud storage)

    // For sign up
    firebase.auth().createUserWithEmailAndPassword(email, password)
    .then((userCredentials) => {
        let user = userCredentials.user; //access the newly created user and set fields
        user.updateProfile({
            displayName: displayName,
            photoURL: photoURL
        })
        console.log('User created: '+user.uid);
    }).then(() => { 
        writeUserData(email, userId, photoURL, displayName, about);
        writeUserStorage(photoFile, photoURL);
    })
    .catch((error) => { //report any errors
        console.log(error.message);
    });

    // For login
    // ...


    // MODIFY BELOW FOR REACT STRUCTURE/UI
    return (
        <body>
            <header className="signup-page"> 
            {/* TODO: Entire UI for both sign up and login options*/}
            Sign up page
            </header>
        </body>
    );
}

// Write user data for realtime database
function writeUserData(email, userId, photoUrl, name, about) {
    database.ref('users/'+userId).set({
        displayName: name,
        email: email,
        imagePath: photoUrl,
        introduction: about,
    });
}

// Write user data for cloud storage
function writeUserStorage(file, photoURL) {
    // Set to photoUrl
}