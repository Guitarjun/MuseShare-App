import React from "react";

function ProjectsPanel(props) {

    const projectsList = props.projects.map((project) => {
        return (
            <ProjectCard project={project} />
        );
    });

    return (
        <div className="project-panel">
            {projectsList}
        </div>
    );
}

function ProjectCard(props) {
    let project = props.project;

    const artists = "By: " + project.artists.reduce((prev, current) => {
        return prev + ", " + current;
    });

    return (
        <div className="project-card">
            <header>
                <div className="header-wrapper">
                    <img src={'../'+project.img} alt={project.name + " image"}/>
                    <h1>{project.song}</h1>
                    <h2>{artists}</h2>
                    <p>{"Genre: " + project.genre}</p>
                </div>
            </header>
            <div className="song-buttons-wrapper">
                <section className="song-buttons">
                    <button className="btn btn-dark"><span className="material-icons">play_arrow</span>2:04</button>
                    <button className="btn btn-primary">Download</button>
                </section>
            </div>
        </div>
    );
}

export default ProjectsPanel;