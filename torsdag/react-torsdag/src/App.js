import "./App.css";
import {
  Route,
  Switch,
  NavLink,
  Prompt,
  useRouteMatch,
  useParams,
} from "react-router-dom";
import React, { useState, useEffect } from "react";
import Login from "./Login";
import facade from "./apiFacade";
import Scrape from "./Scrape";
import Jokes from "./Jokes";

function App() {
  const [dataFromServer, setDataFromServer] = useState("Loading...");
  const [loggedIn, setLoggedIn] = useState();

  const logout = () => {
    facade.logout();
    setDataFromServer("Loading...")
    setLoggedIn(false);
  };
  const login = (user, pass) => {
    facade.login(user, pass).then((res) => setLoggedIn(true));
  };

  return (
    <div>
      <Header dataFromServer={dataFromServer} />
      <Switch>
        <Route exact path="/"></Route>
        <Route path="/Jokes">
          <Jokes />
        </Route>
        <Route path="/Scrape">
          <Scrape />
        </Route>
        <Route path="/Login">
          <Login
            loggedIn={loggedIn}
            logout={logout}
            login={login}
            setDataFromServer={setDataFromServer}
            dataFromServer={dataFromServer}
          />
        </Route>
        <Route>
          <NoMatch />
        </Route>
      </Switch>
    </div>
  );
}

function NoMatch() {
  return (
    <div>
      <h2>No Match</h2>
    </div>
  );
}

function Header({ dataFromServer }) {
  function Jokes() {
    return (
      <li>
        <NavLink activeClassName="active" to="/Jokes">
          Jokes
        </NavLink>
      </li>
    );
  }
  function Scrape() {
    return (
      <li>
        <NavLink activeClassName="active" to="/Scrape">
          Scrape
        </NavLink>
      </li>
    );
  }

  return (
    <ul className="header">
      <li>
        <NavLink exact activeClassName="active" to="/">
          Home
        </NavLink>
      </li>
      {(dataFromServer === "user_admin") ? 
      (<React.Fragment><Jokes /> <Scrape/></React.Fragment>): 
      (dataFromServer === "user") ? 
      (<Jokes />): 
      (dataFromServer === "admin") ? 
      (<Scrape/>) :
      (<React.Fragment/>)}
      <li>
        <NavLink activeClassName="active" to="/Login">
          Login
        </NavLink>
      </li>
    </ul>
  );
}

export default App;
