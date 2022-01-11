import React from 'react';
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
import { deleteAllOrderItemsAction, deleteOrderItemAction } from '../../actions/order.actions';
import { useDispatch } from 'react-redux';

const CreateOrder = () => {
  const dispatch = useDispatch();
  const { currentOrder } = useSelector((state) => ({
    currentOrder: state.orders.currentOrder,
  }));
  return (
    <div className='w-1/2 bg-white rounded-sm mt-6'>
      <div className='p-10 flex flex-col'>
        <div className='flex mb-5'>
          <select className='input-select w-9/12'>
            <option>Walk in customer</option>
            <option>Option B</option>
          </select>
          <button className='btn-sm-green mx-4'>
            <PlusIcon className='h-6' />
          </button>
        </div>
        <div className='flex align-middle'>
          <input
            type='text'
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
                        <input type="number" className='input-field w-20' value={e.quantity} />
                      </td>
                      <td className=''>4</td>
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
            <div>R0:00</div>
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
          <button className='btn-blue'>
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
          <button className='btn-parrot flex'>
            <CashIcon className='h-6 mr-2' />
            Pay
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreateOrder;
