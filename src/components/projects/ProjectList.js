import React from "react";
import { useState, useEffect } from 'react';
import { Redirect } from 'react-router';
import _ from 'lodash';
import { getImage, getAudio } from "../../firebaseUtils";
import ReactAudioPlayer from 'react-audio-player';

function ProjectList(props) {
    let selectedProjects = props.projects;
    let currentUserId = props.userId;  // For only displaying a specific user's projects
    const resetFilter = props.resetFilter;

    useEffect(() => {
        return resetFilter;
    }, []);

    // Fix weird duplicate projects issue
    if(_.isEmpty(selectedProjects) || !selectedProjects || selectedProjects.length === 0) {
        return (
            <div className="project-list">
                <h2>No available projects</h2>
            </div>
        );
    }

    let projectsList = [];
    if (currentUserId) {   // Only show this user's projects
        for (let userId in selectedProjects) {
            if (userId == currentUserId) {
                let artistProjects = selectedProjects[String(userId)];
                for (let projectId in artistProjects) {
                    let project = artistProjects[String(projectId)];
                    projectsList.push(<ProjectCard key={projectId} projectId={projectId} project={project} userId={userId}/>)
            }
            }
        }
    } else {
        for (let userId in selectedProjects) {
            let artistProjects = selectedProjects[String(userId)];
            for (let projectId in artistProjects) {
                let project = artistProjects[String(projectId)];
                projectsList.push(<ProjectCard key={projectId} projectId={projectId} project={project} userId={userId}/>);
            }
        }
    }
        
    return (
        <div className="project-list">
            {projectsList}
        </div>
    );
}

function ProjectCard({project, projectId, userId}) {

    const [redirectTo, setRedirect] = useState(undefined);
    const [imageUrl, setImageUrl] = useState(null);
    const [audioUrl, setAudioUrl] = useState(null);

    getImage(setImageUrl, project['imagePath']);
    let audioPath = project['audioFilePath'];
    getAudio(setAudioUrl, audioPath);

    // Update this with added userId in path
    const handleClick = () => {
        setRedirect("/projects/" + userId + '/' + projectId);
    }

    // Change this to display name retrieved from author (with user ID)
    const artists = "By: " + project.author;    // Maybe make author point to the displayName instead to make that easier ^

    if (redirectTo) {
        return <Redirect push to={redirectTo}></Redirect>
    }
    return (
        <div className="project-card" onClick={handleClick}>
            <div className="card-img">
                <img src={imageUrl} alt={project.name + " image"}/>
            </div>
            <div className="card-body">
                <h2>{project.name}</h2>
                <h3>{artists}</h3>
                <p>{"Genre: " + project.genre}</p>
                {/* <section className="song-buttons">
                    <button className="btn btn-dark"><span className="material-icons">play_arrow</span></button>
                    <button className="btn btn-primary">Download</button>
                </section> */}
                <ReactAudioPlayer src={audioUrl} controls/>
            </div>
        </div>
    );
}


export default ProjectList;