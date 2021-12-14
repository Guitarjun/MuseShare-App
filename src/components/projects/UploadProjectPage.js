import React from 'react';
import { Redirect } from 'react-router';
import { database } from "../..";
import { storage } from "../..";
import { Form, Button, Alert } from "react-bootstrap";
import { useState, useRef } from 'react';
import { useHistory } from 'react-router';
import { useAuth } from "../../contexts/AuthContext";
import FilterDropdown from '../FilterDropdown';


function UploadProjectPage(props) {
    let userId = props.userId;
    const { currentUser } = useAuth();
    const imageRef = useRef();
    const audioRef = useRef();
    const projectRef = useRef();
    const descriptionRef = useRef();
    const [error, setError] = useState("");
    const [imageFile, setImageFile] = useState(null);
    const [audioFile, setAudioFile] = useState(null);
    const [loading, setLoading] = useState(false);
    const [selectedGenre, setGenre] = useState('All');
    const history = useHistory();

    // If user is not logged in, redirect them to login/signup page (DO NOT MODIFY)
    if (!currentUser) {
        return <Redirect to='/login'/>
    }

    async function handleSubmit(e) {
        e.preventDefault();
        setError('');
        setLoading(true);

        // Set project data variables
        let name = projectRef.current.value;
        let description = descriptionRef.current.value;
        let photoName = imageRef.current.value.split('\\').pop().split('/').pop();
        let audioName = audioRef.current.value.split('\\').pop().split('/').pop();
        let genre = selectedGenre;
        let projectId = name.replace(/\s/g, '').toLowerCase();
        let audioFilePath = 'projects/' + userId + '/' + projectId + '/audio/' + audioName;
        let photoFilePath = 'projects/' + userId + '/' + projectId + '/image/' + photoName;

        writeProjectData(userId, projectId, name, genre, description, audioFilePath, photoFilePath);
        writeProjectStorage(imageFile, audioFile, photoFilePath, audioFilePath);
        setLoading(false);
        history.push("/dashboard" + userId);
    }
    

    // MODIFY BELOW FOR REACT STRUCTURE/UI
    return (
        <div className="wrapper">
                <h1 className="text-center mt-4">Upload Project</h1>
                {error && <Alert variant="danger">{error}</Alert>}
                <Form onSubmit={handleSubmit}>
                  <Form.Group className="m-3 " id="display">
                    <Form.Label htmlFor="projec title">Project Name</Form.Label>
                    <Form.Control type="text" placeholder="Public name of the project" ref={projectRef} required />
                  </Form.Group>
                  <Form.Group className="m-3" id="about">
                    <Form.Label htmlFor="description">Project Description</Form.Label>
                    <Form.Control type="text" placeholder="Brief description" ref={descriptionRef} required />
                  </Form.Group>
                  <div className="m-3"><FilterDropdown callback={setGenre}/></div>
                  <Form.Group controlId="formFile" className="m-3">
                    <Form.Label htmlFor="cover art image">Project Cover Image</Form.Label>
                    <Form.Control onChange={(e) => setImageFile(e.target.files[0])} type="file" ref={imageRef} />
                  </Form.Group>
                  <Form.Group controlId="formFile" className="m-3">
                    <Form.Label htmlFor="audio file">Project Audio File</Form.Label>
                    <Form.Control onChange={(e) => setAudioFile(e.target.files[0])} type="file" ref={audioRef} />
                  </Form.Group>
                  <Button disabled={loading} className=" btn-secondary m-3 w-100" type="submit">
                    Upload Project
                  </Button>
                </Form>
        </div>
        );
}

// Write project metadata to realtime database
function writeProjectData(userId, projectId, name, genre, description, audioFilePath, photoFilePath) {
    database.ref('projects/'+ userId + '/' + projectId).set({
        name: name,
        genre: genre,
        description: description,
        audioFilePath: audioFilePath,
        imagePath: photoFilePath,
        author: userId
    });
}

// TODO: Implement upload monitoring
// Write project audio file and image to cloud storage
function writeProjectStorage(photoFile, audioFile, photoFilePath, audioFilePath) {
    let photoUploadTask = storage.ref().child(photoFilePath).put(photoFile);
    // Listen for state changes, errors, and completion of the upload.
    // photoUploadTask.on(storage.TaskEvent.STATE_CHANGED, // or 'state_changed'
    // (snapshot) => {
    // // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
    // var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
    // console.log('Upload is ' + progress + '% done');
    // switch (snapshot.state) {
    //     case storage.TaskState.PAUSED: // or 'paused'
    //     console.log('Upload is paused');
    //     break;
    //     case storage.TaskState.RUNNING: // or 'running'
    //     console.log('Upload is running');
    //     break;
    //     default:
            
    // }
    // }, 
    // (error) => {
    // // A full list of error codes is available at
    // // https://firebase.google.com/docs/storage/web/handle-errors
    // switch (error.code) {
    //     case 'storage/unauthorized':
    //     // User doesn't have permission to access the object
    //     break;
    //     case 'storage/canceled':
    //     // User canceled the upload
    //     break;

    //     case 'storage/unknown':
    //     // Unknown error occurred, inspect error.serverResponse
    //     break;
    //     default:
    // }
    // }, 
    // () => {
    // // Upload completed successfully, now we can get the download URL
    // photoUploadTask.snapshot.ref.getDownloadURL().then((downloadURL) => {
    //     console.log('File available at', downloadURL);
    // });
    // }
    // );

    let audioUploadTask = storage.ref().child(audioFilePath).put(audioFile);
    // audioUploadTask.on(storage.TaskEvent.STATE_CHANGED, // or 'state_changed'
    // (snapshot) => {
    // // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
    // var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
    // console.log('Upload is ' + progress + '% done');
    // switch (snapshot.state) {
    //     case storage.TaskState.PAUSED: // or 'paused'
    //     console.log('Upload is paused');
    //     break;
    //     case storage.TaskState.RUNNING: // or 'running'
    //     console.log('Upload is running');
    //     break;
    //     default:
            
    // }
    // }, 
    // (error) => {
    // switch (error.code) {
    //     case 'storage/unauthorized':
    //     // User doesn't have permission to access the object
    //     break;
    //     case 'storage/canceled':
    //     // User canceled the upload
    //     break;

    //     case 'storage/unknown':
    //     // Unknown error occurred, inspect error.serverResponse
    //     break;
    //     default:
    // }
    // }, 
    // () => {
    // // Upload completed successfully, now we can get the download URL
    // audioUploadTask.snapshot.ref.getDownloadURL().then((downloadURL) => {
    //     console.log('File available at', downloadURL);
    // });
    // }
    // );
}

export default UploadProjectPage;
