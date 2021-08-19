import Axios from "./axios";
import { setAlert } from "./alertAction";
import { deleteImage } from "./generalActions";
import { logoutUser } from "./generalActions";
import history from "../../history";

export const getAllAllergyData = (data) => {
  return async (dispatch) => {
    try {
      dispatch({ type: "GET_ALLERGY_REQUEST" });
      let config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      let dataURL = `super_admin/manage_allergen/list`;
      let response = await Axios.post(dataURL, JSON.stringify(data), config);
      dispatch({ type: "GET_ALLERGY_SUCCESS", payload: response.data });
    } catch (error) {
      dispatch({ type: "GET_ALLERGY_FAILURE", payload: error });
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

export const addAllergyData = (data, perPage, myPage, inputValue) => {
  return async (dispatch) => {
    try {
      dispatch({ type: "ADD_ALLERGY_REQUEST" });
      let config = {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      };
      const formData = new FormData();
      const file = data.image;
      formData.append("image", file);
      formData.append("name", data.name);
      formData.append("description", data.description);

      let dataURL = `/super_admin/manage_allergen`;
      let response = await Axios.post(dataURL, formData, config);
      dispatch({ type: "ADD_ALLERGY_SUCCESS", payload: response.data });
      dispatch(
        getAllAllergyData({
          start: (myPage - 1) * perPage,
          length: perPage,
          search: inputValue,
        })
      );
      dispatch(showAddAllergyModal(false));
      dispatch(setAlert("Allergy Added Successfully .", "success"));
    } catch (error) {
      dispatch({ type: "ADD_ALLERGY_FAILURE", payload: error });
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

export const getSelectedAllergyData = (selectedId) => {
  return async (dispatch) => {
    try {
      dispatch({ type: "GET_SELECTEDALLERGY_REQUEST" });
      let dataURL = `/super_admin/manage_allergen/${selectedId}`;
      let response = await Axios.get(dataURL);
      dispatch({ type: "GET_SELECTEDALLERGY_SUCCESS", payload: response.data });
    } catch (error) {
      dispatch({ type: "GET_SELECTEDALLERGY_FAILURE", payload: error });
      if (error.response && error.response.status === 401) {
        dispatch(logoutUser(history));
      }
    }
  };
};

export const updateSelectedAllergy = (
  selectedId,
  data,
  imagepath,
  perPage,
  myPage,
  inputValue
) => {
  return async (dispatch) => {
    try {
      dispatch({ type: "UPDATE_ALLERGY_REQUEST" });
      let config = {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      };
      const formData = new FormData();
      const file = data.image;
      formData.append("image", file);
      formData.append("name", data.name);
      formData.append("description", data.description);

      let dataURL = `/super_admin/manage_allergen/${selectedId}`;
      let response = await Axios.put(dataURL, formData, config);
      dispatch({ type: "UPDATE_ALLERGY_SUCCESS", payload: response.data });
      dispatch(
        getAllAllergyData({
          start: (myPage - 1) * perPage,
          length: perPage,
          search: inputValue,
        })
      );
      if (data.image !== imagepath) {
        dispatch(deleteImage({ path: imagepath }));
      }
      dispatch(showUpdateAllergyModal(false));
      dispatch(setAlert("Allergy Updated Successfully .", "success"));
    } catch (error) {
      dispatch({ type: "UPDATE_ALLERGY_FAILURE", payload: error });
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

export const deleteSelectedAllergyData = (
  selectedId,
  imagepath,
  perPage,
  myPage,
  inputValue
) => {
  return async (dispatch) => {
    try {
      dispatch({ type: "DELETE_ALLERGY_REQUEST" });
      let response = await Axios.delete(
        `/super_admin/manage_allergen/${selectedId}`
      );
      dispatch({ type: "DELETE_ALLERGY_SUCCESS", payload: response.data });
      dispatch(
        getAllAllergyData({
          start: (myPage - 1) * perPage,
          length: perPage,
          search: inputValue,
        })
      );
      if (imagepath) {
        dispatch(deleteImage({ path: imagepath }));
      }
      dispatch(showDeleteAllergyModal(false));
      dispatch(setAlert("Allergy Deleted Successfully .", "warning"));
    } catch (error) {
      dispatch({ type: "DELETE_ALLERGY_FAILURE", payload: error });
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

export const showAddAllergyModal = (value) => {
  return async (dispatch) => {
    try {
      await dispatch({ type: "SHOW_ADDALLERGY_MODAL", payload: value });
    } catch (error) {
      console.error(error);
    }
  };
};

export const showUpdateAllergyModal = (value) => {
  return async (dispatch) => {
    try {
      await dispatch({ type: "SHOW_UPDATEALLERGY_MODAL", payload: value });
    } catch (error) {
      console.error(error);
    }
  };
};

export const showDeleteAllergyModal = (value) => {
  return async (dispatch) => {
    try {
      await dispatch({ type: "SHOW_DELETEALLERGY_MODAL", payload: value });
    } catch (error) {
      console.error(error);
    }
  };
};
