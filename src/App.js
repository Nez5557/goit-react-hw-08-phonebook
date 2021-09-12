import { lazy, Suspense, useEffect } from "react";
import { connect, useDispatch, useSelector } from "react-redux";
import { Switch } from 'react-router-dom';

import { refresh } from "redux/authorization/authorization-operations";
import { getRefreshLoader } from "redux/authorization/authorization-selectors";

import {PrivateRoute, PublicRoute} from "Components/RestrictedRoutes";

import AppBar from "Components/AppBar";
const RegisterForm = lazy(() => import('./Components/RegisterForm' /* webpackChunkName: 'Register' */));
const AuthorizationForm = lazy(() => import('./Components/AuthorizationForm' /* webpackChunkName; 'Authorization' */));
const Form = lazy(() => import('./Components/Form' /* webpackChunkName: 'Form' */));
const ContactsList = lazy(() => import('./Components/ContactsList' /* webpackChunkName: 'ContactsList' */));
const ListItem = lazy(() => import('./Components/ContactsList/ListItem' /* webpackChunkName: 'ListItem' */));
const Filter = lazy(() => import('./Components/Filter' /* webpackChunkName: 'Filter' */));


function App() {
  const dispatch = useDispatch();
  const refreshLoader = useSelector(getRefreshLoader);

  useEffect(() => {
    dispatch(refresh());
  }, [dispatch]);

  return (
    <div className="container">
      {
        !refreshLoader &&
        <Suspense fallback={<h2>Loading...</h2>}>
          <AppBar />
          
          <Switch>

            <PublicRoute path='/' exact>
              <h2>Hello, please sing up or sign in</h2>
            </PublicRoute>

            <PublicRoute path='/register' restricted>
              <RegisterForm />
            </PublicRoute>

            <PublicRoute path='/login' restricted>
              <AuthorizationForm />
            </PublicRoute>

            <PrivateRoute path='/contacts'>
              <Form />
              <Filter />
              <ContactsList>
                <ListItem />
              </ContactsList>
            </PrivateRoute>

          </Switch>
          
        </Suspense>
      }
    </div>
  );
};

export default connect(null)(App);


