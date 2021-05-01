import React, {FC, useEffect, useState} from 'react';
import {useSelector} from 'react-redux';
import {useParams} from 'react-router-dom';
import {Icon, IconType} from '@thenewboston/ui';

import {api as teamsApi, GetTeamMemberResponse} from 'apis/teams';
import {A, Avatar, CopyableAccountNumber, Loader, Qr} from 'components';
import EditUserModal from 'containers/EditUserModal';
import {useBooleanState} from 'hooks';
import {selectActiveUser} from 'selectors/state';
import {User} from 'types/app/User';
import {Team} from 'types/teams';
import {APIState, INITIAL_API_STATE, APIProgress} from 'types/api';

import './ProfileInfo.scss';

interface ComponentProps {
  user: User;
}

interface ProfileUrlParams {
  userId: string;
}

const ProfileInfo: FC<ComponentProps> = ({user}) => {
  const activeUser = useSelector(selectActiveUser);
  const [memberDetails, setMemberDetails] = useState<GetTeamMemberResponse | null>(null);
  const [team, setTeam] = useState<Team | null>(null);
  const {userId} = useParams<ProfileUrlParams>();
  const [editUserModalIsOpen, toggleEditUserModal] = useBooleanState(false);
  const [apiState, setAPIState] = useState<APIState>(INITIAL_API_STATE);

  useEffect(() => {
    async function getTeamMember() {
      setAPIState({...apiState, progress: APIProgress.REQ});
      const teamMember = await teamsApi.getTeamMemberByUserId(userId);

      if (!teamMember) {
        // user is not a team member, skip the rest
        setAPIState({...apiState, progress: APIProgress.SUCCESS});
        return;
      }
      const originTeam = await teamsApi.getTeamById(teamMember.team);
      if (originTeam) {
        setMemberDetails(teamMember);
        setTeam(originTeam);
      }
      setAPIState({...apiState, progress: APIProgress.SUCCESS});
    }
    getTeamMember();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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

  const renderMemberDetails = () => {
    return (
      <>
        {team && memberDetails && (
          <div className="ProfileInfo__member-title" key={team.title}>
            {memberDetails.job_title} on <A href={`/teams/${team.title}`}>{team.title}</A>
          </div>
        )}
        <div className="ProfileInfo__member-discord">
          <Icon className="ProfileInfo__member-discord-icon" icon={IconType.discord} size={18} />
          {user.discord_username}
        </div>
        <div className="ProfileInfo__member-github">
          <Icon className="ProfileInfo__member-github-icon" icon={IconType.github} size={18} />
          <A className="ProfileInfo__member-github-link" href={`https://github.com/${user.github_username}`}>
            {user.github_username}
          </A>
        </div>
      </>
    );
  };

  const isLoading = apiState.progress === APIProgress.REQ || apiState.progress === APIProgress.INIT;

  if (isLoading) {
    return (
      <div className="ProfileInfo__loader-container">
        <Loader />
      </div>
    );
  }

  return (
    <>
      <div className="ProfileInfo">
        <div className="ProfileInfo__top-section">
          {renderBackdrop(memberDetails?.is_lead || false)}
          <Avatar className="ProfileInfo__profile-picture" size={178} src={user.profile_image} />
        </div>
        <div className="ProfileInfo__details">
          <div className="ProfileInfo__user-details">
            <div className="ProfileInfo__name">{user.display_name}</div>
            {renderMemberDetails()}
          </div>
          {user.account_number && (
            <div className="ProfileInfo__account-details">
              <CopyableAccountNumber
                accountNumber={user.account_number}
                className="ProfileInfo__CopyableAccountNumber"
                isCopyButtonAtBottom
              />
              <div className="ProfileInfo__qr-container">
                <Qr text={user.account_number} width={110} />
              </div>
            </div>
          )}
        </div>
      </div>
      {editUserModalIsOpen && <EditUserModal close={toggleEditUserModal} />}
    </>
  );
};

export default ProfileInfo;
