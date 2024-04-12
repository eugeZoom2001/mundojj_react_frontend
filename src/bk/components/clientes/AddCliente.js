import React, { useState, useEffect, useRef } from "react";
import ListaTareas from "./ListaTareas";
import ApiService from "../../services/ApiService";
import Alert from "../Alert";
import { Container } from "react-bootstrap";
import "./clienteForm.css";

//  *** Date Picker
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { registerLocale } from "react-datepicker";
import es from "date-fns/locale/es";

// ** fechas
import { fechaFromIsoStr, fechaFromDateServer } from "../../services/Fechas";
import { crearNombre, toCaps } from "../../services/funcVarias";

const AddCliente = (props) => {
  registerLocale("es", es);
  const [patente] = useState(() => props.match.params.patente ?? null);
  const [data, setData] = useState({ showModal: false });
  const [alertData, setAlertData] = useState({
    show: false,
    msg: "mensaje alert",
    color: "green",
  });
  const refTarea = useRef();
  const token = "123";

  const closeAlert = () => {
    setAlertData({ ...alertData, show: false });
  };

  const getCliente = async () => {
    if (patente) {
      try {
        const response = await ApiService.getCliente(patente, token);
        const tareas = await ApiService.getTareas(patente, token);
        setData({
          ...data,
          datosMovil: {
            ...response.data.data[0],
            vencimiento1: fechaFromIsoStr(response.data.data[0].vencimiento1),
            vencimiento2: fechaFromIsoStr(response.data.data[0].vencimiento2),
          },
          tareas: tareas.data.data,
        });
      } catch (error) {
        console.log("error no encontrado", error);
      }
    }
  };

  useEffect(() => {
    getCliente();
    return () => {};
  }, [patente]);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setData({
      ...data,
      datosMovil: { ...data.datosMovil, [name]: value },
    });
    event.preventDefault();
  };

  const datosValidos = (data) => {
    let datosValidos = false;
    datosValidos =
      data.datosMovil?.nombre?.length > 0 &&
      data.datosMovil?.telefono?.length > 0 &&
      data.datosMovil?.mail?.length > 0 &&
      data.datosMovil?.marca?.length > 0 &&
      data.datosMovil?.patente?.length > 0;
    return datosValidos;
  };
  const saveCliente = (e) => {
    e.preventDefault();
    if (datosValidos(data)) {
      let newData = {
        ...data.datosMovil,
        vencimiento1: fechaFromDateServer(data.datosMovil.vencimiento1) || "",
        vencimiento2: fechaFromDateServer(data.datosMovil.vencimiento2) || "",
        nombre: crearNombre(data.datosMovil.nombre),
        marca: toCaps(data.datosMovil.marca),
        //patente: toCaps(data.datosMovil.patente),
      };

      patente ? updateCliente(newData) : createCliente(newData);
    } else {
      setAlertData({
        color: "Red",
        msg: "Datos Invalidos !!",
        show: true,
      });
    }
  };

  const updateCliente = async (params) => {
    try {
      const data = await ApiService.prepareDataSend(params);
      const resultOk = await ApiService.updateCliente(patente, data, token);
      props.history.push("/clientes");
    } catch (error) {
      console.log("error update", error);
    }
  };
  const createCliente = async (params) => {
    try {
      params.patente = toCaps(params.patente);
      const result = await ApiService.createCliente(params);
      if (result.data.result === "ok") {
        setData({});
        refTarea.current.value = "";
        setAlertData({
          color: "green",
          msg: "Cliente Agregado con Exito !!",
          show: true,
        });
      } else {
        setAlertData({
          color: "Red",
          msg: "Error El Auto ya Existe !!",
          show: true,
        });
      }
    } catch (error) {
      console.log("server error");
    }
  };

  const cancelAdd = () => {
    props.history.push("/clientes");
  };

  return (
    <div>
      {alertData.show && (
        <Container className="container">
          <Alert
            closeAlert={closeAlert}
            alertContent={alertData.msg}
            color={alertData.color}
          />
        </Container>
      )}
      <div className="card-body">
        <div className="card text-center ">
          <div className="card-header">Alta/Modificacion de un Cliente</div>
          <form className="client-form" onSubmit={saveCliente}>
            <div className="form-row">
              <div className="form-group col-md-5">
                <label htmlFor="nombre">Nombre</label>
                <input
                  type="text"
                  className="form-control"
                  required={true}
                  value={data?.datosMovil?.nombre ?? ""}
                  onChange={handleInputChange}
                  name="nombre"
                />
              </div>
              <div className="form-group col-md-3">
                <label htmlFor="telefono">Telefono</label>
                <input
                  type="text"
                  className="form-control"
                  name="telefono"
                  required
                  value={data?.datosMovil?.telefono ?? ""}
                  onChange={handleInputChange}
                />
              </div>

              <div className="form-group col-md-4">
                <label htmlFor="email">Email</label>
                <input
                  type="email"
                  className="form-control"
                  required
                  value={data?.datosMovil?.mail ?? ""}
                  onChange={handleInputChange}
                  name="mail"
                />
              </div>
            </div>

            <div className="form-row">
              <div className="form-group col-md-6">
                <label htmlFor="marca">Marca/Modelo</label>
                <input
                  type="text"
                  className="form-control"
                  required
                  value={data?.datosMovil?.marca ?? ""}
                  onChange={handleInputChange}
                  name="marca"
                />
              </div>
              <div className="form-group col-md-3">
                <label htmlFor="telefono">Patente</label>
                <input
                  type="text"
                  className="form-control"
                  name="patente"
                  required
                  value={data?.datosMovil?.patente ?? ""}
                  onChange={handleInputChange}
                />
              </div>
              <div className="form-group col-md-3">
                <label htmlFor="telefono">km</label>
                <input
                  type="number"
                  className="form-control"
                  name="km"
                  required
                  value={data?.datosMovil?.km ?? 0}
                  onChange={handleInputChange}
                />
              </div>
            </div>
            <div className="form-row">
              <div className="form-group col-md-12">
                <label htmlFor="tarea">Tarea Realizada</label>
                <input
                  type="textArea"
                  className="form-control"
                  name="tarea"
                  ref={refTarea}
                  onChange={handleInputChange}
                />
              </div>
            </div>
            <div className="form-row">
              <div className="form-group col-md-6">
                <label htmlFor="vencimienmto1">Vencimiento1</label>
                <DatePicker
                  className="form-control"
                  locale="es"
                  name="vencimiento1"
                  dateFormat="dd/MM/yyyy"
                  selected={data?.datosMovil?.vencimiento1 ?? ""} //ok
                  // onChange={(date) => setStartDate1(date)}
                  onChange={(date) =>
                    setData({
                      ...data,
                      datosMovil: { ...data.datosMovil, vencimiento1: date },
                    })
                  }
                />
              </div>
              <div className="form-group col-md-6">
                <label htmlFor="vencimiento2">Vencimiento2</label>
                <DatePicker
                  className="form-control"
                  locale="es"
                  name="vencimiento2"
                  dateFormat="dd/MM/yyyy"
                  selected={data?.datosMovil?.vencimiento2 ?? ""}
                  onChange={(date) =>
                    setData({
                      ...data,
                      datosMovil: { ...data.datosMovil, vencimiento2: date },
                    })
                  }
                />
              </div>
            </div>
            <div className="container" id="idContainerTareas">
              {/* {patente ? <ListaTareas tareas={data?.tareas ?? []} /> : null} */}
              {patente ? <ListaTareas tareas={data?.tareas} /> : null}
            </div>
            <div className="card-footer text-muted">
              <button
                type="button"
                id="btnVolver"
                className="btn btn-outline-danger btn-lg"
                aria-pressed="true"
                onClick={cancelAdd}
              >
                Volver
              </button>
              <button
                type="submit"
                id="btnGuardar"
                onClick={saveCliente}
                className="btn btn-outline-success btn-lg"
                aria-pressed="true"
              >
                Guardar
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
export default AddCliente;
