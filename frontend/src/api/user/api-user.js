import api from '../../api';

export const create = async (user) => {
  const response = await api.post('/api/users', user);
  return await response.data;
};

export const list = async (signal) => {
  const response = await api.get('/api/users', { signal: signal });
  return await response.data;
};

export const read = async (params, credentials,signal) => {
   const response = await api.get('/api/users/' + params.userId, {
    signal,
    headers: {
      Authorization: 'Bearer ' + credentials.t,
    },
  });

  return await response.data;

};
