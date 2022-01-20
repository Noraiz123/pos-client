import React, { useEffect, useState } from 'react';
import {
  CheckIcon,
  PlusIcon,
  XIcon,
  BanIcon,
  HandIcon,
  CashIcon,
  PrinterIcon,
  TrashIcon,
} from '@heroicons/react/solid';
import { useSelector } from 'react-redux';
import {
  ConfirmOrder,
  createOrderAction,
  deleteAllOrderItemsAction,
  deleteOrderItemAction,
} from '../../actions/order.actions';
import { useDispatch } from 'react-redux';
import CustomerModal from '../Modals/AddCustomerModal';
import { GetCustomers, currentCustomerAction } from '../../actions/customers.actions';
import AddUserModal from '../Modals/AddUser';
import InvoiceModal from '../Modals/InvoiceModal';

const CreateOrder = () => {
  const dispatch = useDispatch();
  const { currentOrder, currentCustomer, customers, users } = useSelector((state) => ({
    currentOrder: state.orders.currentOrder,
    currentCustomer: state.customers.currentCustomer,
    customers: state.customers.allCustomers,
    users: state.users.filter((e) => e.role === 'salesman'),
  }));
  const [currentSalesman, setCurrentSalesman] = useState('');

  useEffect(() => {
    dispatch(GetCustomers());
  }, [dispatch]);

  const handleOrderConfirmation = () => {
    dispatch(
      ConfirmOrder({
        order: {
          status: 'paid',
          customer_id: currentCustomer.id ? currentCustomer.id.toString() : undefined,
          salesman_id: currentSalesman ? currentSalesman : undefined,
          order_line_items_attributes: currentOrder.map((e) => ({
            product_sku_id: e.skus.id,
            quantity: e.quantity,
          })),
        },
      })
    ).then((res) => {
      if (res.status === 200) {
        dispatch(deleteAllOrderItemsAction());
        dispatch(currentCustomerAction({}));
        setCurrentSalesman('');
      }
    });
  };
  const [openCustomerModal, setOpenCustomerModal] = useState(false);
  const [openUserModal, setOpenUserModal] = useState(false);
  const [openInvoiceModal, setOpenInvoiceModal] = useState(false);

  const handleQuantityChange = (item, e) => {
    const { value } = e.target;
    dispatch(createOrderAction({ ...item, quantity: parseInt(value) }));
  };

  const handleCustomerChange = (e) => {
    const { value } = e.target;
    const customer = customers.find((e) => e.id === parseInt(value));
    dispatch(currentCustomerAction(customer));
  };

  const totalPrice =
    currentOrder && currentOrder.reduce((pre, next) => pre + Number(next.skus.price) * Number(next.quantity), 0);
  return (
    <div className='w-1/2 bg-white rounded-sm mt-6'>
      <div className='p-10 flex flex-col'>
        <div className='flex mb-2'>
          <select
            className='input-select w-9/12'
            value={currentCustomer.id ? currentCustomer.id : ''}
            onChange={handleCustomerChange}
          >
            <option value='' selected disabled>
              Select Customer
            </option>
            {customers &&
              customers.map((e) => (
                <option key={e.id} value={e.id}>
                  {e.name}
                </option>
              ))}
          </select>
          <button className='btn-sm-green mx-4' onClick={() => setOpenCustomerModal(true)}>
            <PlusIcon className='h-6' />
          </button>
        </div>
        <div className='flex mb-4'>
          <select
            className='input-select w-9/12'
            value={currentSalesman}
            onChange={(e) => setCurrentSalesman(e.target.value)}
          >
            <option value='' selected disabled>
              Select Salesman
            </option>
            {users &&
              users.map((e) => (
                <option key={e.id} value={e.id}>
                  {e.name}
                </option>
              ))}
          </select>
          <button className='btn-sm-green mx-4' onClick={() => setOpenUserModal(true)}>
            <PlusIcon className='h-6' />
          </button>
        </div>
        <div className='flex align-middle'>
          <input
            type='search'
            placeholder='Scan barcode or type the number then hit enter'
            className='input-field w-11/12'
          />
          <button className='btn-sm-gray'>
            <CheckIcon className='h-6' />
          </button>
        </div>
        <div className='h-60v overflow-y-auto my-6'>
          <div className='my-4 h-4/6'>
            <table className='table-fixed  order-table'>
              <thead>
                <tr>
                  <th className='w-1/2'>#</th>
                  <th className='w-1/3'>Item</th>
                  <th className='w-1/2'>Qty</th>
                  <th className='w-1/2'>Price</th>
                  <th className='w-1/2'>
                    <button className='btn-sm-red' onClick={() => dispatch(deleteAllOrderItemsAction())}>
                      <XIcon className='h-4' />
                    </button>
                  </th>
                </tr>
              </thead>
              <tbody>
                {currentOrder &&
                  currentOrder.map((e, index) => (
                    <tr key={e.id}>
                      <td className=''>{index + 1}</td>
                      <td className=''>{e.name}</td>
                      <td className=''>
                        <input
                          type='number'
                          className='input-field w-20'
                          value={e.quantity}
                          onChange={(value) => handleQuantityChange(e, value)}
                        />
                      </td>
                      <td className=''>{e.skus.price}</td>
                      <td className=''>
                        <button className='btn-sm-red' onClick={() => dispatch(deleteOrderItemAction(e))}>
                          <TrashIcon className='h-4' />
                        </button>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className='text-gray-500'>
          <div className='grid grid-cols-5 space-x-4'>
            <div>Total Discounts</div>
            <div className='col-span-2'>: 0</div>
            <div>Price</div>
            <div>RS {totalPrice}</div>
          </div>
          <div className='grid grid-cols-5 space-x-4'>
            <div>Discount</div>
            <div className='col-span-2'>
              <input type='text' className='input-field w-11/12' />
            </div>
            <div>Gross Price(inc 15% Tax)</div>
            <div className='text-xl font-bold'>R0:00</div>
          </div>
        </div>
        <div className='flex space-x-10  my-4'>
          <button className='btn-blue' onClick={() => setOpenInvoiceModal(true)} disabled={currentOrder.length === 0}>
            <PrinterIcon className='h-6' />
          </button>
          <button className='btn-red flex'>
            <BanIcon className='h-6 mr-2' />
            Cancel
          </button>
          <button className='btn-green flex'>
            <HandIcon className='h-6 mr-2' />
            Hold
          </button>
          <button className='btn-parrot flex' onClick={handleOrderConfirmation}>
            <CashIcon className='h-6 mr-2' />
            Pay
          </button>
        </div>
      </div>
      <CustomerModal isOpen={openCustomerModal} setIsOpen={setOpenCustomerModal} />
      <AddUserModal isOpen={openUserModal} setIsOpen={setOpenUserModal} />
      <InvoiceModal
        isOpen={openInvoiceModal}
        setIsOpen={setOpenInvoiceModal}
        invoiceData={{ orderItems: currentOrder, customer: currentCustomer, total: totalPrice }}
      />
    </div>
  );
};

export default CreateOrder;
