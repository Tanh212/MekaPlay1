import axios from "axios";

const API = "http://localhost:8000";

export const login = (data: { email: string; password: string }) =>
  axios.post(`${API}/login`, data);

export const register = (data: { email: string; password: string }) =>
  axios.post(`${API}/register`, data);
