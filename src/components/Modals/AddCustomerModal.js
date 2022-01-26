import { Dialog } from '@headlessui/react';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import ModalTemplate from '.';
import { CreateCustomer, UpdateCustomer } from '../../actions/customers.actions';

const CustomerModal = ({ isOpen, setIsOpen, customerData }) => {
  const initState = {
    name: '',
    email: '',
    phone_no: '',
  };
  const dispatch = useDispatch();
  const [customerDetails, setCustomerDetails] = useState(initState);

  const handleCustomerFields = (e) => {
    const { name, value } = e.target;
    setCustomerDetails((pre) => ({
      ...pre,
      [name]: value,
    }));
  };

  useEffect(() => {
    if (customerData) {
      setCustomerDetails(customerData);
    }
  }, [customerData]);

  const handleCreateCustomer = () => {
    if (customerData) {
      const { id, name, email, phone_no } = customerDetails;
      dispatch(UpdateCustomer(id, { name, email, phone_no })).then(() => {
        setIsOpen(false);
        setCustomerDetails(initState);
      });
    } else {
      dispatch(CreateCustomer(customerDetails)).then(() => {
        setIsOpen(false);
        setCustomerDetails(initState);
      });
    }
  };

  return (
    <div>
      <ModalTemplate isOpen={isOpen} setIsOpen={setIsOpen}>
        <div className='inline-block w-96 my-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-2xl rounded-2xl p-6'>
          <Dialog.Title as='h3' className='text-lg font-medium leading-6 text-gray-900 border-b pb-2'>
            Add Customer
          </Dialog.Title>
          <div className='mt-10'>
            <div className='flex flex-col my-2'>
              <label className='mb-1 text-gray-500 font-bold'>Customer Name</label>
              <input
                className='input-field'
                type='text'
                name='name'
                onChange={handleCustomerFields}
                value={customerDetails.name}
              />
            </div>
            <div className='flex flex-col my-2'>
              <label className='mb-1 text-gray-500 font-bold'>Customer Email</label>
              <input
                className='input-field'
                name='email'
                type='email'
                onChange={handleCustomerFields}
                value={customerDetails.email}
              />
            </div>
            <div className='flex flex-col my-2'>
              <label className='mb-1 text-gray-500 font-bold'>Customer Phone number</label>
              <input
                className='input-field'
                name='phone_no'
                type='text'
                onChange={handleCustomerFields}
                value={customerDetails.phone_no}
              />
            </div>
          </div>

          <div className='mt-4'>
            <button
              type='button'
              onClick={handleCreateCustomer}
              className='inline-flex justify-center px-4 py-2 text-sm font-medium text-blue-900 bg-blue-100 border border-transparent rounded-md hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500'
            >
              Submit
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

export default CustomerModal;
