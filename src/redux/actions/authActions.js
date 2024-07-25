export const loginUser = (email) => ({
    type: 'LOGIN_USER',
    payload: email,
  });
  
  export const registerUser = (email) => ({
    type: 'REGISTER_USER',
    payload: email,
  });
  