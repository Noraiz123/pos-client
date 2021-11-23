import React from 'react';
import CreateOrder from '../createOrder/CreateOrder';
import Header from '../Header/Header';
import Products from '../products/Products';

const POS = () => {
  return (
    <div className='p-10'>
      <Header />
      <div className="flex h-auto">
        <CreateOrder />
        <Products />
      </div>
    </div>
  );
};

export default POS;
