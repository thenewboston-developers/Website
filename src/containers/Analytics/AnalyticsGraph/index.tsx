import React, {FC} from 'react';

import './AnalyticsGraph.scss';

interface AnalyticsGraphProps {
  title: string;
}

const AnalyticsGraph: FC<AnalyticsGraphProps> = ({title}) => {
  return (
    <div className="AnalyticsGraph">
      <span className="AnalyticsGraph__title">{title}</span>
      <div className="AnalyticsGraph__graph" />
    </div>
  );
};

export default AnalyticsGraph;
