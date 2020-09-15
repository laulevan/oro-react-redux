import jwtDecode from "jwt-decode";
import { request } from "app/utils/request";
import { SET_USER } from "./actionTypes";

export function setUser(user, email, info) {
  return {
    user,
    email,
    info,
    type: SET_USER,
  };
}

export function login({ email, password, captcha }) {
  return dispatch => {
    return request()
      .post("/login", { email, password, captcha })
      .then(response => {
        const info = response.data;
        const token = response.headers.oroauth.split(" ")[1];
        localStorage.setItem("token", token);

        // // set justLogin for shutdown Intercom after user login
        // localStorage.setItem("justLogin", "true");

        dispatch(setUser(jwtDecode(token), email, info));
      });
  };
}

export function accountLockedLogin({ email, password, captcha, params }) {
  return dispatch => {
    return request()
      .post(`/login/${params}`, { email, password, captcha })
      .then(response => {
        const token = response.headers.oroauth.split(" ")[1];
        localStorage.setItem("token", token);
        dispatch(setUser(jwtDecode(token)));
      });
  };
}

export function logout() {
  return dispatch => {
    localStorage.removeItem("token");

    // // set justLogout for shutdown Intercom after user  logout
    // localStorage.setItem("justLogout", "true");

    // don't remove expiry because it need to show SessionTerminated modal
    dispatch(setUser({}));
  };
}

export function refreshToken() {
  return () => {
    return request().get("/refreshtoken");
  };
}

export default {
  accountLockedLogin,
  setUser,
  login,
  logout,
  refreshToken,
};
