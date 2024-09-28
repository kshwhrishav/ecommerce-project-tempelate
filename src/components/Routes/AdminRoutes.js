import React from 'react';
import { Route, Routes } from 'react-router-dom';
import AdminDashboard from '../Dashboard/AdminDashboard';

const AdminRoutes = () => {
  console.log("admin-route")
  return (
    <Routes>
      <Route exact path="/admin/dashboard" element={<AdminDashboard/>} />
    </Routes>
  );
};

export default AdminRoutes;
