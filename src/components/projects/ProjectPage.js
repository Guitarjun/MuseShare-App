import React from 'react'; //import React Component
import { useParams } from 'react-router';
import _ from 'lodash';

export function ProjectPage(props) {

    const urlParams = useParams();
    let projectUrl = urlParams.url;

    let project =  _.find(props.projects, {url: projectUrl}); //find project based on url

    if(!project) return <h2>No project specified</h2> //if unspecified

    const artists = "By: " + project.artists.reduce((prev, current) => {
        return prev + ", " + current;
    });

    return (
        <body className="project-page">
            <header className="background-brown">
                <img className="mb-3" src={'../'+project.img} alt={project.name + " image"}/>
                <h1>{project.name}</h1>
                <h2>{artists}</h2>
                <p>{project.genre}</p>
                <button className="btn btn-dark mb-2"><span className="material-icons mb-3">play_arrow</span> 2:04  </button>
                <button className="btn btn-primary">Download</button>
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

export function CommentSection({comments}) {

    const commentList = comments.map((comment) => {
        return (
            <div className="comment">
                <h3>{comment.user}</h3>
                <p>{comment.note}</p>
                {comment.file && <div><input type="button" value={comment.file}/></div>}
            </div>
        );
    });

    return (
        <section className="comment-section">
            <h1>Comments and Collaborator's Versions:</h1>
            <form>
                <div className="text">
                    <label htmlFor="text">Add a comment:</label>
                    <input type="text" id="text" placeholder="What do you think?" />
                </div>
                <div className="radios">
                    <input type="radio" id="anonymous" name="comment-type" value="anonymous" />
                    <label htmlFor="anonymous">Post as anonymous</label>
                    <input type="radio" id="identified" name="comment-type" value="identified" />
                    <label htmlFor="identified">Post as Person:</label>
                </div>
                <div className="post-buttons-wrapper">
                    <div className="post-buttons">
                        <input type="button" value="Attach new version" />
                        <input type="button" value="Post comment" />
                    </div>
                </div>
            </form>
            {commentList}
        </section>
    );
}