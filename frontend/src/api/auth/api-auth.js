import api from '../../api';

export const signin = async (user) => {
  const response = await api.post('/auth/signin', user);
  return await response.data;
};

export const signout = async () => {
  const response = await api.get('/auth/signout');
  return await response.json();
};

export const isLoggedIn = async (token) => {
  console.log(token)
  const response = await api.get("/auth/isloggedin",{headers: { Authorization: 'Bearer ' + token}})
  console.log(response.data)
  return await response.data;
}
