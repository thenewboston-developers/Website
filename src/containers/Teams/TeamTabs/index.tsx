import React, {FC, ReactNode, useEffect, useMemo, useState} from 'react';
import {useHistory} from 'react-router';
import clsx from 'clsx';

import './TeamTabs.scss';
import {allTeamsFilter} from 'constants/teams';
import {TeamTabOptions} from 'types/teams';

interface ComponentProps {
  team: string;
  tab: string;
}

const TeamTabs: FC<ComponentProps> = ({team, tab}) => {
  const history = useHistory();
  const [activeTab, setActiveTab] = useState<string>();

  const tabs = useMemo(
    () =>
      team === allTeamsFilter.title
        ? [TeamTabOptions.members, TeamTabOptions.resources]
        : [TeamTabOptions.overview, TeamTabOptions.members],
    [team],
  );

  useEffect(() => {
    setActiveTab(tab);
  }, [team, tab]);

  const renderTabs = (): ReactNode => {
    return (
      <div className="TeamsTabs__tabs-container">
        {tabs.map((tabView) => (
          <div
            className={clsx('TeamsTabs__tab', {'TeamsTabs__tab--active': activeTab === tabView})}
            key={tabView}
            onClick={() => history.push(`/teams/${team}/${tabView}`)}
            role="button"
            tabIndex={0}
          >
            {tabView}
          </div>
        ))}
      </div>
    );
  };

  return <div className="TeamsTabs">{renderTabs()}</div>;
};

export default TeamTabs;
