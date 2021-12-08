import { React, useState } from 'react';
import { Redirect, useParams } from 'react-router';
import ProjectList from './projects/ProjectList';


export function ProfilePage(props) {
    const urlParams = useParams();
    let currentUser = props.currentUser;

    let userData = props.userData;
    let userStorage = props.userStorage;
    let urlUser = urlParams.urlUser;
    let projectsData = props.projectsData;
    let projectsStorage = props.projectsStorage;

    let user = userData.child(urlUser);     // Retrieve realtime database user data
    // Read introduction, displayName with event listener
    // users/urlUser/...

    // Read image from cloud storage
    // users/urlUser/...

    // State for user-specific projects
    const [selectedUserProjects, setSelectedUserProjects] = useState(projectsData);
    

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
                    <ProjectList />
                    <div className="contact">
                        <h2>Contact:</h2>
                        <p><a href={"mailto:"+user.email}><span className="material-icons">email</span>{user.email}</a></p>
                    </div>
                </div>
            </main>
        </body>
    );
}
