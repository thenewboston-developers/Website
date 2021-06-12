import React, {FC} from 'react';
import {Icon, IconType} from '@thenewboston/ui';
import {useHistory} from 'react-router-dom';

import {Avatar, Button} from 'components';
import './ProjectDetailsHeader.scss';

type Props = {
  github: string;
  logoUrl: string;
  projectLeadDisplayName: string;
  title: string;
};

const ProjectDetailsHeader: FC<Props> = ({github, logoUrl, projectLeadDisplayName, title}) => {
  const history = useHistory();
  return (
    <div className="ProjectDetailsHeader">
      <Icon
        className="ProjectDetailsHeader__back-button"
        icon={IconType.chevronLeft}
        size={40}
        totalSize={40}
        onClick={() => history.push('/projects')}
      />
      <Avatar className="ProjectDetailsHeader__avatar" src={logoUrl} size={40} />
      <div className="ProjectDetailsHeader__main-container">
        <div className="ProjectDetailsHeader__left-container">
          <div className="ProjectDetailsHeader__title-container">
            <h1 className="ProjectDetailsHeader__project-title">{title}</h1>
            <div className="ProjectDetailsHeader__project-lead-container">
              <span className="ProjectDetailsHeader__project-lead">Project Lead: </span>
              <span className="ProjectDetailsHeader__project-lead-name">{projectLeadDisplayName}</span>
            </div>
          </div>
        </div>
        <div className="ProjectDetailsHeader__right-container">
          <Button
            className="ProjectDetailsHeader__github-button"
            onClick={() => window.open(github, '_blank')}
            variant="outlined"
          >
            <Icon className="ProjectDetailsHeader__github-icon" icon={IconType.github} size={24} totalSize="unset" />
            <span className="ProjectDetailsHeader__github-title">{title}</span>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ProjectDetailsHeader;
