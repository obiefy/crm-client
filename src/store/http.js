import axios from "axios";

const http = axios.create({
  baseURL: "https://crm-api-demo.herokuapp.com/api",
});

export default http;
