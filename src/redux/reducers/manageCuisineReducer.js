

const initialState = {
    isLoading : false,
    errorMessage:'',
    cuisine_Data:{},
    selectedCuisine:{},
    totalrows:0,

    showAddCuisineModalData:false,
    showUpdateCuisineModalData:false,
    showDeleteCuisineModalData:false,
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
            console.log('payload_cusine =>',payload);
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

        case 'SHOW_ADDCUISINE_MODAL':
            return  { 
              ...state, 
              showAddCuisineModalData:payload
            }; 
        case 'SHOW_UPDATECUISINE_MODAL':
            return  { 
              ...state, 
              showUpdateCuisineModalData:payload
            };    
        case 'SHOW_DELETECUISINE_MODAL':
            return  { 
              ...state, 
              showDeleteCuisineModalData:payload
            };         
  
    

        default:
          return state;
      }
    };
    
    export default manageCuisineReducer;
    