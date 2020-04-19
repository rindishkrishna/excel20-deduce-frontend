/* eslint-disable */
// Temperorily disabling eslint to make some changes

import React, { useEffect, useState } from "react";
import { Router, Route, Switch } from "react-router-dom";
import ContextProvider from "./context/context";
import Navbar from "./components/navbar/Navbar";
import Main from "./components/main/Main";
import history from "./utils/history";
import Reload from "./components/reload/Reload";
import { login, handleAuthentication, getProfile } from "./auth0/auth0";

function App() {
  const [screen, setScreen] = useState(true);
  const [user, setUser] = useState({
    name: "",
    image: ""
  });

  useEffect(() => {
    if (window.innerWidth < window.innerHeight) {
      setScreen(false);
    }
    // getProfile((err, user) => {
    //   if (err) {
    //     console.error(err);
    //   } else {
    //     setUser({
    //       name: user.given_name,
    //       image: user.picture
    //     })
    //   }
    // })
  }, []);

  return (
    <ContextProvider>
      <Router history={history}>
        <Switch>
          <Route exact path="/game">
            {
              screen ?
                <React.Fragment>
                  <Navbar score={30} name={user.name} image={user.image} />
                  <Main />
                </React.Fragment> :
                <Reload screen={setScreen} />
            }
          </Route>
          <Route exact path="/login" render={() => login()} />
          <Route
            exact
            path="/login/callback"
            render={() => handleAuthentication()}
          />
        </Switch>
      </Router>
    </ContextProvider>
  );
}
export default App;
