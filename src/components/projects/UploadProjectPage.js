import React from 'react';
import { Redirect } from 'react-router';
import { database } from "../..";
import { storage } from "../..";

function UploadProjectPage(props) {
    let currentUser = props.currentUser;
    let userId = props.userId;
    // If user is not logged in, redirect them to login/signup page (DO NOT MODIFY)
    if (!currentUser) {
        return <Redirect to='/signup' />
    }

    // React UI stuff to retrieve the below fields...
    // Make sure to use form validation (homework 6 problem b for reference)
    
    // All of these fields should be set according to the user input into the UI (DON'T CHANGE THESE FIELD NAMES) 
    let genre = null;   // THIS ONE NEEDS TO BE SET WITH A DROPDOWN MENU (not a text input) SO THE USER IS ONLY CHOOSING GENRES WE SUPPORT WITH OUR GENRE FILTER
    let name = null;    // name of project
    let description = null; // project description
    let photoFile = null; // project's cover image (must be a File type)
    let audioFile = null; // project's audio file (must be a File type)

    // Non-user-inputted fields
    let projectId = (userId + '-' + name.replace(/\s/g, '')).toLowerCase();   // Project key
    let audioFilePath = 'projects/' + projectId + '/audio/' + audioFile.name;
    let photoFilePath = 'projects/' + projectId + '/image/' + photoFile.name;

    // THIS SHOULD BE MOVED INTO AN EVENT LISTENER when the user click's "submit"
    writeProjectData(userId, projectId, name, genre, description, audioFilePath, photoFilePath);
    writeProjectStorage(photoFile, audioFile, photoFilePath, audioFilePath);
    

    // MODIFY BELOW FOR REACT STRUCTURE/UI
    return (
        <div>
           
        </div>
    );
}

// Write project metadata to realtime database
function writeProjectData(userId, projectId, name, genre, description, audioFilePath, photoFilePath) {
    database.ref('projects/'+projectId).set({
        name: name,
        genre: genre,
        description: description,
        audioFilePath: audioFilePath,
        imagePath: photoFilePath
    });
}

// Write project audio file and image to cloud storage
function writeProjectStorage(photoFile, audioFile, photoFilePath, audioFilePath) {
    let photoUploadTask = storage.ref().child(photoFilePath).put(photoFile);
    // Listen for state changes, errors, and completion of the upload.
    photoUploadTask.on(storage.TaskEvent.STATE_CHANGED, // or 'state_changed'
    (snapshot) => {
    // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
    var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
    console.log('Upload is ' + progress + '% done');
    switch (snapshot.state) {
        case storage.TaskState.PAUSED: // or 'paused'
        console.log('Upload is paused');
        break;
        case storage.TaskState.RUNNING: // or 'running'
        console.log('Upload is running');
        break;
        default:
            
    }
    }, 
    (error) => {
    // A full list of error codes is available at
    // https://firebase.google.com/docs/storage/web/handle-errors
    switch (error.code) {
        case 'storage/unauthorized':
        // User doesn't have permission to access the object
        break;
        case 'storage/canceled':
        // User canceled the upload
        break;

        case 'storage/unknown':
        // Unknown error occurred, inspect error.serverResponse
        break;
        default:
    }
    }, 
    () => {
    // Upload completed successfully, now we can get the download URL
    photoUploadTask.snapshot.ref.getDownloadURL().then((downloadURL) => {
        console.log('File available at', downloadURL);
    });
    }
    );

    let audioUploadTask = storage.ref().child(audioFilePath).put(audioFile);
    Audio.on(storage.TaskEvent.STATE_CHANGED, // or 'state_changed'
    (snapshot) => {
    // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
    var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
    console.log('Upload is ' + progress + '% done');
    switch (snapshot.state) {
        case storage.TaskState.PAUSED: // or 'paused'
        console.log('Upload is paused');
        break;
        case storage.TaskState.RUNNING: // or 'running'
        console.log('Upload is running');
        break;
        default:
            
    }
    }, 
    (error) => {
    // A full list of error codes is available at
    // https://firebase.google.com/docs/storage/web/handle-errors
    switch (error.code) {
        case 'storage/unauthorized':
        // User doesn't have permission to access the object
        break;
        case 'storage/canceled':
        // User canceled the upload
        break;

        case 'storage/unknown':
        // Unknown error occurred, inspect error.serverResponse
        break;
        default:
    }
    }, 
    () => {
    // Upload completed successfully, now we can get the download URL
    audioUploadTask.snapshot.ref.getDownloadURL().then((downloadURL) => {
        console.log('File available at', downloadURL);
    });
    }
    );
}

export default UploadProjectPage;
