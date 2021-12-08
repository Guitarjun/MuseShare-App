import React from "react";
import { useState } from 'react';
import { Redirect } from 'react-router';

function ProjectList(props) {

    // LOGIC NEEDS TO CHANGE DUE TO FIREBASE

    if(props.projects.length == 0) {
        return (
            <div className="project-list">
                <h1>No available projects</h1>
            </div>
        );
    }

    const projectsList = props.projects.map((project) => {
        return (
            <ProjectCard key={project.url} project={project} />
        );
    });

    return (
        <div className="project-list">
            {projectsList}
        </div>
    );
}

function ProjectCard({project}) {

    // LOGIC NEEDS TO CHANGE BECAUSE OF FIREBASE

    const [redirectTo, setRedirect] = useState(undefined);

    const handleClick = () => {
        setRedirect("/projects/" + project.url);
    }

    const artists = "By: " + project.artists.reduce((prev, current) => {
        return prev + ", " + current;
    });

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
                    <button className="btn btn-dark"><span className="material-icons">play_arrow</span>2:04</button>
                    <button className="btn btn-primary">Download</button>
                </section>
            </div>
        </div>
    );
}

export default ProjectList;