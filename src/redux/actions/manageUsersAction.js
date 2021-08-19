import Axios from "./axios";
import { setAlert } from "./alertAction";
import { logoutUser } from "./generalActions";
import history from "../../history";

export const getAllUsersData = (data) => {
  return async (dispatch) => {
    try {
      dispatch({ type: "GET_ALLUSERS_REQUEST" });
      let config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      let dataURL = `/super_admin/manage_user/list`;
      let response = await Axios.post(dataURL, JSON.stringify(data), config);
      dispatch({ type: "GET_ALLUSERS_SUCCESS", payload: response.data });
    } catch (error) {
      dispatch({ type: "GET_ALLUSERS_FAILURE", payload: error });
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

export const updateSelectedUserPassword = (
  selectedId,
  data,
  perPage,
  myPage,
  inputValue
) => {
  return async (dispatch) => {
    try {
      dispatch({ type: "UPDATE_USER_REQUEST" });
      let config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      let dataURL = `/super_admin/manage_user/update_password/${selectedId}`;
      let response = await Axios.put(dataURL, JSON.stringify(data), config);
      dispatch({ type: "UPDATE_USER_SUCCESS", payload: response.data });
      dispatch(
        getAllUsersData({
          start: (myPage - 1) * perPage,
          length: perPage,
          search: inputValue,
        })
      );
      dispatch(showUpdateUserPasswordModal(false));
      dispatch(setAlert("UserPassword Updated Successfully .", "success"));
    } catch (error) {
      dispatch({ type: "UPDATE_USER_FAILURE", payload: error });
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

export const showUpdateUserPasswordModal = (value) => {
  return async (dispatch) => {
    try {
      await dispatch({ type: "SHOW_UPDATEUSERPASSWORD_MODAL", payload: value });
    } catch (error) {
      console.error(error);
    }
  };
};
