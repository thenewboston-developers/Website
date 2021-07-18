export interface Opening {
  applicationUrl: string;
  category: OpeningCategory;
  description: string;
  openingId: string;
  position: string;
  project?: ProjectProposal;
  responsibilities: string[];
  requirements: string[];
}

export enum OpeningCategory {
  all = 'All',
  community = 'Community',
  design = 'Design',
  engineering = 'Engineering',
  marketing = 'Marketing',
}

export interface OpeningsUrlParams {
  category: OpeningCategory;
  openingId: string;
}

export interface ProjectProposal {
  name: string;
  url?: string;
}
