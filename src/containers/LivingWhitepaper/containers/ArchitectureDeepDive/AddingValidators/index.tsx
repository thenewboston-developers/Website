import React from 'react';

import {Divider, DocImage} from 'components';
import {ArchitectureDeepDiveId} from '../../../constants';
import PVInitProcessImage from '../../../assets/PVInitializationProcess.svg';
import PVInitProcessMultipleCandidatesImage from '../../../assets/PVInitializationProcessMultipleCandidates.svg';
import ScheduleGenerationImage from '../../../assets/ScheduleGeneration.svg';
import RoundImage from '../../../assets/Round.svg';

import './AddingValidators.scss';
import '../ArchitectureDeepDive.scss';

const AddingValidators = () => {
  return (
    <div className="AddingValidators" id={ArchitectureDeepDiveId.AddingValidators}>
      <div className="ArchitectureDeepDive__section-title">Adding Validators to the Schedule</div>
      <p className="ArchitectureDeepDive__description">
        The goal of this process is to add more validators to the schedule to ensure that the network will always have a
        PV. The details of the process follow.
      </p>
      <DocImage alt="PV Initialization Process" maxWidth={624} src={PVInitProcessImage} />
      <p className="ArchitectureDeepDive__description">
        The logic behind this process becomes more clear as additional nodes join the network. An example network with a
        schedule limit of 5 nodes follows.
      </p>
      <DocImage
        alt="PV Initialization Process with Multiple Candidates"
        maxWidth={624}
        src={PVInitProcessMultipleCandidatesImage}
      />
      <p className="ArchitectureDeepDive__description">
        If two or more nodes are tied in terms of boost, these nodes will be ranked by NID alphabetically and the first
        one will be chosen.
      </p>
      <DocImage alt="Schedule Generation" maxWidth={521} src={ScheduleGenerationImage} />
      <div className="AddingValidators__important">
        <div className="AddingValidators__important-text">
          <h2 className="AddingValidators__important-title">Important</h2>
          <p className="ArchitectureDeepDive__description">
            All scheduling information is stored on the blockchain. The propagation of schedule blocks throughout the
            network allows all nodes to remain aware of the validators.
          </p>
          <p className="ArchitectureDeepDive__description">
            The job of the PV is not to maintain the single source of truth for all account balances, but rather propose
            a valid ordering of blocks to forward to the CVs. This architecture not only allows for a highly efficient
            method of distributed consensus, but also maintains a shared state across a peer-to-peer network by enabling
            all CVs to produce identical blockchains.
          </p>
        </div>
        <DocImage
          alt="Round PV"
          className="AddingValidators__important-image"
          maxWidth={284}
          src={RoundImage}
          width={284}
        />
      </div>
      <Divider className="ArchitectureDeepDive__section-divider" />
    </div>
  );
};

export default AddingValidators;
