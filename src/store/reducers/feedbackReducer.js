import { GET_FEEDBACK, SET_FETCHING, SET_LOADING } from "../actions/types";
const initialState = {
  item: {},
  isFetching: false,
  isLoading: false,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case GET_FEEDBACK:
      return { ...state, item: action.payload };
    case SET_FETCHING:
      return { ...state, isFetching: action.payload };
    case SET_LOADING:
      return { ...state, isLoading: action.payload };

    default:
      return state;
  }
}
