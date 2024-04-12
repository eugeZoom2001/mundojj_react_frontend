import axios from "axios";

export default axios.create({
  //baseURL: "http://localhost:8000/api/v1",
  baseURL: process.env.REACT_APP_BASE_URL,
  headers: {
    "Content-type": "application/json",
  },
});
