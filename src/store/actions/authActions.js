import http from "../http";
import {
  USER_LOADING,
  USER_LOADED,
  LOGIN_SUCCESS,
  LOGOUT_SUCCESS,
  GET_FEEDBACK,
} from "./types";

export const loadUser = () => (dispatch, getState) => {
  dispatch({
    type: USER_LOADING,
  });

  http
    .get("/auth/user", configToken(getState))
    .then(({ data }) => {
      dispatch({
        type: USER_LOADED,
        payload: data.data,
      });
    })
    .catch(({ response }) => {
      dispatch({
        type: GET_FEEDBACK,
        payload: { type: "danger", message: response.data.message },
      });
    });
};

export const login = (credentials) => (dispatch, getState) => {
  dispatch({
    type: USER_LOADING,
  });

  http
    .post("/auth/login", credentials)
    .then(({ data }) => {
      dispatch({
        type: LOGIN_SUCCESS,
        payload: data.data,
      });
      dispatch({
        type: GET_FEEDBACK,
        payload: { type: "success", message: data.message },
      });
    })
    .catch(({ response }) => {
      dispatch({
        type: GET_FEEDBACK,
        payload: { type: "danger", message: response.data.message },
      });
    });
};

export const logout = () => {
  return {
    type: LOGOUT_SUCCESS,
  };
};
export const configToken = (getState) => {
  const token = getState().auth.token;

  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  if (token) {
    config.headers["Authorization"] = `Bearer ${token}`;
  }

  return config;
};
