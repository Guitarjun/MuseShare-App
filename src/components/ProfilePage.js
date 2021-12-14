import { React, useState } from 'react';
import { useParams } from 'react-router';
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
        <div>
            <header className="profile-page headers bottom-padding">
                <div className="profile">
                    <div className="profile-image">
                        <img src={imageUrl} alt={urlUser + " profile image"}/>
                    </div>
                    <div className="">
                        <h1>{user['displayName']}</h1>
                        <h2>{user['about']}</h2>
                        <p><a className='text-dark' href={"mailto:"+user['email']}><span className="material-icons text-dark">email</span>{user['email']}</a></p>
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

