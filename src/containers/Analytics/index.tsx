import React, {FC, ReactNode, useCallback} from 'react';
import {Redirect, useHistory, useParams} from 'react-router-dom';

import {Container, FlatNavLinks, PageTitle} from 'components';
import {useWindowDimensions} from 'hooks';
import {AnalyticsType, AnalyticsUrlParams, orderedAnalyticsType} from 'types/analytics';

import AnalyticsIcon from './AnalyticsIcon';
import AnalyticsGraph from './AnalyticsGraph';
import AnalyticsMobileDropdown from './AnalyticsMobileDropdown';
import {getAnalyticTypeLabel} from './utils';
import './Analytics.scss';

const analyticsNavOptions = orderedAnalyticsType.map((type) => ({
  pathname: type,
  title: getAnalyticTypeLabel(type),
}));

const Analytics: FC = () => {
  const history = useHistory();
  const {type} = useParams<AnalyticsUrlParams>();
  const {clientWidth} = useWindowDimensions();

  const handleNavOptionClick = useCallback(
    (option: string) => (): void => {
      history.push(`/analytics/${option}`);
    },
    [history],
  );

  const renderNavLinks = useCallback((): ReactNode => {
    if (!type) return null;
    return (
      <FlatNavLinks handleOptionClick={handleNavOptionClick} options={analyticsNavOptions} selectedOption={type} />
    );
  }, [handleNavOptionClick, type]);

  if (!type) {
    return <Redirect to={`/analytics/${AnalyticsType.community}`} />;
  }
  const analyticsTypeLabel = getAnalyticTypeLabel(type);

  return (
    <div className="Analytics__wrapper">
      <PageTitle ogDescription={`${analyticsTypeLabel} Analytics`} title={`${analyticsTypeLabel} Analytics`} />
      <Container className="Analytics">
        <div className="Analytics__icon-container">
          <AnalyticsIcon />
          <span className="Analytics__icon-text">Analytics Dashboard</span>
        </div>
        {clientWidth <= 992 && <AnalyticsMobileDropdown navLinks={renderNavLinks()} selectedType={type} />}
        <aside className="Analytics__left-menu">{renderNavLinks()}</aside>
        <div className="Analytics__title-container">
          <h1 className="Analytics__title">{analyticsTypeLabel} Analytics</h1>
          <span className="Analytics__weekly">WEEKLY</span>
        </div>
        <div className="Analytics__main-container">
          <AnalyticsGraph title="Total Coins Distributed" />
          <AnalyticsGraph title="Total Coins Distributed to Core" />
          <AnalyticsGraph title="Total Coins Distributed to Faucet" />
          <AnalyticsGraph title="Total Coins Distributed to Projects" />
        </div>
      </Container>
    </div>
  );
};

export default Analytics;
