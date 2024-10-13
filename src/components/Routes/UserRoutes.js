import React from 'react';
import { Route, Routes } from 'react-router-dom';
import UserDashboard from '../Dashboard/UserDashboard';
import ProductsList from '../UserComp/Products/ProductsList';
import UserSideBar from '../UserComp/UserSideBar';

const UserRoutes = () => {
  return (
    <Routes>
      <Route exact path="/user/dashboard" element={<UserSideBar Component={UserDashboard}/>} />
      <Route exact path="/user/products" element={<UserSideBar Component={ProductsList}/>} />
    </Routes>
  );
};

export default UserRoutes;
