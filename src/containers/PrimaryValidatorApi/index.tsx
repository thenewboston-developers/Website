import React, {FC, ReactNode, useMemo} from 'react';
import {Redirect, useParams} from 'react-router-dom';

import {DashboardLayout} from 'components';
import ApiLeftMenuItems from 'components/ApiLeftMenuItems';
import NodeApiConnectionRequests from 'containers/NodeApi/NodeApiConnectionRequests';
import PrimaryValidatorApiAccounts from './PrimaryValidatorApiAccounts';
import PrimaryValidatorApiBankBlocks from './PrimaryValidatorApiBankBlocks';
import PrimaryValidatorApiBanks from './PrimaryValidatorApiBanks';
import PrimaryValidatorApiConfig from './PrimaryValidatorApiConfig';
import PrimaryValidatorApiConfirmationBlocks from './PrimaryValidatorApiConfirmationBlocks';
import PrimaryValidatorApiValidators from './PrimaryValidatorApiValidators';

const getPageContent = (chapter: string): ReactNode => {
  switch (chapter) {
    case 'accounts':
      return <PrimaryValidatorApiAccounts />;
    case 'bank-blocks':
      return <PrimaryValidatorApiBankBlocks />;
    case 'banks':
      return <PrimaryValidatorApiBanks />;
    case 'config':
      return <PrimaryValidatorApiConfig />;
    case 'confirmation-blocks':
      return <PrimaryValidatorApiConfirmationBlocks />;
    case 'connection-requests':
      return <NodeApiConnectionRequests />;
    case 'validators':
      return <PrimaryValidatorApiValidators />;
    default:
      return <Redirect to="primary-validator-api/accounts" />;
  }
};

const PrimaryValidatorApi: FC = () => {
  const {chapter} = useParams();
  const pageContent = useMemo(() => getPageContent(chapter), [chapter]);

  return (
    <DashboardLayout leftMenuItems={<ApiLeftMenuItems />} pageName="Sample" sectionName="Primary Validator API">
      {pageContent}
    </DashboardLayout>
  );
};

export default PrimaryValidatorApi;
