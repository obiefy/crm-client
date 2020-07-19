import http from "../http";

import {
  GET_LEADS,
  GET_LEAD,
  ADD_LEAD,
  UPDATE_LEAD,
  DELETE_LEAD,
  GET_FEEDBACK,
  SET_LOADING,
} from "./types";

import { configToken } from "./authActions";

export const getLeads = () => (dispatch, getState) => {
  http
    .get("/leads", configToken(getState))
    .then(({ data }) => {
      dispatch({
        type: GET_LEADS,
        payload: data.data,
      });
    })
    .catch((error) => {
      dispatch({
        type: GET_FEEDBACK,
        payload: { type: "danger", message: "new error" },
      });
    });
};

export const getLead = (id) => async (dispatch, getState) => {
  dispatch({
    type: GET_LEAD,
    payload: {},
  });

  http
    .get(`/leads/${id}`, configToken(getState))
    .then(({ data }) => {
      dispatch({
        type: GET_LEAD,
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

export const addLead = (payload) => (dispatch, getState) => {
  dispatch({
    type: SET_LOADING,
    payload: true,
  });
  http
    .post("/leads", payload, configToken(getState))
    .then(({ data }) => {
      dispatch({
        type: ADD_LEAD,
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

export const updateLead = (id, payload) => (dispatch, getState) => {
  dispatch({
    type: SET_LOADING,
    payload: true,
  });
  http
    .put(`/leads/${id}`, payload, configToken(getState))
    .then(({ data }) => {
      dispatch({
        type: UPDATE_LEAD,
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
export const deleteLead = (id) => (dispatch, getState) => {
  dispatch({
    type: SET_LOADING,
    payload: true,
  });
  http
    .delete(`/leads/${id}`, configToken(getState))
    .then(({ data }) => {
      dispatch({
        type: DELETE_LEAD,
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
