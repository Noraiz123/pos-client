import React, { useState } from 'react';
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
import ProductsModal from '../Modals/ProductsModal';
import AddProducts from '../Modals/AddProductModal';
import AddCategory from '../Modals/AddCategory';
import CustomersModal from '../Modals/customersModal';
import AddUserModal from '../Modals/AddUser';
import UsersModal from '../Modals/usersModal';

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [openAddProduct, setOpenAddProduct] = useState(false);
  const [openAddCategory, setOpenAddCategory] = useState(false);
  const [openCustomers, setOpenCustomers] = useState(false);
  const [openAddUser, setOpenAddUser] = useState(false);
  const [openUsers, setOpenUsers] = useState(false);

  return (
    <div>
      <div className='flex justify-between'>
        <div className='flex space-x-2'>
          <div className='flex'>
            <button className='flex align-middle btn-green' onClick={() => setIsOpen(true)}>
              <FolderAddIcon className='mr-2 h-6' />
              Products
            </button>
            <button className='btn-sm-yellow' onClick={() => setOpenAddProduct(true)}>
              <PlusIcon className='h-6' />
            </button>
          </div>
          <div className='flex'>
            <button className='flex align-middle btn-green'>
              <ViewGridAddIcon className='mr-2 h-6' />
              Categories
            </button>
            <button className='btn-sm-yellow' onClick={() => setOpenAddCategory(true)}>
              <PlusIcon className='h-6' />
            </button>
          </div>
          <button className='flex align-middle btn-blue'>
            <ViewBoardsIcon className='mr-2 h-6' />
            Open Tabs
          </button>
          <button className='flex align-middle btn-blue' onClick={() => setOpenCustomers(true)}>
            <UserIcon className='mr-2 h-6' />
            Customers
          </button>
        </div>
        <div className='flex space-x-2'>
          <button className='flex btn-sm-green'>
            <CogIcon className='h-6' />
          </button>
          <Link to='/transactions'>
            <button className='flex align-middle btn-green'>
              <CreditCardIcon className='mr-2 h-6' />
              Transactions
            </button>
          </Link>
          <div className='flex'>
            <button className='flex align-middle btn-green' onClick={() => setOpenUsers(true)}>
              <UserIcon className='mr-2 h-6' />
              Users
            </button>
            <button className='btn-sm-gray' onClick={() => setOpenAddUser(true)}>
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
      <ProductsModal isOpen={isOpen} setIsOpen={setIsOpen} />
      <AddProducts isOpen={openAddProduct} setIsOpen={setOpenAddProduct} />
      <AddCategory isOpen={openAddCategory} setIsOpen={setOpenAddCategory} />
      <UsersModal isOpen={openUsers} setIsOpen={setOpenUsers} />
      <AddUserModal isOpen={openAddUser} setIsOpen={setOpenAddUser} />
      <CustomersModal isOpen={openCustomers} setIsOpen={setOpenCustomers} />
    </div>
  );
};

export default Header;
