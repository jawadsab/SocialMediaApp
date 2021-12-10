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
    read({ userId: params.userId }, { t: jwt.token }, signal)
      .then((user) => {
        console.log("USS",user);
      })
      .catch((err) => {
        console.log(err.response);
      });
    return () => {
      abortController.abort();
    };
  }, [params]);

  return (
    <div className="profile-page">
     <div className="my-profile">
       <h1>User Profile</h1>
       <p>name: abc</p>
       <p>Email: abc@gmail.com</p>
     </div>
     
    </div>
  );
};

export default Profile;
