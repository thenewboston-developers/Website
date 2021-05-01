export type GetTeamResponse = {
  team_members_meta: GetTeamMemberResponse[];
  created_date: string;
  modified_date: string;
  pk: string;
  title: string;
  about: string;
  responsibilities: string[];
  github: string;
  discord: string;
};

export type GetTeamMemberResponse = {
  user: string; // foreign key to user
  is_lead: boolean;
  team: string; // foreign key to team
  pk: string;
  job_title: string;
  modified_date: string;
  created_date: string;
};

export type GetCoreTeamResponse = Omit<GetTeamResponse, 'team_members_meta'> & {
  core_members_meta: GetCoreTeamMemberResponse[];
};

export type GetCoreTeamMemberResponse = GetTeamMemberResponse & {
  weekly_commitment_hours: number;
  hourly_rate: number;
  core_team: string; // foreign key to core team
};
