import axios from 'axios';
import "./index.css"
const instance = axios.create({
  baseURL: 'http://localhost:3000'
});
instance.interceptors.request.use(
  config => {
    document.body.classList.add('loading-indicator');
    const token = localStorage.getItem('token');
    if (token) {
      config.headers['Authorization'] = token;
    }
    // config.headers['Content-Type'] = 'application/json';
    return config;
  },
  error => {
    document.body.classList.remove('loading-indicator');
    return Promise.reject(error);
  }
);
//Add a response interceptor
instance.interceptors.response.use(
  response => {
    document.body.classList.remove('loading-indicator');
    return response;
  },
  error => {
    console.log(error);
    document.body.classList.remove('loading-indicator');
    return Promise.reject(error);
  }
);
export const get = async (url, params = '') => {
  return await instance.get(`${url}${params}`);
};
export const post = async (url, data = {}) => {
  try {
    return await instance.post(`${url}`, data);
  } catch (e) {
    return e;
  }
};
export default instance;