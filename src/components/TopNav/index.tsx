import React, {FC, ReactNode, useCallback, useEffect, useState} from 'react';
import {Link, useLocation} from 'react-router-dom';
import clsx from 'clsx';

import {A, Button, Icon, IconType} from 'components';
import {useBooleanState, useWindowDimensions} from 'hooks';

import TopNavLogo from './TopNavLogo';
import TopNavPopoverButton from './TopNavPopoverButton';
import TopNavPopoverItem from './TopNavPopoverItem';
import './TopNav.scss';

interface ComponentProps {
  className?: string;
}

const TopNav: FC<ComponentProps> = ({className}) => {
  const [mobileMenuOpen, toggleMobileMenu, , closeMobileMenu] = useBooleanState(false);
  const {pathname} = useLocation();
  const [communityAnchorEl, setCommunityAnchorEl] = useState<HTMLButtonElement | null>(null);
  const [getStartedAnchorEl, setGetStartedAnchorEl] = useState<HTMLButtonElement | null>(null);
  const [moreAnchorEl, setMoreAnchorEl] = useState<HTMLButtonElement | null>(null);
  const {width} = useWindowDimensions();

  useEffect(() => {
    closeMobileMenu();
  }, [closeMobileMenu, pathname]);

  useEffect(() => {
    if (width > 992 && mobileMenuOpen) {
      closeMobileMenu();
    }
  }, [closeMobileMenu, mobileMenuOpen, width]);

  const renderMobileMenu = (): ReactNode => {
    return (
      <div className="mobile-menu">
        <button className="mobile-menu__button" onClick={toggleMobileMenu}>
          <Icon icon={IconType.menu} size={24} />
        </button>
        {renderMobileDropdownMenu()}
      </div>
    );
  };

  const renderCommunityPopover = (): ReactNode => {
    return (
      <>
        <TopNavPopoverItem
          closePopover={unsetCommunityAnchorEl}
          description="Slack, GitHub, YouTube, LinkedIn, etc"
          iconType={IconType.earth}
          title="Join the Community!"
          to="/social"
        />
        <TopNavPopoverItem
          closePopover={unsetCommunityAnchorEl}
          description="Join the team building the app"
          iconType={IconType.humanHandsUp}
          title="Openings"
          to="/openings"
        />
        <TopNavPopoverItem
          closePopover={unsetCommunityAnchorEl}
          description="Meet our growing team"
          iconType={IconType.accountGroup}
          title="Team"
          to="/teams"
        />
        <TopNavPopoverItem
          closePopover={unsetCommunityAnchorEl}
          description="View the highest ranked contributors"
          iconType={IconType.trophy}
          title="Leaderboard"
          to="/leaderboard/All"
        />
      </>
    );
  };

  const renderGetStartedPopover = (): ReactNode => {
    return (
      <>
        <TopNavPopoverItem
          closePopover={unsetGetStartedAnchorEl}
          description="Start reading into Guides and APIs"
          iconType={IconType.fileDocument}
          title="Documentation"
          to="/guide/introduction"
        />
        <TopNavPopoverItem
          closePopover={unsetGetStartedAnchorEl}
          description="Pick up tasks within GitHub and earn coins"
          iconSize={28}
          iconType={IconType.github}
          title="Tasks"
          to="/tasks"
        />
      </>
    );
  };

  const renderMorePopover = (): ReactNode => {
    return (
      <>
        <TopNavPopoverItem
          closePopover={unsetMoreAnchorEl}
          description="Propose ideas you want built"
          iconType={IconType.hammerWrench}
          title="Project Proposals"
          to="/project-proposals/overview"
        />
        <TopNavPopoverItem
          closePopover={unsetMoreAnchorEl}
          description="Download thenewboston assets"
          iconType={IconType.fileDownload}
          title="Assets"
          to="/assets"
        />
        <TopNavPopoverItem
          closePopover={unsetMoreAnchorEl}
          description="Frequently asked questions"
          iconType={IconType.forum}
          title="FAQ"
          to="/faq"
        />
        <TopNavPopoverItem
          closePopover={unsetMoreAnchorEl}
          description="Support thenewboston"
          iconType={IconType.currencyUsd}
          title="Donate"
          to="/donate"
        />
      </>
    );
  };

  const renderMenuItems = (): ReactNode => {
    return (
      <>
        <TopNavPopoverButton
          anchorEl={getStartedAnchorEl}
          buttonText="Get Started"
          className="TopNav__right-item"
          popoverId="get-started-popover"
          setAnchorEl={setGetStartedAnchorEl}
          unsetAnchorEl={unsetGetStartedAnchorEl}
        >
          {renderGetStartedPopover()}
        </TopNavPopoverButton>
        <TopNavPopoverButton
          anchorEl={communityAnchorEl}
          buttonText="Community"
          className="TopNav__right-item"
          popoverId="community-popover"
          setAnchorEl={setCommunityAnchorEl}
          unsetAnchorEl={unsetCommunityAnchorEl}
        >
          {renderCommunityPopover()}
        </TopNavPopoverButton>
        <TopNavPopoverButton
          anchorEl={moreAnchorEl}
          buttonText="More"
          className="TopNav__right-item"
          popoverId="more-popover"
          setAnchorEl={setMoreAnchorEl}
          unsetAnchorEl={unsetMoreAnchorEl}
        >
          {renderMorePopover()}
        </TopNavPopoverButton>
        <Link className={clsx('TopNav__right-item', 'TopNav__download-button')} tabIndex={-1} to="/download">
          <Button>Download</Button>
        </Link>
        <A
          className={clsx('TopNav__right-item', 'TopNav__download-button')}
          href={`https://github.com/login/oauth/authorize?client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&scope=read%3auser%20user%3aemail%20`}
        >
          <Button>Login with GitHub</Button>
        </A>
      </>
    );
  };

  const renderMobileDropdownMenu = (): ReactNode => {
    if (!mobileMenuOpen) return null;
    return (
      <>
        <div className="mobile-menu__dropdown-container">
          <div className="mobile-menu__column">
            <div className="mobile-menu__column-title">Get Started</div>
            {renderMobileLink('Documentation', '/guide/introduction')}
            {renderMobileLink('Tasks', '/tasks')}
            {renderMobileLink('Download', '/download')}
          </div>
          <div className="mobile-menu__column">
            <div className="mobile-menu__column-title">Community</div>
            {renderMobileLink('Join the Community!', '/social')}
            {renderMobileLink('Openings', '/openings')}
            {renderMobileLink('Teams', '/teams')}
            {renderMobileLink('Leaderboard', '/leaderboard/All')}
          </div>
          <div className="mobile-menu__column">
            <div className="mobile-menu__column-title">More</div>
            {renderMobileLink('Project Proposals', '/project-proposals/overview')}
            {renderMobileLink('Assets', '/assets')}
            {renderMobileLink('FAQ', '/faq')}
            {renderMobileLink('Donate', '/donate')}
          </div>
        </div>
        <div className={clsx('mobile-menu__overlay')} onClick={closeMobileMenu} role="button" tabIndex={0} />
      </>
    );
  };

  const renderMobileLink = (label: string, to: string): ReactNode => {
    return (
      <Link className="mobile-menu__link" to={to}>
        {label}
      </Link>
    );
  };

  const renderRightItems = (): ReactNode => {
    return (
      <div className="TopNav__right">
        {renderMenuItems()}
        {renderMobileMenu()}
      </div>
    );
  };

  const unsetCommunityAnchorEl = useCallback((): void => {
    setCommunityAnchorEl(null);
  }, [setCommunityAnchorEl]);

  const unsetGetStartedAnchorEl = useCallback((): void => {
    setGetStartedAnchorEl(null);
  }, [setGetStartedAnchorEl]);

  const unsetMoreAnchorEl = useCallback((): void => {
    setMoreAnchorEl(null);
  }, [setMoreAnchorEl]);

  return (
    <header className={clsx('TopNav', className)}>
      <div className="TopNav__left">
        <TopNavLogo />
      </div>
      {renderRightItems()}
    </header>
  );
};

export default TopNav;
