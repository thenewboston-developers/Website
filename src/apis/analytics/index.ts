import axios from 'axios';

import {AnalyticsType} from 'types/analytics';
import {PaginatedResponse} from 'types/api';

type Test = 'string';

const getAnalyticsEndpointByType = (type: AnalyticsType): string => {
  const baseUrl = `${process.env.REACT_APP_BACKEND_API}/`;

  switch (type) {
    case AnalyticsType.community:
      return `${baseUrl}community_analytics`;
    case AnalyticsType.economy:
      return `${baseUrl}economy_analytics`;
    case AnalyticsType.facebook:
      return `${baseUrl}facebook_analytics`;
    case AnalyticsType.instagram:
      return `${baseUrl}instagram_analytics`;
    case AnalyticsType.linkedin:
      return `${baseUrl}linkedin_analytics`;
    case AnalyticsType.network:
      return `${baseUrl}network_analytics`;
    case AnalyticsType.twitter:
      return `${baseUrl}twitter_analytics`;
    case AnalyticsType.website:
      return `${baseUrl}website`;
    default:
      return `${baseUrl}other_social_analytics`;
  }
};

export async function getAnalyticsByType(type: AnalyticsType): Promise<Test[]> {
  const response = await axios.get<PaginatedResponse<Test>>(getAnalyticsEndpointByType(type));

  if (!response.data) {
    throw new Error('Error while fetching analytics data, please try again.');
  }
  return response.data.results;
}
