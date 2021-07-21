

const initialState = {
    isLoading : false,
    errorMessage:'',
    cooking_Data:{},
    selectedCooking:{},
    totalrows:0,

    showAddCookingModalData:false,
    showUpdateCookingModalData:false,
    showDeleteCookingModalData:false,
    };
    
    const manageCookingReducer = (state = initialState, { type, payload }) => {
      switch (type) {
        
        case "GET_COOKING_REQUEST":
        case "ADD_COOKING_REQUEST":
        case "GET_SELECTEDCOOKING_REQUEST":
        case "UPDATE_COOKING_REQUEST":
        case "DELETE_COOKING_REQUEST":
            return {
                ...state,
                isLoading :true,
            };
        case "GET_COOKING_SUCCESS":
            return {
                ...state,
                isLoading:false,
                cooking_Data:payload,
                totalrows:payload.totalCount
    
            };
        case "ADD_COOKING_SUCCESS":
            return{
                ...state,
                isLoading:false,
            };
        case "GET_SELECTEDCOOKING_SUCCESS":            
            return{
                ...state,
                isLoading:false,
                selectedCooking: payload.data
            }  
      
        case "UPDATE_COOKING_SUCCESS":            
            return{
                ...state,
                isLoading:false
            }   

        case "DELETE_COOKING_SUCCESS":            
            return{
                ...state,
                isLoading:false
            } 
             
        case "GET_COOKING_FAILURE":
        case "ADD_COOKING_FAILURE":
        case "GET_SELECTEDCOOKING_FAILURE":  
        case "UPDATE_COOKING_FAILURE":  
        case "DELETE_COOKING_FAILURE": 
            return {
                ...state,
                isLoading:false,
                errorMessage:payload
            };

        case 'SHOW_ADDCOOKING_MODAL':
            return  { 
              ...state, 
              showAddCookingModalData:payload
            }; 
        case 'SHOW_UPDATECOOKING_MODAL':
            return  { 
              ...state, 
              showUpdateCookingModalData:payload
            };    
        case 'SHOW_DELETECOOKING_MODAL':
            return  { 
              ...state, 
              showDeleteCookingModalData:payload
            };       
  
    

        default:
          return state;
      }
    };
    
    export default manageCookingReducer;
    