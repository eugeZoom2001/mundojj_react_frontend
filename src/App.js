import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "@fortawesome/fontawesome-free/css/all.css";
import "@fortawesome/fontawesome-free/js/all.js";
import "./App.css";
import Home from "./pages/Home";
import Login from "./pages/Login";

const App = () => {
  // return <>{logged ? <Home /> : <Login />}</>;
  const [logged, setLogged] = useState(false);
  return <>{logged ? <Home /> : <Home />}</>; //
};

export default App;
