import { signout,isLoggedIn } from '../api/auth/api-auth';

export const authenticate = (jwt, cb) => {
  if (typeof window !== 'undefined') {
    localStorage.setItem('jwt', JSON.stringify(jwt));
  }
  cb();
};

export const isAuthenticated = () => {
  if (typeof window == 'undefined') return false;

  if (localStorage.getItem('jwt')) {
    console.log("JET")
    const {token} = JSON.parse(localStorage.getItem('jwt'))
    isLoggedIn(token).then(data => {
      console.log(data)
    })


    console.log("Log",isLoggedIn(token))

   
  } else return false;
};

export const clearJWT = (cb) => {
  if (typeof window !== 'undefined') localStorage.removeItem('jwt');
  cb();
  signout().then((data) => {
    console.log(data);
    document.cookie = 't=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
  });
};
