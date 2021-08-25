import React from 'react';
import Gallery from '../../pages/Gallery';
import Home from '../../pages/Home';
import Login from '../../pages/Login';
import Signup from '../../pages/Signup';
import TensorFlow from '../../pages/TensorFlow';

const routes = [
  {
    path: '/',
    exact: true,
    component: () => <Home />,
    protected: null,
  },
  {
    path: '/gallery',
    component: () => <Gallery />,
    protected: 'auth',
  },
  {
    path: '/login',
    component: () => <Login />,
    protected: 'guest',
  },
  {
    path: '/signup',
    component: () => <Signup />,
    protected: 'guest',
  },
  {
    path: '/tensorflow',
    component: () => <TensorFlow />,
    protected: null,
  },
];
export default routes;
