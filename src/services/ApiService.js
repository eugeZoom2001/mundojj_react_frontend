import axios from "axios";

const prepareDataSend = (data) => {
  const newData = data;
  delete newData._id;
  delete newData._v;
  return newData;
};

const getClientes = (url, token = "1234") => {
  return axios.get(url, {
    headers: {
      "Content-type": "application/json",
      Authorization: "Bearer " + token,
    },
  });
};
const getCliente = (patente, token = "1234") => {
  return axios.get(`${process.env.REACT_APP_BASE_URL}/autos/${patente}`, {
    headers: {
      "Content-type": "application/json",
      Authorization: "Bearer " + token,
    },
  });
};

const getTareas = (patente, token = "1234") => {
  return axios.get(
    `${process.env.REACT_APP_BASE_URL}/autos/tareas/${patente}`,
    {
      headers: {
        "Content-type": "application/json",
        Authorization: "Bearer " + token,
      },
    }
  );
};

const updateCliente = (patente, data, token = "1234") => {
  return axios.patch(
    `${process.env.REACT_APP_BASE_URL}/autos/${patente}`,
    data,
    {
      headers: {
        "Content-type": "application/json",
        Authorization: "Bearer " + token,
      },
    }
  );
};

const createCliente = (data, token = "1234") => {
  return axios.post(`${process.env.REACT_APP_BASE_URL}/autos`, data, {
    headers: {
      "Content-type": "application/json",
      Authorization: "Bearer " + token,
    },
  });
};

const deleteCliente = (patente, token = "1234") => {
  return axios.delete(`${process.env.REACT_APP_BASE_URL}/autos/${patente}`, {
    headers: {
      "Content-type": "application/json",
      Authorization: "Bearer " + token,
    },
  });
};

const ApiService = {
  // Clientes
  prepareDataSend,
  getClientes,
  getCliente,
  updateCliente,
  createCliente,
  getTareas,
  deleteCliente,
};

export default ApiService;
