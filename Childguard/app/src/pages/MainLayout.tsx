import React from 'react';
import { Outlet } from 'react-router-dom';
import AppBarComponent from '../components/AppBar';

const MainLayout = () => {
  return (
    <>
      <AppBarComponent />
      <Outlet /> 
    </>
  );
};

export default MainLayout;
