import axios from 'axios';
const baseUrl = '/api';

function get(endPoint) {
  return axios.get(`${baseUrl}/${endPoint}`);
}

function create(endPoint, newObject) {
  return axios.post(`${baseUrl}/${endPoint}`, newObject);
}

function update(id, newObject) {
  return axios.put(`${baseUrl}/${id}`, newObject);
}

function deleteById(endpoint) {
  return axios.delete(`${baseUrl}/${endpoint}`);
}

export { get, create, update, deleteById };
