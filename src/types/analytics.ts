export enum AnalyticsType {
  community = 'community',
  economy = 'economy',
  facebook = 'facebook',
  instagram = 'instagram',
  linkedin = 'linkedin',
  network = 'network',
  other = 'other',
  twitter = 'twitter',
  website = 'website',
}

export interface AnalyticsUrlParams {
  type?: AnalyticsType;
}

export const orderedAnalyticsType = [
  AnalyticsType.community,
  AnalyticsType.economy,
  AnalyticsType.network,
  AnalyticsType.facebook,
  AnalyticsType.instagram,
  AnalyticsType.linkedin,
  AnalyticsType.twitter,
  AnalyticsType.other,
  AnalyticsType.website,
];
