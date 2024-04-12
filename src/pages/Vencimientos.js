import React from "react";
import "./clientes.css";
import { Switch, Route, BrowserRouter } from "react-router-dom";

import AddVencimiento from "../components/clientes/AddVencimientos";
import VencimientosList from "../components/clientes/VencimientosList";

function Vencimientos() {
  return (
    <BrowserRouter>
      <div>
        <div className="container mt-3">
          <Switch>
            <Route exact path="/vencimientos" component={VencimientosList} />
            <Route exact path="/edit/:patente" component={AddVencimiento} />
          </Switch>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default Vencimientos;
