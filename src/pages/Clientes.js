import React from "react";
import "./clientes.css";
import { Switch, Route, BrowserRouter } from "react-router-dom";

import AddCliente from "../components/clientes/AddCliente";
import ClientesList from "../components/clientes/ClientesList";

function Clientes() {
  return (
    <BrowserRouter>
      <div>
        <div className="container mt-3">
          <Switch>
            <Route exact path="/clientes" component={ClientesList} />
            <Route exact path="/add" component={AddCliente} />
            <Route exact path="/edit/:patente" component={AddCliente} />
          </Switch>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default Clientes;
