import facade from "./apiFacade";
import React, { useState, useEffect } from "react";

function LogIn({ login }) {
  const init = { username: "", password: "" };
  const [loginCredentials, setLoginCredentials] = useState(init);

  const performLogin = (evt) => {
    evt.preventDefault();
    login(loginCredentials.username, loginCredentials.password);
  };
  const onChange = (evt) => {
    setLoginCredentials({
      ...loginCredentials,
      [evt.target.id]: evt.target.value,
    });
  };

  return (
    <div>
      <h2>Login</h2>
      <form onChange={onChange}>
        <input placeholder="User Name" id="username" />
        <input placeholder="Password" id="password" />
        <button onClick={performLogin}>Login</button>
      </form>
    </div>
  );
}

function LoggedIn({setDataFromServer, dataFromServer}) {
  

  useEffect(() => {
    facade.fetchData("user").then((data) => {
      setDataFromServer(data.msg);
    }).catch(facade.fetchData("admin").then((data) => {
      setDataFromServer(data.msg);
    }));
  }, []);

  return (
    <div>
      <h2>Data Received from server</h2>
      <h3>{dataFromServer}</h3>
    </div>
  );
}

function Login({ loggedIn, login, logout, dataFromServer, setDataFromServer }) {
  return (
    <div>
      {!loggedIn ? (
        <LogIn login={login} />
      ) : (
        <div>
          <LoggedIn setDataFromServer={setDataFromServer} dataFromServer={dataFromServer}/>
          <button onClick={logout}>Logout</button>
        </div>
      )}
    </div>
  );
}

export default Login;
