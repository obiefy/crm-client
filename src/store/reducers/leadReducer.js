import {
  GET_LEADS,
  GET_LEAD,
  ADD_LEAD,
  UPDATE_LEAD,
  DELETE_LEAD,
} from "../actions/types";
const initialState = {
  list: [],
  item: {},
};

export default function (state = initialState, action) {
  switch (action.type) {
    case GET_LEADS:
      return { ...state, list: action.payload };
    case GET_LEAD:
      return { ...state, item: action.payload };
    case ADD_LEAD:
    case UPDATE_LEAD:
    case DELETE_LEAD:
      return state;
    default:
      return state;
  }
}
