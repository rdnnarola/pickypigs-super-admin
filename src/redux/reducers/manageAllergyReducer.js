

const initialState = {
    getLoading : false,
    addLoading:false,
    getSelectedLoading:false,
    updateLoading : false,
    deleteLoading:false,
    errorMessage:'',
    allergy_Data:{},
    selectedAllergy:{},
    totalrows:0,
    selectedRow:null,

    showAddAllergyModalData:false,
    showUpdateAllergyModalData:false,
    showDeleteAllergyModalData:false,

    };
    
    const manageAllergyReducer = (state = initialState, { type, payload }) => {
      switch (type) {
        

        case "GET_ALLERGY_REQUEST":
            return {
                ...state,
                getLoading :true,
            };    
        case "GET_ALLERGY_SUCCESS":
            return {
                ...state,
                getLoading:false,
                allergy_Data:payload,
                totalrows:payload.totalCount,
                selectedRow:payload.allergenList.length

            };
        case "GET_ALLERGY_FAILURE":
            return {
                ...state,
                getLoading:false,
                errorMessage:payload
            };    

        case "ADD_ALLERGY_REQUEST":
            return {
                ...state,
                addLoading :true,
            };    
        case "ADD_ALLERGY_SUCCESS":
            return{
                ...state,
                addLoading:false,
            };
        case "ADD_ALLERGY_FAILURE":
            return {
                ...state,
                addLoading:false,
                errorMessage:payload
            };
        
        case "GET_SELECTEDALLERGY_REQUEST":
            return {
                ...state,
                getSelectedLoading :true,
            };    
        case "GET_SELECTEDALLERGY_SUCCESS":            
            return{
                ...state,
                getSelectedLoading:false,
                selectedAllergy: payload.data
            }  
        
        case "GET_SELECTEDALLERGY_FAILURE":  
            return {
                ...state,
                getSelectedLoading:false,
                errorMessage:payload
            };    

        case "UPDATE_ALLERGY_REQUEST":
            return {
                ...state,
                updateLoading :true,
            };
        case "UPDATE_ALLERGY_SUCCESS":            
            return{
                ...state,
                updateLoading:false
            }   
        case "UPDATE_ALLERGY_FAILURE":  
            return {
                ...state,
                updateLoading:false,
                errorMessage:payload
            };
        
        case "DELETE_ALLERGY_REQUEST":
            return {
                ...state,
                deleteLoading :true,
            };
        case "DELETE_ALLERGY_SUCCESS":            
            return{
                ...state,
                deleteLoading:false
            } 
        case "DELETE_ALLERGY_FAILURE": 
            return {
                ...state,
                deleteLoading:false,
                errorMessage:payload
            };
  

        case 'SHOW_ADDALLERGY_MODAL':
            return  { 
              ...state, 
              showAddAllergyModalData:payload
            }; 
        case 'SHOW_UPDATEALLERGY_MODAL':
            return  { 
              ...state, 
              showUpdateAllergyModalData:payload
            };    
        case 'SHOW_DELETEALLERGY_MODAL':
            return  { 
              ...state, 
              showDeleteAllergyModalData:payload
            };         
    

        default:
          return state;
      }
    };
    
    export default manageAllergyReducer;
    