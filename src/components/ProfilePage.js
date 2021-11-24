import React from 'react';
import { useParams } from 'react-router';
import _ from 'lodash';
import { CommentList } from './Comment';


export function ProfilePage(props) {
    let userData = props.users;
    const urlParams = useParams();
    let urlUser = urlParams.urlUser;

    let user =  _.find(userData, {url: urlUser}); //find user based on url

    if(!user) return <h2>No user specified</h2> //if unspecified
    
    return (
        <body className="background-brown">
            <header className="profile-page background-brown">
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
                                <p>Forum posts: 42</p>
                                <p>Last post: December 24, 1992</p>
                                <a>View post history</a>
                            </div>
                        </div>
                    </div>
                    <div className="comments">
                        <h2>Comments:</h2>
                        <form>
                            <label htmlFor="text">Add a comment:</label>
                            <input type="text" id="text" placeholder="What do you think?" />
                            <input type="radio" id="anonymous" name="comment-type" value="Anonymous" />
                            <label htmlFor="anonymous">Post as anonymous</label>
                            <input type="radio" id="identified" name="comment-type" value="Identified" />
                            <label htmlFor="identified">Post as Person</label>
                            <input type="button" value="Post comment" />
                        </form>
                        <div className="comment">
                            <h3>Joe:</h3>
                            <p>I like your music</p>
                        </div>
                        <div className="comment">
                            <h3>Anonymous:</h3>
                            <p>Cool guy!</p>
                        </div>
                        <div className="comment">
                            <h3>Anonymous:</h3>
                            <p>😎</p>
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