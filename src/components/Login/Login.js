import React from 'react';
import { useDispatch } from 'react-redux';
import { login } from '../../actions/auth.actions';

const Login = () => {
  const dispatch = useDispatch();

  const handleLogin = (e) => {
    e.preventDefault();
    dispatch(login({ email: e.target[0].value, password: e.target[1].value }));
  };

  return (
    <div className='w-screen h-screen bg-green-400 flex justify-center items-center'>
      <form onSubmit={handleLogin} className='w-5/12 h-auto p-10 bg-white rounded flex flex-col space-y-4 items-center'>
        <div className='w-6/12'>
          <label>Username:</label>
          <input type='text' className='input-field' />
        </div>
        <div className='w-6/12'>
          <label>Password</label>
          <input type='password' className='input-field' />
        </div>
        <button className='btn-green' type='submit'>
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;
