import axios from "axios";

const API_URL = "http://localhost:9999/accounts";

export const getAccounts = () => axios.get(API_URL);

export const getAccountById = (id) => axios.get(`${API_URL}/${id}`);

export const updateAccount = (id, data) =>
  axios.put(`${API_URL}/${id}`, data);