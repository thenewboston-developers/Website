import {AnalyticsType} from 'types/analytics';

export const getAnalyticTypeLabel = (type: AnalyticsType): string => {
  switch (type) {
    case AnalyticsType.community:
      return 'Community';
    case AnalyticsType.economy:
      return 'Economy';
    case AnalyticsType.facebook:
      return 'Facebook';
    case AnalyticsType.instagram:
      return 'Instagram';
    case AnalyticsType.linkedin:
      return 'Linkedin';
    case AnalyticsType.network:
      return 'Network';
    case AnalyticsType.twitter:
      return 'Twitter';
    case AnalyticsType.website:
      return 'Website';
    default:
      return 'Other Social';
  }
};
