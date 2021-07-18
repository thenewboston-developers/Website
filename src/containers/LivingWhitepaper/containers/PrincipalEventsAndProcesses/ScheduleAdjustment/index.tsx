import React, {FC} from 'react';

import {PrincipalEventsId} from '../../../constants';
import ScheduleAdjustmentImage from '../../../assets/schedule-adjustment.svg';

const ScheduleAdjustment: FC = () => {
  return (
    <section className="PrincipalEvents__section">
      <h2 className="PrincipalEvents__section-heading" id={PrincipalEventsId.ScheduleAdjustment}>
        Schedule Adjustment
      </h2>
      <p className="PrincipalEvents__section-paragraph">
        At the end of their turn, the responsibility of being PV transitions to the next validator on the validator
        schedule. Because each validator can only generate blocks as PV during their scheduled time, the CVs deem as
        invalid any blocks generated outside a validator’s time as PV.
      </p>
      <p className="PrincipalEvents__section-paragraph">
        If a PV generates a malicious block, that block will be recorded on the blockchain as proof of cheating and the
        offending PV will be blacklisted from the network. Malicious blocks include, but are not limited to,
        miscalculation of balances, invalid signatures, or incorrect scheduling.
      </p>
      <p className="PrincipalEvents__section-paragraph">
        For other network issues that the PVs might experience such as performance bottlenecks, unexpectedly dropping
        offline, and so on, the network switches over to the next PV as defined by the validator schedule. These types
        of issues do not result in the blacklisting of the PV because certain network disruptions are expected in a
        peer-to-peer architecture.
        <br />
        The decision of whether or not to skip a PV requires a consensus agreement by the CVs. CVs’ votes on whether or
        not to skip a PV are weighted equally, rather than being weighted by boost. For details about how this happens,
        see [Consensus between Confirmation Validators]().
      </p>
      <div className="PrincipalEvents__section-image-container">
        <img
          alt="Schedule Adjustment"
          className="PrincipalEvents__section-image PrincipalEvents__section-image--fit"
          src={ScheduleAdjustmentImage}
          loading="lazy"
          width="620px"
        />
      </div>
      <p className="PrincipalEvents__section-paragraph">
        When the majority of CVs vote to skip the PV during its turn, all CVs must reach consensus on exactly which
        block the next PV must take over. This is because in the middle of each turn, there is no guarantee for CVs to
        be perfectly in sync and they might have blockchains of varying length.
      </p>
    </section>
  );
};

export default ScheduleAdjustment;
