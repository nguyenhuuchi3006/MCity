import React from 'react';

import Layout from './Hoc/Layout';

import { Switch, Route } from 'react-router-dom';

import Home from './components/home';
import SignIn from './components/signin';
import Dashboard from './components/admin/Dashboard';
import AdminMatches from './components/admin/matches';
import AddEditMatch from './components/admin/matches/addEditMatch';

import PrivateRoute from './components/authRoutes/PrivateRoute';
import PublicRoute from './components/authRoutes/PublicRoute';




const Routes = (props) => {



  

  return (
    <Layout>
      <Switch>

        <PrivateRoute {...props} path="/admin_matches/edit_match/:id" exact component={AddEditMatch}/>
        <PrivateRoute {...props} path="/admin_matches" exact component={AdminMatches}/>
        <PrivateRoute {...props} path="/dashboard" exact component={Dashboard}/>
        
        <PublicRoute {...props} path="/sign_in" restricted={true} exact component={SignIn}/>
        <PublicRoute {...props} path="/" restricted={false} exact component={Home}/>

        
        
      </Switch>
    </Layout>
  );
};

export default Routes;
