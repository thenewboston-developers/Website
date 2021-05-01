import React, {FC, useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {useParams} from 'react-router-dom';

import {Loader} from 'components';
import {getUser} from 'dispatchers/users/user';
import {selectUsers} from 'selectors/state';
import {AppDispatch} from 'types/store';
import ProfileInfo from './ProfileInfo';
import TasksCompleted from './TasksCompleted';

import './Profile.scss';

interface ProfileUrlParams {
  userId: string;
}

const Profile: FC = () => {
  const {userId} = useParams<ProfileUrlParams>();
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(true);
  const dispatch = useDispatch<AppDispatch>();
  const users = useSelector(selectUsers);
  const user = users[userId];

  useEffect(() => {
    const fetchData = async (): Promise<void> => {
      try {
        await dispatch(getUser(userId));
      } catch (error) {
        setErrorMessage('Error retrieving user');
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [dispatch, userId]);

  const renderLeftSection = () => {
    if (!user) return null;
    return (
      <div className="Profile__left-section">
        <ProfileInfo user={user} />
      </div>
    );
  };

  const renderRightSection = () => {
    if (!user) return null;
    return (
      <div className="Profile__right-section">
        <TasksCompleted github_username={user.github_username} />
      </div>
    );
  };

  if (errorMessage) return <h4>{errorMessage}</h4>;
  if (loading) return <Loader className="Profile__loader" />;

  return (
    <div className="Profile">
      {renderLeftSection()}
      {renderRightSection()}
    </div>
  );
};

export default Profile;
