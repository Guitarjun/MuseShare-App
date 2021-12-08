import { React, useEffect, useState } from 'react';
import { useParams } from 'react-router';
import ProjectList from './projects/ProjectList';

export function ProfilePage(props) {
    const urlParams = useParams();
    const [onUserProfile, setOnUserProfile] = useState(false);  // Indicates whether user is on their own profile page

    let userId = null;  // Change to state variable

    let urlUser = urlParams.urlUser;

    if (userId == urlUser) {  // User is on their own profile page
        setOnUserProfile(true);
    }

    if (onUserProfile) {
        // if we are on our own profile page
    }   

    // Read introduction, displayName with event listener
    // users/urlUser/...

    // Read image from cloud storage
    // users/urlUser/...

    // State for user-specific projects
    const [selectedUserProjects, setSelectedUserProjects] = useState();
    

    if(null) return <h2>User not found</h2> //if user does not exist
    
    return (
        <body>
            <header className="profile-page">
                <img src={'../'+user.img} alt={user.name + " profile image"}/>
                <h1>{user.name}</h1>
            </header>
            <main>
                <div className="wrapper">
                    <div className="about">
                        <h2>About:</h2>
                        <div className="group">
                            <p>{user.about}</p>
                            <div className="forum-info">
                                <p>Forum posts: {user.posts}</p>
                            </div>
                        </div>
                    </div>
                    <ProjectList projects={selectedUserProjects}/>
                    <div className="contact">
                        <h2>Contact:</h2>
                        <p><a href={"mailto:"+user.email}><span className="material-icons">email</span>{user.email}</a></p>
                    </div>
                </div>
            </main>
        </body>
    );
}
