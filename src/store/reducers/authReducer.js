import {
  USER_LOADING,
  USER_LOADED,
  LOGIN_SUCCESS,
  LOGOUT_SUCCESS,
} from "../actions/types";

const initState = {
  token: localStorage.getItem("token"),
  isAuthenticated: null,
  user: null,
  isLoading: false,
};

export default function (state = initState, action) {
  switch (action.type) {
    case USER_LOADING:
      return { ...state, isLoading: true };
    case USER_LOADED:
      return {
        ...state,
        isLoading: false,
        isAuthenticated: true,
        user: action.payload,
      };
    case LOGIN_SUCCESS:
      localStorage.setItem("token", action.payload.token);

      return {
        ...state,
        ...action.payload,
        isLoading: false,
        isAuthenticated: true,
      };
    case LOGOUT_SUCCESS:
      localStorage.removeItem("token");
      return {
        ...state,
        isLoading: false,
        isAuthenticated: false,
        token: null,
        user: null,
      };

    default:
      return state;
  }
}
