import { combineReducers } from "redux";
import userReducer from "./userReducer";
import feedbackReducer from "./feedbackReducer";
import authReducer from "./authReducer";

export default combineReducers({
  user: userReducer,
  feedback: feedbackReducer,
  auth: authReducer,
});
