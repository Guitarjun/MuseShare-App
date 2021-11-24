import React from 'react'; //import React Component
import { useParams } from 'react-router';
import _ from 'lodash';
import { CommentSection } from './CommentSection';

export function ProjectPage(props) {

    const urlParams = useParams();
    let projectUrl = urlParams.url;

    let project =  _.find(props.projects, {url: projectUrl}); //find project based on url

    if(!project) return <h2>No project specified</h2> //if unspecified

    return (
        <body className="project-page">
            <header className="background-brown">
                <img className="mb-3" src={'../'+project.img} alt={project.name + " image"}/>
                <h1>{project.name}</h1>
                <h2>{"by: " +project.artists}</h2>
                <p>{project.genre}</p>
                <a className="btn btn-dark mb-2" href="#" role="button"><span className="material-icons mb-3">play_arrow</span> 2:04  </a>
                <a className="btn btn-primary" href="#" role="button">Download</a>
            </header>
            <main>
                <div className="wrapper">
                    <div className="about">
                        <h2>Musician's Note:</h2>
                        <div className="group">
                            <p>{project.note}</p>
                        </div>
                    </div>
                </div>
                <CommentSection comments={project.feedback}/>
            </main>


        </body>
    );

}