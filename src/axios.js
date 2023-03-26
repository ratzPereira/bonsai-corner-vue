import axios from "axios";

const token = JSON.parse(window.localStorage.getItem("token"));

axios.defaults.baseURL = "http://localhost:4000/api/";

if (token) {
  axios.defaults.headers.common["Authorization"] = "Bearer " + token;
}
