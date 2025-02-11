export const login = (user) => {
  return {
    type: "Login",
    payload: user,
  };
};

export const logout = () => {
  return {
    type: "Logout",
  };
};
