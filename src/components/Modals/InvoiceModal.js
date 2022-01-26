import { Dialog } from '@headlessui/react';
import ModalTemplate from '.';
import { useReactToPrint } from 'react-to-print';
import { useRef } from 'react';

const InvoiceModal = ({ isOpen, setIsOpen, invoiceData }) => {
  const invoiceRef = useRef();
  const printOrder = useReactToPrint({
    content: () => invoiceRef.current,
  });
  return (
    <div>
      <ModalTemplate isOpen={isOpen} setIsOpen={setIsOpen}>
        <div className='inline-block w-auto p-6 my-8 text-left align-middle transition-all transform bg-white shadow-2xl rounded-2xl overflow-y-auto'>
          <Dialog.Title as='h3' className='text-lg font-medium leading-6 text-gray-900 border-b pb-2'>
            Invoice
          </Dialog.Title>
          <div className='h-50v overflow-y-auto'>
            <div className='flex items-center justify-center bg-gray-100 border' id='order' ref={invoiceRef}>
              <div className='w-auto bg-white'>
                <div className='flex justify-between p-4'>
                  <div>
                    <h1 className='text-3xl italic font-extrabold tracking-widest text-gray-500'>Konfor</h1>
                  </div>
                </div>
                <div className='w-full h-0.5 bg-indigo-500'></div>
                <div className='grid grid-cols-2 p-4'>
                  <h6 className='font-bold'>
                    Order Date : <span className='text-sm font-medium'> {new Date().toLocaleDateString()}</span>
                  </h6>
                  <h6 className='font-bold'>
                    Order ID : <span className='text-sm font-medium'>{Math.floor(Math.random() * 100)}</span>
                  </h6>
                  <div className=''>
                    <address className='text-sm'>
                      <span className='font-bold'>Customer Name : </span>
                      {invoiceData.customer.name ? invoiceData.customer.name : 'N/A'}
                    </address>
                  </div>
                  <div className=''>
                    <address className='text-sm'>
                      <span className='font-bold'>Customer Phone : </span>
                      {invoiceData.customer.phone_no ? invoiceData.customer.phone_no : 'N/A'}
                    </address>
                  </div>
                </div>
                <div className='flex justify-center p-4'>
                  <div className='border-b border-gray-200'>
                    <table className=''>
                      <thead className='bg-gray-50'>
                        <tr>
                          <th className='px-4 py-2 text-xs text-gray-500 '>#</th>
                          <th className='px-4 py-2 text-xs text-gray-500 '>Product Name</th>
                          <th className='px-4 py-2 text-xs text-gray-500 '>Quantity</th>
                          <th className='px-4 py-2 text-xs text-gray-500 '>Rate</th>
                          <th className='px-4 py-2 text-xs text-gray-500 '>Subtotal</th>
                        </tr>
                      </thead>
                      <tbody className='bg-white'>
                        {invoiceData.orderItems &&
                          invoiceData.orderItems.map((e, i) => (
                            <tr key={e.id} className='whitespace-nowrap'>
                              <td className='px-6 py-4 text-sm text-gray-500'>{i + 1}</td>
                              <td className='px-6 py-4'>
                                <div className='text-sm text-gray-900'>{e.name}</div>
                              </td>
                              <td className='px-6 py-4'>
                                <div className='text-sm text-gray-500'>{e.quantity}</div>
                              </td>
                              <td className='px-6 py-4 text-sm text-gray-500'>Rs {e.skus.price}</td>
                              <td className='px-6 py-4'>
                                Rs {(e.skus.price - (e.skus.price * e.discount) / 100) * e.quantity}
                              </td>
                            </tr>
                          ))}
                        <tr className='text-white bg-gray-800'>
                          <th colspan='3'></th>
                          <td className='text-sm font-bold'>
                            <b>Total</b>
                          </td>
                          <td className='text-sm font-bold'>
                            <b>Rs {invoiceData.total}</b>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className='mt-4'>
            <button
              type='button'
              onClick={printOrder}
              className='inline-flex justify-center px-4 py-2 text-sm font-medium text-blue-900 bg-blue-100 border border-transparent rounded-md hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500'
            >
              Print
            </button>
            <button
              type='button'
              className='inline-flex justify-center px-4 py-2 text-sm font-medium text-red-900 bg-red-100 border border-transparent rounded-md hover:bg-red-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500 ml-3'
              onClick={() => setIsOpen(false)}
            >
              Close
            </button>
          </div>
        </div>
      </ModalTemplate>
    </div>
  );
};

export default InvoiceModal;
