import React from 'react';
import { Route, Routes } from 'react-router-dom';
import UserDashboard from '../Dashboard/UserDashboard';

const UserRoutes = () => {
  return (
    <Routes>
      <Route exact path="/user/dashboard" element={<UserDashboard/>} />
    </Routes>
  );
};

export default UserRoutes;
