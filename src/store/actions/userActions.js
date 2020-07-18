import axios from "axios";
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
  axios
    .get("http://localhost:4000/api/users", configToken(getState))
    .then(({ data }) => {
      dispatch({
        type: GET_USERS,
        payload: data,
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

  axios
    .get(`http://localhost:4000/api/users/${id}`, configToken(getState))
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
  axios
    .post("http://localhost:4000/api/users", user, configToken(getState))
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
  axios
    .put(
      `http://localhost:4000/api/users/${id}`,
      payload,
      configToken(getState)
    )
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
  axios
    .delete(`http://localhost:4000/api/users/${id}`, configToken(getState))
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
