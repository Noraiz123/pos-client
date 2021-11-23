/* eslint-disable react/prop-types */
import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoutes = ({ isAuth, children }) => {
  return isAuth ? children : <Navigate to='/Login' />;
};

export default ProtectedRoutes;
