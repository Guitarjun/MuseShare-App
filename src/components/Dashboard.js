import { React, useState } from 'react';
import { Redirect, useParams } from 'react-router';
import ProjectList from './projects/ProjectList';
import { Alert } from "react-bootstrap";
import { useAuth } from '../contexts/AuthContext';
import { useHistory } from "react-router-dom";
import { getImage } from '../firebaseUtils';

// TODO: delete project, delete account
export default function Dashboard(props) {
    const urlParams = useParams();
    const { logout } = useAuth();
    const[imageUrl, setImageUrl] = useState(null);
    const [error, setError] = useState("");
    const history = useHistory();
    const { currentUser } = useAuth();

    let selectedProjects = props.projectsData;
    let userData = props.userData;
    let urlUser = urlParams.userId;

    if (!currentUser || props.userId != urlUser)  {
        return <Redirect to="/login"/>
    }

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
    if (user) {
        getImage(setImageUrl, user['imagePath']);
    }
    
    
    if(!user) {
        return <h2>User not found</h2> //if user does not exist
    }

    return (
        <div>
            <header className="profile-page">
                <div className="profile">
                    <div class="profile-image">
                        <img src={imageUrl} alt={urlUser + " profile image"}/>
                    </div>
                    <div className="profileInfo">
                        <h1>{user['displayName']}</h1>
                        <h2>{user['about']}</h2>
                        <p><a href={"mailto:"+user['email']}><span className="material-icons">email</span>{user['email']}</a></p>
                        {error && <Alert variant="danger">{error}</Alert>}
                        <button variant="link" onClick={handleLogout} className="btn btn-danger">Log Out</button>
                    </div>
                </div>
            </header>
            <main>
                <div className="wrapper">
                    <h1 className="projects-title">Projects</h1>
                    <ProjectList projects={selectedProjects} userId={urlUser}/>
                </div>
            </main>
        </div>
    );
}
