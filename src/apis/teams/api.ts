import axios from 'axios';

import * as usersApi from 'apis/users';
import {APIArrayResponse} from 'types/api';
import {CoreTeamMember, Team, CoreTeam} from 'types/teams';
import {GetCoreTeamResponse, GetCoreTeamMemberResponse, GetTeamMemberResponse} from './types';

export async function getTeamById(id: string): Promise<Team | null> {
  const response = await axios.get(`${process.env.REACT_APP_BACKEND_API}/teams/${id}`);
  return response.data ? response.data : null;
}

export async function getCoreTeams(): Promise<CoreTeam[]> {
  const response = await axios.get<APIArrayResponse<GetCoreTeamResponse>>(
    `${process.env.REACT_APP_BACKEND_API}/core_teams`,
  );

  if (!response.data) {
    throw new Error('Error while fetching core teams, please try again.');
  }

  return Promise.all(
    response.data.results.map(async (team: GetCoreTeamResponse) => {
      const teamMembers = await Promise.all(
        team.core_members_meta.map(async (teamMember: GetCoreTeamMemberResponse) => {
          // get User object for each team member
          const user = await usersApi.getUser({uuid: teamMember.user});
          if (user) {
            return {
              core_team: teamMember.core_team,
              hourly_rate: teamMember.hourly_rate,
              is_lead: teamMember.is_lead,
              job_title: teamMember.job_title,
              pk: teamMember.pk,
              team: teamMember.team,
              user,
              weekly_commitment_hours: teamMember.weekly_commitment_hours,
            };
          }
        }),
      );
      return {
        ...team,
        core_members_meta: teamMembers.filter((member) => member && member.user) as CoreTeamMember[],
      };
    }),
  );
}

export async function getTeamMemberByUserId(id: string): Promise<GetTeamMemberResponse | null> {
  const response = await axios.get<APIArrayResponse<GetTeamMemberResponse>>(
    `${process.env.REACT_APP_BACKEND_API}/teams_members?user=${id}`,
  );
  return response.data ? response.data.results[0] : null;
}
