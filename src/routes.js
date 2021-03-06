import React from 'react';

import Layout from './Hoc/Layout';

import { Switch } from 'react-router-dom';

import Home from './components/home';
import SignIn from './components/signin';
import Dashboard from './components/admin/Dashboard';
import TheTeam from './components/theTeam';
import TheMatches from './components/theMatches';

import AdminMatches from './components/admin/matches';
import AddEditMatch from './components/admin/matches/addEditMatch';
import AdminPlayers from './components/admin/players/';
import AddEditPlayers from './components/admin/players/addEditPlayers';

import PrivateRoute from './components/authRoutes/PrivateRoute';
import PublicRoute from './components/authRoutes/PublicRoute';


const Routes = (props) => {

  return (
    <Layout>
      <Switch>

        <PrivateRoute {...props} path="/admin_players/add_players" exact component={AddEditPlayers}/>
        <PrivateRoute {...props} path="/admin_players/add_players/:id" exact component={AddEditPlayers}/>
        <PrivateRoute {...props} path="/admin_players/" exact component={AdminPlayers}/>
        <PrivateRoute {...props} path="/admin_matches/edit_match/" exact component={AddEditMatch}/>
        <PrivateRoute {...props} path="/admin_matches/edit_match/:id" exact component={AddEditMatch}/>
        <PrivateRoute {...props} path="/admin_matches" exact component={AdminMatches}/>
        <PrivateRoute {...props} path="/dashboard" exact component={Dashboard}/>
        
        <PublicRoute {...props} path="/the_match" restricted={false} exact component={TheMatches}/>
        <PublicRoute {...props} path="/the_team" restricted={false} exact component={TheTeam}/>
        <PublicRoute {...props} path="/sign_in" restricted={true} exact component={SignIn}/>
        <PublicRoute {...props} path="/" restricted={false} exact component={Home}/>

        
      </Switch>
    </Layout>
    
  );
};

export default Routes;
