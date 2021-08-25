import React, { useContext } from 'react';
import firebase from '../config/firebase.config';
import { NavLink, useHistory } from 'react-router-dom';
import AppContext from '../store/AppContext';

const Header = () => {
  const history = useHistory();
  const [isLoggedIn] = useContext(AppContext);

  const logout = () => {
    firebase
      .auth()
      .signOut()
      .then((res) => {
        history.replace('/login');
      })
      .catch((err) => console.log(err));
  };

  return (
    <nav className='py-5 bg-gray-900 text-white flex justify-between'>
      <ul className='flex justify-between px-10'>
        <li className='mr-5'>
          <NavLink exact to='/' activeClassName='underline'>
            Home
          </NavLink>
        </li>
        <li className='mr-5'>
          <NavLink to='/gallery' activeClassName='underline'>
            Gallery
          </NavLink>
        </li>
        <li className='mr-5'>
          <NavLink to='/tensorflow' activeClassName='underline'>
            TensorFlow
          </NavLink>
        </li>
      </ul>
      <ul className='flex justify-between px-10'>
        <li>
          {isLoggedIn ? (
            <button onClick={logout}>Logout</button>
          ) : (
            <NavLink to='/login' activeClassName='underline'>
              Login
            </NavLink>
          )}
        </li>
        {!isLoggedIn && (
          <li className='ml-5'>
            <NavLink to='/signup' activeClassName='underline'>
              Signup
            </NavLink>
          </li>
        )}
      </ul>
    </nav>
  );
};

export default Header;
