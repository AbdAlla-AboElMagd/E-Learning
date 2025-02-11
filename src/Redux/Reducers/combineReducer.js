import { combineReducers } from "redux";
import authReducer from "./authReducer";
import favReducer from "./FavReducer";

export default combineReducers({
  auth: authReducer,
  favCourses: favReducer,
});
