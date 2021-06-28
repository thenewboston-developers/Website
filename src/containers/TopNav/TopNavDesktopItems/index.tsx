import React, {useMemo, useState} from 'react';
import {useSelector} from 'react-redux';
import {Link} from 'react-router-dom';
import {IconType} from '@thenewboston/ui';

import {Avatar, Button} from 'components';
import {isCreateAccountAllowed, isSignInAllowed} from 'config';
import TopNavLink from 'containers/TopNav/TopNavLink';
import TopNavPopover, {TopNavPopoverItemType} from 'containers/TopNav/TopNavPopover';
import {selectActiveUser} from 'selectors/state';

import './TopNavDesktopItems.scss';

const communityPopoverItems: TopNavPopoverItemType[] = [
  {
    description: 'Discord, GitHub, YouTube, LinkedIn, etc',
    iconType: IconType.earth,
    title: 'Join the Community!',
    to: '/social',
  },
  {
    description: 'Stay up to date with our weekly sprints',
    iconType: IconType.chartTimelineVariantShimmer,
    title: 'Weekly Progress',
    to: '/progress',
  },
  {
    description: 'Join the team building the app',
    iconType: IconType.humanHandsup,
    title: 'Openings',
    to: '/openings',
  },
  {
    description: 'Read up on our community culture',
    iconType: IconType.notebookCheckOutline,
    title: 'Community Guidelines',
    to: '/guidelines',
  },
];

const getStartedPopoverItems: TopNavPopoverItemType[] = [
  {
    description: 'Pick up tasks within GitHub and earn coins',
    iconSize: 28,
    iconType: IconType.github,
    title: 'Tasks',
    to: '/tasks',
  },
  {
    description: 'Propose ideas you want built',
    iconType: IconType.hammerWrench,
    title: 'Projects',
    to: '/projects',
  },
  {
    description: 'Real time analytics',
    iconType: IconType.chartAreaspline,
    title: 'Analytics',
    to: '/analytics',
  },
];

const resourcesPopoverItems: TopNavPopoverItemType[] = [
  {
    description: 'Start reading into Guides and APIs',
    iconType: IconType.fileDocument,
    title: 'Documentation',
    to: '/guide/introduction',
  },
  {
    description: 'Watch tutorials made by the community',
    iconType: IconType.playBoxMultiple,
    title: 'Tutorials',
    to: '/tutorials',
  },
  {
    description: 'Download thenewboston assets',
    iconType: IconType.fileDownload,
    title: 'Media Kit',
    to: '/assets',
  },
];

const aboutPopoverItems: TopNavPopoverItemType[] = [
  {
    description: 'Meet our awesome teams',
    iconType: IconType.accountGroup,
    title: 'Teams',
    to: '/teams',
  },
  {
    description: 'Support thenewboston',
    iconType: IconType.currencyUsd,
    title: 'Donate',
    to: '/donate',
  },
];

const TopNavDesktopItems = () => {
  const activeUser = useSelector(selectActiveUser);
  const [activeUserAnchorEl, setActiveUserAnchorEl] = useState<HTMLButtonElement | null>(null);
  const [communityAnchorEl, setCommunityAnchorEl] = useState<HTMLButtonElement | null>(null);
  const [getStartedAnchorEl, setGetStartedAnchorEl] = useState<HTMLButtonElement | null>(null);
  const [resourcesAnchorEl, setResourcesAnchorEl] = useState<HTMLButtonElement | null>(null);
  const [aboutAnchorEl, setAboutAnchorEl] = useState<HTMLButtonElement | null>(null);

  const activeUserPopoverItems = useMemo<TopNavPopoverItemType[]>(() => {
    if (activeUser) {
      return [
        {title: 'Your Profile', to: `/users/${activeUser.pk}`},
        {title: 'Sign Out', to: '/sign-out'},
      ];
    }
    return [];
  }, [activeUser]);

  const renderActiveUser = () => {
    if (!activeUser) return null;
    const {profile_image: profileImage} = activeUser;
    return (
      <TopNavPopover
        className="TopNavDesktopItems__profile-image"
        anchorEl={activeUserAnchorEl}
        customButtonContent={<Avatar src={profileImage} size={36} />}
        items={activeUserPopoverItems}
        popoverId="active-user-popover"
        setAnchorEl={setActiveUserAnchorEl}
      />
    );
  };

  const renderAuthButtons = () => {
    if (activeUser) return null;
    return (
      <>
        {isCreateAccountAllowed && (
          <TopNavLink className="TopNavDesktopItems__right-item" text="Create Account" to="/create-account" />
        )}
        {isSignInAllowed && <TopNavLink className="TopNavDesktopItems__right-item" text="Sign In" to="/sign-in" />}
      </>
    );
  };

  return (
    <>
      <TopNavPopover
        anchorEl={getStartedAnchorEl}
        buttonText="Get Started"
        className="TopNavDesktopItems__right-item"
        items={getStartedPopoverItems}
        popoverId="get-started-popover"
        setAnchorEl={setGetStartedAnchorEl}
      />
      <TopNavPopover
        anchorEl={communityAnchorEl}
        buttonText="Community"
        className="TopNavDesktopItems__right-item"
        items={communityPopoverItems}
        popoverId="community-popover"
        setAnchorEl={setCommunityAnchorEl}
      />
      <TopNavPopover
        anchorEl={resourcesAnchorEl}
        buttonText="Resources"
        className="TopNavDesktopItems__right-item"
        items={resourcesPopoverItems}
        popoverId="resources-popover"
        setAnchorEl={setResourcesAnchorEl}
      />
      <TopNavPopover
        anchorEl={aboutAnchorEl}
        buttonText="About"
        className="TopNavDesktopItems__right-item"
        items={aboutPopoverItems}
        popoverId="about-popover"
        setAnchorEl={setAboutAnchorEl}
      />
      <Link className="TopNavDesktopItems__right-item TopNavDesktopItems__link" tabIndex={-1} to="/faq">
        FAQ
      </Link>
      <div className="TopNavDesktopItems__separator" />
      {renderAuthButtons()}
      <Link className="TopNavDesktopItems__right-item TopNavDesktopItems__download-button" tabIndex={-1} to="/download">
        <Button>Download Wallet</Button>
      </Link>
      {renderActiveUser()}
    </>
  );
};

export default TopNavDesktopItems;
