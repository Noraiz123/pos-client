import { EyeIcon } from '@heroicons/react/solid';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { GetOrder, GetOrders } from '../../actions/order.actions';
import { filterProductsStatsAction, GetProductsStats } from '../../actions/products.actions';
import ViewOrdersModal from '../Modals/ViewOrderModal';

const Transactions = () => {
  const dispatch = useDispatch();
  const { orders, users, productsStats, salesman, products } = useSelector((state) => ({
    orders: state.orders,
    users: state.users,
    products: state.products.products,
    productsStats: state.products.productsStats,
    salesman: state.users.filter((e) => e.role === 'salesman'),
  }));
  const initialFilters = {
    created_at_gteq: '',
    created_at_lteq: '',
    status_in: [0, 1, 2],
    cashier_id_eq: null,
    salesman_id_eq: null,
  };
  const [ordersFilter, setOrdersFilter] = useState(initialFilters);
  const [isOpen, setIsOpen] = useState(false);
  const [ordersData, setOrdersData] = useState(null);
  const [ordersPagination, setOrdersPagination] = useState({ perPage: 10, page: 1, keyword: '' });
  useEffect(() => {
    dispatch(GetOrders({ query: ordersFilter }, ordersPagination));
  }, [dispatch, ordersFilter, ordersPagination]);

  useEffect(() => {
    dispatch(GetProductsStats(productsStats.statsFilter));
  }, [dispatch, productsStats.statsFilter]);

  const handleOrdersFilterChange = (e) => {
    const { name, value } = e.target;
    setOrdersFilter((pre) => ({
      ...pre,
      [name]: name === 'status_in' ? [value] : value,
    }));
  };

  const handlePageChange = (page) => {
    const { statsFilter } = productsStats;
    dispatch(filterProductsStatsAction({ ...statsFilter, page }));
  };

  const handleOrdersPageChange = (page) => {
    setOrdersPagination({ ...ordersPagination, page });
  };

  const handleProductsSearch = (e) => {
    const { statsFilter } = productsStats;
    const { value } = e.target;
    dispatch(filterProductsStatsAction({ ...statsFilter, keyword: value }));
  };

  const handleProductsPerPageChange = (e) => {
    const { statsFilter } = productsStats;
    const { value } = e.target;
    dispatch(filterProductsStatsAction({ ...statsFilter, perPage: value }));
  };

  const handleUsers = (id) => {
    const user = users.find((e) => e.id === id);

    return user ? user.name : '';
  };

  const totalSales = orders.allOrders.reduce((a, b) => {
    const total = a + Number(b.total_price);

    return total;
  }, 0);

  const manipulateProducts = (orderItems) => {
    let productsData = [];
    for (let values of products) {
      const order = orderItems.find((o) => o.product_sku_id === values.skus.id);
      if (order?.id) {
        productsData.push({
          ...values,
          price: order.price,
          sub_total: order.sub_total,
          quantity: order.quantity,
          orderItemId: order.id,
          salesman_id: order.salesman_id,
        });
      }
    }

    return productsData;
  };

  const handleOrdersView = (order) => {
    dispatch(GetOrder(order.id)).then((res) => {
      if (res && res.status === 200) {
        setOrdersData(manipulateProducts(res.data.order_line_items));
        setIsOpen(true);
      }
    });
  };

  return (
    <div className='bg-white mt-4'>
      <div className='grid xl:grid-cols-6 sm:grid-cols-2 gap-4 p-5 border-b'>
        <h1 className='text-2xl text-gray-600 flex items-center'>Transactions</h1>
        <div className='flex flex-col'>
          <label className='mb-1 text-gray-500 font-bold'>Salesman</label>
          <select className='input-select' name='salesman_id_eq' onChange={handleOrdersFilterChange}>
            <option value=''>All</option>
            {salesman &&
              salesman.map((e) => (
                <option key={e.id} value={e.id}>
                  {e.name}
                </option>
              ))}
          </select>
        </div>
        <div className='flex flex-col'>
          <label className='mb-1 text-gray-500 font-bold'>Cashier</label>
          <select className='input-select' name='cashier_id_eq' onChange={handleOrdersFilterChange}>
            <option value='' selected>
              All
            </option>
            {users &&
              users.map((e) => (
                <option key={e.id} value={e.id}>
                  {e.name}
                </option>
              ))}
          </select>
        </div>
        <div className='flex flex-col'>
          <label className='mb-1 text-gray-500 font-bold'>Status</label>
          <select className='input-select' name='status_in' onChange={handleOrdersFilterChange}>
            <option value='2'>Paid</option>
            <option value='1'>In Progress</option>
            <option value='0'>Draft</option>
          </select>
        </div>
        <div className='flex flex-col col-span-2'>
          <label className='mb-1 text-gray-500 font-bold'>Date</label>
          <div className='flex border bg-white rounded-lg p-2 space-x-3 w-9/12'>
            <input type='date' className='' name='created_at_gteq' onChange={handleOrdersFilterChange} />
            <span className='text-gray-500 font-bold'>To</span>
            <input type='date' className='' name='created_at_lteq' onChange={handleOrdersFilterChange} />
          </div>
        </div>
      </div>
      <div className='my-5 grid xl:grid-cols-3 sm:grid-cols-1 gap-4'>
        <div className='border p-3'>
          <div className='grid xl:grid-cols-3 sm:grid-cols-2 mt-3'>
            <h1 className='text-2xl text-gray-600 flex items-center'>Products</h1>
            <div>
              <label className='mr-1 text-gray-500 font-bold'>Display</label>
              <select
                className='input-select'
                onChange={handleProductsPerPageChange}
                value={productsStats.statsFilter.perPage}
              >
                <option>10</option>
                <option>20</option>
                <option>50</option>
                <option>100</option>
              </select>
            </div>
            <div>
              <input
                type='text'
                className='input-field w-40'
                placeholder='Search Products...'
                value={productsStats.statsFilter.keyword}
                onChange={handleProductsSearch}
              />
            </div>
          </div>
          <div className='h-60v overflow-y-auto my-6'>
            <div className='my-4 h-4/6'>
              <table className='whitespace-nowrap order-table w-full'>
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Sold</th>
                    <th>Available</th>
                    <th>Sales</th>
                  </tr>
                </thead>
                <tbody>
                  {productsStats.stats &&
                    productsStats.stats.map((e) => (
                      <tr key={e.id}>
                        <td className=''>{e.name}</td>
                        <td className=''>{e.skus.sold}</td>
                        <td className=''>{e.skus.quantity}</td>
                        <td className=''>Rs {e.skus.sale_amount}</td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          </div>
          {productsStats.stats.length > 0 && (
            <div className='flex my-3 justify-center'>
              <nav aria-label='Page navigation example'>
                <ul className='pagination'>
                  <li className='page-item' onClick={() => handlePageChange(productsStats.currentPage - 1)}>
                    <button className='page-link'>
                      <span aria-hidden='true'>&laquo;</span>
                    </button>
                  </li>
                  {Array(productsStats.currentPage)
                    .fill()
                    .map((e, i) => (
                      <li
                        key={i}
                        className={`page-item ${productsStats.currentPage === i + 1 && 'active'}`}
                        onClick={() => handlePageChange(i + 1)}
                      >
                        <button className='page-link' href='.'>
                          {i + 1}
                        </button>
                      </li>
                    ))}
                  <li className='page-item' onClick={() => handlePageChange(productsStats.currentPage + 1)}>
                    <button className='page-link'>
                      <span aria-hidden='true'>&raquo;</span>
                    </button>
                  </li>
                </ul>
              </nav>
            </div>
          )}
        </div>
        <div className='xl:col-span-2'>
          <div className='border-b pb-2 flex justify-between p-2'>
            <h1 className='text-2xl text-gray-600 flex items-center'>Total</h1>
            <div>
              <label className='mr-1 text-gray-500 font-bold'>Display records</label>
              <select
                className='input-select'
                value={ordersPagination.perPage}
                onChange={(e) => setOrdersPagination({ ...ordersPagination, perPage: e.target.value })}
              >
                <option>10</option>
                <option>20</option>
                <option>50</option>
                <option>100</option>
              </select>
            </div>
          </div>
          <div className='grid xl:grid-cols-4 sm:grid-cols-1 mt-3'>
            <div className='space-y-3 sm:grid sm:grid-cols-2 xl:block my-3'>
              <div className='w-56 h-40 bg-green-500 rounded-md'>
                <div className='text-2xl text-white flex flex-col h-full items-center justify-center'>
                  <h1>Sales</h1>
                  <h1>Rs {Math.round(totalSales)}</h1>
                </div>
              </div>
              <div className='w-56 h-40 bg-yellow-500 rounded-md'>
                <div className='text-2xl text-white flex flex-col h-full items-center justify-center'>
                  <h1>Transactions</h1>
                  <h1>{orders.allOrders.length}</h1>
                </div>
              </div>
              <div className='w-56 h-40 bg-blue-300 rounded-md'>
                <div className='text-2xl text-white flex flex-col h-full items-center justify-center'>
                  <h1>Products</h1>
                  <h1>{productsStats.stats.length}</h1>
                </div>
              </div>
            </div>
            <div className='col-span-3 my-3'>
              <div className='h-60v overflow-y-auto border'>
                <div className='h-4/6'>
                  <table className='whitespace-nowrap order-table'>
                    <thead>
                      <tr>
                        <th>Invoice</th>
                        <th>Date</th>
                        <th>Total</th>
                        <th>Paid</th>
                        <th>Change</th>
                        <th>Method</th>
                        <th>Status</th>
                        <th>Cashier</th>
                        <th>Salesman</th>
                        <th>View</th>
                      </tr>
                    </thead>
                    <tbody>
                      {orders.allOrders &&
                        orders.allOrders.map((e) => (
                          <tr key={e.id}>
                            <td className=''></td>
                            <td className=''>{new Date(e.created_at).toDateString()}</td>
                            <td className=''>Rs: {e.total_price}</td>
                            <td className=''>Rs: {e.total_price}</td>
                            <td>Rs: 0</td>
                            <td>Cash</td>
                            <td>{e.status}</td>
                            <td>{handleUsers(e.cashier_id)}</td>
                            <td>{handleUsers(e.salesman_id)}</td>
                            <td>
                              <button className='btn-sm-yellow ml-3' onClick={() => handleOrdersView(e)}>
                                <EyeIcon className='h-4' />
                              </button>
                            </td>
                          </tr>
                        ))}
                    </tbody>
                  </table>
                </div>
              </div>
              {productsStats.stats.length > 0 && (
                <div className='flex my-3 justify-center'>
                  <nav aria-label='Page navigation example'>
                    <ul className='pagination'>
                      <li className='page-item' onClick={() => handleOrdersPageChange(orders.currentPage - 1)}>
                        <button className='page-link'>
                          <span aria-hidden='true'>&laquo;</span>
                        </button>
                      </li>
                      {Array(orders.currentPage)
                        .fill()
                        .map((e, i) => (
                          <li
                            key={i}
                            className={`page-item ${orders.currentPage === i + 1 && 'active'}`}
                            onClick={() => handleOrdersPageChange(i + 1)}
                          >
                            <button className='page-link' href='.'>
                              {i + 1}
                            </button>
                          </li>
                        ))}
                      <li className='page-item' onClick={() => handleOrdersPageChange(orders.currentPage + 1)}>
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

export default Transactions;
