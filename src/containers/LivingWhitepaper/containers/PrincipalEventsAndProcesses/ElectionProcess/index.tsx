import React, {FC} from 'react';

import {Note, NoteType} from 'components';
import {PrincipalEventsId} from '../../../constants';

import GovernanceOverviewImage from '../../../assets/governance-overview.svg';

const ElectionProcess: FC = () => {
  return (
    <section className="PrincipalEvents__section">
      <h2 className="PrincipalEvents__section-heading" id={PrincipalEventsId.ElectionProcess}>
        Election Process
      </h2>
      <p className="PrincipalEvents__section-paragraph PrincipalEvents__section-paragraph--mb-32">
        Registered users can use points to apply for government positions. Once an application is submitted all
        registered users (excluding the candidate) can begin voting for that candidate. The top X candidates will be
        elected as the government.
      </p>
      <Note
        className="PrincipalEvents__section-note PrincipalEvents__section-note--mb-32"
        text='The top X members of government are referred to as the "Treasury Board" and are responsible for minting new coins.'
        type={NoteType.Important}
      />
      <p className="PrincipalEvents__section-paragraph">
        Voting is an ongoing process. Throughout the voting process, users can change or remove their vote at any time.
        Once a member of government has been elected, they will remain seated until bumped out by a higher voted
        applicant.
      </p>
      <p className="PrincipalEvents__section-paragraph">
        There is a 10,000 coin fee to apply for governor. Other government related actions, such as updating
        applications or voting for applicants, require the use of points. All actions and voting records are publicly
        visible and stored on the blockchain.
      </p>
      <p className="PrincipalEvents__section-paragraph PrincipalEvents__section-text--bold">
        No government actions can be taken until the following requirements are met:
      </p>
      <ul className="PrincipalEvents__section-list">
        <li className="PrincipalEvents__section-list-item">All members of government must be seated.</li>
        <li className="PrincipalEvents__section-list-item">
          A minimum number (TBD before launch) of total votes have been cast.
        </li>
      </ul>
      <div className="PrincipalEvents__section-image-container">
        <img
          alt="Governance Overview"
          className="PrincipalEvents__section-image PrincipalEvents__section-image--fit"
          src={GovernanceOverviewImage}
          loading="lazy"
          width="470px"
        />
      </div>
    </section>
  );
};

export default ElectionProcess;
