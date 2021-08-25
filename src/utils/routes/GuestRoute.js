import React, { useContext } from 'react';
import { Redirect, Route } from 'react-router-dom';
import AppContext from '../../store/AppContext';

const GuestRoute = (props) => {
  const [isLoggedIn] = useContext(AppContext);
  if (!isLoggedIn) return <Route {...props} />;
  return <Redirect to='/' />;
};

export default GuestRoute;
