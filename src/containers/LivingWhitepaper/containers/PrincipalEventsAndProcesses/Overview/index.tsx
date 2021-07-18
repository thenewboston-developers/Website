import React, {FC} from 'react';

import {DataTable} from 'components';
import {PrincipalEventsId} from '../../../constants';

import './Overview.scss';

const Overview: FC = () => {
  return (
    <section className="PrincipalEvents__section">
      <h2 className="PrincipalEvents__section-heading" id={PrincipalEventsId.Overview}>
        Overview
      </h2>
      <DataTable
        className="Overview"
        columns={['Process / Event', 'Description']}
        data={[
          ['Coin Transfer', 'Transfer of coins between accounts'],
          ['Node Registration', 'Node’s enrollment onto the network'],
          ['Coin Locking', 'The locking of coins in exchange for points and the ability to boost a node'],
          ['Node Boosting', 'Voting for a node to be included in the validator schedule'],
          ['Username Registration', 'The purchase of a username by an account'],
          ['Governor Application', 'A process that enables a user to become eligible for governor'],
          ['Vote Purchase', 'The purchase of one or more votes by a user'],
          ['Governor Voting', 'A process through which a registered user endorses an individual who runs for governor'],
        ]}
      />
      <p className="PrincipalEvents__section-paragraph PrincipalEvents__section-text--italics">
        <span className="PrincipalEvents__section-text--bold">Important:</span> Each of the above data flows corresponds
        to a different block type.
      </p>
    </section>
  );
};

export default Overview;
