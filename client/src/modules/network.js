import axios from 'axios';

const network = axios.create({});

const getToken = () => {
  return localStorage.getItem('token');
}

network.interceptors.request.use(
  config => {
    config.headers["Authorization"] = "bearer " + getToken();
    return config;
  }
);

network.interceptors.response.use(
  config => {
    console.log('RESPONSE', config)
    return config;
  },
  (error) => {
    if (error.response.status === 403) {
      window.location = '/login';
    }
    return error;
  }
);

export default network;
