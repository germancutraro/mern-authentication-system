import React, { Fragment } from 'react';
import { Switch, Route } from 'react-router-dom';


// Components
import Home from '../Layout/Home/Home';
import SignIn from '../Layout/SignIn/SignIn';
import SignUp from '../Layout/SignUp/SignUp';
import Private from '../Layout/Private/Private';

const Routes = () => (
  <Fragment>
    <Switch>
      <Route path="/" component={ Home } exact />
      <Route path="/register" component={ SignUp } exact/>
      <Route path="/login" component={ SignIn } exact />
      <Route path="/private" component={ Private } exact />
    </Switch>
  </Fragment>
);

export default Routes;


