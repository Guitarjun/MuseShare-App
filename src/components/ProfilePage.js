import { React, useState } from 'react';
import { useParams } from 'react-router';
import { storage } from '..';
import ProjectList from './projects/ProjectList';
import { getImage } from '../firebaseUtils';

export function ProfilePage(props) {
    const urlParams = useParams();
    const[imageUrl, setImageUrl] = useState(null);

    let selectedProjects = props.projectsData;
    let userData = props.userData;
    let urlUser = urlParams.urlUser;

    let user = userData[String(urlUser)];


    if(!user) {
        return <h2>User not found</h2> //if user does not exist
    }

    // Read image from cloud storage
    // TODO: Fix memory leak
    getImage(setImageUrl, user['imagePath']);
    
    return (
        <body>
            <header className="profile-page">
                <img src={imageUrl} alt={urlUser + " profile image"}/>
                <h1>{user['displayName']}</h1>
            </header>
            <main>
                <div className="wrapper">
                    <div className="about">
                        <h2>About:</h2>
                        <div className="group">
                            <p>{user['about']}</p>
                        </div>
                    </div>
                    <ProjectList projects={selectedProjects} userId={urlUser}/>
                    <div className="contact">
                        <h2>Contact:</h2>
                        <p><a href={"mailto:"+user['email']}><span className="material-icons">email</span>{user['email']}</a></p>
                    </div>
                </div>
            </main>
        </body>
    );
}

