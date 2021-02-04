

const initialState = {
    isLoading : false,
    errorMessage:'',
    allergy_Data:{},
    selectedAllergy:{},
    totalrows:null,
    };
    
    const manageAllergyReducer = (state = initialState, { type, payload }) => {
      switch (type) {
        
        case "GET_ALLERGY_REQUEST":
        case "ADD_ALLERGY_REQUEST":
        case "GET_SELECTEDALLERGY_REQUEST":
        case "UPDATE_ALLERGY_REQUEST":
        case "DELETE_ALLERGY_REQUEST":
            return {
                ...state,
                isLoading :true,
            };
        case "GET_ALLERGY_SUCCESS":
            return {
                ...state,
                isLoading:false,
                allergy_Data:payload,
                totalrows:payload.totalCount
    
            };
        case "ADD_ALLERGY_SUCCESS":
            return{
                ...state,
                isLoading:false,
            };
        case "GET_SELECTEDALLERGY_SUCCESS":            
            return{
                ...state,
                isLoading:false,
                selectedAllergy: payload.data
            }  
      
        case "UPDATE_ALLERGY_SUCCESS":            
            return{
                ...state,
                isLoading:false
            }   

        case "DELETE_ALLERGY_SUCCESS":            
            return{
                ...state,
                isLoading:false
            } 
             
        case "GET_ALLERGY_FAILURE":
        case "ADD_ALLERGY_FAILURE":
        case "GET_SELECTEDALLERGY_FAILURE":  
        case "UPDATE_ALLERGY_FAILURE":  
        case "DELETE_ALLERGY_FAILURE": 
            return {
                ...state,
                isLoading:false,
                errorMessage:payload
            };
  
    

        default:
          return state;
      }
    };
    
    export default manageAllergyReducer;
    