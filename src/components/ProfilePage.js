import { React, useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { storage } from '..';
import ProjectList from './projects/ProjectList';

export function ProfilePage(props) {
    const urlParams = useParams();
    const [onUserProfile, setOnUserProfile] = useState(false);  // Indicates whether user is on their own profile page

    let selectedProjects = props.projectsData;
    let currentUserId = props.userId;
    let userData = props.userData;
    let user = null;

    let urlUser = urlParams.urlUser;

    if (currentUserId == urlUser) {  // User is on their own profile page
        setOnUserProfile(true);
        // ...
    }

    if (onUserProfile) {
        // if we are on our own profile page...
    }

    // Filter for this user's projects
    for (let userId in userData) {
        if (userId == urlUser) {
            user = userData[String(userId)];
        }
    }
    if(!user) {
        return <h2>User not found</h2> //if user does not exist
    }

    // Read image from cloud storage
    let imageRef = storage.ref().child(String(user['imagePath']));
    console.log(imageRef);
    
    return (
        <body>
            <header className="profile-page">
                <img src={imageRef} alt={urlUser + " profile image"}/>
                <h1>{user['displayName']}</h1>
            </header>
            <main>
                <div className="wrapper">
                    <div className="about">
                        <h2>About:</h2>
                        <div className="group">
                            <p>{user['about']}</p>
                            {/* <div className="forum-info">
                                <p>Forum posts: {user.posts}</p>
                            </div> */}
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
