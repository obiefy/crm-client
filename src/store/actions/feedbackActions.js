import { GET_FEEDBACK } from "./types";

export const getFeedback = (feedback) => {
  return {
    type: GET_FEEDBACK,
    payload: feedback,
  };
};

export const clearFeedback = () => {
  return {
    type: GET_FEEDBACK,
    payload: {},
  };
};

// export const getLoading = (status) => {
//   return {
//     type: GET_LOADING,
//     payload: status,
//   };
// };
