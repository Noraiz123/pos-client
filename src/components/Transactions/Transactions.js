import React from 'react';

const Transactions = () => {
  return (
    <div>
      <div className='flex space-x-64 p-5'>
        <h1 className='text-2xl text-gray-600'>Transactions</h1>
        <select className="input-select">
          <option>All</option>
        </select>
        <select>
          <option>All</option>
        </select>
        <select></select>
        <input type='date' />
      </div>
    </div>
  );
};

export default Transactions;
