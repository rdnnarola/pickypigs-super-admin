import Axios from './axios';
import {setAlert} from './alertAction';


export const getAllUsersData=(data)=>{
    return async(dispatch)=>{
        try{
            dispatch({type:"GET_ALLUSERS_REQUEST"});
            let config= {
                headers:{
                 "Content-Type":"application/json"
                 }
             }
            let dataURL=`/super_admin/manage_user/list`
            let response = await Axios.post(dataURL,JSON.stringify(data),config );
            dispatch({type:"GET_ALLUSERS_SUCCESS",payload:response.data});

        }
        catch(error){
          dispatch({type:"GET_ALLUSERS_FAILURE",payload:error});
          if (error.response) {
            dispatch(setAlert(`${error.response.data.message}`, 'danger'));
          } else {
            dispatch(setAlert('Something Went wrong!', 'danger'));
          }
        }
    }
  };


 export const updateSelectedUserPassword=(selectedId,data)=>{
    return async(dispatch)=>{
        try{
            dispatch({type:"UPDATE_USER_REQUEST"});
            let config= {
                headers:{
                 "Content-Type":"application/json"
                 }
             }
            let dataURL=`/super_admin/manage_user/update_password/${selectedId}`
            let response = await Axios.put(dataURL,JSON.stringify(data),config );
            dispatch({type:"UPDATE_USER_SUCCESS",payload:response.data});
            dispatch(getAllUsersData());
            dispatch(setAlert('UserPassword Updated Successfully .', 'success'));
        }
        catch(error){
          dispatch({type:"UPDATE_USER_FAILURE",payload:error});
          if (error.response) {
            dispatch(setAlert(`${error.response.data.message}`, 'danger'));
          } else {
            dispatch(setAlert('Something Went wrong!', 'danger'));
          }
        }
    }
  }; 



  


