import network from './network';
const baseUrl = '/api';

function get(endPoint) {
  return network.get(`${baseUrl}/${endPoint}`);
}

function create(endPoint, newObject) {
  return network.post(`${baseUrl}/${endPoint}`, newObject);
}

function update(id, newObject) {
  return network.put(`${baseUrl}/${id}`, newObject);
}

function deleteById(endpoint) {
  return network.delete(`${baseUrl}/${endpoint}`);
}

export { get, create, update, deleteById };
