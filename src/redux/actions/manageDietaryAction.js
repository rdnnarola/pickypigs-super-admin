import Axios from './axios';
import {setAlert} from './alertAction';


export const getAllDietaryData=(data)=>{
    return async(dispatch)=>{
        try{
            dispatch({type:"GET_DIETARY_REQUEST"});
            let config= {
              headers:{
               "Content-Type":"application/json"
               }
            }
            let dataURL=`super_admin/manage_dietary/list`
            let response = await Axios.post(dataURL,JSON.stringify(data),config);
            await dispatch({type:"GET_DIETARY_SUCCESS",payload:response.data});
        }
        catch(error){
          dispatch({type:"GET_DIETARY_FAILURE",payload:error});
          if (error.response) {
            dispatch(setAlert(`${error.response.data.message}`, 'danger'));
          } else {
            dispatch(setAlert('Something went wrong!', 'danger'));
          }
        }
    }
  };


  export const addDietaryData=(data)=>{
    return async(dispatch)=>{
        try{
            dispatch({type:"ADD_DIETARY_REQUEST"});
            let config= {
                headers:{
                 "Content-Type":"application/json"
                 }
             }
            let dataURL=`super_admin/manage_dietary`
            let response = await Axios.post(dataURL,JSON.stringify(data),config );
            dispatch({type:"ADD_DIETARY_SUCCESS",payload:response.data});
            await dispatch(setAlert('Dietary Added Successfully .', 'success'));
            await dispatch(getAllDietaryData());

        }
        catch(error){
          dispatch({type:"ADD_DIETARY_FAILURE",payload:error});
          if (error.response) {
            dispatch(setAlert(`${error.response.data.message}`, 'danger'));
          } else {
            dispatch(setAlert('Something went wrong!', 'danger'));
          }
        }
    }
  };

  export const getSelectedDietaryData=(selectedId)=>{
    return async(dispatch)=>{
        try{
            dispatch({type:"GET_SELECTEDDIETARY_REQUEST"});
            let dataURL=`/super_admin/manage_dietary/${selectedId}`
            let response = await Axios.get(dataURL)
            dispatch({type:"GET_SELECTEDDIETARY_SUCCESS",payload:response.data});
        }
        catch(error){
          dispatch({type:"GET_SELECTEDDIETARY_FAILURE",payload:error});
        }
    }
  }


  export const updateSelectedDietary=(selectedId,data)=>{
    return async(dispatch)=>{
        try{
            dispatch({type:"UPDATE_DIETARY_REQUEST"});
            let config= {
                headers:{
                 "Content-Type":"application/json"
                 }
             }
            let dataURL=`/super_admin/manage_dietary/${selectedId}`
            let response = await Axios.put(dataURL,JSON.stringify(data),config );
            dispatch({type:"UPDATE_DIETARY_SUCCESS",payload:response.data});
            await dispatch(getAllDietaryData());
            
            await dispatch(setAlert('Dietary Updated Successfully .', 'success'));
        }
        catch(error){
          dispatch({type:"UPDATE_DIETARY_FAILURE",payload:error});
          if (error.response) {
            dispatch(setAlert(`${error.response.data.message}`, 'danger'));
          } else {
            dispatch(setAlert('Something went wrong!', 'danger'));
          }
        }
    }
  };


  export const deleteSelectedDietaryData=(selectedId)=>{
    return async(dispatch)=>{
        try{
            dispatch({type:"DELETE_DIETARY_REQUEST"});
            let response = await Axios.delete(`/super_admin/manage_dietary/${selectedId}`)
            dispatch({type:"DELETE_DIETARY_SUCCESS",payload:response.data});
            await dispatch(setAlert('Dietary Deleted Successfully .', 'warning'));
            await dispatch(getAllDietaryData());
        }
        catch(error){
            dispatch({type:"DELETE_DIETARY_FAILURE",payload:error});
            if (error.response) {
              dispatch(setAlert(`${error.response.data.message}`, 'danger'));
            } else {
              dispatch(setAlert('Something went wrong!', 'danger'));
            }
        }
    }
  }