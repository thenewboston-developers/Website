import React, {FC} from 'react';

import {Divider, Note, NoteType} from 'components';
import {PrincipalEventsId} from '../../../constants';

import ForkPrevention1Image from '../../../assets/fork-prevention-1.svg';
import ForkPrevention2Image from '../../../assets/fork-prevention-2.svg';
import ForkPrevention3Image from '../../../assets/fork-prevention-3.svg';
import ForkPreventionAlt3Image from '../../../assets/fork-prevention-alt-3.svg';

const ForkPrevention: FC = () => {
  return (
    <section className="PrincipalEvents__section">
      <h2 className="PrincipalEvents__section-heading" id={PrincipalEventsId.ForkPrevention}>
        Fork Prevention and Validation Threshold
      </h2>
      <p className="PrincipalEvents__section-paragraph">
        Every CV informs all other CVs when a block has been received from the PV. This is to secure the network against
        the unlikely event of a malicious PV attempting to fork the network by sending multiple versions of the same
        block to different CVs. To ensure that all CVs are building identical blockchains, after each block is received
        and before its validation, CVs must broadcast data that uniquely identifies each block ([hash value of the
        block]()) to all other CVs.
      </p>
      <p className="PrincipalEvents__section-paragraph PrincipalEvents__section-paragraph--mb-32">
        After confirming that the majority of CVs have received identical blocks, the{' '}
        <span className="PrincipalEvents__section-text--highlight"> validation threshold</span> is met and block
        validation can begin. Upon successful validation, the CV adds the block to its blockchain. If proof of an
        invalid block (miscalculation) or a conflict block (fork attempt) is found, then the CVs will reject that block
        and switch to the next scheduled PV. The following example outlines this process in more detail.
      </p>
      <h3 className="PrincipalEvents__section-sub-heading">Example</h3>
      <p className="PrincipalEvents__section-paragraph">
        This example showcases the validation threshold process from the perspective of a CV (CV6).
      </p>
      <ul className="PrincipalEvents__section-list PrincipalEvents__section-list--mb-0">
        <li className="PrincipalEvents__section-list-item">
          <span className="PrincipalEvents__section-text--black">Step 1</span> - CV6 first receives a block with the
          hash ag3v from the PV.
        </li>
      </ul>
      <div className="PrincipalEvents__section-image-container PrincipalEvents__section-image-container--spaced">
        <img
          alt="Fork Prevention 1"
          className="PrincipalEvents__section-image PrincipalEvents__section-image--fit"
          src={ForkPrevention1Image}
          loading="lazy"
          width="520px"
        />
      </div>
      <Divider className="PrincipalEvents__section-divider" />
      <ul className="PrincipalEvents__section-list PrincipalEvents__section-list--mb-0">
        <li className="PrincipalEvents__section-list-item">
          <span className="PrincipalEvents__section-text--black">Step 2</span> - Before block validation begins, CV6
          listens to other CVs to ensure they received identical blocks.
        </li>
      </ul>
      <div className="PrincipalEvents__section-image-container PrincipalEvents__section-image-container--spaced">
        <img
          alt="Fork Prevention 2"
          className="PrincipalEvents__section-image PrincipalEvents__section-image--fit"
          src={ForkPrevention2Image}
          loading="lazy"
          width="520px"
        />
      </div>
      <Note
        text="CV6's block is the block coming from the PV. Each CV treats the block they received from the PV as a block for themselves."
        type={NoteType.Information}
      />
      <Divider className="PrincipalEvents__section-divider" />
      <ul className="PrincipalEvents__section-list PrincipalEvents__section-list--mb-0">
        <li className="PrincipalEvents__section-list-item">
          <span className="PrincipalEvents__section-text--black">Step 3</span> - Once CV6 confirms that the majority of
          other CVs have received the same block, the validation threshold is met and block validation begins.
        </li>
      </ul>
      <div className="PrincipalEvents__section-image-container PrincipalEvents__section-image-container--spaced">
        <img
          alt="Fork Prevention 3"
          className="PrincipalEvents__section-image PrincipalEvents__section-image--fit"
          src={ForkPrevention3Image}
          loading="lazy"
          width="520px"
        />
      </div>
      <Note
        text="Even if all 5 blocks (100%) were received from the other CV's, CV6 would still need to wait for the one from the PV. The block from the PV is also the block CV6 broadcasts to all other CVs."
        type={NoteType.Information}
      />
      <Divider className="PrincipalEvents__section-divider" />
      <p className="PrincipalEvents__section-paragraph PrincipalEvents__section-text--black">
        Alternative Step 3: What happens if the validation threshold is not met?
      </p>
      <p className="PrincipalEvents__section-paragraph PrincipalEvents__section-paragraph--mb-8">
        If CV6 discovers that the PV has sent out different versions of the same block, the following will happen:
      </p>
      <ul className="PrincipalEvents__section-list">
        <li className="PrincipalEvents__section-list-item PrincipalEvents__section-list-item--dense">
          CV6 rejects that block.
        </li>
        <li className="PrincipalEvents__section-list-item PrincipalEvents__section-list-item--dense">
          CV6 broadcast proof of cheating (PV’s signature on two different versions of the same block) to all other CVs.
        </li>
        <li className="PrincipalEvents__section-list-item PrincipalEvents__section-list-item--dense">
          All other CVs broadcast the proof of cheating to all other CVs.
        </li>
        <li className="PrincipalEvents__section-list-item PrincipalEvents__section-list-item--dense">
          The schedule adjustment process begins.
        </li>
      </ul>
      <p className="PrincipalEvents__section-paragraph">
        The following diagram outlines how the PV sends Block 20 with hash bq8j to all CVs. Because only 40% of the CVs
        receive the same version of that block and CV5 receives a different version (hash x7mf), CV6 rejects the block.
      </p>
      <div className="PrincipalEvents__section-image-container">
        <img
          alt="Fork Prevention Alt 3"
          className="PrincipalEvents__section-image PrincipalEvents__section-image--fit"
          src={ForkPreventionAlt3Image}
          loading="lazy"
          width="520px"
        />
      </div>
    </section>
  );
};

export default ForkPrevention;
