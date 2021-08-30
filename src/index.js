import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import axios from 'axios'

const APIKey = 'd4b4b5a989a0d3c746749f7c74ba0b33ca6b1ac9';

const baseURL = `https://testproject-api-v2.strv.com`


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
