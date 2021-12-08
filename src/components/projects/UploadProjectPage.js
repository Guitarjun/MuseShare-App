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

    // React UI stuff to retrieve the below fields...

    


    // All of these fields should be set according to the user input into the UI (DON'T CHANGE THESE FIELD NAMES) 
    let genre = null;   // THIS ONE NEEDS TO BE SET WITH A DROPDOWN MENU (not a text input) SO THE USER IS ONLY CHOOSING GENRES WE SUPPORT WITH OUR GENRE FILTER
    let name = null;    // name of project
    let description = null; // project description
    let photoFile = null; // project's cover image
    let audioFile = null; // project's audio file

    // MODIFY ABOVE FOR REACT STRUCTURE/UI, DO NOT MODIFY BELOW!

    // Need to get user information
    let userId = null;

    // Non-user-inputted fields
    let audioFilePath = 'projects/' + userId + '/audio/' + audioFile;
    let photoFilePath = 'projects/' + userId + '/image/' + photoFile;
    let projectId = (userId + '-' + name.replace(/\s/g, '')).toLowerCase();   // Project key

    writeProjectData(userId, projectId, name, genre, description, audioFilePath, photoFilePath);
    

    // MODIFY BELOW FOR REACT STRUCTURE/UI
    return (
        <div>
           
        </div>
    );
}

// Write project metadata to realtime database
function writeProjectData(userId, projectId, name, genre, description, audioFilePath, photoFilePath) {
    database.ref('projects/'+userId+'/'+projectId).set({
        name: name,
        genre: genre,
        description: description,
        audioFilePath: audioFilePath,
        imagePath: photoFilePath
    });
}

// Write project audio file and image to cloud storage
function writeProjectStorage(photoFile, audioFile, photoFilePath, audioFilePath) {
    
}

export default UploadProjectPage;
