import React, {FC, ReactNode, useCallback, useEffect, useState} from 'react';
import {Link, useHistory, useParams} from 'react-router-dom';
import {Icon, IconType} from '@thenewboston/ui';

import {api as teamsApi} from 'apis/teams';
import {A, BreadcrumbMenu, EmptyPage, FlatNavLinks, Loader, PageTitle} from 'components';
import {TeamPathname} from 'constants/teams';
import {APIState, APIProgress, INITIAL_API_STATE} from 'types/api';
import {NavigationItem} from 'types/navigation';
import {PageDataObject} from 'types/page-data';
import {CoreTeamMember, CoreTeam, TeamName, TeamsUrlParams, TeamTabOptions} from 'types/teams';

import InternalTeamMemberPayments from './Resources/InternalTeamMemberPayments';
import InternalBountyAccountRefills from './Resources/InternalBountyAccountRefills';
import TeamMemberCard from './TeamMemberCard';
import TeamOverview from './TeamOverview';
import TeamTabs from './TeamTabs';
import './Teams.scss';

const sortTeamMembers = (members: CoreTeamMember[]): CoreTeamMember[] => {
  const teamLeads = members
    .filter(({is_lead}) => is_lead)
    .sort((member1, member2) => (member1.user.display_name > member2.user.display_name ? 1 : -1));
  const otherMembers = members
    .filter(({is_lead}) => !is_lead)
    .sort((member1, member2) => (member1.user.display_name > member2.user.display_name ? 1 : -1));
  return teamLeads.concat(otherMembers);
};

const pageData: PageDataObject = {
  'bounty-account-refills': {
    content: <InternalBountyAccountRefills />,
    name: 'Bounty Account Refills',
  },
  'team-member-payments': {
    content: <InternalTeamMemberPayments />,
    name: 'Team Member Payments',
  },
};

const externalLinks: NavigationItem[] = [
  {
    name: 'Meeting Notes Template',
    url: 'https://docs.google.com/document/d/15P7MPPGgC2O3ZhOWryOeuW1K5EO9TL8_TBWR4Z2-_eo/edit?usp=sharing',
  },
];

