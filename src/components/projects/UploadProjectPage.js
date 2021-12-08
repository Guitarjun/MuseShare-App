import React from 'react';
import { Redirect } from 'react-router';
import { database } from "..";
import { storage } from "..";

function UploadProjectPage(props) {
    let currentUser = props.currentUser;
    // If user is not logged in, redirect them to login/signup page (DO NOT MODIFY)
    if (!currentUser) {
        return <Redirect to='/signup' />
    }

    // React UI stuff...

    


    // All of these fields should be set according to the user input into the UI (DON'T CHANGE THESE FIELD NAMES) 
    let genre = null;   // THIS ONE NEEDS TO BE SET WITH A DROPDOWN MENU SO THE USER IS ONLY CHOOSING GENRES WE SUPPORT WITH OUR GENRE FILTER
    let name = null;
    let description = null;
    let photoFile = null; // file object
    let audioFile = null; // file object

    // MODIFY ABOVE FOR REACT STRUCTURE/UI, DO NOT MODIFY BELOW!

    // Need to get user information
    let userId = null;

    // Non-user-inputted fields
    let audioFilePath = 'projects/' + userId + 'audio' + audioFile;
    let photoFilePath = 'projects/' + userId + '/image/' + photoFile;
    

    

    // MODIFY BELOW FOR REACT STRUCTURE/UI
    return ({
        null
    });
}

// Write project metadata to realtime database
function writeProjectData() {

}

// Write project audio file and image to cloud storage
function writeProjectStorage() {

}

export default UploadProjectPage;
