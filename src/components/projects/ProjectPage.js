import React, { useEffect, useState } from 'react'; //import React Component
import { useParams } from 'react-router';
import { storage } from '../..';

// Incorporate collaborators somehow
// Allow user to delete their own projects, update the audio file
// Audio file should have easy download feature for all users
export function ProjectPage(props) {
    const urlParams = useParams();
    let projectId = urlParams.projectId;
    let projectUserId  = urlParams.userId;
    let projectsData = props.projects;

    const [userProject, setUserProject] = useState(false);  // Indicates whether the current project belongs to the user
    const [imageUrl, setImageUrl] = useState(null);

    let projects = projectsData[String(projectUserId)];
    if (!projects) {
        console.log('cant find user')
        return <body className="project-page"><h2>User not found</h2></body>;
    }
    let project =  projects[String(projectId)]; //find project based on url
    if(!project) return <h2>Project not found</h2> //if not found
    
    
    getImage(setImageUrl, project['imagePath']);
    const artist = "By: " + project.author;

    return (
        <body className="project-page">
            <header className="background-brown">
                <img className="mb-3" src={imageUrl} alt={project.name + " image"}/>
                <h1>{project['name']}</h1>
                <h2>{artist}</h2>
                <p>{project['genre']}</p>
                <button className="btn btn-dark mb-2"><span className="material-icons mb-3">play_arrow</span></button>
                <button className="btn btn-primary">Download</button>
            </header>
            <main>
                <div className="wrapper">
                    <div className="about">
                        <h2>Musician's Note:</h2>
                        <div className="group">
                            <p>{project['description']}</p>
                        </div>
                    </div>
                </div>
                {/* <CommentSection /> */}
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

function getImage(setImage, path) {
    let imageRef = storage.ref().child(String(path));
    imageRef.getDownloadURL().then((url) => {
        setImage(url);
    });
}