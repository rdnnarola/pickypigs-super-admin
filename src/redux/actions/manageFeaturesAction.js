import Axios from './axios';
import {setAlert} from './alertAction';
import { deleteImage } from './generalActions';

export const getAllFeaturesData=(data)=>{
    return async(dispatch)=>{
        try{
            dispatch({type:"GET_FEATURES_REQUEST"});
            let config= {
              headers:{
               "Content-Type":"application/json"
               }
            }
            let dataURL=`/super_admin/manage_restaurant_features_option/list`
            let response = await Axios.post(dataURL,JSON.stringify(data),config);
            await dispatch({type:"GET_FEATURES_SUCCESS",payload:response.data});
        }
        catch(error){
          dispatch({type:"GET_FEATURES_FAILURE",payload:error});
          if (error.response) {
            dispatch(setAlert(`${error.response.data.message}`, 'danger'));
          } else {
            dispatch(setAlert('Something went wrong!', 'danger'));
          }
        }
    }
  };


  export const addFeaturesData=(data)=>{
    return async(dispatch)=>{
        try{
            dispatch({type:"ADD_FEATURES_REQUEST"});
            let config= {
                headers:{
                  "Content-Type": "multipart/form-data",
                 }
             }
             const formData = new FormData();
             const file = data.image;
             formData.append("image", file);
             formData.append("name", data.name);
             formData.append("description", data.description);
             
            let dataURL=`/super_admin/manage_restaurant_features_option`
            let response = await Axios.post(dataURL,formData,config );
            dispatch({type:"ADD_FEATURES_SUCCESS",payload:response.data});
            await dispatch(setAlert('Features Added Successfully .', 'success'));
            await dispatch(getAllFeaturesData());

        }
        catch(error){
          dispatch({type:"ADD_FEATURES_FAILURE",payload:error});
          if (error.response) {
            dispatch(setAlert(`${error.response.data.message}`, 'danger'));
          } else {
            dispatch(setAlert('Something went wrong!', 'danger'));
          }
        }
    }
  };

  export const getSelectedFeaturesData=(selectedId)=>{
    return async(dispatch)=>{
        try{
            dispatch({type:"GET_SELECTEDFEATURES_REQUEST"});
            let dataURL=`/super_admin/manage_restaurant_features_option/${selectedId}`
            let response = await Axios.get(dataURL)
            dispatch({type:"GET_SELECTEDFEATURES_SUCCESS",payload:response.data});
        }
        catch(error){
          dispatch({type:"GET_SELECTEDFEATURES_FAILURE",payload:error});
        }
    }
  }


  export const updateSelectedFeatures=(selectedId,data,imagepath)=>{
    return async(dispatch)=>{
        try{
            dispatch({type:"UPDATE_FEATURES_REQUEST"});
            let config= {
              headers:{
                "Content-Type": "multipart/form-data",
               }
           }
           const formData = new FormData();
           const file = data.image;
           formData.append("image", file);
           formData.append("name", data.name);
           formData.append("description", data.description);

            let dataURL=`/super_admin/manage_restaurant_features_option/${selectedId}`
            let response = await Axios.put(dataURL,formData,config );
            dispatch({type:"UPDATE_FEATURES_SUCCESS",payload:response.data});
            await dispatch(getAllFeaturesData());
            if(data.image!==imagepath){
              await dispatch(deleteImage({path:imagepath}));
            }
            await dispatch(setAlert('Features Updated Successfully .', 'success'));
        }
        catch(error){
          dispatch({type:"UPDATE_FEATURES_FAILURE",payload:error});
          if (error.response) {
            dispatch(setAlert(`${error.response.data.message}`, 'danger'));
          } else {
            dispatch(setAlert('Something went wrong!', 'danger'));
          }
        }
    }
  };


  export const deleteSelectedFeaturesData=(selectedId,imagepath)=>{
    return async(dispatch)=>{
        try{
            dispatch({type:"DELETE_FEATURES_REQUEST"});
            let response = await Axios.delete(`/super_admin/manage_restaurant_features_option/${selectedId}`)
            dispatch({type:"DELETE_FEATURES_SUCCESS",payload:response.data});
            await dispatch(setAlert('Features Deleted Successfully .', 'warning'));
            await dispatch(getAllFeaturesData());
            await dispatch(deleteImage({path:imagepath}));
        }
        catch(error){
            dispatch({type:"DELETE_FEATURES_FAILURE",payload:error});
            if (error.response) {
              dispatch(setAlert(`${error.response.data.message}`, 'danger'));
            } else {
              dispatch(setAlert('Something went wrong!', 'danger'));
            }
        }
    }
  }