import axios from 'axios';

const api = axios.create({
  baseURL: 'http://192.168.50.238:3333'
});

export default api;