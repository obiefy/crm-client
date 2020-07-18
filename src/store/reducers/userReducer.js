import {
  GET_USERS,
  GET_USER,
  ADD_USER,
  UPDATE_USER,
  DELETE_USER,
} from "../actions/types";
const initialState = {
  list: [],
  item: {},
};

export default function (state = initialState, action) {
  switch (action.type) {
    case GET_USERS:
      return { ...state, list: action.payload };
    case GET_USER:
      return { ...state, item: action.payload };
    case ADD_USER:
    case UPDATE_USER:
    case DELETE_USER:
      return state;
    default:
      return state;
  }
}
