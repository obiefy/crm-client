import { combineReducers } from "redux";
import userReducer from "./userReducer";
import leadReducer from "./leadReducer";
import feedbackReducer from "./feedbackReducer";
import authReducer from "./authReducer";

export default combineReducers({
  user: userReducer,
  lead: leadReducer,
  feedback: feedbackReducer,
  auth: authReducer,
});
