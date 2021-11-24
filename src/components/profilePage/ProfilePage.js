import React from 'react';
import { useParams } from 'react-router';
import _ from 'lodash';
import CommentSection from './../projectsPage/CommentSection';


export function ProfilePage(props) {
    let userData = props.users;
    const urlParams = useParams();
    let urlUser = urlParams.urlUser;

    let user =  _.find(userData, {url: urlUser}); //find user based on url

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
                                <p>Last post: December 24, 1992</p>
                                <a>View post history</a>
                            </div>
                        </div>
                    </div>
                    <div className="contact">
                        <h2>Contact:</h2>
                        <p><a href={"mailto:"+user.email}><span className="material-icons">email</span>{user.email}</a></p>
                    </div>
                </div>
            </main>
        </body>
    );
}
