import { Outlet, Navigate } from 'react-router-dom';
import { Signin } from '../pages';
import { isAuthenticated } from '../helper/auth-helper';

const PrivateRoute = (props) => {
    console.log("HAHA",isAuthenticated())
  return isAuthenticated() ? <Outlet /> : <Navigate to="/signin" />;
};

export default PrivateRoute;
