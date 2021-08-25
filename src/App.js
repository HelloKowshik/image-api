import React, { useEffect, useState } from 'react';
import './assets/css/style.css';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import firebase from './config/firebase.config';
import routes from './utils/routes/index';
import Header from './components/Header';
import AppContext from './store/AppContext';
import AuthRoute from './utils/routes/AuthRoute';
import GuestRoute from './utils/routes/GuestRoute';
import Loading from './components/Loading';
import NotFound from './pages/NotFound';

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState({});

  useEffect(() => {
    setIsLoading(true);
    firebase.auth().onAuthStateChanged((userData) => {
      if (userData) {
        setIsLoggedIn(true);
        setUser(userData);
        setIsLoading(false);
      } else {
        setIsLoggedIn(false);
        setUser({});
        setIsLoading(false);
      }
    });
  }, []);

  if (isLoading) return <Loading />;
  return (
    <Router>
      <AppContext.Provider value={[isLoggedIn, user]}>
        <Header />
        <Switch>
          {routes.map((route, index) => {
            if (route.protected === 'guest') {
              return (
                <GuestRoute
                  path={route.path}
                  exact={route.exact}
                  component={route.component}
                  key={index}
                />
              );
            }
            if (route.protected === 'auth') {
              return (
                <AuthRoute
                  path={route.path}
                  exact={route.exact}
                  component={route.component}
                  key={index}
                />
              );
            }

            return (
              <Route
                path={route.path}
                exact={route.exact}
                component={route.component}
                key={index}
              />
            );
          })}
          <Route path='*'>
            <NotFound />
          </Route>
        </Switch>
      </AppContext.Provider>
    </Router>
  );
};

export default App;
