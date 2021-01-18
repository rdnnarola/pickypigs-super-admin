import Axios from './axios';
import {v4} from 'uuid';


export const setAlert=(message,color)=>{
    let id = v4();
    return async(dispatch)=>{
      try {
        await dispatch({type : "SET_ALERT" , payload : {message , color, id}});
        setTimeout(() => {
             dispatch({type : "REMOVE_ALERT" , payload: {id}});
          } , 6000);
      }
      catch (error) {
          console.error(error);
      }
    }
  };


 