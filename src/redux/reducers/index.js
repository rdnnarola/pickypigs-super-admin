import { combineReducers } from "redux";
import generalReducer from "./generalReducer";
import manageRestaurantReducer from './manageRestaurantReducer'
import manageUsersReducer from './manageUsersReducer'
import alertReducer from "./alertReducer";
import manageAllergyReducer from './manageAllergyReducer';
import manageCuisineReducer from './manageCuisineReducer';
import manageDietaryReducer from './manageDietaryReducer';
import manageLifestyleReducer from './manageLifestyleReducer';
import manageFeaturesReducer from './manageFeaturesReducer';
import manageCookingReducer from './manageCookingReducer';


export default combineReducers({
 
  general: generalReducer,
  restaurant:manageRestaurantReducer,
  users:manageUsersReducer,
  alert:alertReducer,
  allergy:manageAllergyReducer,
  cuisine:manageCuisineReducer,
  dietary:manageDietaryReducer,
  lifestyle:manageLifestyleReducer,
  features:manageFeaturesReducer,
  cooking:manageCookingReducer
});
