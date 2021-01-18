

const initialState = [];
    
    const alertReducer = (state = initialState, { type, payload }) => {
      switch (type) {
        
        case "SET_ALERT":
            return [...state, payload];
        case "REMOVE_ALERT" :
            return [...state.filter(alert => alert.id!== payload.id)];

        default:
          return state;
      }
    };
    
    export default alertReducer;
    