

const initialState = {
    isLoading : false,
    errorMessage:'',
    restaurant_Data:{},
    selectedRestaurant:{},
    totalrows:0,
    };
    
    const manageRestaurantReducer = (state = initialState, { type, payload }) => {
      switch (type) {
        
        case "GET_ALLRESTAURANT_REQUEST":
        case "ADD_RESTAURANT_REQUEST":
        case "GET_SELECTEDCATEGORY_REQUEST":
        case "UPDATE_RESTAURANT_REQUEST":
        case "DELETE_RESTAURANT_REQUEST":
            return {
                ...state,
                isLoading :true,
            };
        case "GET_ALLRESTAURANT_SUCCESS":
            return {
                ...state,
                isLoading:false,
            restaurant_Data:payload,
            totalrows:payload.totalRecord,
    
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
      
        case "UPDATE_RESTAURANT_SUCCESS":            
            return{
                ...state,
                isLoading:false
            }   

        case "DELETE_RESTAURANT_SUCCESS":            
            return{
                ...state,
                isLoading:false
            } 
             
        case "GET_ALLRESTAURANT_FAILURE":
        case "ADD_RESTAURANT_FAILURE":
        case "GET_SELECTEDCATEGORY_FAILURE":  
        case "UPDATE_RESTAURANT_FAILURE":  
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
    
    export default manageRestaurantReducer;
    