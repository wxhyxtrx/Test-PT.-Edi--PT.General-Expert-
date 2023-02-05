export const LoginAction = (data) => {
  return {
    type: "LOGIN_SUCCESS",
    payload: data,
  };
};

export const LogoutAction = () => {
  return {
    type: "LOGOUT",
  };
};
