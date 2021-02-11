

const initialState = {
    isLoading : false,
    errorMessage:'',
    dietary_Data:{},
    selectedDietary:{},
    totalrows:0,
    };
    
    const manageDietaryReducer = (state = initialState, { type, payload }) => {
      switch (type) {
        
        case "GET_DIETARY_REQUEST":
        case "ADD_DIETARY_REQUEST":
        case "GET_SELECTEDDIETARY_REQUEST":
        case "UPDATE_DIETARY_REQUEST":
        case "DELETE_DIETARY_REQUEST":
            return {
                ...state,
                isLoading :true,
            };
        case "GET_DIETARY_SUCCESS":
            return {
                ...state,
                isLoading:false,
                dietary_Data:payload,
                totalrows:payload.totalCount
            };
        case "ADD_DIETARY_SUCCESS":
            return{
                ...state,
                isLoading:false,
            };
        case "GET_SELECTEDDIETARY_SUCCESS":            
            return{
                ...state,
                isLoading:false,
                selectedDietary: payload.data
            }  
      
        case "UPDATE_DIETARY_SUCCESS":            
            return{
                ...state,
                isLoading:false
            }   

        case "DELETE_DIETARY_SUCCESS":            
            return{
                ...state,
                isLoading:false
            } 
             
        case "GET_DIETARY_FAILURE":
        case "ADD_DIETARY_FAILURE":
        case "GET_SELECTEDDIETARY_FAILURE":  
        case "UPDATE_DIETARY_FAILURE":  
        case "DELETE_DIETARY_FAILURE": 
            return {
                ...state,
                isLoading:false,
                errorMessage:payload
            };
  
    

        default:
          return state;
      }
    };
    
    export default manageDietaryReducer;
    