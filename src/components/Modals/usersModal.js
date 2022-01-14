import { Dialog } from '@headlessui/react';
import { PencilAltIcon, TrashIcon } from '@heroicons/react/solid';
import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import ModalTemplate from '.';
import { DeleteUser, GetUsers } from '../../actions/users.actions';
import AddUserModal from './AddUser';

const UsersModal = ({ isOpen, setIsOpen }) => {
  const dispatch = useDispatch();
  const { users } = useSelector((state) => ({
    users: state.users,
  }));
  const initState = {
    id: null,
    name: '',
    email: '',
    password: '',
  };

  useEffect(() => {
    dispatch(GetUsers());
  }, [dispatch]);

  const [openAddUser, setOpenAddUser] = useState(false);
  const [userData, setUserData] = useState(initState);

  const handleUserDelete = (id) => {
    dispatch(DeleteUser(id));
  };

  const handleUserEdit = (data) => {
    const { id, name, email } = data;
    setUserData({ id, name, email });
    setOpenAddUser(true);
  };

  return (
    <div>
      <ModalTemplate isOpen={isOpen} setIsOpen={setIsOpen}>
        <div className='inline-block w-auto h-50v p-6 my-8 text-left align-middle transition-all transform bg-white shadow-2xl rounded-2xl overflow-y-auto'>
          <Dialog.Title as='h3' className='text-lg font-medium leading-6 text-gray-900 border-b pb-2'>
            Users
          </Dialog.Title>
          <div className='mt-10'>
            <table className='table-fixed product-table border-2'>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Role</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody style={{ height: '200px', width: '200px', overflowY: 'scroll' }}>
                {users &&
                  users.map((e) => (
                    <tr key={e.id}>
                      <td>{e.name}</td>
                      <td>{e.email}</td>
                      <td>{e.role}</td>
                      <td>
                        <button className='btn-sm-red' onClick={() => handleUserDelete(e.id)}>
                          <TrashIcon className='h-4' />
                        </button>
                        <button className='btn-sm-yellow ml-3' onClick={() => handleUserEdit(e)}>
                          <PencilAltIcon className='h-4' />
                        </button>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>

          <div className='mt-4'>
            <button
              type='button'
              className='inline-flex justify-center px-4 py-2 text-sm font-medium text-blue-900 bg-blue-100 border border-transparent rounded-md hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500'
              onClick={() => setIsOpen(false)}
            >
              Close
            </button>
          </div>
        </div>
      </ModalTemplate>
      <AddUserModal isOpen={openAddUser} setIsOpen={setOpenAddUser} userData={userData} />
    </div>
  );
};

export default UsersModal;
