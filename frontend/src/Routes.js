import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import { Home,Signup,Signin } from './pages';

const MainRouter = () => {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route exact path="/signup" element={<Signup />} />
        <Route exact path="/signin" element={<Signin />} />
      </Routes>
    </Router>
  );
};

export default MainRouter;
