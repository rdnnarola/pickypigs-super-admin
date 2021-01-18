import { combineReducers } from "redux";
import generalReducer from "./generalReducer";
import manageRestaurantReducer from './manageRestaurantReducer'
import manageUsersReducer from './manageUsersReducer'
import alertReducer from "./alertReducer";

export default combineReducers({
 
  general: generalReducer,
  restaurant:manageRestaurantReducer,
  users:manageUsersReducer,
  alert:alertReducer,

});
