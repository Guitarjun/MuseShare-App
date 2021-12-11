import { React, useState } from 'react';
import { useParams } from 'react-router';
import { storage } from '..';
import ProjectList from './projects/ProjectList';
import { Alert } from "react-bootstrap";
import { useAuth } from '../contexts/AuthContext';
import { Link, useHistory } from "react-router-dom";
import { getImage } from '../firebaseUtils';

// TODO: delete project, delete account
export default function Dashboard(props) {
    const urlParams = useParams();
    const { logout } = useAuth();
    const[imageUrl, setImageUrl] = useState(null);
    const [error, setError] = useState("");
    const history = useHistory();
   

    let selectedProjects = props.projectsData;
    let userData = props.userData;
    let urlUser = urlParams.userId;

    let user = userData[String(urlUser)];

    async function handleLogout() {
        setError('');
        try {
            await logout();
            history.push("/login");
        } catch {
            setError("Failed to log out");
        }
    }

    // Read image from cloud storage
    // TODO: Fix memory leak
    getImage(setImageUrl, user['imagePath']);
    
    if(!user) {
        return <h2>User not found</h2> //if user does not exist
    }

    return (
        <div>
            <header className="profile-page">
                <img src={imageUrl} alt={urlUser + " profile image"}/>
                <h1>{user['displayName'] + " (Me)"}</h1>
                {error && <Alert variant="danger">{error}</Alert>}
                <button variant="link" onClick={handleLogout} className="btn btn-danger">Log Out</button>
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
        </div>
    );
}
