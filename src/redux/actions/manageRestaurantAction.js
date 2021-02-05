import Axios from './axios';
import {setAlert} from './alertAction';

export const getAllRestaurantData=(data)=>{
    return async(dispatch)=>{
        try{
            dispatch({type:"GET_ALLRESTAURANT_REQUEST"});
            let config= {
                headers:{
                 "Content-Type":"application/json"
                 }
             }
            let dataURL=`/super_admin/manage_restaurant/list`
            let response = await Axios.post(dataURL,JSON.stringify(data),config );
            dispatch({type:"GET_ALLRESTAURANT_SUCCESS",payload:response.data});

        }
        catch(error){
          dispatch({type:"GET_ALLRESTAURANT_FAILURE",payload:error});
          if (error.response) {
            dispatch(setAlert(`${error.response.data.message}`, 'danger'));
          } else {
            dispatch(setAlert('Something wwnt wrong!', 'danger'));
          }
        }
    }
  };


  export const addRestaurantData=(data)=>{
    return async(dispatch)=>{
        try{
            dispatch({type:"ADD_RESTAURANT_REQUEST"});
            let config= {
                headers:{
                 "Content-Type":"application/json"
                 }
             }
            let dataURL=`/super_admin/manage_restaurant/create`
            let response = await Axios.post(dataURL,JSON.stringify(data),config );
            dispatch({type:"ADD_RESTAURANT_SUCCESS",payload:response.data});
            dispatch(getAllRestaurantData());
            dispatch(setAlert('Restaurant Added Successfully .', 'success'));

        }
        catch(error){
          dispatch({type:"ADD_RESTAURANT_FAILURE",payload:error});
          if (error.response) {
            dispatch(setAlert(`${error.response.data.message}`, 'danger'));
          } else {
            dispatch(setAlert('Something wwnt wrong!', 'danger'));
          }
        }
    }
  };

//   export const getSelectedCategoryData=(categoryId)=>{
//     return async(dispatch)=>{
//         try{
//             dispatch({type:"GET_SELECTEDCATEGORY_REQUEST"});
            
//             let response = await Axios.get(`/restaurant_admin/category/${categoryId}`)
//             dispatch({type:"GET_SELECTEDCATEGORY_SUCCESS",payload:response.data});
//         }
//         catch(error){
//           dispatch({type:"GET_SELECTEDCATEGORY_FAILURE",payload:error});
//         }
//     }
//   };



  export const updateSelectedRestaurantPassword=(selectedId,data)=>{
    return async(dispatch)=>{
        try{
            dispatch({type:"UPDATE_RESTAURANT_REQUEST"});
            let config= {
                headers:{
                 "Content-Type":"application/json"
                 }
             }
            let dataURL=`/super_admin/manage_restaurant/update_password/${selectedId}`
            let response = await Axios.put(dataURL,JSON.stringify(data),config );
            dispatch({type:"UPDATE_RESTAURANT_SUCCESS",payload:response.data});
            dispatch(getAllRestaurantData());
            dispatch(setAlert('Restaurant Updated Successfully .', 'success'));
        }
        catch(error){
          dispatch({type:"UPDATE_RESTAURANT_FAILURE",payload:error});
          if (error.response) {
            dispatch(setAlert(`${error.response.data.message}`, 'danger'));
          } else {
            dispatch(setAlert('Something wwnt wrong!', 'danger'));
          }
        }
    }
  };
  
  export const deleteSelectedRestaurantData=(selectedId)=>{
    return async(dispatch)=>{
        try{
            dispatch({type:"DELETE_RESTAURANT_REQUEST"});
            let response = await Axios.delete(`/super_admin/manage_restaurant/${selectedId}`)
            dispatch({type:"DELETE_RESTAURANT_SUCCESS",payload:response.data});
            dispatch(getAllRestaurantData());
            dispatch(setAlert('Restaurant Deleted Successfully .', 'warning'));
        }
        catch(error){
            dispatch({type:"DELETE_RESTAURANT_FAILURE",payload:error});
            if (error.response) {
              dispatch(setAlert(`${error.response.data.message}`, 'danger'));
            } else {
              dispatch(setAlert('Something wwnt wrong!', 'danger'));
            }
        }
    }
  }

