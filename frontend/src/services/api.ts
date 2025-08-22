import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.PROD 
    ? '/api' 
    : 'http://localhost:5000/api',
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
});

export default api;