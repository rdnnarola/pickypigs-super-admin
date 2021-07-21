

const initialState = {
    isLoading : false,
    errorMessage:'',
    features_Data:{},
    selectedFeatures:{},
    totalrows:0,

    showAddFeaturesModalData:false,
    showUpdateFeaturesModalData:false,
    showDeleteFeaturesModalData:false,
    };
    
    const manageFeaturesReducer = (state = initialState, { type, payload }) => {
      switch (type) {
        
        case "GET_FEATURES_REQUEST":
        case "ADD_FEATURES_REQUEST":
        case "GET_SELECTEDFEATURES_REQUEST":
        case "UPDATE_FEATURES_REQUEST":
        case "DELETE_FEATURES_REQUEST":
            return {
                ...state,
                isLoading :true,
            };
        case "GET_FEATURES_SUCCESS":
            return {
                ...state,
                isLoading:false,
                features_Data:payload,
                totalrows:payload.totalCount
    
            };
        case "ADD_FEATURES_SUCCESS":
            return{
                ...state,
                isLoading:false,
            };
        case "GET_SELECTEDFEATURES_SUCCESS":            
            return{
                ...state,
                isLoading:false,
                selectedFeatures: payload.data
            }  
      
        case "UPDATE_FEATURES_SUCCESS":            
            return{
                ...state,
                isLoading:false
            }   

        case "DELETE_FEATURES_SUCCESS":            
            return{
                ...state,
                isLoading:false
            } 
             
        case "GET_FEATURES_FAILURE":
        case "ADD_FEATURES_FAILURE":
        case "GET_SELECTEDFEATURES_FAILURE":  
        case "UPDATE_FEATURES_FAILURE":  
        case "DELETE_FEATURES_FAILURE": 
            return {
                ...state,
                isLoading:false,
                errorMessage:payload
            };

        case 'SHOW_ADDFEATURES_MODAL':
            return  { 
              ...state, 
              showAddFeaturesModalData:payload
            }; 
        case 'SHOW_UPDATEFEATURES_MODAL':
            return  { 
              ...state, 
              showUpdateFeaturesModalData:payload
            };    
        case 'SHOW_DELETEFEATURES_MODAL':
            return  { 
              ...state, 
              showDeleteFeaturesModalData:payload
            };        
        
  
    

        default:
          return state;
      }
    };
    
    export default manageFeaturesReducer;
    