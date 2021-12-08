import React from 'react';
import { useParams } from 'react-router';
import ProjectList from './projects/ProjectList';


export function ProfilePage(props) {
    let userData = props.userData;
    let userStorage = props.userStorage;
    const urlParams = useParams();
    let urlUser = urlParams.urlUser;
    let projectsData = props.projectsData;

    let user = userData.child(urlUser);     // Retrieve realtime database user data
    // Read introduction, number of projects with event listener

    // Read image from cloud storage
    

    if(!user) return <h2>No user specified</h2> //if unspecified
    
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
