import React from "react";
import { Switch, Route } from "react-router-dom";
import Clientes from "./Clientes";
import Vencimientos from "./Vencimientos";

import {NavDropdown}  from "react-bootstrap"
const Home = (props) => {
  return (
    <div>
      <h4>Home</h4>
      <nav className="navbar navbar-expand navbar-dark bg-dark">
        <a href="/clientes" className="navbar-brand">
          Clientes
        </a>
        <div className="navbar-nav mr-auto">
          <li className="nav-item">
            <a href="/vencimientos" className="navbar-brand">
              Vencimientos
            </a>
          </li>
        <NavDropdown  title="Stock/Proveedores" id="basic-nav-dropdown" >
          <NavDropdown.Item href="#action/1.">Stock</NavDropdown.Item>
          <NavDropdown.Item href="#action/3.2">Another action</NavDropdown.Item>
          <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
          <NavDropdown.Divider />
          <NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item>
        </NavDropdown>
        </div>
        
      </nav>
      <div className="container mt-3">
        <Switch>
          <Route exact path={"/clientes"} component={Clientes} />
          <Route exact path={"/vencimientos"} component={Vencimientos} />
          
        </Switch>
      </div>
    </div>
  );
};

export default Home;
