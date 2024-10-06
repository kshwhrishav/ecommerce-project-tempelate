import React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import AdminDashboard from '../Dashboard/AdminDashboard';
import Dashboard from '../Dashboard/Dashboard';
import ProductBoard from '../AdminComp/ProductBoard';

const AdminRoutes = () => {
  console.log('Rendering Admin Routes'); //To check the routing path

  return (
    <Routes>
      <Route path="/admin" element={<AdminDashboard comp={Dashboard} />} />
      <Route exact path="/admin/dashboard" element={<AdminDashboard comp={Dashboard} />} />
      <Route exact path="/admin/products" element={<AdminDashboard comp={ProductBoard} />} />
      <Route path="*" element={<Navigate to="/admin/dashboard" />} />
      {/* Note: Adding the default route to redirect */}
    </Routes>
  );
};

export default AdminRoutes;