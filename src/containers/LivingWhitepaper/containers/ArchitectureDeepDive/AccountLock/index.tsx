import React from 'react';

import {Divider, DocImage} from 'components';
import AccountLockImage from '../../../assets/AccountLock.svg';
import {ArchitectureDeepDiveId} from '../../../constants';

import './AccountLock.scss';
import '../ArchitectureDeepDive.scss';

const AccountLock = () => {
  return (
    <div className="AccountLock" id={ArchitectureDeepDiveId.AccountLock}>
      <div className="ArchitectureDeepDive__section-title">Account Lock</div>
      <p className="ArchitectureDeepDive__description">
        Every account on the network has a related account lock, which is a hash value that must be included in all
        signed change requests to allow changes on behalf of the account. This lock prevents nodes from processing the
        same requests multiple times to collect additional fees. All signed change requests include the account lock for
        that account in the message. After validation of a request and the addition of a block to the blockchain, the
        account lock changes.
      </p>
      <p className="ArchitectureDeepDive__description">
        Account locks are determined by hashing the message of the most recent signed change request for an account.
        Including this hash value within the message itself produces a unique account lock for each request. The
        constant changing of account locks and, in turn, the signature required to validate the message ensures that
        nodes process a signed change request exactly once.
      </p>
      <DocImage alt="Account Lock" maxWidth={624} src={AccountLockImage} />
      <div className="ArchitectureDeepDive__emphasized-text AccountLock__emphasized-text">Note:</div>
      <p className="ArchitectureDeepDive__description">
        There is one exception to the method in which account locks are determined. Usually, the hash value of the
        account owner's last signed change request message determines their account lock. This, however, leaves out the
        scenario in which the account owner is creating a signed change request for the very first time. This occurs
        when an account receives funds before making any requests themselves. Here, the account lock for the recipient
        will be their account number.
      </p>
      <div className="ArchitectureDeepDive__emphasized-text AccountLock__emphasized-text">
        So, the following two rules outline how account locks are determined:
      </div>
      <ul className="ArchitectureDeepDive__points">
        <li className="ArchitectureDeepDive__point">
          If an account owner has never made a signed change request before, their account lock is equal to their
          account number.
        </li>
        <li className="ArchitectureDeepDive__point">
          Otherwise, the account lock is equal to the hash value of their most recent signed change request message.
        </li>
      </ul>
      <Divider className="ArchitectureDeepDive__section-divider" />
    </div>
  );
};

export default AccountLock;
