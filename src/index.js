import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import axios from 'axios'

const APIKey = process.env.REACT_APP_API_KEY
const baseURL = process.env.REACT_APP_API_URL
let headers = {
  'Content-Type': 'application/json',
  'APIKey': APIKey,
};

export const axiosInstance = axios.create({
  baseURL,
  headers,
});


axiosInstance.interceptors.request.use(
  (requestConfig) => {
    if (localStorage.token) {
      requestConfig.headers.Authorization = `${localStorage.getItem('token')}`;
    }
    return requestConfig
  }
)

axiosInstance.interceptors.response.use(
  (response) =>
    new Promise((resolve, reject) => {
      resolve(response);
    }),
  (error) => {
    if (!error.response) {
      return new Promise((resolve, reject) => {
        reject(error);
      });
    }
    if (error.response.status === 403) {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      window.location = "/signin";
    } else {
      return new Promise((resolve, reject) => {
        reject(error);
      });
    }
  }
);

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);
