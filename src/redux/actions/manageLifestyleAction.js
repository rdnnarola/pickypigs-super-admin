import Axios from './axios';
import {setAlert} from './alertAction';


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
          } else {
            dispatch(setAlert('Something went wrong!', 'danger'));
          }
        }
    }
  };


  export const addLifestyleData=(data)=>{
    return async(dispatch)=>{
        try{
            dispatch({type:"ADD_LIFESTYLE_REQUEST"});
            let config= {
                headers:{
                 "Content-Type":"application/json"
                 }
             }
            let dataURL=`super_admin/manage_lifestyle`
            let response = await Axios.post(dataURL,JSON.stringify(data),config );
            dispatch({type:"ADD_LIFESTYLE_SUCCESS",payload:response.data});
            dispatch(getAllLifestyleData());
            dispatch(setAlert('Lifestyle Added Successfully .', 'success'));

        }
        catch(error){
          dispatch({type:"ADD_LIFESTYLE_FAILURE",payload:error});
          if (error.response) {
            dispatch(setAlert(`${error.response.data.message}`, 'danger'));
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


  export const updateSelectedLifestyle=(selectedId,data)=>{
    return async(dispatch)=>{
        try{
            dispatch({type:"UPDATE_LIFESTYLE_REQUEST"});
            let config= {
                headers:{
                 "Content-Type":"application/json"
                 }
             }
            let dataURL=`/super_admin/manage_lifestyle/${selectedId}`
            let response = await Axios.put(dataURL,JSON.stringify(data),config );
            dispatch({type:"UPDATE_LIFESTYLE_SUCCESS",payload:response.data});
            dispatch(getAllLifestyleData());
            dispatch(setAlert('Lifestyle Updated Successfully .', 'success'));
        }
        catch(error){
          dispatch({type:"UPDATE_LIFESTYLE_FAILURE",payload:error});
          if (error.response) {
            dispatch(setAlert(`${error.response.data.message}`, 'danger'));
          } else {
            dispatch(setAlert('Something went wrong!', 'danger'));
          }
        }
    }
  };


  export const deleteSelectedLifestyleData=(selectedId)=>{
    return async(dispatch)=>{
        try{
            dispatch({type:"DELETE_LIFESTYLE_REQUEST"});
            let response = await Axios.delete(`/super_admin/manage_lifestyle/${selectedId}`)
            dispatch({type:"DELETE_LIFESTYLE_SUCCESS",payload:response.data});
            dispatch(getAllLifestyleData());
            dispatch(setAlert('Lifestyle Deleted Successfully .', 'warning'));
        }
        catch(error){
            dispatch({type:"DELETE_LIFESTYLE_FAILURE",payload:error});
            if (error.response) {
              dispatch(setAlert(`${error.response.data.message}`, 'danger'));
            } else {
              dispatch(setAlert('Something went wrong!', 'danger'));
            }
        }
    }
  }