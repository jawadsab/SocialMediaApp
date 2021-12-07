import api from '../../api';

export const create = async (user) => {
  const response = await api.post('/api/users', user);
  return await response.data;
};
