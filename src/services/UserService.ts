import axios from 'axios';

const API_URL = 'http://localhost:8080/api/users';

const getAll = () => {
  return axios.get(API_URL);
};

const get = (id: number) => {
  return axios.get(`${API_URL}/${id}`);
};

const create = (data: any) => {
  return axios.post(API_URL, data);
};

const update = (id: number, data: any) => {
  return axios.put(`${API_URL}/${id}`, data);
};

const remove = (id: number) => {
  return axios.delete(`${API_URL}/${id}`);
};

const search = (searchTerm: string) => {
    return axios.get(`${API_URL}/search?searchTerm=${searchTerm}`);
};  

export default {
  getAll,
  get,
  create,
  update,
  remove,
  search
};
