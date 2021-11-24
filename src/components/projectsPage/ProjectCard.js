import React from "react";
import CommentSection from "./CommentSection";
import "./ProjectCard.css"

function ProjectCard({project}) {

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
            <CommentSection comments={project.feedback}/>
        </div>
    );
}

export default ProjectCard;