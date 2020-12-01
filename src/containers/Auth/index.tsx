import React, {FC, useEffect, useState} from 'react';
import {useHistory, useLocation} from 'react-router-dom';

import {fetchAccessToken} from 'utils/api';

const Auth: FC = () => {
  const {search} = useLocation();
  const history = useHistory();
  const code = new URLSearchParams(search).get('code');

  const [fetching, setFetching] = useState(true);

  useEffect(() => {
    if (code) {
      try {
        (async () => {
          const response = await fetchAccessToken(code);
          console.warn(response);
        })();
      } catch (err) {
        console.warn(err);
      } finally {
        setFetching(false);
      }
    } else {
      history.push('/');
    }
  }, [code, history]);

  return <h4>{fetching ? 'Fetching access token...' : code}</h4>;
};

export default Auth;
