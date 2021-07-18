import React from 'react';

import {Divider, DocImage, Note, NoteType} from 'components';
import {ArchitectureDeepDiveId} from '../../../constants';
import HaltRequestedImage from '../../../assets/HaltRequested.svg';
import BlockchainHaltedImage from '../../../assets/BlockchainHalted.svg';
import LongestBlockchainImage from '../../../assets/LongestBlockchain.svg';
import SyncingBlockchainsImage from '../../../assets/SyncingBlockchains.svg';
import LastStepImage from '../../../assets/LastStep.svg';

import '../ArchitectureDeepDive.scss';

const ConsensusCV = () => {
  return (
    <div className="ConsensusCV" id={ArchitectureDeepDiveId.Consensus}>
      <div className="ArchitectureDeepDive__section-title">Consensus between Confirmation Validators</div>
      <p className="ArchitectureDeepDive__description">
        The decision of whether or not to skip a PV is determined by consensus between the CVs. This process happens
        when a PV’s blocks are scrutinized and directly affects the schedule. When a majority of CVs vote to skip the PV
        during its turn, all CVs must reach consensus on exactly which block the next PV should take over. This is
        because in the middle of each turn, there is no guarantee that all CVs will be perfectly in sync and they might
        have blockchains of varying length. The process for switching to a new PV before the turn finishes follows.
      </p>
      <p className="ArchitectureDeepDive__description">
        At the beginning of each turn, when a new PV takes over, each CV keeps an independent record of all other CVs'
        voting statuses.
      </p>
      <ul className="ArchitectureDeepDive__points">
        <li className="ArchitectureDeepDive__point">
          <span className="ArchitectureDeepDive__emphasized-text">Step 1</span> - If a CV finds an issue with the PV
          (performance, error, offline, and so on) this CV sets its status to halt requested and broadcasts that message
          out to all other validators.
        </li>
      </ul>
      <DocImage alt="Halt Requested CV" maxWidth={624} src={HaltRequestedImage} />
      <Divider className="ArchitectureDeepDive__point-divider" />
      <ul className="ArchitectureDeepDive__points">
        <li className="ArchitectureDeepDive__point">
          <span className="ArchitectureDeepDive__emphasized-text">Step 2</span> - When the other CVs receive a majority
          of halt requests, the receiving CV will halt production of their blockchain.
        </li>
      </ul>
      <Divider className="ArchitectureDeepDive__point-divider" />
      <ul className="ArchitectureDeepDive__points">
        <li className="ArchitectureDeepDive__point">
          <span className="ArchitectureDeepDive__emphasized-text">Step 3</span> - After stopping production, that CV
          will set its own status to blockchain halted and broadcast that message along with the block number of its
          HEAD block (its last block before halting) out to all other CVs.
        </li>
      </ul>
      <DocImage alt="Blockchain Halted CV" maxWidth={349} src={BlockchainHaltedImage} />
      <Divider className="ArchitectureDeepDive__point-divider" />
      <ul className="ArchitectureDeepDive__points">
        <li className="ArchitectureDeepDive__point">
          <span className="ArchitectureDeepDive__emphasized-text">Step 4</span> - All CVs follow similar logic resulting
          in each CV receiving the HEAD block from its peers.
        </li>
      </ul>
      <Divider className="ArchitectureDeepDive__point-divider" />
      <ul className="ArchitectureDeepDive__points">
        <li className="ArchitectureDeepDive__point">
          <span className="ArchitectureDeepDive__emphasized-text">Step 5</span> - When the majority of blockchain halted
          requests have been received, the CVs begin the syncing process. This involves first calculating the longest
          blockchain.
        </li>
      </ul>
      <DocImage alt="Longest Blockchain" maxWidth={349} src={LongestBlockchainImage} />
      <Divider className="ArchitectureDeepDive__point-divider" />
      <ul className="ArchitectureDeepDive__points">
        <li className="ArchitectureDeepDive__point">
          <span className="ArchitectureDeepDive__emphasized-text">Step 6</span> - Once the longest blockchain has been
          determined, all other CVs sync their own blockchains up to that block.
        </li>
      </ul>
      <DocImage alt="Syncing Blockchain" maxWidth={349} src={SyncingBlockchainsImage} />
      <Note
        type={NoteType.Information}
        text="The receiving CV only needs a majority of responses from the other CVs before syncing. This is  because once a majority 
of responses has been received, all unknown responses would be from a minority of validators. So, it would be impossible 
for that minority to have any longer blockchain, given that a majority consensus must be reached to append a block to the
 blockchain. Given the status of the halted CVs where each of their HEAD blocks are known, this would be impossible."
      />
      <Divider className="ArchitectureDeepDive__point-divider" />
      <ul className="ArchitectureDeepDive__points">
        <li className="ArchitectureDeepDive__point">
          <span className="ArchitectureDeepDive__emphasized-text">Step 7</span> - Once synced, CVs send out a sync
          switch request.
        </li>
      </ul>
      <Divider className="ArchitectureDeepDive__point-divider" />
      <ul className="ArchitectureDeepDive__points">
        <li className="ArchitectureDeepDive__point">
          <span className="ArchitectureDeepDive__emphasized-text">Step 8</span> - When the majority of CVs receive a
          sync switch request, they all switch over to the new PV
        </li>
      </ul>
      <DocImage alt="Last Step CV" maxWidth={554} src={LastStepImage} />
      <Divider className="ArchitectureDeepDive__section-divider" />
    </div>
  );
};

export default ConsensusCV;
