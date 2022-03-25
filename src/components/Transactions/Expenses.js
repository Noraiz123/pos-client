import { EyeIcon, PencilAltIcon } from '@heroicons/react/solid';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ViewOrdersModal from '../Modals/ViewOrderModal';
import { GetExpenses } from '../../actions/expenses.actions';


const Expenses = () => {
  const dispatch = useDispatch();
  const { expenses, totalPages, totalExpense, currentPage, noOfExpenses, expenseStats, stores } = useSelector(
    (state) => ({
      expenses: state.expenses.expenses,
      totalPages: state.expenses.totalPages,
      totalExpense: state.expenses.totalExpense,
      currentPage: state.expenses.currentPage,
      noOfExpenses: state.expenses.noOfExpenses,
      expenseStats: state.expenses.expenseStats,
      stores: state.stores,
    })
  );
  const initialFilters = {
    created_at_gteq: '',
    created_at_lteq: '',
    store: '',
  };

  const user = JSON.parse(localStorage.getItem('user'));

  const [expensesFilter, setExpensesFilter] = useState(initialFilters);
  const [isOpen, setIsOpen] = useState(false);
  const [ordersData, setOrdersData] = useState(null);
  const [expensePagination, setExpensePagination] = useState({ perPage: 10, page: 1 });
  useEffect(() => {
    dispatch(GetExpenses({ query: expensesFilter }, expensePagination));
  }, [dispatch, expensesFilter, expensePagination]);

  const handleExpenseFilterChange = (e) => {
    const { name, value } = e.target;
    setExpensesFilter((pre) => ({
      ...pre,
      [name]: value,
    }));
  };

  const handleExpensePageChange = (page) => {
    setExpensePagination({ ...expensePagination, page });
  };

  const handleOrdersView = (order) => {
    setOrdersData(order.orderItems);
    setIsOpen(true);
  };

  return (
    <div>
      <div className={`grid xl:grid-cols-${user.role === 'superAdmin' ? 3 : 2} sm:grid-cols-2 gap-4 p-5 border-b`}>
        <h1 className='text-2xl text-gray-600 flex items-center'>Expenses</h1>
        {user.role === 'superAdmin' && (
          <div className='flex flex-col w-3/5'>
            <label className='mb-1 text-gray-500 font-bold'>Store</label>
            <select className='input-select' name='store' onChange={handleExpenseFilterChange}>
              <option value='' selected>
                All
              </option>
              {stores &&
                stores.map((e) => (
                  <option key={e._id} value={e._id}>
                    {e.name}
                  </option>
                ))}
            </select>
          </div>
        )}
        <div className={`flex flex-col w-${user.role === 'superAdmin' ? 'auto' : '3/5'}`}>
          <label className='mb-1 text-gray-500 font-bold'>Date</label>
          <div className='flex border bg-white rounded-lg p-2 space-x-3 w-9/12'>
            <input type='date' className='' name='created_at_gteq' onChange={handleExpenseFilterChange} />
            <span className='text-gray-500 font-bold'>To</span>
            <input type='date' className='' name='created_at_lteq' onChange={handleExpenseFilterChange} />
          </div>
        </div>
      </div>

      <div className='my-5 grid xl:grid-cols-3 sm:grid-cols-1 gap-4'>
        <div className='border p-3'>
          <div className='h-60v overflow-y-auto my-6'>
            <div className='my-4 h-4/6'>
              <table className='whitespace-nowrap order-table w-full'>
                <thead>
                  <tr>
                    <th>Date</th>
                    <th>Total Expense</th>
                    <th>No Of Expenses</th>
                  </tr>
                </thead>
                <tbody>
                  {expenseStats &&
                    expenseStats.map((e) => (
                      <tr key={e._id}>
                        <td className=''>{new Date(e._id).toDateString()}</td>
                        <td className=''>{e.totalExpense}</td>
                        <td className=''>{e.count}</td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
        <div className='xl:col-span-2'>
          <div className='border-b pb-2 flex justify-between p-2'>
            <h1 className='text-2xl text-gray-600 flex items-center'>Total</h1>
            <div>
              <label className='mr-1 text-gray-500 font-bold'>Display records</label>
              <select
                className='input-select'
                value={expensePagination.perPage}
                onChange={(e) => setExpensePagination({ ...expensePagination, perPage: e.target.value })}
              >
                <option>5</option>
                <option>10</option>
                <option>20</option>
                <option>50</option>
                <option>100</option>
              </select>
            </div>
          </div>
          <div className='grid xl:grid-cols-4 sm:grid-cols-1 mt-3'>
            <div className='space-y-3 text-sm font-medium sm:grid sm:grid-cols-2 xl:block my-3'>
              <div className='w-56 h-40 bg-green-100 rounded-md'>
                <div className='text-2xl text-green-900 flex flex-col h-full items-center justify-center'>
                  <h1>Total Expenses</h1>
                  <h1>Rs {Math.round(totalExpense)}</h1>
                </div>
              </div>
              <div className='w-56 h-40 bg-yellow-100 rounded-md'>
                <div className='text-2xl text-yellow-900 flex flex-col h-full items-center justify-center'>
                  <h1>No of Expenses</h1>
                  <h1>{noOfExpenses}</h1>
                </div>
              </div>
            </div>
            <div className='col-span-3 my-3'>
              <div className='h-60v overflow-y-auto border'>
                <div className='h-4/6'>
                  <table className='whitespace-nowrap order-table w-full'>
                    <thead>
                      <tr>
                        <th>Name</th>
                        <th>Date</th>
                        <th>Amount</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {expenses &&
                        expenses.map((e) => (
                          <tr key={e._id}>
                            <td className=''>{e.name || 'N/A'}</td>
                            <td>{new Date(e.createdAt).toDateString()}</td>
                            <td className=''>Rs {e.amount}</td>
                            <td>
                              <button className='btn-sm-yellow ml-3' onClick={() => handleOrdersView(e)}>
                                <EyeIcon className='h-4' />
                              </button>
                              <button
                                className='btn-sm-green ml-3'
                                // onClick={() => OrderUpdateHandler(e)}
                              >
                                <PencilAltIcon className='h-4' />
                              </button>
                            </td>
                          </tr>
                        ))}
                    </tbody>
                  </table>
                </div>
              </div>
              {expenses.length > 0 && (
                <div className='flex my-3 justify-center'>
                  <nav aria-label='Page navigation example'>
                    <ul className='pagination'>
                      <li
                        className='page-item'
                        onClick={() => currentPage !== 1 && handleExpensePageChange(currentPage - 1)}
                      >
                        <button className='page-link'>
                          <span aria-hidden='true'>&laquo;</span>
                        </button>
                      </li>
                      {Array(totalPages)
                        .fill()
                        .map((e, i) => (
                          <li
                            key={i}
                            className={`page-item ${currentPage === i + 1 && 'active'}`}
                            onClick={() => handleExpensePageChange(i + 1)}
                          >
                            <button className='page-link' href='.'>
                              {i + 1}
                            </button>
                          </li>
                        ))}
                      <li
                        className='page-item'
                        onClick={() => currentPage < totalPages && handleExpensePageChange(currentPage + 1)}
                      >
                        <button className='page-link'>
                          <span aria-hidden='true'>&raquo;</span>
                        </button>
                      </li>
                    </ul>
                  </nav>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      <ViewOrdersModal isOpen={isOpen} setIsOpen={setIsOpen} orderDetails={ordersData} />
    </div>
  );
};

export default Expenses;
