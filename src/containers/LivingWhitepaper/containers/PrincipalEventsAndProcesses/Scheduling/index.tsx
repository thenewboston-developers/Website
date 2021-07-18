import React, {FC} from 'react';

import {PrincipalEventsId} from '../../../constants';

const Scheduling: FC = () => {
  return (
    <section className="PrincipalEvents__section">
      <h2 className="PrincipalEvents__section-heading" id={PrincipalEventsId.Scheduling}>
        Scheduling
      </h2>
      <p className="PrincipalEvents__section-paragraph">
        Nodes register on the network through a{' '}
        <span className="PrincipalEvents__section-text--highlight">Node Registration</span> block. This block informs
        the network that there is an additional server on the network and includes their IP, a Network ID, and so on.
        Once the network registers a node, users can choose to boost it. The highest boosted nodes become the validators
        of the network through the validator{' '}
        <span className="PrincipalEvents__section-text--highlight">scheduling process</span>, and all validators are
        candidates for PV through boosting. The scheduling process is a key feature of the network. It must run
        everytime a new PV takes over and before that PV starts generating blocks.
      </p>
      <p className="PrincipalEvents__section-paragraph">
        PVs serve the network for a set period which is called{' '}
        <span className="PrincipalEvents__section-text--highlight">network day</span> (the unit of time for the network
        which equals the time to process 1,000 blocks). PVs follow the validator schedule and they are allowed to
        generate blocks as PVs only during their scheduled time. At the end of each turn, the responsibility of PV
        passes to the next validator on the schedule. Because the scheduling process runs every time the network
        switches between PVs, it determines the order through which validators become PVs at the end of each network
        day.
      </p>
      <p className="PrincipalEvents__section-paragraph PrincipalEvents__section-text--bold">
        The goal of scheduling is to:
      </p>
      <ul className="PrincipalEvents__section-list">
        <li className="PrincipalEvents__section-list-item">Add more validators to the schedule</li>
        <li className="PrincipalEvents__section-list-item">Ensure that the network will always have a PV</li>
      </ul>
      <p className="PrincipalEvents__section-paragraph PrincipalEvents__section-text--bold">
        The general flow is this:
      </p>
      <ol className="PrincipalEvents__section-list">
        <li className="PrincipalEvents__section-list-item">The PV generates a block.</li>
        <li className="PrincipalEvents__section-list-item">
          The PV sends that block to all CVs for additional confirmation.
        </li>
        <li className="PrincipalEvents__section-list-item">
          If more than 50% of the CVs confirm they have received it, each CV validates the block.
        </li>
        <li className="PrincipalEvents__section-list-item">
          Upon successful validation, every CV adds that block to its blockchain.
        </li>
      </ol>
      <h3 className="PrincipalEvents__section-sub-heading">Example</h3>
      <p className="PrincipalEvents__section-paragraph">
        In the following example, the network uses 8 validators (1 PV and 7 CVs) at any time. It also uses 92 additional
        nodes (regular nodes), so there are 100 nodes in total. When a PV’s turn is over, the following process happens:
      </p>
      <ul className="PrincipalEvents__section-list">
        <li className="PrincipalEvents__section-list-item PrincipalEvents__section-list-item--spaced">
          <span className="PrincipalEvents__section-text--black">Step 1</span> - The next scheduled validator (CV #1)
          becomes PV.
        </li>
        <li className="PrincipalEvents__section-list-item PrincipalEvents__section-list-item--spaced">
          <span className="PrincipalEvents__section-text--black">Step 2</span> - As its first order of business, the new
          PV updates the validator schedule. All current CVs move up one spot in the validator schedule and spot #8
          becomes empty.
        </li>
        <li className="PrincipalEvents__section-list-item PrincipalEvents__section-list-item--spaced">
          <span className="PrincipalEvents__section-text--black">Step 3</span> - To fill this spot, the scheduling
          process looks at the 92 nodes and the node that was removed from PV (whom CV #1 replaces). At this point, all
          nodes are eligible for becoming validators.
        </li>
        <li className="PrincipalEvents__section-list-item PrincipalEvents__section-list-item--spaced">
          <span className="PrincipalEvents__section-text--black">Step 4</span> - From that pool, the new PV adds the
          node that is most boosted to the validator schedule as the CV in slot #8. This will probably be the previous
          PV because it was highly boosted before, but it is also possible for a new node to take that spot if that node
          has recently received a lot of boosts.
        </li>
      </ul>
      <p className="PrincipalEvents__section-paragraph PrincipalEvents__section-paragraph--my-0">
        Once a node is added to the validator schedule, it is guaranteed to become a PV at some point. From a new
        validator’s perspective, its lifecycle will be to act as CV #8, CV #7, ... CV #2, CV #1, and, finally, PV. After
        being PV, that validator becomes eligible to be added to the schedule again, and that is determined by boost.
      </p>
    </section>
  );
};

export default Scheduling;
