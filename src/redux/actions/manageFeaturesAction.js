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
            dispatch({type:"GET_FEATURES_SUCCESS",payload:response.data});
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


  export const addFeaturesData=(data,perPage,myPage,inputValue)=>{
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
            dispatch(getAllFeaturesData({start:(myPage-1)*perPage,length:perPage,search:inputValue}));
            dispatch(setAlert('Features Added Successfully .', 'success'));

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


  export const updateSelectedFeatures=(selectedId,data,imagepath,perPage,myPage,inputValue)=>{
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
            dispatch(getAllFeaturesData({start:(myPage-1)*perPage,length:perPage,search:inputValue}));
            if(data.image!==imagepath){
              dispatch(deleteImage({path:imagepath}));
            }
            dispatch(setAlert('Features Updated Successfully .', 'success'));
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


  export const deleteSelectedFeaturesData=(selectedId,imagepath,perPage,myPage,inputValue)=>{
    return async(dispatch)=>{
        try{
            dispatch({type:"DELETE_FEATURES_REQUEST"});
            let response = await Axios.delete(`/super_admin/manage_restaurant_features_option/${selectedId}`)
            dispatch({type:"DELETE_FEATURES_SUCCESS",payload:response.data});
            dispatch(getAllFeaturesData({start:(myPage-1)*perPage,length:perPage,search:inputValue}));
            dispatch(deleteImage({path:imagepath}));
            dispatch(setAlert('Features Deleted Successfully .', 'warning'));
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