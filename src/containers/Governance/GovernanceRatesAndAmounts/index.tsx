import React, {FC, ReactNode} from 'react';

import {DocContainer, DocList, TableVertical} from 'components';

import './GovernanceRatesAndAmounts.scss';

const GovernanceRatesAndAmounts: FC = () => {
  const renderConversionRates = (): ReactNode => {
    return (
      <>
        <h3 className="GovernanceRatesAndAmounts__sub-heading">Conversion Rates</h3>
        <TableVertical
          altColors
          className="GovernanceRatesAndAmounts__TableVertical"
          rows={[
            ['1 network day', '1,000 blocks'],
            ['1 locked coin', '100,000 points'],
          ]}
        />
      </>
    );
  };

  const renderLockedCoinsAndBoost = (): ReactNode => {
    return (
      <>
        <h3 className="GovernanceRatesAndAmounts__sub-heading">Locked Coins &amp; Boosts</h3>
        <TableVertical
          altColors
          className="GovernanceRatesAndAmounts__TableVertical"
          rows={[
            ['Lock time', '20 days'],
            [
              'Early unlock penalty',
              'Max penalty is 10% of locked coins and every 2 days the penalty decreases by 1% (when calculating penalty for early unlocking the penalty is always rounded up)',
            ],
          ]}
        />
      </>
    );
  };

  const renderPoints = (): ReactNode => {
    return (
      <>
        <h3 className="GovernanceRatesAndAmounts__sub-heading">Points</h3>
        <TableVertical
          altColors
          className="GovernanceRatesAndAmounts__TableVertical"
          rows={[
            ['Cast vote for governor', '1 or more votes'],
            ['Update or remove governor application', '1,000,000 points'],
            ['Submit project proposal', '200,000,000 points'],
            ['Update or remove project proposal', '1,000,000 points'],
          ]}
        />
      </>
    );
  };

  const renderUsernamesAndVotes = (): ReactNode => {
    return (
      <>
        <h3 className="GovernanceRatesAndAmounts__sub-heading">Usernames &amp; Votes</h3>
        <TableVertical
          altColors
          className="GovernanceRatesAndAmounts__TableVertical"
          rows={[
            ['Username fee', '1,000 coins'],
            ['Each additional vote', '500 coins'],
            ['Submit governor application', '10,000 coins'],
          ]}
        />
      </>
    );
  };

  return (
    <DocContainer className="GovernanceRatesAndAmounts" title="Rates & Amounts" lastUpdated="07 Mar 2021">
      {renderConversionRates()}
      {renderUsernamesAndVotes()}
      {renderLockedCoinsAndBoost()}
      {renderPoints()}

      <h3 className="GovernanceRatesAndAmounts__sub-heading">Treasury Board</h3>
      <DocList className="GovernanceRatesAndAmounts__DocList" variant="ul">
        <li>Beta - 3 members</li>
        <li>By launch - 5 members</li>
        <li>Minting coins - 50% or more signatures required</li>
      </DocList>

      <h3 className="GovernanceRatesAndAmounts__sub-heading">Government</h3>
      <DocList className="GovernanceRatesAndAmounts__DocList" variant="ul">
        <li>Beta - 8 members</li>
        <li>By launch - 20 members</li>
        <li>Release funds from the budget - 50% or more signatures required</li>
        <li>
          No minimum number of total votes required before the government can take action but we will allow project
          proposals after 1 week
        </li>
      </DocList>

      <h3 className="GovernanceRatesAndAmounts__sub-heading">Nodes</h3>
      <DocList className="GovernanceRatesAndAmounts__DocList" variant="ul">
        <li>Beta - 8 nodes</li>
        <li>By launch - 20 nodes</li>
      </DocList>
    </DocContainer>
  );
};

export default GovernanceRatesAndAmounts;
