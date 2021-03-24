

const initialState = {
    isLoading : false,
    errorMessage:'',
    users_Data:null,
    selectedUser:{},
    totalrows:0,
    };
    
    const manageUsersReducer = (state = initialState, { type, payload }) => {
      switch (type) {
        
        case "GET_ALLUSERS_REQUEST":
        case "UPDATE_USER_REQUEST":
        case "DOWNLOAD_ALLUSERS_REQUEST":
            return {
                ...state,
                isLoading :true,
            };
        case "GET_ALLUSERS_SUCCESS":
            return {
                ...state,
                isLoading:false,
                users_Data:payload,
                totalrows:payload.totalRecord
            };
      
        case "UPDATE_USER_SUCCESS":            
            return{
                ...state,
                isLoading:false
            }   

        case "DOWNLOAD_ALLUSERS_SUCCESS":            
            return{
                ...state,
                isLoading:false
            } 
             
        case "GET_ALLUSERS_FAILURE":
        case "UPDATE_USER_FAILURE":  
        case "DOWNLOAD_ALLUSERS_FAILURE": 
            return {
                ...state,
                isLoading:false,
                errorMessage:payload
            };
  
    

        default:
          return state;
      }
    };
    
    export default manageUsersReducer;
    