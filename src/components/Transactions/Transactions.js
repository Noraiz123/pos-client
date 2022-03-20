import { EyeIcon, PencilAltIcon } from '@heroicons/react/solid';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { currentCustomerAction } from '../../actions/customers.actions';
import {
  createOrderAction,
  GetOrder,
  getOrderAction,
  GetOrders,
  updateOrderStatusAction,
} from '../../actions/order.actions';
import { filterProductsStatsAction, GetProductsStats } from '../../actions/products.actions';
import ViewOrdersModal from '../Modals/ViewOrderModal';

const Transactions = () => {
  const dispatch = useDispatch();
  const { orders, users, order, productsStats, salesman, products } = useSelector((state) => ({
    orders: state.orders,
    users: state.users,
    products: state.products.products,
    productsStats: state.products.productsStats,
    salesman: state.users.filter((e) => e.role === 'salesman'),
    order: state.orders.order,
  }));
  const initialFilters = {
    created_at_gteq: '',
    created_at_lteq: '',
    status_in: '',
    cashier_id_eq: '',
    salesman_id_eq: '',
  };

  const navigate = useNavigate();
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
      [name]: value,
    }));
  };

  const handlePageChange = (page) => {
    const { statsFilter } = productsStats;
    dispatch(filterProductsStatsAction({ ...statsFilter, page }));
  };

  const handleOrdersPageChange = (page) => {
    setOrdersPagination({ ...ordersPagination, page });
  };

  function debounce(func, timeout = 2000) {
    let timer;
    return (...args) => {
      clearTimeout(timer);
      timer = setTimeout(() => {
        func.apply(this, args);
      }, timeout);
    };
  }

  const handleProductsSearch = (e) => {
    const { statsFilter } = productsStats;
    const { value } = e.target;
    dispatch(filterProductsStatsAction({ ...statsFilter, keyword: value }));
  };

  const optimizedSearch = debounce(handleProductsSearch);

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
    const total = a + Number(b.total);

    return total;
  }, 0);

  // const manipulateProducts = (orderItems) => {
  //   let productsData = [];
  //   for (let values of products) {
  //     const order = orderItems.find((o) => values.skus.some((e) => e.id === o.product_sku_id));
  //     if (order?.id) {
  //       productsData.push({
  //         ...values,
  //         price: order.price,
  //         sub_total: order.sub_total,
  //         quantity: order.quantity,
  //         orderItemId: order.id,
  //         salesman_id: order.salesman_id,
  //       });
  //     }
  //   }

  //   return productsData;
  // };

  const handleOrdersView = (order) => {
    // dispatch(GetOrder(order.id)).then((res) => {
    //   if (res && res.status === 200) {
    //     setOrdersData(manipulateProducts(res.data.order_line_items));
    //     setIsOpen(true);
    //   }
    // });
    setOrdersData(order.orderItems);
    setIsOpen(true);
  };

  const manipulateProducts = (data) => {
    const result = data.map((e) => ({
      ...e.product,
      orderQuantity: e.quantity,
      previousQuantity: e.quantity,
      previousPaid: e.paidPrice,
    }));
    return result;
  };

  const OrderUpdateHandler = (data) => {
    dispatch(getOrderAction(data));
    dispatch(createOrderAction(manipulateProducts(data.orderItems)));
    dispatch(currentCustomerAction(data?.customer));
    dispatch(updateOrderStatusAction('UPDATE_ORDER'));
    navigate('/', { state: { salesman: data?.salesman } });
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
                <option key={e._id} value={e._id}>
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
                <option key={e._id} value={e._id}>
                  {e.name}
                </option>
              ))}
          </select>
        </div>
        <div className='flex flex-col'>
          <label className='mb-1 text-gray-500 font-bold'>Status</label>
          <select className='input-select' name='status_in' onChange={handleOrdersFilterChange}>
            <option value='' selected>
              All
            </option>
            <option value='paid'>Paid</option>
            <option value='draft'>Draft</option>
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
          <div className='flex justify-between mt-3'>
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
                onChange={optimizedSearch}
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
                        <td className=''>{e.product.name}</td>
                        <td className=''>{e.sold}</td>
                        <td className=''>{e.available}</td>
                        <td className=''>Rs {e.sales}</td>
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
                  <li
                    className='page-item'
                    onClick={() => productsStats.currentPage !== 1 && handlePageChange(productsStats.currentPage - 1)}
                  >
                    <button className='page-link'>
                      <span aria-hidden='true'>&laquo;</span>
                    </button>
                  </li>
                  {Array(productsStats.totalPages)
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
                  <li
                    className='page-item'
                    onClick={() =>
                      productsStats.currentPage < productsStats.totalPages &&
                      handlePageChange(productsStats.currentPage + 1)
                    }
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
                  <h1>Sales</h1>
                  <h1>Rs {Math.round(totalSales)}</h1>
                </div>
              </div>
              <div className='w-56 h-40 bg-yellow-100 rounded-md'>
                <div className='text-2xl text-yellow-900 flex flex-col h-full items-center justify-center'>
                  <h1>Transactions</h1>
                  <h1>{orders.allOrders.length}</h1>
                </div>
              </div>
              <div className='w-56 h-40 bg-blue-100 rounded-md'>
                <div className='text-2xl text-blue-900 flex flex-col h-full items-center justify-center'>
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
                            <td className=''>{new Date(e.createdAt).toDateString()}</td>
                            <td className=''>Rs: {Math.round(e.total)}</td>
                            <td className=''>Rs: {Math.round(e.total)}</td>
                            <td>Rs: 0</td>
                            <td>Cash</td>
                            <td>
                              <p
                                className={`rounded-full text-sm font-medium px-3 py-2 ${
                                  e.status === 'paid' ? 'bg-green-100 text-green-900' : 'bg-yellow-100 text-yellow-900'
                                }`}
                              >
                                {e.status.toUpperCase()}
                              </p>
                            </td>
                            <td>{handleUsers(e.cashier_id)}</td>
                            <td>{handleUsers(e.salesman_id)}</td>
                            <td>
                              <button className='btn-sm-yellow ml-3' onClick={() => handleOrdersView(e)}>
                                <EyeIcon className='h-4' />
                              </button>
                              <button className='btn-sm-green ml-3' onClick={() => OrderUpdateHandler(e)}>
                                <PencilAltIcon className='h-4' />
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
                      <li
                        className='page-item'
                        onClick={() => orders.currentPage !== 1 && handleOrdersPageChange(orders.currentPage - 1)}
                      >
                        <button className='page-link'>
                          <span aria-hidden='true'>&laquo;</span>
                        </button>
                      </li>
                      {Array(orders.totalPages)
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
                      <li
                        className='page-item'
                        onClick={() =>
                          orders.currentPage < orders.totalPages && handleOrdersPageChange(orders.currentPage + 1)
                        }
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

export default Transactions;
