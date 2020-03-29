import React from 'react';
import { Router, Route, Switch } from "react-router-dom";
import history from './utils/history';
import {login, logout, handleAuthentication, isAuthenticated} from './auth0/auth0';

function App() {
  return (
      <Router history={history}>
        <div>
          { isAuthenticated() && <button onClick = {() => logout()}>logout</button> }
          { !isAuthenticated() && <button onClick = {() => login()}>login</button> }
        </div>
        <Switch>
          <Route exact path="/login" render={() => login()} />
          <Route exact path="/login/callback" render={() => handleAuthentication()} />
        </Switch>
      </Router>
      
  );
}
export default App;