const Teams: FC = () => {
  const history = useHistory();
  const {team: teamParam, tab: tabParam, resource: resourceParam} = useParams<TeamsUrlParams>();
  const [filteredMembers, setFilteredMembers] = useState<CoreTeamMember[]>([]);
  const [teamFilter, setTeamFilter] = useState<TeamName>(TeamName.all);
  const [teams, setTeams] = useState<CoreTeam[]>([]);
  const [apiState, setAPIState] = useState<APIState>(INITIAL_API_STATE);

  useEffect(() => {
    const isAllTeams = teamParam === TeamName.all;
    if (teamParam && tabParam) {
      if (isAllTeams) {
        const isInvalidTabForAll = !(tabParam === TeamTabOptions.members || tabParam === TeamTabOptions.resources);
        if (isInvalidTabForAll) {
          history.replace(`/teams`);
        }
      } else {
        const isInvalidTabForSingleTeam = !(
          tabParam === TeamTabOptions.members || tabParam === TeamTabOptions.overview
        );
        if (isInvalidTabForSingleTeam) {
          history.replace(`/teams/${teamParam}`);
        }
      }
    } else if (teamParam && !tabParam) {
      if (isAllTeams) {
        history.replace(`/teams/${teamParam}/${TeamTabOptions.members}`);
      } else {
        history.replace(`/teams/${teamParam}/${TeamTabOptions.overview}`);
      }
    }
  }, [history, tabParam, teamParam]);

  useEffect(() => {
    const fetchAndProcessTeams = async () => {
      try {
        setAPIState({...apiState, progress: APIProgress.REQ});
        const coreTeams = await teamsApi.getCoreTeams();
        const sortedCoreTeams = coreTeams.sort((team1, team2) => (team1.title > team2.title ? 1 : -1));
        setAPIState({...apiState, progress: APIProgress.SUCCESS});
        setTeams(sortedCoreTeams);
      } catch (err) {
        setAPIState({error: err, progress: APIProgress.ERR});
      }
    };
    fetchAndProcessTeams();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (teamParam === TeamPathname.all) {
      setTeamFilter(TeamName.all);
      return;
    }

    if (apiState.progress !== APIProgress.SUCCESS || teams.length === 0) {
      return;
    }

    const team = teams.find(({title}) => title === teamParam);
    if (team) {
      setTeamFilter(team.title as TeamName);
    } else {
      history.push(`/teams`);
    }
  }, [history, teamParam, teams, apiState]);

  useEffect(() => {
    const getFilteredMembers = (): CoreTeamMember[] => {
      const teamLeads: CoreTeamMember[] = [];
      const otherMembers: CoreTeamMember[] = [];
      let filteredTeams = teams;
      if (teamFilter !== TeamName.all) {
        filteredTeams = [teams.find(({title}) => title.toLowerCase() === teamFilter.toLowerCase())] as CoreTeam[];
      }
      filteredTeams.forEach((team) => {
        team.core_members_meta.forEach((teamMember) => {
          if (teamMember.is_lead) {
            teamLeads.push({...teamMember});
          } else {
            otherMembers.push({...teamMember});
          }
        });
      });
      return teamLeads.concat(otherMembers);
    };

    if (apiState.progress !== APIProgress.SUCCESS || teams.length === 0) {
      return;
    }

    const members = getFilteredMembers();
    const sortedMembers = sortTeamMembers(members);
    setFilteredMembers(sortedMembers);
  }, [apiState, teamFilter, teams]);

  const handleNavOptionClick = useCallback(
    (option: string) => (): void => {
      if (option === TeamName.all) {
        history.push(`/teams/${option}/${TeamTabOptions.members}`);
      } else {
        history.push(`/teams/${option}/${TeamTabOptions.overview}`);
      }
    },
    [history],
  );

  const renderTeamFilter = (): ReactNode => {
    const navLinkOptions = [
      {pathname: TeamPathname.all, title: TeamPathname.all},
      ...teams.map((team) => ({pathname: team.title, title: team.title})),
    ];
    return (
      <FlatNavLinks handleOptionClick={handleNavOptionClick} options={navLinkOptions} selectedOption={teamParam} />
    );
  };

  const renderTeamMembers = useCallback((): ReactNode => {
    if (!filteredMembers.length) return <EmptyPage />;

    return filteredMembers.map(({user, hourly_rate, is_lead, job_title}) => (
      <TeamMemberCard
        displayName={user.display_name || ''}
        githubUsername={user.github_username || ''}
        isLead={is_lead}
        hourlyRate={hourly_rate}
        key={user.account_number || ''}
        profileImage={user.profile_image || ''}
        discordUsername={user.discord_username || ''}
        titles={[job_title]}
      />
    ));
  }, [filteredMembers]);

  const renderResources = useCallback((): ReactNode => {
    return (
      <>
        {Object.entries(pageData).map(([key, value]) => (
          <Link className="Teams__resources-item" key={key} to={`/teams/${teamParam}/${tabParam}/${key}`}>
            {value.name}
          </Link>
        ))}
        {externalLinks.map((externalLink) => (
          <A className="Teams__resources-item" href={externalLink.url} key={externalLink.name} newWindow>
            {externalLink.name}
          </A>
        ))}
      </>
    );
  }, [teamParam, tabParam]);

  const handleBackClick = useCallback((): void => {
    history.replace(`/teams/${teamParam}/${tabParam}`);
  }, [history, teamParam, tabParam]);

  const renderResourceDoc = useCallback((): ReactNode => {
    if (resourceParam) {
      const resource = pageData[resourceParam]?.content || <EmptyPage />;
      return (
        <>
          <div className="Teams__back-container" onClick={handleBackClick} role="button" tabIndex={0}>
            <Icon className="Teams__back-icon" icon={IconType.arrowLeft} />
            <span className="Teams__back-text">Back</span>
          </div>
          {resource}
        </>
      );
    }
  }, [handleBackClick, resourceParam]);

  const renderTabPanel = useCallback(() => {
    switch (tabParam) {
      case TeamTabOptions.members: {
        return <div className="Teams__team-list">{renderTeamMembers()}</div>;
      }
      case TeamTabOptions.overview: {
        const selectedTeam = teams.find(({title}) => title === teamFilter);

        // team may not be present at this point
        if (!selectedTeam) {
          return;
        }
        return <TeamOverview team={selectedTeam} />;
      }
      case TeamTabOptions.resources: {
        return <div className="Teams__resources">{renderResources()}</div>;
      }
      default:
        return <EmptyPage />;
    }
  }, [renderResources, renderTeamMembers, tabParam, teamFilter, teams]);

  return (
    <>
      <PageTitle title="Teams" />
      {apiState.progress === APIProgress.REQ ? (
        <div className="Teams__loader-container">
          <Loader />
        </div>
      ) : (
        <div className="Teams">
          <BreadcrumbMenu
            className="Teams__BreadcrumbMenu"
            menuItems={renderTeamFilter()}
            pageName={teamFilter}
            sectionName="Team"
          />
          <aside className="Teams__left-menu">{renderTeamFilter()}</aside>
          <section className="Teams__right-section">
            {resourceParam ? (
              <>{renderResourceDoc()}</>
            ) : (
              <>
                <h1 className="Teams__team-heading">{teamFilter === TeamName.all ? 'All' : teamFilter}</h1>
                <TeamTabs team={teamParam} tab={tabParam || ''} />
                <div className="Teams__tab-panel">{renderTabPanel()}</div>
              </>
            )}
          </section>
        </div>
      )}
    </>
  );
};

export default Teams;
