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
                <div className="profile">
                    <div class="profile-image">
                        <img src={imageUrl} alt={urlUser + " profile image"}/>
                    </div>
                    <div className="profileInfo">
                        <h1>{user['displayName']}</h1>
                        <h2>{user['about']}</h2>
                        <p><a href={"mailto:"+user['email']}><span className="material-icons">email</span>{user['email']}</a></p>
                    </div>
                </div>
            </header>
            <main>
                <div className="wrapper">
                    <h2>Projects:</h2>
                    <ProjectList projects={selectedProjects} userId={urlUser}/>
                </div>
            </main>
        </body>
    );
}

