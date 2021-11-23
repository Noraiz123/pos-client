import React from 'react';
import {
  ViewGridAddIcon,
  FolderAddIcon,
  UserIcon,
  ViewBoardsIcon,
  CreditCardIcon,
  PlusIcon,
  CogIcon,
} from '@heroicons/react/solid';

import { LogoutIcon } from '@heroicons/react/outline';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <div>
      <div className='flex justify-between'>
        <div className='flex space-x-2'>
          <div className='flex'>
            <button className='flex align-middle btn-green'>
              <FolderAddIcon className='mr-2 h-6' />
              Products
            </button>
            <button className='btn-sm-yellow'>
              <PlusIcon className='h-6' />
            </button>
          </div>
          <div className='flex'>
            <button className='flex align-middle btn-green'>
              <ViewGridAddIcon className='mr-2 h-6' />
              Categories
            </button>
            <button className='btn-sm-yellow'>
              <PlusIcon className='h-6' />
            </button>
          </div>
          <button className='flex align-middle btn-blue'>
            <ViewBoardsIcon className='mr-2 h-6' />
            Open Tabs
          </button>
          <button className='flex align-middle btn-blue'>
            <UserIcon className='mr-2 h-6' />
            Customer Orders
          </button>
        </div>
        <div className='flex space-x-2'>
          <button className='flex btn-sm-green'>
            <CogIcon className='h-6' />
          </button>
          <Link to="/transactions">
            <button className='flex align-middle btn-green'>
              <CreditCardIcon className='mr-2 h-6' />
              Transactions
            </button>
          </Link>
          <div className='flex'>
            <button className='flex align-middle btn-green'>
              <UserIcon className='mr-2 h-6' />
              Users
            </button>
            <button className='btn-sm-gray'>
              <PlusIcon className='h-6' />
            </button>
          </div>
          <button className='flex align-middle btn-gray'>
            <UserIcon className='mr-2 h-6' />
            Administrator
          </button>
          <button className='btn-sm-yellow'>
            <LogoutIcon className='h-6' />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Header;
