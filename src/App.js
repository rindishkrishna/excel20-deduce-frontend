import React from 'react';
import './App.scss';
import { Router, Route, Switch } from "react-router-dom";
import PrivateRoute from './auth0/PrivateRoute';
import history from './utils/history';
import {useAuth0} from './auth0/auth0-context';

function App() {
  const {isAuthenticated, loginWithRedirect, logout, loading} = useAuth0();
  if (loading) {
    return <div>loading ...</div>;
  }
  return (
      <Router history={history}>
        <div>
        {!isAuthenticated && (
          <button onClick={() => loginWithRedirect({})}>Log in</button>
        )}
        {isAuthenticated && <button onClick={() => logout()}>Log out</button>}
        </div>
        <Switch>
          <Route path="/" exact />
          <PrivateRoute path="/profile"  />
        </Switch>
      </Router>
      
  );
}
export default App;
