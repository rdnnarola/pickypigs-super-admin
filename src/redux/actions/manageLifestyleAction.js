import Axios from './axios';
import {setAlert} from './alertAction';
import { logoutUser } from './generalActions';
import history from '../../history'
import { deleteImage } from './generalActions';

export const getAllLifestyleData=(data)=>{
    return async(dispatch)=>{
        try{
            dispatch({type:"GET_LIFESTYLE_REQUEST"});
            let config= {
              headers:{
               "Content-Type":"application/json"
               }
            }
            let dataURL=`super_admin/manage_lifestyle/list`
            let response = await Axios.post(dataURL,JSON.stringify(data),config);
            dispatch({type:"GET_LIFESTYLE_SUCCESS",payload:response.data});
        }
        catch(error){
          dispatch({type:"GET_LIFESTYLE_FAILURE",payload:error});
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


  export const addLifestyleData=(data,perPage,myPage,inputValue)=>{
    return async(dispatch)=>{
        try{
            dispatch({type:"ADD_LIFESTYLE_REQUEST"});
            let config= {
                headers:{
                 "Content-Type":"application/json"
                 }
             }
            const formData = new FormData();
            const file = data.image;
            formData.append("image", file);
            formData.append("name", data.name);
            //  formData.append("description", data.description);

            let dataURL=`super_admin/manage_lifestyle`
            let response = await Axios.post(dataURL,formData,config );
            dispatch({type:"ADD_LIFESTYLE_SUCCESS",payload:response.data});
            dispatch(getAllLifestyleData({start:(myPage-1)*perPage,length:perPage,search:inputValue}));
            dispatch(showAddLifestyleModal(false));
            dispatch(setAlert('Lifestyle Added Successfully .', 'success'));

        }
        catch(error){
          dispatch({type:"ADD_LIFESTYLE_FAILURE",payload:error});
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

  export const getSelectedLifestyleData=(selectedId)=>{
    return async(dispatch)=>{
        try{
            dispatch({type:"GET_SELECTEDLIFESTYLE_REQUEST"});
            let dataURL=`/super_admin/manage_lifestyle/${selectedId}`
            let response = await Axios.get(dataURL)
            dispatch({type:"GET_SELECTEDLIFESTYLE_SUCCESS",payload:response.data});
        }
        catch(error){
          dispatch({type:"GET_SELECTEDLIFESTYLE_FAILURE",payload:error});
        }
    }
  }


  export const updateSelectedLifestyle=(selectedId,data,imagepath,perPage,myPage,inputValue)=>{
    return async(dispatch)=>{
        try{
            dispatch({type:"UPDATE_LIFESTYLE_REQUEST"});
            let config= {
                headers:{
                 "Content-Type":"application/json"
                 }
             }
            const formData = new FormData();
            const file = data.image;
            formData.append("image", file);
            formData.append("name", data.name);
            // formData.append("description", data.description); 

            let dataURL=`/super_admin/manage_lifestyle/${selectedId}`
            let response = await Axios.put(dataURL,formData,config );
            dispatch({type:"UPDATE_LIFESTYLE_SUCCESS",payload:response.data});
            dispatch(getAllLifestyleData({start:(myPage-1)*perPage,length:perPage,search:inputValue}));
            if(data.image!==imagepath){
              dispatch(deleteImage({path:imagepath}));
            }
            dispatch(showUpdateLifestyleModal(false));
            dispatch(setAlert('Lifestyle Updated Successfully .', 'success'));
        }
        catch(error){
          dispatch({type:"UPDATE_LIFESTYLE_FAILURE",payload:error});
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


  export const deleteSelectedLifestyleData=(selectedId,imagepath,perPage,myPage,inputValue)=>{
    return async(dispatch)=>{
        try{
            dispatch({type:"DELETE_LIFESTYLE_REQUEST"});
            let response = await Axios.delete(`/super_admin/manage_lifestyle/${selectedId}`)
            dispatch({type:"DELETE_LIFESTYLE_SUCCESS",payload:response.data});
            dispatch(getAllLifestyleData({start:(myPage-1)*perPage,length:perPage,search:inputValue}));
            if(imagepath){
              dispatch(deleteImage({path:imagepath}));
            }
            dispatch(showDeleteLifestyleModal(false));
            dispatch(setAlert('Lifestyle Deleted Successfully .', 'warning'));
        }
        catch(error){
            dispatch({type:"DELETE_LIFESTYLE_FAILURE",payload:error});
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

  export const showAddLifestyleModal = (value) => {
    
    return async(dispatch)=>{
      try{
          await dispatch({type :"SHOW_ADDLIFESTYLE_MODAL" , payload :value });
      }
      catch(error){
          console.error(error);
      }
    }
  };

  export const showUpdateLifestyleModal = (value) => {
    
    return async(dispatch)=>{
      try{
          await dispatch({type :"SHOW_UPDATELIFESTYLE_MODAL" , payload :value });
      }
      catch(error){
          console.error(error);
      }
    }
  };

  export const showDeleteLifestyleModal = (value) => {
    
    return async(dispatch)=>{
      try{
          await dispatch({type :"SHOW_DELETELIFESTYLE_MODAL" , payload :value });
      }
      catch(error){
          console.error(error);
      }
    }
  };