import React, {FC} from 'react';

import {PrincipalEventsId} from '../../../constants';

const PVNonResponsiveness: FC = () => {
  return (
    <section className="PrincipalEvents__section">
      <h2 className="PrincipalEvents__section-heading" id={PrincipalEventsId.HandlingPV}>
        Handling PV non-responsiveness
      </h2>
      <p className="PrincipalEvents__section-paragraph">
        What happens when the PV intentionally or unintentionally ignores requests from one or more nodes? Here the CVs
        would also need to communicate with one another and switch over to a new PV. What makes this situation more
        challenging is that there is no signed evidence, like duplicate signatures or an incorrect calculation, so the
        answer to “Is the PV responsive?” becomes more subjective.
      </p>
      <p className="PrincipalEvents__section-paragraph">
        Every single CV forwards user requests to the PV. If the CV receives an error from the PV or a sign that the PV
        is offline, then the CV will request a change in PV right away.
      </p>
      <p className="PrincipalEvents__section-paragraph">
        However, this leaves the case when there is no error from the PV, showing that they received the request with no
        issues, but the CV does not recognize changes on the blockchain.
      </p>
      <p className="PrincipalEvents__section-paragraph PrincipalEvents__section-text--bold">
        This shows one of two things:
      </p>
      <ul className="PrincipalEvents__section-list">
        <li className="PrincipalEvents__section-list-item">
          The PV has a heavy workload. Many blocks are in their queue, taking additional time to work through them all.
          Here, those changes will appear on the blockchain, eventually.
        </li>
        <li className="PrincipalEvents__section-list-item">
          The PV has decided to maliciously ignore user requests, most likely because it wasn’t beneficial to them
          (perhaps the request was for boosting a competing node).
        </li>
      </ul>
      <p className="PrincipalEvents__section-paragraph">
        From the CV’s perspective, it is impossible to determine the true reason for this. Because of that, thenewboston
        architecture does not require the CV to figure out the reason and the intentions. Whether the PV is
        intentionally or unintentionally ignoring the request is irrelevant. The CV can label the PV as having network
        issues and show to all others that they would prefer a switch in PV.
      </p>
      <p className="PrincipalEvents__section-paragraph">
        So the question that remains is “How long exactly must the CV wait before requesting a change in PV?” And
        because there is no one right answer to that, the network allows the node maintainer to configure this. Users
        will be able to see what value the node maintainer set for this when choosing which nodes to boost. The node
        maintainer will set a value that they feel is acceptable when factoring in network latency, network load,
        historical average transaction times, and so on. This value will probably change overtime.
      </p>
      <p className="PrincipalEvents__section-paragraph">
        As the network grows and needs to handle more traffic, there will be unforeseen bottlenecks that might require a
        higher value to be set. As more developers fix these bottlenecks and optimize the network, this value will have
        to decrease to a point where all CVs require very high performance for the PV.
      </p>
    </section>
  );
};

export default PVNonResponsiveness;
