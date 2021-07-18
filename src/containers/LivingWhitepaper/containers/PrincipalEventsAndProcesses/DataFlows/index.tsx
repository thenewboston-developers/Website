import React, {FC} from 'react';

import {Note, NoteType} from 'components';
import {PrincipalEventsId} from '../../../constants';

import ConfirmationProcessImage from '../../../assets/confirmation-process.svg';
import NetworkFlowImage from '../../../assets/network-flow.svg';

const DataFlows: FC = () => {
  return (
    <section className="PrincipalEvents__section">
      <h2 className="PrincipalEvents__section-heading" id={PrincipalEventsId.DataFlows}>
        Data Flows
      </h2>
      <p className="PrincipalEvents__section-paragraph PrincipalEvents__section-paragraph--mb-32">
        Most data flows originate from user requests on the network, with the most common being the transfer of coins.
      </p>
      <Note
        className="PrincipalEvents__section-note PrincipalEvents__section-note--mb-32"
        text="For the following mechanism to work, all nodes constantly subscribe to validators currently in schedule. They also subscribe to new CVs added to the schedule, as well as unsubscribe from CVs removed from the schedule."
        type={NoteType.Important}
      />
      <p className="PrincipalEvents__section-paragraph PrincipalEvents__section-text--bold">
        The general process of handling user requests is the following:
      </p>
      <ol className="PrincipalEvents__section-list PrincipalEvents__section-list--mb-48">
        <li className="PrincipalEvents__section-list-item">
          A user or a client app sends a request to their connection node (the node that connects the user to the
          network).
        </li>
        <li className="PrincipalEvents__section-list-item">
          The connection node forwards that request to the PV as defined by the most recent schedule.
        </li>
        <li className="PrincipalEvents__section-list-item">The PV validates the request.</li>
        <li className="PrincipalEvents__section-list-item">
          The PV restructures the request as a block and adds that block to the PV’s blockchain.
        </li>
        <li className="PrincipalEvents__section-list-item">
          The PV sends their blockchain to all CVs for confirmation.
        </li>
        <li className="PrincipalEvents__section-list-item">
          The connection node listens to CVs for confirmation that the block is added to the CVs’ blockchain.
        </li>
        <li className="PrincipalEvents__section-list-item">
          The connection node returns a message to the user when the user request is confirmed or rejected.
        </li>
      </ol>
      <h3 className="PrincipalEvents__section-sub-heading" id={PrincipalEventsId.ValidatorDataFlow}>
        Validator Data Flow
      </h3>
      <p className="PrincipalEvents__section-paragraph">
        The primary duty of PVs is to check all data originating from user signed change requests. Only PVs can create
        blocks and every block has three principal parts:
      </p>
      <ul className="PrincipalEvents__section-list">
        <li className="PrincipalEvents__section-list-item">The original signed change request</li>
        <li className="PrincipalEvents__section-list-item">Updates</li>
        <li className="PrincipalEvents__section-list-item">Signature of PV</li>
      </ul>
      <p className="PrincipalEvents__section-paragraph PrincipalEvents__section-text--bold">
        Validators handle user requests using this general data flow:
      </p>
      <ol className="PrincipalEvents__section-list">
        <li className="PrincipalEvents__section-list-item">The PV broadcasts their blockchain to the CVs.</li>
        <li className="PrincipalEvents__section-list-item">
          All CVs independently validate each block and compare the PV’s results against their own.
        </li>
        <li className="PrincipalEvents__section-list-item">
          If the results match, CVs add the confirmation to their blockchain.
        </li>
      </ol>
      <p className="PrincipalEvents__section-paragraph">
        At the end of this process, nodes listen for and receive these confirmations (verified blocks by CVs) and stream
        that information to the end user.
      </p>
      <div className="PrincipalEvents__section-image-container">
        <img
          alt="Confirmation Process"
          className="PrincipalEvents__section-image PrincipalEvents__section-image--fit"
          src={ConfirmationProcessImage}
          loading="lazy"
          width="496px"
        />
      </div>
      <Note
        className="PrincipalEvents__section-note PrincipalEvents__section-note--mb-32"
        text="Confirmations from CVs represent the confidence that the changes are irreversible. Similar to oter  blockchains, nodes must choose how many confirmations are acceptable for a use case. "
        type={NoteType.Important}
      />
      <p className="PrincipalEvents__section-paragraph PrincipalEvents__section-text--bold">Example</p>
      <p className="PrincipalEvents__section-paragraph">
        For Bitcoin confirmations, if a user were to buy a cup of coffee with Bitcoin, the shop would likely require one
        confirmation. For Coinbase, it takes three confirmations to deposit Bitcoin into an account. Other exchanges
        require six confirmations. So even among the most popular financial institutions when handling the most popular
        cryptocurrency, confirmations and confidence are still subjective.
      </p>
      <p className="PrincipalEvents__section-paragraph PrincipalEvents__section-paragraph--mb-48">
        For thenewboston network we target a number of confirmations (more than half or the number of CVs) to ensure
        that there is a majority consensus regarding the data. The Government will consider that percentage to be
        irreversible.
      </p>
      <h3 className="PrincipalEvents__section-sub-heading" id={PrincipalEventsId.NetworkDataFlow}>
        Network Data Flow
      </h3>
      <p className="PrincipalEvents__section-paragraph">
        Focusing on how the network handles data flows for user requests, the general process is the following:
      </p>
      <ol className="PrincipalEvents__section-list">
        <li className="PrincipalEvents__section-list-item">Nodes forward user requests to the PV.</li>
        <ul className="PrincipalEvents__section-list PrincipalEvents__section-list--mb-0">
          <li className="PrincipalEvents__section-list-item">
            If a node accidentally forwards a user request to any non-PV node, that receiving node re-routes the request
            to the correct PV according to schedule.
          </li>
        </ul>
        <li className="PrincipalEvents__section-list-item">
          The PV produces a blockchain (a chronologically ordered list of blocks consisting of data that relate to the
          user request).
        </li>
        <li className="PrincipalEvents__section-list-item">The PV broadcasts that blockchain to all CVs.</li>
      </ol>
      <p className="PrincipalEvents__section-paragraph">
        For any requests that are invalid, an error message is sent to the original node that connects the user
        (connection node), and can then be forwarded to the user.
      </p>
      <div className="PrincipalEvents__section-image-container">
        <img
          alt="Network Flow"
          className="PrincipalEvents__section-image PrincipalEvents__section-image--fit"
          src={NetworkFlowImage}
          loading="lazy"
          width="560px"
        />
      </div>
    </section>
  );
};

export default DataFlows;
