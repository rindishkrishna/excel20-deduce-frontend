import React, {useEffect, useState} from 'react';
import { Router, Route, Switch } from "react-router-dom";
import ContextProvider from './context/context';
import Navbar from './components/navbar/Navbar';
import Main from './components/main/Main';
import history from './utils/history';
import Reload from './components/reload/Reload';
import {login, handleAuthentication} from './auth0/auth0';

function App() {

  const [screen, setScreen] = useState(true);

  useEffect(() => {
    if(window.innerWidth < window.innerHeight){
      setScreen(false);
    }
  }, []);

  return (
    <ContextProvider>
      <Router history={history}>
        {
          screen ? 
          <React.Fragment>
            <Navbar score={30} name={"Afnan"} />
            <Main />
          </React.Fragment> :
          <Reload screen={setScreen} />
        }
        <Switch>
          <Route exact path="/login" render={() => login()} />
          <Route exact path="/login/callback" render={() => handleAuthentication()} />
        </Switch>
      </Router>
    </ContextProvider>
  );
}
export default App;
