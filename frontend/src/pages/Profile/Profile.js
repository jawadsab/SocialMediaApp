import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import './styles.css';

import { isAuthenticated } from '../../helper/auth-helper';
import { read } from '../../api/user/api-user';

const Profile = () => {
  let params = useParams();
  console.log(params);

  useEffect(() => {
    const abortController = new AbortController();
    const signal = abortController.signal;
    const jwt = isAuthenticated();
    console.log(jwt);
    read({ userId: params.userId }, { t: jwt }, signal)
      .then((user) => {
        console.log(user);
      })
      .catch((err) => {
        console.log(err.response);
      });
    return () => {
      abortController.abort();
    };
  }, [params]);

  return (
    <div>
      <h1>Profile Page</h1>
    </div>
  );
};

export default Profile;
