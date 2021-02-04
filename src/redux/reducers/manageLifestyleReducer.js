

const initialState = {
    isLoading : false,
    errorMessage:'',
    lifestyle_Data:{},
    selectedLifestyle:{},
    totalrows:null,
    };
    
    const manageLifestyleReducer = (state = initialState, { type, payload }) => {
      switch (type) {
        
        case "GET_LIFESTYLE_REQUEST":
        case "ADD_LIFESTYLE_REQUEST":
        case "GET_SELECTEDLIFESTYLE_REQUEST":
        case "UPDATE_LIFESTYLE_REQUEST":
        case "DELETE_LIFESTYLE_REQUEST":
            return {
                ...state,
                isLoading :true,
            };
        case "GET_LIFESTYLE_SUCCESS":
            return {
                ...state,
                isLoading:false,
                lifestyle_Data:payload,
                totalrows:payload.totalCount
    
            };
        case "ADD_LIFESTYLE_SUCCESS":
            return{
                ...state,
                isLoading:false,
            };
        case "GET_SELECTEDLIFESTYLE_SUCCESS":            
            return{
                ...state,
                isLoading:false,
                selectedLifestyle: payload.data
            }  
      
        case "UPDATE_LIFESTYLE_SUCCESS":            
            return{
                ...state,
                isLoading:false
            }   

        case "DELETE_LIFESTYLE_SUCCESS":            
            return{
                ...state,
                isLoading:false
            } 
             
        case "GET_LIFESTYLE_FAILURE":
        case "ADD_LIFESTYLE_FAILURE":
        case "GET_SELECTEDLIFESTYLE_FAILURE":  
        case "UPDATE_LIFESTYLE_FAILURE":  
        case "DELETE_LIFESTYLE_FAILURE": 
            return {
                ...state,
                isLoading:false,
                errorMessage:payload
            };
  
    

        default:
          return state;
      }
    };
    
    export default manageLifestyleReducer;
    