import React from 'react';
import SideBar from './SideBar';
import { Outlet } from 'react-router-dom';

const Layout = () => {
  return (
    <div className='h-screen bg-black-bg p-4 md:p-10'>
      <div className='relative md:grid  md:grid-cols-10 md:gap-3 h-full'>
        <SideBar />
        <Outlet />
      </div>
    </div>
  );
};

export default Layout;
