import React from "react";
import CommentSection from "./CommentSection";

function ProjectCard({project}) {
    return (
        <div className="projectCard">
            <header>
                <img src={'../'+project.img} alt={project.name + " image"}/>
                <h1>{project.song}</h1>
                <h2>{project.artists}</h2>
                <p>{project.genre}</p>
                <a className="btn btn-dark" href="#" role="button"><span className="material-icons">play_arrow</span> 2:04  </a>
                <a className="btn btn-primary" href="#" role="button">Download</a>
            </header>
            <CommentSection comments={project.feedback}/>
        </div>
    );
}

export default ProjectCard;