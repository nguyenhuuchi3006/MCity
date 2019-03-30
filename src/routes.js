import React from 'react';

import Layout from './Hoc/Layout';

import { Switch, Route } from 'react-router-dom';

import Home from './components/home';
import SignIn from './components/signin';
import Dashboard from './components/admin/Dashboard';

import PrivateRoute from './components/authRoutes/PrivateRoute';

const Routes = (props) => {


  console.log(props);
  

  return (
    <Layout>
      <Switch>

        <PrivateRoute {...props} path="/dashboard" exact component={Dashboard}/>

        
        <Route path="/sign_in" exact component={SignIn} />
        <Route path="/" exact component={Home} />
        
      </Switch>
    </Layout>
  );
};

export default Routes;
