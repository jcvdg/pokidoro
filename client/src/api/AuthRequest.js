import axios from 'axios'
import { HOST } from '../constants';

const API = axios.create({ baseURL: HOST });

export const logIn= (formData)=> API.post('/login',formData);

export const signUp = (formData) => API.post('/register', formData);

export const logout = () => API.post('/logout');