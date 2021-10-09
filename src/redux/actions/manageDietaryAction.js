import Axios from "./axios";
import { setAlert } from "./alertAction";
import { logoutUser } from "./generalActions";
import history from "../../history";
import { deleteImage } from "./generalActions";

export const getAllDietaryData = (data) => {
  return async (dispatch) => {
    try {
      dispatch({ type: "GET_DIETARY_REQUEST" });
      let config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      let dataURL = `super_admin/manage_dietary/list`;
      let response = await Axios.post(dataURL, JSON.stringify(data), config);
      dispatch({ type: "GET_DIETARY_SUCCESS", payload: response.data });
    } catch (error) {
      dispatch({ type: "GET_DIETARY_FAILURE", payload: error });
      if (error.response) {
        dispatch(setAlert(`${error.response.data.message}`, "danger"));
        if (error.response && error.response.status === 401) {
          dispatch(logoutUser(history));
        }
      } else {
        dispatch(setAlert("Something went wrong!", "danger"));
      }
    }
  };
};

export const addDietaryData = (data, perPage, myPage, inputValue) => {
  console.log('data =>',data);
  return async (dispatch) => {
    try {
      dispatch({ type: "ADD_DIETARY_REQUEST" });
      let config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      const formData = new FormData();
      const file = data.image;
      formData.append("image", file);
      formData.append("name", data.name);
      formData.append("description", data.description);

      let dataURL = `super_admin/manage_dietary`;
      let response = await Axios.post(dataURL, formData, config);
      dispatch({ type: "ADD_DIETARY_SUCCESS", payload: response.data });
      dispatch(
        getAllDietaryData({
          start: (myPage - 1) * perPage,
          length: perPage,
          search: inputValue,
        })
      );
      dispatch(showAddDietaryModal(false));
      dispatch(setAlert("Dietary Added Successfully .", "success"));
    } catch (error) {
      dispatch({ type: "ADD_DIETARY_FAILURE", payload: error });
      if (error.response) {
        dispatch(setAlert(`${error.response.data.message}`, "danger"));
        if (error.response && error.response.status === 401) {
          dispatch(logoutUser(history));
        }
      } else {
        dispatch(setAlert("Something went wrong!", "danger"));
      }
    }
  };
};

export const getSelectedDietaryData = (selectedId) => {
  return async (dispatch) => {
    try {
      dispatch({ type: "GET_SELECTEDDIETARY_REQUEST" });
      let dataURL = `/super_admin/manage_dietary/${selectedId}`;
      let response = await Axios.get(dataURL);
      dispatch({ type: "GET_SELECTEDDIETARY_SUCCESS", payload: response.data });
    } catch (error) {
      dispatch({ type: "GET_SELECTEDDIETARY_FAILURE", payload: error });
    }
  };
};

export const updateSelectedDietary = (
  selectedId,
  data,
  imagepath,
  perPage,
  myPage,
  inputValue
) => {
  return async (dispatch) => {
    try {
      dispatch({ type: "UPDATE_DIETARY_REQUEST" });
      let config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      const formData = new FormData();
      const file = data.image;
      formData.append("image", file);
      formData.append("name", data.name);
      formData.append("description", data.description);

      let dataURL = `/super_admin/manage_dietary/${selectedId}`;
      let response = await Axios.put(dataURL, formData, config);
      dispatch({ type: "UPDATE_DIETARY_SUCCESS", payload: response.data });
      dispatch(
        getAllDietaryData({
          start: (myPage - 1) * perPage,
          length: perPage,
          search: inputValue,
        })
      );
      if (data.image !== imagepath) {
        dispatch(deleteImage({ path: imagepath }));
      }
      dispatch(showUpdateDietaryModal(false));
      dispatch(setAlert("Dietary Updated Successfully .", "success"));
    } catch (error) {
      dispatch({ type: "UPDATE_DIETARY_FAILURE", payload: error });
      if (error.response) {
        dispatch(setAlert(`${error.response.data.message}`, "danger"));
        if (error.response && error.response.status === 401) {
          dispatch(logoutUser(history));
        }
      } else {
        dispatch(setAlert("Something went wrong!", "danger"));
      }
    }
  };
};

export const deleteSelectedDietaryData = (
  selectedId,
  imagepath,
  perPage,
  myPage,
  inputValue
) => {
  return async (dispatch) => {
    try {
      dispatch({ type: "DELETE_DIETARY_REQUEST" });
      let response = await Axios.delete(
        `/super_admin/manage_dietary/${selectedId}`
      );
      dispatch({ type: "DELETE_DIETARY_SUCCESS", payload: response.data });
      dispatch(
        getAllDietaryData({
          start: (myPage - 1) * perPage,
          length: perPage,
          search: inputValue,
        })
      );
      if (imagepath) {
        dispatch(deleteImage({ path: imagepath }));
      }
      dispatch(showDeleteDietaryModal(false));
      dispatch(setAlert("Dietary Deleted Successfully .", "warning"));
    } catch (error) {
      dispatch({ type: "DELETE_DIETARY_FAILURE", payload: error });
      if (error.response) {
        dispatch(setAlert(`${error.response.data.message}`, "danger"));
        if (error.response && error.response.status === 401) {
          dispatch(logoutUser(history));
        }
      } else {
        dispatch(setAlert("Something went wrong!", "danger"));
      }
    }
  };
};

export const showAddDietaryModal = (value) => {
  return async (dispatch) => {
    try {
      await dispatch({ type: "SHOW_ADDDIETARY_MODAL", payload: value });
    } catch (error) {
      console.error(error);
    }
  };
};

export const showUpdateDietaryModal = (value) => {
  return async (dispatch) => {
    try {
      await dispatch({ type: "SHOW_UPDATEDIETARY_MODAL", payload: value });
    } catch (error) {
      console.error(error);
    }
  };
};

export const showDeleteDietaryModal = (value) => {
  return async (dispatch) => {
    try {
      await dispatch({ type: "SHOW_DELETEDIETARY_MODAL", payload: value });
    } catch (error) {
      console.error(error);
    }
  };
};
