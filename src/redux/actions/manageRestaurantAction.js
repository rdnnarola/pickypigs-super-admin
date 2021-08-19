import Axios from "./axios";
import axios from "axios";
import { setAlert } from "./alertAction";
import { logoutUser } from "./generalActions";
import history from "../../history";

export const getAllRestaurantData = (data) => {
  return async (dispatch) => {
    try {
      dispatch({ type: "GET_ALLRESTAURANT_REQUEST" });
      let config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      let dataURL = `/super_admin/manage_restaurant/list`;
      let response = await Axios.post(dataURL, JSON.stringify(data), config);
      dispatch({ type: "GET_ALLRESTAURANT_SUCCESS", payload: response.data });
    } catch (error) {
      dispatch({ type: "GET_ALLRESTAURANT_FAILURE", payload: error });
      if (error.response) {
        dispatch(setAlert(`${error.response.data.message}`, "danger"));
        if (error.response && error.response.status === 401) {
          dispatch(logoutUser(history));
        }
      } else {
        dispatch(setAlert("Something Went wrong!", "danger"));
      }
    }
  };
};

export const addRestaurantData = (data, perPage, myPage, inputValue) => {
  return async (dispatch) => {
    try {
      dispatch({ type: "ADD_RESTAURANT_REQUEST" });
      let config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      let dataURL = `/super_admin/manage_restaurant/create`;
      let response = await Axios.post(dataURL, JSON.stringify(data), config);
      dispatch({ type: "ADD_RESTAURANT_SUCCESS", payload: response.data });
      dispatch(
        getAllRestaurantData({
          start: (myPage - 1) * perPage,
          length: perPage,
          search: inputValue,
        })
      );
      dispatch(showAddRestaurantModal(false));
      dispatch(setAlert("Restaurant Added Successfully .", "success"));
    } catch (error) {
      dispatch({ type: "ADD_RESTAURANT_FAILURE", payload: error });
      if (error.response) {
        dispatch(setAlert(`${error.response.data.message}`, "danger"));
        if (error.response && error.response.status === 401) {
          dispatch(logoutUser(history));
        }
      } else {
        dispatch(setAlert("Something Went wrong!", "danger"));
      }
    }
  };
};

//   export const getSelectedCategoryData=(categoryId)=>{
//     return async(dispatch)=>{
//         try{
//             dispatch({type:"GET_SELECTEDCATEGORY_REQUEST"});

//             let response = await Axios.get(`/restaurant_admin/category/${categoryId}`)
//             dispatch({type:"GET_SELECTEDCATEGORY_SUCCESS",payload:response.data});
//         }
//         catch(error){
//           dispatch({type:"GET_SELECTEDCATEGORY_FAILURE",payload:error});
//         }
//     }
//   };

export const updateSelectedRestaurantPassword = (
  selectedId,
  data,
  perPage,
  myPage,
  inputValue
) => {
  return async (dispatch) => {
    try {
      dispatch({ type: "UPDATE_RESTAURANT_REQUEST" });
      let config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      let dataURL = `/super_admin/manage_restaurant/update_password/${selectedId}`;
      let response = await Axios.put(dataURL, JSON.stringify(data), config);
      dispatch({ type: "UPDATE_RESTAURANT_SUCCESS", payload: response.data });
      dispatch(
        getAllRestaurantData({
          start: (myPage - 1) * perPage,
          length: perPage,
          search: inputValue,
        })
      );
      dispatch(showUpdateRestaurantModal(false));
      dispatch(setAlert("Restaurant Updated Successfully .", "success"));
    } catch (error) {
      dispatch({ type: "UPDATE_RESTAURANT_FAILURE", payload: error });
      if (error.response) {
        dispatch(setAlert(`${error.response.data.message}`, "danger"));
        if (error.response && error.response.status === 401) {
          dispatch(logoutUser(history));
        }
      } else {
        dispatch(setAlert("Something Went wrong!", "danger"));
      }
    }
  };
};

export const deleteSelectedRestaurantData = (
  selectedId,
  perPage,
  myPage,
  inputValue
) => {
  return async (dispatch) => {
    try {
      dispatch({ type: "DELETE_RESTAURANT_REQUEST" });
      let response = await Axios.delete(
        `/super_admin/manage_restaurant/${selectedId}`
      );
      dispatch({ type: "DELETE_RESTAURANT_SUCCESS", payload: response.data });
      dispatch(
        getAllRestaurantData({
          start: (myPage - 1) * perPage,
          length: perPage,
          search: inputValue,
        })
      );
      dispatch(showDeleteRestaurantModal(false));
      dispatch(setAlert("Restaurant Deleted Successfully .", "warning"));
    } catch (error) {
      dispatch({ type: "DELETE_RESTAURANT_FAILURE", payload: error });
      if (error.response) {
        dispatch(setAlert(`${error.response.data.message}`, "danger"));
        if (error.response && error.response.status === 401) {
          dispatch(logoutUser(history));
        }
      } else {
        dispatch(setAlert("Something Went wrong!", "danger"));
      }
    }
  };
};

export const enableRestaurant = (value) => {
  return async (dispatch) => {
    try {
      dispatch({ type: "ENABLE_RESTAURANT_REQUEST" });
      let config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      let dataURL = `/super_admin/manage_restaurant/update_status`;
      let response = await axios.post(dataURL, value, config);
      dispatch({
        type: "ENABLE_RESTAURANT_SUCCESS",
        payload: response.data.data,
      });

      dispatch({ type: "UPDATE_RESTAURANT_LIST", payload: response.data.data });

      dispatch(setAlert(response.data.message, "success"));
      const token = localStorage.getItem("access_token");
      if (token) axios.defaults.headers.common = { "x-access-token": token };
      history.push("/manage_restaurant");
    } catch (error) {
      dispatch({ type: "ENABLE_RESTAURANT_FAILURE", payload: error });
      if (error.response) {
        dispatch(setAlert("status not changed!", "danger"));
      } else {
        dispatch(setAlert("Something Went wrong!", "danger"));
      }
    }
  };
};

export const showUpdateRestaurantModal = (value) => {
  return async (dispatch) => {
    try {
      await dispatch({ type: "SHOW_UPDATERESTAURANT_MODAL", payload: value });
    } catch (error) {
      console.error(error);
    }
  };
};

export const showAddRestaurantModal = (value) => {
  return async (dispatch) => {
    try {
      await dispatch({ type: "SHOW_UPDATERESTAURANT_MODAL", payload: value });
    } catch (error) {
      console.error(error);
    }
  };
};

export const showDeleteRestaurantModal = (value) => {
  return async (dispatch) => {
    try {
      await dispatch({ type: "SHOW_DELETERESTAURANT_MODAL", payload: value });
    } catch (error) {
      console.error(error);
    }
  };
};
