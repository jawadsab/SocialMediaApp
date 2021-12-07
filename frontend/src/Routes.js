import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import PrivateRoute from './components/PrivateRoute';

import { Home, Signup, Signin,Users,Profile } from './pages';

const MainRouter = () => {
  return (
    <Router>
      <Routes>
        <Route element={<PrivateRoute />}>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/user/:userId" element={<Profile />} />
        </Route>
        <Route exact path="/signup" element={<Signup />} />
        <Route exact path="/signin" element={<Signin />} />
        <Route exact path="/users" element={<Users />} />
      </Routes>
    </Router>
  );
};

export default MainRouter;
