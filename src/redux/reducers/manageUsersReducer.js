

const initialState = {
    isLoading : false,
    errorMessage:'',
    users_Data:null,
    selectedUser:{},
    };
    
    const manageUsersReducer = (state = initialState, { type, payload }) => {
      switch (type) {
        
        case "GET_ALLUSERS_REQUEST":
        case "ADD_RESTAURANT_REQUEST":
        case "GET_SELECTEDCATEGORY_REQUEST":
        case "UPDATE_USER_REQUEST":
        case "DELETE_RESTAURANT_REQUEST":
            return {
                ...state,
                isLoading :true,
            };
        case "GET_ALLUSERS_SUCCESS":
            return {
                ...state,
                isLoading:false,
                users_Data:payload,
    
            };
        case "ADD_RESTAURANT_SUCCESS":
            return{
                ...state,
                isLoading:false,
            };
        case "GET_SELECTEDCATEGORY_SUCCESS":            
            return{
                ...state,
                isLoading:false,
                selectedRestaurant: payload.data
            }  
      
        case "UPDATE_USER_SUCCESS":            
            return{
                ...state,
                isLoading:false
            }   

        case "DELETE_RESTAURANT_SUCCESS":            
            return{
                ...state,
                isLoading:false
            } 
             
        case "GET_ALLUSERS_FAILURE":
        case "ADD_RESTAURANT_FAILURE":
        case "GET_SELECTEDCATEGORY_FAILURE":  
        case "UPDATE_USER_FAILURE":  
        case "DELETE_RESTAURANT_FAILURE": 
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
    