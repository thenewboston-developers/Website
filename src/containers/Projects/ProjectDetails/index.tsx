import React, {FC, useState} from 'react';

import {Project, ProjectTopic} from 'types/projects';
import ProjectDetailsContent from './ProjectDetailsContent';
import ProjectDetailsHeader from './ProjectDetailsHeader';
import ProjectDetailsSideMenu from './ProjectDetailsSideMenu';
import {projectDetailsTopic} from './constants';
import './ProjectDetails.scss';

type Props = {
  project: Project;
};

const ProjectDetails: FC<Props> = ({project}) => {
  const [currentTopic, setCurrentTopic] = useState<ProjectTopic>(projectDetailsTopic.overview);
  const {title, logo, github_url: github, project_lead_display_name: projectLeadDisplayName} = project;

  const handleSideMenuClick = (topic: ProjectTopic) => {
    setCurrentTopic(topic);
  };

  return (
    <div className="ProjectDetails">
      <ProjectDetailsHeader
        github={github}
        logoUrl={logo}
        title={title}
        projectLeadDisplayName={projectLeadDisplayName}
      />
      <div className="ProjectDetails__main-container">
        <ProjectDetailsSideMenu currentTopic={currentTopic} onClick={handleSideMenuClick} />
        <ProjectDetailsContent project={project} currentTopic={currentTopic} />
      </div>
    </div>
  );
};

export default ProjectDetails;