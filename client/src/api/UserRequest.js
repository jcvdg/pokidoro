import axios from 'axios';
import { HOST } from '../constants';

const API = axios.create({ baseURL: HOST });

API.interceptors.request.use((req) => {
  if (localStorage.getItem('profile')) {
    req.headers.Authorization = `Bearer ${JSON.parse(localStorage.getItem('profile')).token}`;
  }

  return req;
})

export const getBerries = () => API.get('/berries');

export const getEvent = (focusTime) => API.put(`/event/${focusTime}`);

export const addSession = (sessionData, cycles) => {
  const data = { sessionData,
  cycles}
  API.post(`/stats`, data);
};

export const updateWeeklyStats = (data) => {
  API.put('/weeklystats', data);
}

export const getWeeklyStats = () => API.get('/weeklyGraph');