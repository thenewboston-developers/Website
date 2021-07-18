export const PATHNAME_TO_TITLE_MAPPING: Record<string, string> = {
  architecture: 'Architecture - Deep Dive',
  developer: 'Developer',
  'principal-entities': 'Principal Entities on the Network',
  'principal-events': 'Principal Events and Processes on the Network',
  whitepaper: 'Living Whitepaper',
};

export enum ArchitectureDeepDiveId {
  BlockStructure = 'architecture-block-structure',
  SignedChangeRequest = 'architecture-signature-change-request',
  MessageFields = 'architecture-message-fields',
  AccountLock = 'architecture-account-lock',
  NodeIdentifier = 'architecture-node-identifier',
  SampleRequestAndResponse = 'architecture-sample-request-and-response',
  AddingValidators = 'architecture-adding-validators',
  Consensus = 'architecture-consensus',
  NetworkInitialization = 'architecture-network-initialization',
  Faq = 'architecture-faq',
}

export enum PrincipleEntitiesId {
  Overview = 'principal-entities-overview',
  BlockchainOptimizations = 'blockchain-optimizations',
  Account = 'principal-entities-account',
  Nodes = 'principal-entities-nodes',
  BlocksAndBlockchain = 'blocks-and-blockchain',
  Validators = 'principal-entities-validators',
  NodeRoles = 'principal-entities-node-roles',
  LockedCoinsAndBoosts = 'principal-entities-locked-coins-and-boosts',
  CoinsVsPoints = 'principal-entities-coins-vs-points',
  Governance = 'principal-entities-governance',
  Budget = 'principal-entities-budget',
  Fees = 'principal-entities-fees',
  Glossary = 'principal-entities-glossary',
}

export enum PrincipalEventsId {
  Overview = 'principal-events-overview',
  Scheduling = 'principal-events-scheduling',
  DataFlows = 'principal-events-data-flows',
  ScheduleAdjustment = 'principal-events-schedule-adjustment',
  ValidatorDataFlow = 'principal-events-validator-data-flow',
  NetworkDataFlow = 'principal-events-network-data-flow',
  ForkPrevention = 'principal-events-fork-prevention',
  HandlingPV = 'principal-events-handling-pv',
  PointsRefilling = 'principal-events-points-refilling',
  ElectionProcess = 'principal-events-election-process',
  RatesAndAmounts = 'principal-events-rates-and-amounts',
  ConversionRates = 'principal-events-conversion-rates',
  UsernameAndVotes = 'principal-events-username-and-votes',
  LockedCoinsAndBoosts = 'principal-events-locked-coins-and-boosts',
  Points = 'principal-events-points',
  TreasuryBoard = 'principal-events-treasury-board',
  Government = 'principal-events-government',
  Nodes = 'principal-events-nodes',
}

export const principalEntitiesPath = '/developer/whitepaper/principal-entities';
export const principalEventsPath = '/developer/whitepaper/principal-events';
export const architecturePath = '/developer/whitepaper/architecture';

