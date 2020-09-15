import axios from "axios";
import { API_URL } from "app/config";

function setTimeExpiry() {
  const timeExpiry = new Date();
  timeExpiry.setMinutes(timeExpiry.getMinutes() + 15); // increase 15m from now

  return timeExpiry.getTime();
}

function behaviorAfterRequest(response) {
  if (response.headers.oroauth) {
    const token = response.headers.oroauth.split(" ")[1];
    localStorage.setItem("token", token);
    localStorage.setItem("expiry", setTimeExpiry());
    return response;
  }
}

export const request = (
  opts = {
    oroauth: `Bearer ${localStorage.getItem("token")}`,
  },
) => {
  const defaultOptions = {
    headers: {
      ...opts,
    },
  };
  /*
  |--------------------------------------------------
  | Custom axios api
  |--------------------------------------------------
  */
  const axiosApi = axios.create({
    baseURL: API_URL,
    withCredentials: true, // for backend to send cookies
  });

  return {
    get: (url, options = {}) =>
      axiosApi.get(url, { ...defaultOptions, ...options }).then(response => {
        return behaviorAfterRequest(response);
      }),
    post: (url, data, options = {}) =>
      axiosApi
        .post(url, data, { ...defaultOptions, ...options })
        .then(response => {
          return behaviorAfterRequest(response);
        }),
    put: (url, data, options = {}) =>
      axiosApi
        .put(url, data, { ...defaultOptions, ...options })
        .then(response => {
          return behaviorAfterRequest(response);
        }),
    patch: (url, data, options = {}) =>
      axiosApi
        .put(url, data, { ...defaultOptions, ...options })
        .then(response => {
          return behaviorAfterRequest(response);
        }),
    delete: (url, options = {}) =>
      axiosApi.delete(url, { ...defaultOptions, ...options }).then(response => {
        return behaviorAfterRequest(response);
      }),
  };
};

export default request;
