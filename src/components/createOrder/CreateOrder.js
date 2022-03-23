import React, { useEffect, useRef, useState } from 'react';
import {
  CheckIcon,
  PlusIcon,
  XIcon,
  BanIcon,
  HandIcon,
  CashIcon,
  PrinterIcon,
  TrashIcon,
  ViewBoardsIcon,
  ArrowSmLeftIcon,
  ArrowSmRightIcon,
} from '@heroicons/react/solid';
import { useSelector } from 'react-redux';
import {
  ConfirmOrder,
  createOrderAction,
  deleteAllOrderItemsAction,
  deleteCurrentOrderItemAction,
  deleteOrderItemAction,
  getOrderAction,
  UpdateOrder,
  updateOrderStatusAction,
} from '../../actions/order.actions';
import { useDispatch } from 'react-redux';
import CustomerModal from '../Modals/AddCustomerModal';
import { GetCustomers, currentCustomerAction } from '../../actions/customers.actions';
import AddUserModal from '../Modals/AddUser';
import InvoiceModal from '../Modals/InvoiceModal';
import { useLocation, useNavigate } from 'react-router-dom';
import OnHoldOrdersModal from '../Modals/OnholdModal';
import PaymentModal from '../Modals/PaymentModal';
import Select from 'react-select';
import { GetProducts } from '../../actions/products.actions';