export const PATHNAME_TO_DROPDOWN_SELECTIONS: Record<string, {title: string; url: string}[]> = {
  architecture: [
    {
      title: 'Block structure',
      url: `${architecturePath}#${ArchitectureDeepDiveId.BlockStructure}`,
    },
    {
      title: 'Signed Change Request Fields',
      url: `${architecturePath}#${ArchitectureDeepDiveId.SignedChangeRequest}`,
    },
    {
      title: 'Message Fields',
      url: `${architecturePath}#${ArchitectureDeepDiveId.MessageFields}`,
    },
    {
      title: 'Account Lock',
      url: `${architecturePath}#${ArchitectureDeepDiveId.AccountLock}`,
    },
    {
      title: 'Node Identifier',
      url: `${architecturePath}#${ArchitectureDeepDiveId.NodeIdentifier}`,
    },
    {
      title: 'Sample Request and Response',
      url: `${architecturePath}#${ArchitectureDeepDiveId.SampleRequestAndResponse}`,
    },
    {
      title: 'Adding Validators to the Schedule',
      url: `${architecturePath}#${ArchitectureDeepDiveId.AddingValidators}`,
    },
    {
      title: 'Consensus between Confirmation Validators',
      url: `${architecturePath}#${ArchitectureDeepDiveId.Consensus}`,
    },
    {
      title: 'Network Initialization',
      url: `${architecturePath}#${ArchitectureDeepDiveId.NetworkInitialization}`,
    },
    {
      title: 'FAQ',
      url: `${architecturePath}#${ArchitectureDeepDiveId.Faq}`,
    },
  ],
  'principal-entities': [
    {
      title: 'Overview',
      url: `${principalEntitiesPath}#${PrincipleEntitiesId.Overview}`,
    },
    {
      title: 'Blockchain Optimizations',
      url: `${principalEntitiesPath}#${PrincipleEntitiesId.BlockchainOptimizations}`,
    },
    {
      title: 'Account',
      url: `${principalEntitiesPath}#${PrincipleEntitiesId.Account}`,
    },
    {
      title: 'Nodes',
      url: `${principalEntitiesPath}#${PrincipleEntitiesId.Nodes}`,
    },
    {
      title: 'Blocks and Blockchain',
      url: `${principalEntitiesPath}#${PrincipleEntitiesId.BlocksAndBlockchain}`,
    },
    {
      title: 'Validators',
      url: `${principalEntitiesPath}#${PrincipleEntitiesId.Validators}`,
    },
    {
      title: 'Node Roles',
      url: `${principalEntitiesPath}#${PrincipleEntitiesId.NodeRoles}`,
    },
    {
      title: 'Locked Coins and Boosts',
      url: `${principalEntitiesPath}#${PrincipleEntitiesId.LockedCoinsAndBoosts}`,
    },
    {
      title: 'Coins vs. Points',
      url: `${principalEntitiesPath}#${PrincipleEntitiesId.CoinsVsPoints}`,
    },
    {
      title: 'Governance',
      url: `${principalEntitiesPath}#${PrincipleEntitiesId.Governance}`,
    },
    {
      title: 'Budget',
      url: `${principalEntitiesPath}#${PrincipleEntitiesId.Budget}`,
    },
    {
      title: 'Fees',
      url: `${principalEntitiesPath}#${PrincipleEntitiesId.Fees}`,
    },
    {
      title: 'Glossary of Main Entities',
      url: `${principalEntitiesPath}#${PrincipleEntitiesId.Glossary}`,
    },
  ],
  'principal-events': [
    {
      title: 'Overview',
      url: `${principalEventsPath}#${PrincipalEventsId.Overview}`,
    },
    {
      title: 'Scheduling',
      url: `${principalEventsPath}#${PrincipalEventsId.Scheduling}`,
    },
    {
      title: 'Data Flows',
      url: `${principalEventsPath}#${PrincipalEventsId.DataFlows}`,
    },
    {
      title: 'Validator Data Flow',
      url: `${principalEventsPath}#${PrincipalEventsId.ValidatorDataFlow}`,
    },
    {
      title: 'Network Data Flow',
      url: `${principalEventsPath}#${PrincipalEventsId.NetworkDataFlow}`,
    },
    {title: 'Schedule Adjustment', url: `${principalEventsPath}#${PrincipalEventsId.ScheduleAdjustment}`},
    {
      title: 'Fork Prevention and Validation Threshold',
      url: `${principalEventsPath}#${PrincipalEventsId.ForkPrevention}`,
    },
    {
      title: 'Handling PV non-responsiveness',
      url: `${principalEventsPath}#${PrincipalEventsId.HandlingPV}`,
    },
    {
      title: 'Points Refilling',
      url: `${principalEventsPath}#${PrincipalEventsId.PointsRefilling}`,
    },
    {
      title: 'Election Process',
      url: `${principalEventsPath}#${PrincipalEventsId.ElectionProcess}`,
    },
    {
      title: 'Rates & Amounts',
      url: `${principalEventsPath}#${PrincipalEventsId.RatesAndAmounts}`,
    },
    {
      title: 'Conversion Rates',
      url: `${principalEventsPath}#${PrincipalEventsId.ConversionRates}`,
    },
    {
      title: 'Username & Votes',
      url: `${principalEventsPath}#${PrincipalEventsId.UsernameAndVotes}`,
    },
    {
      title: 'Locked Coins & Boosts',
      url: `${principalEventsPath}#${PrincipalEventsId.LockedCoinsAndBoosts}`,
    },
    {
      title: 'Points',
      url: `${principalEventsPath}#${PrincipalEventsId.Points}`,
    },
    {
      title: 'Treasury Board',
      url: `${principalEventsPath}#${PrincipalEventsId.TreasuryBoard}`,
    },
    {
      title: 'Government',
      url: `${principalEventsPath}#${PrincipalEventsId.Government}`,
    },
    {
      title: 'Nodes',
      url: `${principalEventsPath}#${PrincipalEventsId.Nodes}`,
    },
  ],
  whitepaper: [
    {
      title: PATHNAME_TO_TITLE_MAPPING['principal-entities'],
      url: principalEntitiesPath,
    },
    {
      title: PATHNAME_TO_TITLE_MAPPING['principal-events'],
      url: principalEventsPath,
    },
    {
      title: PATHNAME_TO_TITLE_MAPPING.architecture,
      url: architecturePath,
    },
  ],
};
