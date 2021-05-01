import React, {FC, ReactNode, useCallback} from 'react';
import {Icon, IconType} from '@thenewboston/ui';
import {A, DocList} from 'components';
import {CoreTeam} from 'types/teams';

import './TeamOverview.scss';

interface ComponentProps {
  team: CoreTeam;
}

const githubTeamName = 'thenewboston-developers/';

const TeamOverview: FC<ComponentProps> = ({team}) => {
  const renderTeamDescription = useCallback((): ReactNode => {
    const repoName = team.github.substring(team.github.lastIndexOf(githubTeamName) + githubTeamName.length);
    return (
      <>
        <h4 className="TeamOverview__sub-heading"> About the team </h4>
        <p className="TeamOverview__description">{team.about}</p>
        {team.github && (
          <div className="TeamOverview__social">
            <Icon className="TeamOverview__social-icon" icon={IconType.github} size={18} />
            <A className="TeamOverview__social-title" href={team.github}>
              {repoName}
            </A>
          </div>
        )}
        {team.discord && (
          <div className="TeamOverview__social">
            <Icon className="TeamOverview__social-icon" icon={IconType.discord} size={18} />
            <div className="TeamOverview__social-title TeamOverview__social-title--sail-gray">{team.discord}</div>
          </div>
        )}
      </>
    );
  }, [team]);

  const renderTeamResponsibilities = useCallback((): ReactNode => {
    return (
      <>
        <h4 className="TeamOverview__sub-heading"> Role and Responsibilities </h4>
        <DocList className="TeamOverview__responsibilities-item" variant="ul">
          {team.responsibilities.map((responsibility, i) => (
            <li key={i}>{responsibility}</li>
          ))}
        </DocList>
      </>
    );
  }, [team]);

  return (
    <div className="TeamOverview">
      <div className="TeamOverview__about">{renderTeamDescription()}</div>
      <div className="TeamOverview__responsibilities">{renderTeamResponsibilities()}</div>
    </div>
  );
};

export default TeamOverview;
