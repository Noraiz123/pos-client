import React from 'react';
import Transactions from '../components/Transactions/Transactions';
import Header from '../components/Header/Header';

const TransactionsPage = () => {
  return (
    <div className="p-10">
      <Header />
      <Transactions />
    </div>
  );
};

export default TransactionsPage;
