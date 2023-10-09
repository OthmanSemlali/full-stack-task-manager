const AuthReducer = (state, action) => {
  switch (action.type) {
    case "LOGIN_SUCCESS":
      const { user, token } = action.payload;
      //   console.log("User data in reducer:", user);
      //   console.log("Token in reducer:", token);

      sessionStorage.setItem("jwt_token", JSON.stringify(token));
      sessionStorage.setItem("user", JSON.stringify(user));
      return {
        ...state,
        isAuthenticated: true,
        user: user,
        token: token,
      };

    case "LOGOUT":
      sessionStorage.removeItem("jwt_token");
      sessionStorage.removeItem("user");
      return {
        ...state,
        isAuthenticated: false,
        user: null,
        token: null,
      };

    case "LOGIN_BEGIN":
      return {
        ...state,
        login_is_loading: true,
      };

    case "LOGIN_END":
      return {
        ...state,
        login_is_loading: false,
      };

    case "REGISTER_BEGIN":
      return {
        ...state,
        register_is_loading: true,
      };

    case "REGISTER_SUCCESS":
      return {
        ...state,
        register_is_loading: false,

        user_registrered: true,
      };

    case "REGISTER_END":
      return {
        ...state,
        register_is_loading: false,
      };

    case "RESET_USER_REGISTERED":
      return {
        ...state,
        user_registrered: false,
      };
    default:
      return state;
  }
};

export default AuthReducer;
