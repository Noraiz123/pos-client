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
import { Link, useLocation } from 'react-router-dom';
import ProductsModal from '../Modals/ProductsModal';
import AddProducts from '../Modals/AddProductModal';
import AddCategory from '../Modals/AddCategory';
import CustomersModal from '../Modals/customersModal';
import AddUserModal from '../Modals/AddUser';
import UsersModal from '../Modals/usersModal';
import AddVendorsModal from '../Modals/AddVendorsModal';
import VendorsModal from '../Modals/VendorsModal';
import { LogoutRequest } from '../../actions/auth.actions';
import { useDispatch } from 'react-redux';
import CategoriesModal from '../Modals/CategoriesModal';

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [openAddProduct, setOpenAddProduct] = useState(false);
  const [openAddCategory, setOpenAddCategory] = useState(false);
  const [openCustomers, setOpenCustomers] = useState(false);
  const [openAddUser, setOpenAddUser] = useState(false);
  const [openUsers, setOpenUsers] = useState(false);
  const [openVendors, setOpenVendors] = useState(false);
  const [openCategories, setOpenCategories] = useState(false);
  const [openAddVendors, setOpenAddVendors] = useState(false);
  const location = useLocation();
  const dispatch = useDispatch();

  return (
    <div>
      <div className='grid xl:grid-cols-2 sm:grid-cols-1 space-x-3 sm:space-y-4 xl:space-y-0'>
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
            <button className='flex align-middle btn-green' onClick={() => setOpenCategories(true)}>
              <ViewGridAddIcon className='mr-2 h-6' />
              Categories
            </button>
            <button className='btn-sm-yellow' onClick={() => setOpenAddCategory(true)}>
              <PlusIcon className='h-6' />
            </button>
          </div>
          {/* <button className='flex align-middle btn-blue'>
            <ViewBoardsIcon className='mr-2 h-6' />
            Open Tabs
          </button> */}
          <button className='flex align-middle btn-blue' onClick={() => setOpenCustomers(true)}>
            <UserIcon className='mr-2 h-6' />
            Customers
          </button>
        </div>
        <div className='flex space-x-2 xl:justify-end'>
          <button className='flex btn-sm-green'>
            <CogIcon className='h-6' />
          </button>

          {!location.pathname.includes('/transactions') ? (
            <Link to='/transactions'>
              <button className='flex align-middle btn-green'>
                <CreditCardIcon className='mr-2 h-6' />
                Transactions
              </button>
            </Link>
          ) : (
            <Link to='/'>
              <button className='flex align-middle btn-green'>
                <CreditCardIcon className='mr-2 h-6' />
                Point of Sale
              </button>
            </Link>
          )}
          <div className='flex'>
            <button className='flex align-middle btn-green' onClick={() => setOpenVendors(true)}>
              <UserIcon className='mr-2 h-6' />
              Vendors
            </button>
            <button className='btn-sm-gray' onClick={() => setOpenAddVendors(true)}>
              <PlusIcon className='h-6' />
            </button>
          </div>
          <div className='flex'>
            <button className='flex align-middle btn-green' onClick={() => setOpenUsers(true)}>
              <UserIcon className='mr-2 h-6' />
              Users
            </button>
            <button className='btn-sm-gray' onClick={() => setOpenAddUser(true)}>
              <PlusIcon className='h-6' />
            </button>
          </div>
          <button className='btn-sm-yellow' onClick={() => dispatch(LogoutRequest())} title='Logout'>
            <LogoutIcon className='h-6' />
          </button>
        </div>
      </div>
      <ProductsModal isOpen={isOpen} setIsOpen={setIsOpen} />
      <AddProducts isOpen={openAddProduct} setIsOpen={setOpenAddProduct} />
      {/* <AddCategory isOpen={openAddCategory} setIsOpen={setOpenAddCategory} /> */}
      {/* <UsersModal isOpen={openUsers} setIsOpen={setOpenUsers} /> */}
      {/* <AddUserModal isOpen={openAddUser} setIsOpen={setOpenAddUser} /> */}
      {/* <CustomersModal isOpen={openCustomers} setIsOpen={setOpenCustomers} /> */}
      {/* <AddVendorsModal isOpen={openAddVendors} setIsOpen={setOpenAddVendors} /> */}
      {/* <VendorsModal isOpen={openVendors} setIsOpen={setOpenVendors} /> */}
      {/* <CategoriesModal isOpen={openCategories} setIsOpen={setOpenCategories} /> */}
    </div>
  );
};

export default Header;
