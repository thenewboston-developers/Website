import React from 'react';

import {CodeSnippet, Divider, DocImage, SnippetLang} from 'components';
import {ArchitectureDeepDiveId} from '../../../constants';
import NodeIdentifiersImage from '../../../assets/NodeIdentifiers.svg';

import '../ArchitectureDeepDive.scss';

const NodeIdentifier = () => {
  return (
    <div className="NodeIdentifier" id={ArchitectureDeepDiveId.NodeIdentifier}>
      <div className="ArchitectureDeepDive__section-title">Node Identifier</div>
      <p className="ArchitectureDeepDive__description">
        The node identifier (NID) system is a separate key-pair that nodes use for signing requests to other nodes.
      </p>
      <DocImage alt="Block Structure" maxWidth={624} src={NodeIdentifiersImage} />
      <p className="ArchitectureDeepDive__description">
        When a node is first deployed, it provides a unique NID to the network. As nodes connect, they keep a record of
        each other's NID as a method of identification. Later on, as nodes exchange requests, a receiving node can
        inspect the digital signature to verify the authenticity of both the sending node and the message itself. This
        system also provides an additional benefit in allowing requests to be sent on behalf of the node maintainer
        without requiring the request to originate from the node itself.
      </p>
      <div className="ArchitectureDeepDive__topic-heading" id={ArchitectureDeepDiveId.SampleRequestAndResponse}>
        Sample Request and Response
      </div>
      <p className="ArchitectureDeepDive__description">
        An example of where this is useful is during the connection request process. A sample connection request body
        follows:
      </p>
      <CodeSnippet
        code={`{
  "message": {
    "ip_address": "167.99.173.247",
    "port": "80",
    "protocol": "http"
  },
  "node_identifier": "d5356888dc9303e44ce52b1e06c3165a7759b9df1e6a6dfbd33ee1c3df1ab4d1",
  "signature": "3c88665e123e7e25a8b9d9592f3269ab4efc4bcba98......"
}`}
        language={SnippetLang.json}
      />
      <p className="ArchitectureDeepDive__description">
        Given the structure of the request, clients with access to the NID signing key can start connection requests on
        behalf of their node by sending requests directly from a client app to the target nodes. This also allows node
        owners to manage multiple nodes from the same client apps by importing the NID signing keys of all nodes they
        wish to manage.
      </p>
      <p className="ArchitectureDeepDive__description">
        Although all nodes are already configured with an account number (the public key from a separate key-pair), the
        purpose of the two key-pair systems is quite different. A server's NID must never change after deployment.
        However, users are free to change the account number where they wish to receive their Tx fees at any time.
      </p>
      <p className="ArchitectureDeepDive__description">
        In summary, because all nodes provide a unique NID through their publicly available configurations, all nodes
        can include this identifier in sensitive requests to other nodes to prove that the owner of the nodes has
        authorized each request. A sample response follows:
      </p>

      <CodeSnippet
        code={`{
  "primary_validator": {
    "account_number": "c7498d45482098a4c4e2b2fa405fdb00e5bc74bf4739c43417e7c50ff08c4109",
    "ip_address": "54.241.124.162",
    "node_identifier": "354804f86a2f5fa5c2f7bfc5da6bae78ec18beea2c991c6eca00877bf0ea9f01",
    "port": 80,
    "protocol": "http",
    "version": "v1.0",
    "default_transaction_fee": 1,
    "root_account_file": "http://54.241.124.162:80/media/root_account_file.json",
    "root_account_file_hash": "ab9b95e5bb1dc66dd57ebf2cb8a8dece41748389d68077f74c916659f4bd2f1b",
    "seed_block_identifier": "",
    "daily_confirmation_rate": 1,
    "trust": "100.00"
  },
  "account_number": "9a275161478536d0a5b88ff05d429b9a9e63d0032a46e7a6a8f088da89c69da5",
  "ip_address": "13.57.215.62",
  "node_identifier": "59af0721c572e6032b835722b5fec22110daad069dc135f1e81794747dbe626f",
  "port": 80,
  "protocol": "http",
  "version": "v1.0",
  "default_transaction_fee": 1,
  "node_type": "BANK"
}`}
        language={SnippetLang.json}
      />
      <Divider className="ArchitectureDeepDive__section-divider" />
    </div>
  );
};

export default NodeIdentifier;
