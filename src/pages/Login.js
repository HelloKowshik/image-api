import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import firebase from '../config/firebase.config';

const Login = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [userForm, setUserForm] = useState({ email: '', password: '' });
  const history = useHistory();

  const handleForm = (e) => {
    if (isLoading) return;
    setIsLoading(true);
    e.preventDefault();
    firebase
      .auth()
      .signInWithEmailAndPassword(userForm.email, userForm.password)
      .then((res) => {
        history.replace('/');
        setError('');
        setIsLoading(false);
        console.log(res);
      })
      .catch((err) => {
        setError(err.message);
        setIsLoading(false);
      });
  };

  const handleInput = (e) => {
    setUserForm({ ...userForm, [e.target.name]: e.target.value });
  };

  return (
    <div className='flex h-screen bg-gray-200'>
      <div className='m-auto w-1/3 text-white flex flex-wrap justify-center shadow-lg round-lg bg-gradient-to-br from-blue-900 to-blue-700'>
        <form className='m-5 w-10/12' onSubmit={handleForm}>
          <h1 className='w-full text-4xl tracking-widest text-center my-6'>
            Login
          </h1>
          <div className='w-full my-6'>
            <input
              type='email'
              name='email'
              placeholder='Enter Your Email'
              className='p-2 rounded shadow w-full text-black'
              value={userForm.email}
              onChange={handleInput}
            />
          </div>
          <div className='w-full my-6'>
            <input
              type='password'
              name='password'
              placeholder='Enter Password'
              className='p-2 rounded shadow w-full text-black'
              value={userForm.password}
              onChange={handleInput}
            />
          </div>
          <div className='w-full my-10'>
            <button
              type='submit'
              className='p-2 rounded shadow w-full bg-gradient-to-tr from-green-600 to-green-400 text-white '
            >
              {isLoading ? (
                <i className='fas fa-circle-notch fa-spin text-yellow-400'></i>
              ) : (
                'Login'
              )}
            </button>
            {error && <p>{error}</p>}
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
