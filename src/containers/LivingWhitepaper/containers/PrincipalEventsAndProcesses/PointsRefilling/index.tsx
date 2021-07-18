import React, {FC} from 'react';

import {DataTable, Divider, Note, NoteType} from 'components';
import {PrincipalEventsId} from '../../../constants';

import './PointsRefilling.scss';

const PointsRefilling: FC = () => {
  return (
    <section className="PrincipalEvents__section">
      <h2 className="PrincipalEvents__section-heading" id={PrincipalEventsId.PointsRefilling}>
        Points Refilling
      </h2>
      <p className="PrincipalEvents__section-paragraph PrincipalEvents__section-paragraph--mb-32">
        Users of the network have the ability to lock any amount of coins that they own. By locking coins, the network
        places a freeze on those coins for a set amount of time to prevent them from being withdrawn. This reduces the
        amount of coins in circulation while increasing their stability and value. In return for locked coins, users
        receive points and the ability to boost a node of their choosing.
      </p>
      <Note
        className="PrincipalEvents__section-note--mb-48"
        text="Because the network is unable to use human time as a reliable form of measurement due to challenges of syncing all global nodes which is needed for validation. time is measured as the increase of the total amount of blocks on the network. This method of measurement will fluctuate heavily early on (in relation to human time) but will become more accurate as the network grows."
        type={NoteType.Important}
      />
      <p className="PrincipalEvents__section-paragraph PrincipalEvents__section-paragraph--mb-8 PrincipalEvents__section-text--black">
        Time
      </p>
      <p className="PrincipalEvents__section-paragraph PrincipalEvents__section-paragraph--my-0">
        1 network day = 1,000 blocks
      </p>
      <Divider className="PrincipalEvents__section-divider" />
      <p className="PrincipalEvents__section-paragraph PrincipalEvents__section-paragraph--mb-8 PrincipalEvents__section-text--black">
        Exchange Rate
      </p>
      <p className="PrincipalEvents__section-paragraph PrincipalEvents__section-paragraph--my-0">
        100,000 points per locked coin
      </p>
      <Divider className="PrincipalEvents__section-divider" />
      <p className="PrincipalEvents__section-paragraph PrincipalEvents__section-paragraph--mb-8 PrincipalEvents__section-text--black">
        Daily Refill Rate
      </p>
      <p className="PrincipalEvents__section-paragraph PrincipalEvents__section-paragraph--mt-0 PrincipalEvents__section-paragraph--mb-32">
        +25,000 points per locked coin
      </p>
      <p className="PrincipalEvents__section-paragraph PrincipalEvents__section-paragraph--mb-32">
        <span className="PrincipalEvents__section-text--highlight">Note:</span> This results in a 100% point refill
        every 4 network days.
      </p>
      <h3 className="PrincipalEvents__section-sub-heading">Example</h3>
      <DataTable
        className="PointsRefilling"
        columns={['Time', 'Events', 'Points Balance', 'Notes']}
        data={[
          ['Network Day 1', 'User locks 24 coins', '2,400,000', 'Refill rate sets to 600,000 points/day'],
          ['Network Day 1', 'User spends 2,000,000 points', '400,000', 'Points subtracted'],
          ['Network Day 2', '1 network day passes', '1,000,000', 'Points refilling'],
          ['Network Day 3', '1 network day passes', '1,600,000', 'Points refilling'],
        ]}
      />
    </section>
  );
};

export default PointsRefilling;
