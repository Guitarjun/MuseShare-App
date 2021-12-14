import React, { useEffect, useState } from 'react'; //import React Component
import { useParams } from 'react-router';
import { getImage, getAudio } from '../../firebaseUtils';
import { NavLink } from 'react-router-dom';
import ReactAudioPlayer from 'react-audio-player';

// Incorporate collaborators somehow
// TODO: Button to visit artist's page
// Audio file should have easy download feature for all users
export function ProjectPage(props) {
    const urlParams = useParams();
    let projectId = urlParams.projectId;
    let projectUserId  = urlParams.userId;
    let projectsData = props.projects;

    const [imageUrl, setImageUrl] = useState(null);
    const [audioUrl, setAudioUrl] = useState(null);

    let projects = projectsData[String(projectUserId)];
    if (!projects) {
        return <body className="project-page"><h2>User not found</h2></body>;
    }
    let project =  projects[String(projectId)]; //find project based on url
    if(!project) return <h2>Project not found</h2> //if not found
    
    // TODO: Fix memory leak
    getImage(setImageUrl, project['imagePath']);
    const artist = "By: " + project.author;

    // Path to audio file location in Cloud Storage
    let audioPath = project['audioFilePath'];
    getAudio(setAudioUrl, audioPath);
    // TODO: use audio path/audio file to add download link + react audio player

    return (
        <div className="project-page">
            <header className="background-brown headers">
                <img className="mb-3" src={imageUrl} alt={project.name + " image"}/>
                <h1>{project['name']}</h1>
                <h2>{artist}</h2>
                <p>Genre: {project['genre']}</p>
                <div>
                    <ReactAudioPlayer src={audioUrl} controls className="audioPlayer"/>
                    {/* <button className="btn btn-dark mr-2"><span className="material-icons">play_arrow</span></button>
                    <button className="btn btn-primary mr-2">Download</button> */}
                    <button className="btn btn-seconday"><NavLink to={"/profile/" + projectUserId} activeClassName="active">Artist Profile</NavLink></button>
                </div>
            </header>
            <main>
                <div className="wrapper">
                    <p>Musician's Note: {project['description']}</p>
                    <p>Comments:</p>
                    {/* <CommentSection /> */}
                </div>
            </main>
        </div>
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

// Add flagging method
// function Comment() {

// }