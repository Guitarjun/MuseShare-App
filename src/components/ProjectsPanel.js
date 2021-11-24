import React from "react"; //import React Component
import { useParams } from 'react-router';
import _ from 'lodash';
import ProjectCard from './ProjectCard';

function ProjectsPanel(props) {

    console.log(props.projects);

    const projectsList = props.projects.map((project) => {
        console.log(project)
        return (
            <ProjectCard project={project} />
        );
    });

    console.log(projectsList);

    return (
        <div className="project-panel">
            {projectsList}
        </div>
    );
}

export default ProjectsPanel;