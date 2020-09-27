import React, {FC, useState} from 'react';

import {A, MarketingButton} from 'components';
import Icon, {IconType} from 'components/Icon';
import {Opening} from 'types/openings';
import './OpeningsOpening.scss';

const OpeningsOpening: FC<Opening> = ({
  applicationMethods,
  description,
  payNotes,
  position,
  reportsTo,
  responsibilities,
  technologyRequirements,
}) => {
  const [expanded, setExpanded] = useState(true);

  const renderApplicationMethodList = () => {
    const rows = applicationMethods.map(({channel, note}) => (
      <div className="OpeningsOpening__application-method-row" key={channel}>
        <MarketingButton className="OpeningsOpening__MarketingButton" website={channel} />
        {note && <span>{note}</span>}
      </div>
    ));
    return (
      <>
        <div className="OpeningsOpening__list-label">
          To apply, send us a message through any of the following channels:
        </div>
        {rows}
      </>
    );
  };

  const renderExpandCollapseToggle = () => (
    <div
      className="OpeningsOpening__expand-collapse-container"
      onClick={() => setExpanded(!expanded)}
      role="button"
      tabIndex={0}
    >
      <Icon
        className="OpeningsOpening__expand-collapse-icon"
        icon={expanded ? IconType.minus : IconType.plus}
        size={16}
      />
      <div className="OpeningsOpening__expand-collapse-text">{expanded ? 'Collapse' : 'Expand'}</div>
    </div>
  );

  const renderExpandedContent = () => (
    <>
      {renderStringList(responsibilities, 'Responsibilities')}
      {renderStringList(technologyRequirements, 'Technology Requirements')}
      {renderReportsToList()}
      {renderStringList(payNotes, 'Pay')}
      {renderApplicationMethodList()}
    </>
  );

  const renderReportsToList = () => {
    const listItems = reportsTo.map(({githubUsername, name}) => (
      <li key={name}>
        {name}{' '}
        {githubUsername && (
          <>
            <span>-</span>{' '}
            <A className="OpeningsOpening__github-username-link" href={`https://github.com/${githubUsername}`}>
              {githubUsername}
            </A>
          </>
        )}
      </li>
    ));
    return (
      <>
        <div className="OpeningsOpening__list-label">Reports To</div>
        <ul className="OpeningsOpening__ul">{listItems}</ul>
      </>
    );
  };

  const renderStringList = (listData: string[], listLabel: string) => {
    const listItems = listData.map((item: string) => <li key={item}>{item}</li>);
    return (
      <>
        <div className="OpeningsOpening__list-label">{listLabel}</div>
        <ul className="OpeningsOpening__ul">{listItems}</ul>
      </>
    );
  };

  return (
    <div className="OpeningsOpening">
      <div className="OpeningsOpening__position">{position}</div>
      <div className="OpeningsOpening__description">{description}</div>
      {expanded && renderExpandedContent()}
      {renderExpandCollapseToggle()}
    </div>
  );
};

export default OpeningsOpening;
