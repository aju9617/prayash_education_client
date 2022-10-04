import { constant } from "../config/constant";
import axios from "axios";
import toast from "react-hot-toast";

const api = axios.create({ baseURL: constant.API_URL });

const getAuthHeader = () => {
  const token = localStorage.getItem(constant.TOKEN_KEY);
  if (token) {
    return { headers: { Authorization: "Bearer " + token } };
  } else return { headers: {} };
};

const logout = () => {
  removeToken();
  window.location = "/auth/login";
};

const handleResponse = (response) => {
  return response;
};

const setToken = (token) => {
  localStorage.setItem(constant.TOKEN_KEY, token);
};

const getToken = () => {
  return localStorage.getItem(constant.TOKEN_KEY);
};

const removeToken = () => {
  return localStorage.removeItem(constant.TOKEN_KEY);
};

export const catchAsync =
  (fn) =>
  async (...props) => {
    return Promise.resolve(fn(...props)).catch((err) => {
      toast.error(err?.response?.data?.message || err.message);
      if (err?.response?.status === 401) {
        logout();
      }
      return err?.response?.data || err.message;
    });
  };

export const generateQueryString = (obj) => {
  return Object.keys(obj)
    .map((key) => {
      return encodeURIComponent(key) + "=" + encodeURIComponent(obj[key]);
    })
    .join("&");
};

export {
  api,
  getAuthHeader,
  logout,
  setToken,
  getToken,
  removeToken,
  handleResponse,
};
