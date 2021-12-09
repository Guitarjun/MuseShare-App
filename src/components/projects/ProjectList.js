import React from "react";
import { useState } from 'react';
import { Redirect } from 'react-router';
import _ from 'lodash';

function ProjectList(props) {
    let selectedProjects = props.projects;
    let currentUserId = props.userId;  // For only displaying a specific user's projects

    // Fix weird duplicate projects issue
    if(_.isEmpty(selectedProjects) || !selectedProjects || selectedProjects.length == 0) {
        return (
            <div className="project-list">
                <h1>No available projects</h1>
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
        console.log(selectedProjects);
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
                <img src={'../'+project.img} alt={project.name + " image"}/>
            </div>
            <div className="card-body">
                <h1>{project.name}</h1>
                <h2>{artists}</h2>
                <p>{"Genre: " + project.genre}</p>
                <section className="song-buttons">
                    <button className="btn btn-dark"><span className="material-icons">play_arrow</span></button>
                    <button className="btn btn-primary">Download</button>
                </section>
            </div>
        </div>
    );
}

export default ProjectList;