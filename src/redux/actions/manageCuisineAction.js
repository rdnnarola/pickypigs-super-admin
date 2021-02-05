import Axios from './axios';
import {setAlert} from './alertAction';


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
          } else {
            dispatch(setAlert('Something went wrong!', 'danger'));
          }
        }
    }
  };


  export const addCuisineData=(data)=>{
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
            dispatch(getAllCuisineData());
            dispatch(setAlert('Cuisine Added Successfully .', 'success'));

        }
        catch(error){
          dispatch({type:"ADD_CUISINE_FAILURE",payload:error});
          if (error.response) {
            dispatch(setAlert(`${error.response.data.message}`, 'danger'));
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


  export const updateSelectedCuisine=(selectedId,data)=>{
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
            dispatch(getAllCuisineData());
            dispatch(setAlert('Cuisine Updated Successfully .', 'success'));
        }
        catch(error){
          dispatch({type:"UPDATE_CUISINE_FAILURE",payload:error});
          if (error.response) {
            dispatch(setAlert(`${error.response.data.message}`, 'danger'));
          } else {
            dispatch(setAlert('Something went wrong!', 'danger'));
          }
        }
    }
  };


  export const deleteSelectedCuisineData=(selectedId)=>{
    return async(dispatch)=>{
        try{
            dispatch({type:"DELETE_CUISINE_REQUEST"});
            let response = await Axios.delete(`/super_admin/manage_cuisine_type/${selectedId}`)
            dispatch({type:"DELETE_CUISINE_SUCCESS",payload:response.data});
            dispatch(getAllCuisineData());
            dispatch(setAlert('Cuisine Deleted Successfully .', 'warning'));
        }
        catch(error){
            dispatch({type:"DELETE_CUISINE_FAILURE",payload:error});
            if (error.response) {
              dispatch(setAlert(`${error.response.data.message}`, 'danger'));
            } else {
              dispatch(setAlert('Something went wrong!', 'danger'));
            }
        }
    }
  }