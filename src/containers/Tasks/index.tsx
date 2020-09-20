import React, {useEffect, useState} from 'react';
import formatDistanceToNow from 'date-fns/formatDistanceToNow';
import parseISO from 'date-fns/parseISO';

import {Loader, RepositoryFilter} from 'components';
import {Issue, Repository, RepositoryFilterType} from 'types/github';
import {fetchGithubIssues} from 'utils/github';

import Task from './Task';
import './Tasks.scss';

const Tasks = () => {
  const [repositoryFilter, setRepositoryFilter] = useState<RepositoryFilterType>(Repository.all);
  const [issues, setIssues] = useState<Issue[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchData = async (): Promise<void> => {
      try {
        const results = await fetchGithubIssues();
        setIssues(results);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const getFilteredIssues = () => {
    return issues.filter(({amount}) => amount !== 0);
  };

  const renderTasks = () => {
    const filteredIssues = getFilteredIssues();
    return filteredIssues.map(
      ({amount, assignees, created_at, html_url, labels, number, repositoryName, title, user}) => {
        const createdStr = formatDistanceToNow(parseISO(created_at), {includeSeconds: true});
        return (
          <Task
            amount={amount}
            assignees={assignees}
            className="Tasks__Task"
            createdAt={`${createdStr} ago`}
            creator={user}
            githubLabels={labels}
            htmlUrl={html_url}
            key={html_url}
            number={number}
            repositoryName={repositoryName}
            title={title}
          />
        );
      },
    );
  };

  return (
    <div className="Tasks">
      <RepositoryFilter
        className="Tasks__RepositoryFilter"
        selectedFilter={repositoryFilter}
        setSelectedFilter={setRepositoryFilter}
      />
      <div className="Tasks__TaskList">{loading ? <Loader /> : renderTasks()}</div>
    </div>
  );
};

export default Tasks;
