const initialState = {
  user: null,
  isLoggedIn: false,
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case "Login":
      return {
        ...state,
        user: action.payload,
        isLoggedIn: true,
      };
    case "Logout":
      return {
        ...state,
        user: null,
        isLoggedIn: false,
      };
    default:
      return state;
  }
};

export default authReducer;
