

const initialState = {
    isLoading : false,
    errorMessage:'',
    cuisine_Data:{},
    selectedCuisine:{},
    totalrows:null,
    };
    
    const manageCuisineReducer = (state = initialState, { type, payload }) => {
      switch (type) {
        
        case "GET_CUISINE_REQUEST":
        case "ADD_CUISINE_REQUEST":
        case "GET_SELECTEDCUISINE_REQUEST":
        case "UPDATE_CUISINE_REQUEST":
        case "DELETE_CUISINE_REQUEST":
            return {
                ...state,
                isLoading :true,
            };
        case "GET_CUISINE_SUCCESS":
            return {
                ...state,
                isLoading:false,
                cuisine_Data:payload,
                totalrows:payload.totalCount
            };
        case "ADD_CUISINE_SUCCESS":
            return{
                ...state,
                isLoading:false,
            };
        case "GET_SELECTEDCUISINE_SUCCESS":            
            return{
                ...state,
                isLoading:false,
                selectedCuisine: payload.data
            }  
      
        case "UPDATE_CUISINE_SUCCESS":            
            return{
                ...state,
                isLoading:false
            }   

        case "DELETE_CUISINE_SUCCESS":            
            return{
                ...state,
                isLoading:false
            } 
             
        case "GET_CUISINE_FAILURE":
        case "ADD_CUISINE_FAILURE":
        case "GET_SELECTEDCUISINE_FAILURE":  
        case "UPDATE_CUISINE_FAILURE":  
        case "DELETE_CUISINE_FAILURE": 
            return {
                ...state,
                isLoading:false,
                errorMessage:payload
            };
  
    

        default:
          return state;
      }
    };
    
    export default manageCuisineReducer;
    