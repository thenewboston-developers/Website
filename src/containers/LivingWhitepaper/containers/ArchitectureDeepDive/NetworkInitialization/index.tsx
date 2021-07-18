import React from 'react';

import {Divider, DocImage} from 'components';
import {ArchitectureDeepDiveId} from '../../../constants';
import GenesisBlockImage from '../../../assets/GenesisBlock.svg';
import GenesisBlockCompositionImage from '../../../assets/GenesisBlockComposition.svg';
import BlockChangeImage from '../../../assets/BlockChange.svg';

import '../ArchitectureDeepDive.scss';

const NetworkInitialization = () => {
  return (
    <div className="NetworkInitialization" id={ArchitectureDeepDiveId.NetworkInitialization}>
      <div className="ArchitectureDeepDive__section-title">Network Initialization</div>
      <p className="ArchitectureDeepDive__description">
        The beta network is initialized from a single node and the blockchain genesis state. This is the state of the
        blockchain that defines the initial structure of the network and derives from any prior state of the network
        (alpha).
      </p>
      <DocImage alt="Genesis Block" maxWidth={291} src={GenesisBlockImage} />
      <p className="ArchitectureDeepDive__description">
        The blockchain genesis state consists of the minimum amount of data and information required to initialize a new
        network including:
      </p>
      <ul className="ArchitectureDeepDive__points">
        <li className="ArchitectureDeepDive__point">All account information from previous network (alpha)</li>
        <li className="ArchitectureDeepDive__point">The node registration of the source node</li>
        <li className="ArchitectureDeepDive__point">The initial schedule comprising a single node (the source node)</li>
      </ul>
      <DocImage alt="Genesis Block Composition" maxWidth={245} src={GenesisBlockCompositionImage} />
      <p className="ArchitectureDeepDive__description">
        From that point onward, all blocks become structures of data that represent all changes to the network. These
        originate from signed change requests, including transfer of coins between accounts, registration of new
        usernames, new nodes being added to the network, and so on.
      </p>
      <DocImage alt="Genesis Block Composition" maxWidth={404} src={BlockChangeImage} />
      <Divider className="ArchitectureDeepDive__section-divider" />
    </div>
  );
};

export default NetworkInitialization;
