import React from 'react'; //import React Component
import { useParams } from 'react-router';
import _ from 'lodash';
import { CommentList } from './Comment';

export function ProjectPage(props) {

    const urlParams = useParams();
    let projectUrl = urlParams.url;

    let project =  _.find(props.projects, {url: projectUrl}); //find project based on url

    if(!project) return <h2>No project specified</h2> //if unspecified


    return (
        <body className="project-page background-brown">
            <header className="background-brown">
                <img className="mb-3" src={'../'+project.img} alt={project.name + " image"}/>
                <h1>{project.name}</h1>
                <h2>{project.artists}</h2>
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
                <div className="comments">
                    <h2 className="ml-3">Comments and Collaborator's Versions:</h2>
                    <form>
                        <label for="text">Add a comment:</label>
                        <input type="text" id="text" placeholder="What do you think?" />
                        <input type="radio" id="anonymous" name="comment-type" value="Anonymous" checked />
                        <label for="anonymous">Post as anonymous</label>
                        <input type="radio" id="identified" name="comment-type" value="Identified" />
                        <label for="identified">Post as Person</label>
                        <input type="button" value="Post comment" />
                        <input type="button" value="Attach new version" />
                    </form>
                    <div className="comment">
                        <h3>Jack:</h3>
                        <p>I love it wow! Added some drums, check it out.</p>
                        <input type="button" value="done-with-you-jack.mp3" />
                    </div>
                    <div className="comment">
                        <h3>Anonymous:</h3>
                        <p>Woah that's awesome. It really does sound like Don Toliver. A female voice on this would complete it!!</p>
                    </div>
                    <div className="comment">
                        <h3>Jill</h3>
                        <p>Here's my try at a verse.</p>
                        <div><input type="button" value="jill.mp3" /></div>
                    </div>
                </div>
            </main>


        </body>
    );

}