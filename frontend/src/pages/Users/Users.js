import React, { useEffect, useState } from 'react';
import './styles.css';

import { list } from '../../api/user/api-user';

const Users = () => {
  const [users, setUsers] = useState([]);
  useEffect(() => {
    const abortController = new AbortController();
    const signal = abortController.signal;

    list(signal)
      .then((users) => {
        console.log(users);
        setUsers(users);
      })
      .catch((err) => {
        console.log(err);
      });

    return () => {
      abortController.abort();
    };
  }, []);
  return (
    <div>
      {users &&
        users.map((user, idx) => {
          return <p key={idx}>{user.name}</p>;
        })}
    </div>
  );
};

export default Users;