const CreateOrder = () => {
  const dispatch = useDispatch();
  const { currentOrder, currentCustomer, customers, users, order, orderStatus, productsFilter, onHold } = useSelector(
    (state) => ({
      currentOrder: state.orders.currentOrder,
      order: state.orders.order,
      orderStatus: state.orders.orderStatus,
      currentCustomer: state.customers.currentCustomer,
      customers: state.customers.allCustomers,
      users: state.users.filter((e) => e.role === 'salesman'),
      productsFilter: state.products.productsFilter,
      onHold: state.orders.onHold,
    })
  );
  const [currentSalesman, setCurrentSalesman] = useState('');
  const [openOnHold, setOpenOnHold] = useState(false);
  const [openPaymentModal, setOpenPaymentModal] = useState(false);
  const [holdIndex, setHoldIndex] = useState(null);
  const { state } = useLocation();
  const leftBtnRef = useRef();
  const rightBtnRef = useRef();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(GetCustomers());
  }, [dispatch]);

  useEffect(() => {
    if (state?.salesman) {
      setCurrentSalesman(state.salesman);
    }
  }, [state]);

  const totalPrice =
    currentOrder &&
    currentOrder
      .filter((e) => !e.delete)
      .reduce((pre, next) => {
        const previousDiscountedPrice = (Number(next.currentPrice) * Number(next.currentDiscount)) / 100;
        const currentDiscountedPrice = (Number(next.price) * Number(next.discount)) / 100;
        if (next.currentPrice && next.currentDiscount && previousDiscountedPrice !== currentDiscountedPrice) {
          return (
            pre +
            (Number(next.currentPrice) - (Number(next.currentPrice) * Number(next.currentDiscount)) / 100) *
              Number(next.orderQuantity)
          );
        }
        return (
          pre + (Number(next.price) - (Number(next.price) * Number(next.discount)) / 100) * Number(next.orderQuantity)
        );
      }, 0);
  const totalRetailPrice =
    currentOrder &&
    currentOrder
      .filter((e) => !e.delete)
      .reduce((pre, next) => {
        return pre + Number(next.retailPrice) * Number(next.orderQuantity);
      }, 0);

  const handleAfterOrder = () => {
    if (orderStatus === 'UPDATE_ORDER') {
      dispatch(updateOrderStatusAction('CREATE_ORDER'));
    }
    dispatch(deleteAllOrderItemsAction());
    dispatch(GetProducts(productsFilter));
    dispatch(currentCustomerAction({}));
    setOpenPaymentModal(false);
    setCurrentSalesman('');
    if (state && state?.salesman) {
      navigate('/');
    }
  };

  const handleOrderCreate = (status, change) => {
    if (orderStatus === 'UPDATE_ORDER') {
      dispatch(
        UpdateOrder(
          {
            status: status,
            salesman: currentSalesman || undefined,
            customer: currentCustomer?._id || undefined,
            change: change ? change : undefined,
            orderItems: currentOrder.map((e) => {
              const previousDiscountedPrice = (Number(e.currentPrice) * Number(e.currentDiscount)) / 100;
              const currentDiscountedPrice = (Number(e.price) * Number(e.discount)) / 100;

              return {
                id: e?.orderItemId ? e.orderItemId : undefined,
                product: e._id,
                quantity: e.orderQuantity,
                previousQuantity: e.previousQuantity,
                previousPaid: e.previousPaid,
                paidPrice:
                  e.currentPrice && e.currentDiscount && previousDiscountedPrice !== currentDiscountedPrice
                    ? Math.round(
                        (Number(e.currentPrice) - (Number(e.currentPrice) * Number(e.currentDiscount)) / 100) *
                          Number(e.orderQuantity)
                      )
                    : Math.round((e.price - (e.price * e.discount) / 100) * e.orderQuantity),
                currentPrice: e?.currentPrice ? e.currentPrice : e.price,
                currentDiscount: e.currentDiscount ? e.currentDiscount : e.discount,
                delete: e?.delete ? true : undefined,
              };
            }),
            total: totalPrice,
            totalRetailPrice,
          },
          order._id
        )
      ).then((res) => {
        if (res.status === 200) {
          handleAfterOrder();
        }
      });
    } else {
      dispatch(
        ConfirmOrder({
          status: status,
          salesman: currentSalesman || undefined,
          customer: currentCustomer?._id || undefined,
          change: change ? change : undefined,
          orderItems: currentOrder.map((e) => ({
            id: e?.orderItemId ? e.orderItemId : undefined,
            product: e._id,
            quantity: e.orderQuantity,
            currentDiscount: e.discount,
            paidPrice: Math.round((e.price - (e.price * e.discount) / 100) * e.orderQuantity),
            currentPrice: e.price,
          })),
          total: totalPrice,
          totalRetailPrice,
        })
      ).then((res) => {
        if (res.status === 201) {
          handleAfterOrder();
        }
      });
    }
  };

  const handleOrderConfirmation = (change) => {
    handleOrderCreate('paid', change);
  };
  const [openCustomerModal, setOpenCustomerModal] = useState(false);
  const [openUserModal, setOpenUserModal] = useState(false);
  const [openInvoiceModal, setOpenInvoiceModal] = useState(false);

  const handleQuantityChange = (item, e) => {
    const { value } = e.target;
    dispatch(createOrderAction(orderStatus, { ...item, orderQuantity: Number(value) }));
  };

  const handleCustomerChange = (e) => {
    if (e?.value) {
      const { value } = e;
      const customer = customers.find((e) => e._id === value);
      dispatch(currentCustomerAction(customer));
    } else {
      dispatch(currentCustomerAction({}));
    }
  };
  const user = JSON.parse(localStorage.getItem('user'));

  const handleOnHoldOrders = () => {
    handleOrderCreate('onHold');
  };

  const customerOptions = customers.map((e) => ({ label: e.name, value: e._id }));
  const salesmanOptions = users.map((e) => ({ label: e.name, value: e._id }));

  const manipulateProducts = (data) => {
    const result = data.map((e) => ({
      ...e.product,
      uuid: Math.random(),
      currentDiscount: e.currentDiscount,
      currentPrice: e.currentPrice,
      orderQuantity: e.quantity,
      previousQuantity: e.quantity,
      previousPaid: e.paidPrice,
    }));
    return result;
  };

  const OrderUpdateHandler = (data) => {
    // dispatch(GetOrder(data.id)).then((res) => {
    //   if (res && res.status === 200) {
    //     const orders = manipulateProducts(res.data.order_line_items);
    //     dispatch(editOnHoldAction(orders));
    //     dispatch(currentCustomerAction(data?.customer));
    //     dispatch(updateOrderStatusAction('UPDATE_ORDER'));
    //     navigate('/', { state: { salesman: data.salesman_id } });
    //   }
    // });
    dispatch(getOrderAction(data));
    dispatch(createOrderAction(orderStatus, manipulateProducts(data.orderItems)));
    dispatch(currentCustomerAction(data?.customer));
    dispatch(updateOrderStatusAction('UPDATE_ORDER'));
    navigate('/', { state: { salesman: data?.salesman._id } });
  };

  const preHold = () => {
    if (onHold.length !== 0 && holdIndex !== 0 && holdIndex !== null) {
      const index = (holdIndex - 1) % onHold.length;
      setHoldIndex(index);
      OrderUpdateHandler(onHold[index]);
    } else {
      const index = onHold.length - 1;
      setHoldIndex(onHold.length - 1);
      OrderUpdateHandler(onHold[index]);
    }
  };

  const nextHold = () => {
    if (onHold.length !== 0 && holdIndex !== null) {
      const index = (holdIndex + 1) % onHold.length;
      setHoldIndex(index);
      OrderUpdateHandler(onHold[index]);
    } else {
      setHoldIndex(0);
      OrderUpdateHandler(onHold[0]);
    }
  };

  return (
    <div className='bg-white rounded-sm mt-6'>
      <div className='p-10 flex flex-col'>
        <div className='flex mb-2 space-x-2'>
          <button
            className='flex align-middle btn-sm-blue'
            disabled={!onHold?.length}
            onClick={preHold}
            ref={leftBtnRef}
          >
            <ArrowSmLeftIcon className='mr-2 h-6' />
          </button>
          <button className='flex align-middle btn-blue' onClick={() => setOpenOnHold(true)}>
            <ViewBoardsIcon className='mr-2 h-6' />
            OnHold Orders
          </button>
          <button
            className='flex align-middle btn-sm-blue'
            disabled={!onHold?.length}
            onClick={nextHold}
            ref={rightBtnRef}
          >
            <ArrowSmRightIcon className='mr-2 h-6' />
          </button>
        </div>
        <div className='flex mb-2'>
          <Select
            options={customerOptions}
            placeholder='Select Customer...'
            value={currentCustomer?._id ? customerOptions.find((e) => e.value === currentCustomer._id) : null}
            isClearable
            onChange={handleCustomerChange}
          />
          <button className='btn-sm-green mx-4' onClick={() => setOpenCustomerModal(true)}>
            <PlusIcon className='h-6' />
          </button>
        </div>
        <div className='flex mb-4'>
          <Select
            options={salesmanOptions}
            placeholder='Select Salesman...'
            isClearable
            value={currentSalesman !== '' ? salesmanOptions.find((e) => e.value === currentSalesman) : null}
            onChange={(e) => (e?.value ? setCurrentSalesman(e.value) : setCurrentSalesman(''))}
          />
          {(user?.role === 'superAdmin' || user?.role === 'admin') && (
            <button className='btn-sm-green mx-4' onClick={() => setOpenUserModal(true)}>
              <PlusIcon className='h-6' />
            </button>
          )}
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
                  currentOrder
                    .filter((e) => !e.delete)
                    .map((e, index) => (
                      <tr key={e.id}>
                        <td className=''>{index + 1}</td>
                        <td className=''>{e.name}</td>
                        <td className=''>
                          <input
                            type='number'
                            className='input-field w-20'
                            min='1'
                            max={e.quantity}
                            value={e.orderQuantity}
                            onChange={(value) => handleQuantityChange(e, value)}
                          />
                        </td>
                        <td className=''>{e?.currentPrice || e.price}</td>
                        <td className=''>
                          <button
                            className='btn-sm-red'
                            onClick={() =>
                              orderStatus === 'UPDATE_ORDER' && e.currentPrice
                                ? dispatch(deleteOrderItemAction(e))
                                : dispatch(deleteCurrentOrderItemAction(e))
                            }
                          >
                            <TrashIcon className='h-4' />
                          </button>
                        </td>
                      </tr>
                    ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className='w-full bg-green-100 p-3 text-center rounded-sm'>
          <h1 className='text-green-900 font-extrabold'>Grand Total : Rs {Math.round(totalPrice)}</h1>
        </div>

        {/* <div className='text-gray-500'>
          <div className='grid grid-cols-5 space-x-4'>
            <div>Total Discounts</div>
            <div className='col-span-2'>: 0</div>
            <div>Price</div>
            <div>RS {Math.round(totalPrice)}</div>
          </div>
          <div className='grid grid-cols-5 space-x-4'>
            <div>Discount</div>
            <div className='col-span-2'>
              <input type='text' className='input-field w-11/12' />
            </div>
            <div>Gross Price(inc 15% Tax)</div>
            <div className='text-xl font-bold'>R0:00</div>
          </div>
        </div> */}
        <div className='flex justify-between my-4'>
          <button className='btn-blue' onClick={() => setOpenInvoiceModal(true)} disabled={currentOrder.length === 0}>
            <PrinterIcon className='h-6' />
          </button>
          <button className='btn-red flex' onClick={handleAfterOrder}>
            <BanIcon className='h-6 mr-2' />
            Cancel
          </button>
          <button className='btn-parrot flex' onClick={handleOnHoldOrders}>
            <HandIcon className='h-6 mr-2' />
            Hold
          </button>
          <button
            className='btn-green flex'
            disabled={currentOrder.length === 0}
            onClick={() => setOpenPaymentModal(true)}
          >
            <CashIcon className='h-6 mr-2' />
            Pay
          </button>
        </div>
      </div>
      <CustomerModal isOpen={openCustomerModal} setIsOpen={setOpenCustomerModal} />
      <AddUserModal isOpen={openUserModal} setIsOpen={setOpenUserModal} />
      <OnHoldOrdersModal isOpen={openOnHold} setIsOpen={setOpenOnHold} />
      <InvoiceModal
        isOpen={openInvoiceModal}
        setIsOpen={setOpenInvoiceModal}
        invoiceData={{ orderItems: currentOrder, customer: currentCustomer, total: totalPrice }}
      />
      <PaymentModal
        isOpen={openPaymentModal}
        setIsOpen={setOpenPaymentModal}
        confirmOrder={handleOrderConfirmation}
        totalPrice={totalPrice}
      />
    </div>
  );
};

export default CreateOrder;
