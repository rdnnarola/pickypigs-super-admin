import axios from "axios";


if (window.location.host === "localhost:3000") {
  // axios.defaults.baseURL = "https://pickypigsapi.herokuapp.com";
  // axios.defaults.baseURL = "http://192.168.100.39:5003";
  axios.defaults.baseURL = "https://apps.narola.online:5003";
  // axios.defaults.baseURL = "https://localhost:5003";
} else {
  // axios.defaults.baseURL = "https://pickypigsapi.herokuapp.com";
  // axios.defaults.baseURL = "http://192.168.100.39:5003";
  axios.defaults.baseURL = "https://apps.narola.online:5003";
}

const token = localStorage.getItem("access_token");
if (token) axios.defaults.headers.common = { "x-access-token": token };

export default axios;
