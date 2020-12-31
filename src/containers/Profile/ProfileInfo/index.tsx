import React, {FC} from 'react';
import {useSelector} from 'react-redux';
import {useParams} from 'react-router-dom';

import DefaultUserAvatar from 'assets/images/default-avatar.png';
import {A, Avatar, CopyableAccountNumber, EmptyPage, Icon, IconType, Qr} from 'components';
import EditUserModal from 'containers/EditUserModal';
import {useBooleanState} from 'hooks';
import {selectActiveUser} from 'selectors/state';
import {User} from 'types/app/User';
import {TeamMember} from 'types/teams';
import {getContributorByGithubUsername, getTeamMemberByGithubUsername, getTeamPathname} from 'utils/data';

import './ProfileInfo.scss';

interface ComponentProps {
  user: User;
}

interface ProfileUrlParams {
  userId: string;
}

const ProfileInfo: FC<ComponentProps> = ({user}) => {
  const activeUser = useSelector(selectActiveUser);
  const contributorDetails = getContributorByGithubUsername(user.github_username);
  const memberDetails = getTeamMemberByGithubUsername(user.github_username);
  const {userId} = useParams<ProfileUrlParams>();
  const [editUserModalIsOpen, toggleEditUserModal] = useBooleanState(false);

  if (!contributorDetails) {
    return <EmptyPage className="ProfileInfo__empty-page" />;
  }

  const renderBackdrop = (isLead: boolean) => {
    return (
      <div className="ProfileInfo__backdrop-container">
        <div className="ProfileInfo__blue-backdrop" />
        {isLead && <div className="ProfileInfo__lead-flag">Team Lead</div>}
        {activeUser?.pk === userId && (
          <Icon
            className="ProfileInfo__edit-profile"
            icon={IconType.pencil}
            onClick={toggleEditUserModal}
            size={24}
            totalSize={36}
          />
        )}
      </div>
    );
  };

  const renderMemberDetails = (member: TeamMember) => {
    const {githubUsername, slackUsername, teams, titles} = member;
    return (
      <>
        {teams &&
          teams.map((team, index) => (
            <div className="ProfileInfo__member-title" key={team.title}>
              {titles[index]} on <A href={`/teams/${getTeamPathname(team.title)}`}>{team.title}</A>
            </div>
          ))}
        <div className="ProfileInfo__member-slack">
          <Icon className="ProfileInfo__member-slack-icon" icon={IconType.slack} size={18} />
          {slackUsername}
        </div>
        <div className="ProfileInfo__member-github">
          <Icon className="ProfileInfo__member-github-icon" icon={IconType.github} size={18} />
          <A className="ProfileInfo__member-github-link" href={`https://github.com/${user.github_username}`}>
            {githubUsername}
          </A>
        </div>
      </>
    );
  };

  const {account_number: accountNumber} = contributorDetails;

  return (
    <>
      <div className="ProfileInfo">
        <div className="ProfileInfo__top-section">
          {renderBackdrop(memberDetails?.isLead || false)}
          <Avatar
            className="ProfileInfo__profile-picture"
            alt={user.github_username}
            size={178}
            src={user.profile_image || DefaultUserAvatar}
          />
        </div>
        <div className="ProfileInfo__details">
          <div className="ProfileInfo__user-details">
            <div className="ProfileInfo__name">{user.display_name}</div>
            {memberDetails && renderMemberDetails(memberDetails)}
          </div>
          <div className="ProfileInfo__account-details">
            <CopyableAccountNumber
              accountNumber={accountNumber}
              className="ProfileInfo__CopyableAccountNumber"
              isCopyButtonAtBottom
            />
            <div className="ProfileInfo__qr-container">
              <Qr text={accountNumber} width={110} />
            </div>
          </div>
        </div>
      </div>
      {editUserModalIsOpen && <EditUserModal close={toggleEditUserModal} />}
    </>
  );
};

export default ProfileInfo;
