import React from 'react';
import { Router, Route, Switch } from "react-router-dom";
import ContextProvider from './context/context';
import Navbar from './components/navbar/Navbar';
import Main from './components/main/Main';
import history from './utils/history';
import {login, handleAuthentication} from './auth0/auth0';

function App() {
  return (
    <ContextProvider>
      <Router history={history}>
        <Navbar score={30} name={"Afnan"} />
        <Main />
        <Switch>
          <Route exact path="/login" render={() => login()} />
          <Route exact path="/login/callback" render={() => handleAuthentication()} />
        </Switch>
      </Router>
    </ContextProvider>
  );
}
export default App;
