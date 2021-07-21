import Axios from './axios';
import {setAlert} from './alertAction';
import { logoutUser } from './generalActions';
import history from '../../history'

export const getAllCuisineData=(data)=>{
    return async(dispatch)=>{
        try{
            dispatch({type:"GET_CUISINE_REQUEST"});
            let config= {
              headers:{
               "Content-Type":"application/json"
               }
            }
            let dataURL=`super_admin/manage_cuisine_type/list`
            let response = await Axios.post(dataURL,JSON.stringify(data),config);
            dispatch({type:"GET_CUISINE_SUCCESS",payload:response.data});
        }
        catch(error){
          dispatch({type:"GET_CUISINE_FAILURE",payload:error});
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


  export const addCuisineData=(data,perPage,myPage,inputValue)=>{
    return async(dispatch)=>{
        try{
            dispatch({type:"ADD_CUISINE_REQUEST"});
            let config= {
                headers:{
                 "Content-Type":"application/json"
                 }
             }
            let dataURL=`super_admin/manage_cuisine_type`
            let response = await Axios.post(dataURL,JSON.stringify(data),config );
            dispatch({type:"ADD_CUISINE_SUCCESS",payload:response.data});
            dispatch(getAllCuisineData({start:(myPage-1)*perPage,length:perPage,search:inputValue}));
            dispatch(showAddCuisineModal(false));
            dispatch(setAlert('Cuisine Added Successfully .', 'success'));

        }
        catch(error){
          dispatch({type:"ADD_CUISINE_FAILURE",payload:error});
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

  export const getSelectedCuisineData=(selectedId)=>{
    return async(dispatch)=>{
        try{
            dispatch({type:"GET_SELECTEDCUISINE_REQUEST"});
            let dataURL=`/super_admin/manage_cuisine_type/${selectedId}`
            let response = await Axios.get(dataURL)
            dispatch({type:"GET_SELECTEDCUISINE_SUCCESS",payload:response.data});
        }
        catch(error){
          dispatch({type:"GET_SELECTEDCUISINE_FAILURE",payload:error});
        }
    }
  }


  export const updateSelectedCuisine=(selectedId,data,perPage,myPage,inputValue)=>{
    return async(dispatch)=>{
        try{
            dispatch({type:"UPDATE_CUISINE_REQUEST"});
            let config= {
                headers:{
                 "Content-Type":"application/json"
                 }
             }
            let dataURL=`/super_admin/manage_cuisine_type/${selectedId}`
            let response = await Axios.put(dataURL,JSON.stringify(data),config );
            dispatch({type:"UPDATE_CUISINE_SUCCESS",payload:response.data});
            dispatch(getAllCuisineData({start:(myPage-1)*perPage,length:perPage,search:inputValue}));
            dispatch(showUpdateCuisineModal(false));
            dispatch(setAlert('Cuisine Updated Successfully .', 'success'));
        }
        catch(error){
          dispatch({type:"UPDATE_CUISINE_FAILURE",payload:error});
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


  export const deleteSelectedCuisineData=(selectedId,perPage,myPage,inputValue)=>{
    return async(dispatch)=>{
        try{
            dispatch({type:"DELETE_CUISINE_REQUEST"});
            let response = await Axios.delete(`/super_admin/manage_cuisine_type/${selectedId}`)
            dispatch({type:"DELETE_CUISINE_SUCCESS",payload:response.data});
            dispatch(getAllCuisineData({start:(myPage-1)*perPage,length:perPage,search:inputValue}));
            dispatch(showDeleteCuisineModal(false));
            dispatch(setAlert('Cuisine Deleted Successfully .', 'warning'));
        }
        catch(error){
            dispatch({type:"DELETE_CUISINE_FAILURE",payload:error});
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

  export const showAddCuisineModal = (value) => {
    
    return async(dispatch)=>{
      try{
          await dispatch({type :"SHOW_ADDCUISINE_MODAL" , payload :value });
      }
      catch(error){
          console.error(error);
      }
    }
  };

  export const showUpdateCuisineModal = (value) => {
    
    return async(dispatch)=>{
      try{
          await dispatch({type :"SHOW_UPDATECUISINE_MODAL" , payload :value });
      }
      catch(error){
          console.error(error);
      }
    }
  };

  export const showDeleteCuisineModal = (value) => {
    
    return async(dispatch)=>{
      try{
          await dispatch({type :"SHOW_DELETECUISINE_MODAL" , payload :value });
      }
      catch(error){
          console.error(error);
      }
    }
  };