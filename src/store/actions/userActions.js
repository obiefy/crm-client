import http from "../http";
import {
  GET_USERS,
  GET_USER,
  ADD_USER,
  UPDATE_USER,
  DELETE_USER,
  GET_FEEDBACK,
  SET_LOADING,
} from "./types";

import { configToken } from "./authActions";

export const getUsers = () => (dispatch, getState) => {
  http
    .get("/users", configToken(getState))
    .then(({ data }) => {
      dispatch({
        type: GET_USERS,
        payload: data.data,
      });
    })
    .catch((error) => {
      dispatch({
        type: GET_FEEDBACK,
        payload: [{ error: "new error" }],
      });
    });
};

export const getUser = (id) => async (dispatch, getState) => {
  dispatch({
    type: GET_USER,
    payload: {},
  });

  http
    .get(`/users/${id}`, configToken(getState))
    .then(({ data }) => {
      dispatch({
        type: GET_USER,
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

export const addUser = (user) => (dispatch, getState) => {
  dispatch({
    type: SET_LOADING,
    payload: true,
  });
  http
    .post("/users", user, configToken(getState))
    .then(({ data }) => {
      dispatch({
        type: ADD_USER,
        payload: data,
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
    })
    .finally(() => {
      dispatch({
        type: SET_LOADING,
        payload: false,
      });
    });
};

export const updateUser = (id, payload) => (dispatch, getState) => {
  dispatch({
    type: SET_LOADING,
    payload: true,
  });
  http
    .put(`/users/${id}`, payload, configToken(getState))
    .then(({ data }) => {
      dispatch({
        type: UPDATE_USER,
        payload: data,
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
    })
    .finally(() => {
      dispatch({
        type: SET_LOADING,
        payload: false,
      });
    });
};
export const deleteUser = (id) => (dispatch, getState) => {
  dispatch({
    type: SET_LOADING,
    payload: true,
  });
  http
    .delete(`/users/${id}`, configToken(getState))
    .then(({ data }) => {
      dispatch({
        type: DELETE_USER,
        payload: data,
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
    })
    .finally(() => {
      dispatch({
        type: SET_LOADING,
        payload: false,
      });
    });
};
