// src/redux/reducers/authReducer.js
const initialState = {
    currentUser: null,
    users: [],
  };
  
  const authReducer = (state = initialState, action) => {
    switch (action.type) {
      case 'REGISTER_USER':
        return {
          ...state,
          users: [...state.users, action.payload],
          currentUser: action.payload,
        };
      case 'LOGIN_USER':
        return {
          ...state,
          currentUser: action.payload,
        };
      default:
        return state;
    }
  };
  
  export default authReducer;
  