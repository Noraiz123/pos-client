import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createOrderAction } from '../../actions/order.actions';

const Products = () => {
  const dispatch = useDispatch();
  const { products } = useSelector((state) => ({
    products: state.products.products,
  }));

  const createOrder = (item) => {
    dispatch(createOrderAction({ ...item, quantity: 1 }));
  };
  return (
    <div className='p-10 bg-white ml-4 mt-6 w-full'>
      <div className='grid grid-cols-2'>
        <div className=''>
          <input type='text' className='input-field' placeholder='Search Product by name or sku' />
        </div>
        <div className='space-x-2'>
          <button className='btn-outline'>All</button>
          <button className='btn-outline'>Drinks</button>
          <button className='btn-outline'>General</button>
          <button className='btn-outline'>Stationary</button>
        </div>
      </div>
      <div className='grid grid-cols-5'>
        {products &&
          products.map((e) => (
            <div key={e.id} className='border mt-6 p-4 cursor-pointer' onClick={() => createOrder(e)}>
              <div className='space-y-2 border-b p-2'>
                <img src='https://thumbs.dreamstime.com/b/bottle-water-12522351.jpg' alt='product' className='h-56' />
                <p className='text-center text-gray-400 font-bold'>{e.name}</p>
              </div>
              <div className='text-center mt-3'>
                <p className='text-gray-400'>STOCK {e.skus[0]?.quantity}</p>
                <p className='text-green-500 font-extrabold'>Rs {e.skus[0]?.price}</p>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default Products;
