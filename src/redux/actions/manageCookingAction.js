import Axios from './axios';
import {setAlert} from './alertAction';
import { deleteImage } from './generalActions';
import { logoutUser } from './generalActions';
import history from '../../history'


export const getAllCookingData=(data)=>{
    return async(dispatch)=>{
        try{
            dispatch({type:"GET_COOKING_REQUEST"});
            let config= {
              headers:{
               "Content-Type":"application/json"
               }
            }
            let dataURL=`/super_admin/manage_cooking_method/list`
            let response = await Axios.post(dataURL,JSON.stringify(data),config);
            dispatch({type:"GET_COOKING_SUCCESS",payload:response.data});
        }
        catch(error){
          dispatch({type:"GET_COOKING_FAILURE",payload:error});
          if (error.response) {
            dispatch(setAlert(`${error.response.data.message}`, 'danger'));
            if(error.response&&error.response.status==401){
              dispatch(logoutUser(history))
            }
          } else {
            dispatch(setAlert('Something went wrong!', 'danger'));
          }
        }
    }
  };


  export const addCookingData=(data,perPage,myPage,inputValue)=>{
    return async(dispatch)=>{
        try{
            dispatch({type:"ADD_COOKING_REQUEST"});
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
             
            let dataURL=`/super_admin/manage_cooking_method`
            let response = await Axios.post(dataURL,formData,config );
            dispatch({type:"ADD_COOKING_SUCCESS",payload:response.data});
            dispatch(getAllCookingData({start:(myPage-1)*perPage,length:perPage,search:inputValue}));
            dispatch(showAddCookingModal(false));
            dispatch(setAlert('Cooking Method Added Successfully .', 'success'));

        }
        catch(error){
          dispatch({type:"ADD_COOKING_FAILURE",payload:error});
          if (error.response) {
            dispatch(setAlert(`${error.response.data.message}`, 'danger'));
            if(error.response&&error.response.status==401){
              dispatch(logoutUser(history))
            }
          } else {
            dispatch(setAlert('Something went wrong!', 'danger'));
          }
        }
    }
  };

  export const getSelectedCookingData=(selectedId)=>{
    return async(dispatch)=>{
        try{
            dispatch({type:"GET_SELECTEDCOOKING_REQUEST"});
            let dataURL=`/super_admin/manage_cooking_method/${selectedId}`
            let response = await Axios.get(dataURL)
            dispatch({type:"GET_SELECTEDCOOKING_SUCCESS",payload:response.data});
        }
        catch(error){
          dispatch({type:"GET_SELECTEDCOOKING_FAILURE",payload:error});
        }
    }
  }


  export const updateSelectedCooking=(selectedId,data,imagepath,perPage,myPage,inputValue)=>{
    return async(dispatch)=>{
        try{
            dispatch({type:"UPDATE_COOKING_REQUEST"});
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

            let dataURL=`/super_admin/manage_cooking_method/${selectedId}`
            let response = await Axios.put(dataURL,formData,config );
            dispatch({type:"UPDATE_COOKING_SUCCESS",payload:response.data});
            dispatch(getAllCookingData({start:(myPage-1)*perPage,length:perPage,search:inputValue}));
            if(data.image!==imagepath){
              dispatch(deleteImage({path:imagepath}));
            }
            dispatch(showUpdateCookingModal(false));
            dispatch(setAlert('Cooking Method Updated Successfully .', 'success'));
        }
        catch(error){
          dispatch({type:"UPDATE_COOKING_FAILURE",payload:error});
          if (error.response) {
            dispatch(setAlert(`${error.response.data.message}`, 'danger'));
            if(error.response&&error.response.status==401){
              dispatch(logoutUser(history))
            }
          } else {
            dispatch(setAlert('Something went wrong!', 'danger'));
          }
        }
    }
  };


  export const deleteSelectedCookingData=(selectedId,imagepath,perPage,myPage,inputValue)=>{
    return async(dispatch)=>{
        try{
            dispatch({type:"DELETE_COOKING_REQUEST"});
            let response = await Axios.delete(`/super_admin/manage_cooking_method/${selectedId}`)
            dispatch({type:"DELETE_COOKING_SUCCESS",payload:response.data});
            dispatch(getAllCookingData({start:(myPage-1)*perPage,length:perPage,search:inputValue}));
            if(imagepath){
              dispatch(deleteImage({path:imagepath}));

            }
            dispatch(showDeleteCookingModal(false));
            dispatch(setAlert('Cooking Method Deleted Successfully .', 'warning'));
        }
        catch(error){
            dispatch({type:"DELETE_COOKING_FAILURE",payload:error});
            if (error.response) {
              dispatch(setAlert(`${error.response.data.message}`, 'danger'));
              if(error.response&&error.response.status==401){
                dispatch(logoutUser(history))
              }
            } else {
              dispatch(setAlert('Something went wrong!', 'danger'));
            }
        }
    }
  }


  export const showAddCookingModal = (value) => {
    
    return async(dispatch)=>{
      try{
          await dispatch({type :"SHOW_ADDCOOKING_MODAL" , payload :value });
      }
      catch(error){
          console.error(error);
      }
    }
  };

  export const showUpdateCookingModal = (value) => {
    
    return async(dispatch)=>{
      try{
          await dispatch({type :"SHOW_UPDATECOOKING_MODAL" , payload :value });
      }
      catch(error){
          console.error(error);
      }
    }
  };

  export const showDeleteCookingModal = (value) => {
    
    return async(dispatch)=>{
      try{
          await dispatch({type :"SHOW_DELETECOOKING_MODAL" , payload :value });
      }
      catch(error){
          console.error(error);
      }
    }
  };