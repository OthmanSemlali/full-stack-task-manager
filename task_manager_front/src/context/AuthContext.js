
import AuthReducer from "../reducers/AuthReducer";
import { toast } from 'react-toastify';

import React, {
  createContext,
  useContext,
 
  useReducer,
} from "react";
import axios from "axios";
import { baseURL } from "../utils/constants";



// Get user info from session storage
const getUserFromStorage = () => {
  return sessionStorage.getItem("user")
    ? JSON.parse(sessionStorage.getItem("user"))
    : null;
};

// Get user token  from session storage
const getTokenFromStorage = () => {
  return sessionStorage.getItem("jwt_token")
    ? JSON.parse(sessionStorage.getItem("jwt_token"))
    : null;
};

// Check if user is authenticated
const checkAuth = () => {
  return sessionStorage.getItem("jwt_token") ? true : false;
};

const initialState = {
  isAuthenticated: checkAuth(),
  user: getUserFromStorage(),
  token: getTokenFromStorage() || "",

  login_is_loading: false,
  login_error: "",


  register_is_loading: false,
  register_errors: {},
  register_success_message: false,


  // I used this bcoz neither navigate nor history.push works for me in the context!!
  user_registrered: false,
};

const AuthContext = createContext(initialState);
export const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(AuthReducer, initialState);




  const logout = () => {
    dispatch({ type: "LOGOUT" });
    // the ProtectedToutes/AuthRoute Component will redirect to login page! check it out!

    // return <Navigate to="/login" />; !!
  };


  const handleLogin = async (email, password) => {

   dispatch({ type: "LOGIN_BEGIN" });

    try {
      const response = await axios.post(
        `${baseURL}/api/login`,
        {
          email,
          password,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${state.token}`,
          },
        }
      );

      if (response.status !== 200) {
        throw new Error(response.data.error || "Login failed");
      }

      // Login successful

      dispatch({
        type: "LOGIN_SUCCESS",
        payload: {
          user: response.data.user,
          token: response.data.access_token,
        },
      });

      // console.log("Login successful", response.data);
     
      // return <Navigate to="/dashboard" />;
     
    } catch (error) {
      if (error.response && error.response.status === 422) {
        
        console.error("Validation error", error.response.data.errors);


      } else if(error.message && error.response.status === 401) {
        console.error("Login error", error.message || "Login failed");

     
        dispatch({ type: "LOGIN_END" });
    

        if(!toast.isActive('loginErrorToast')){
          toast.error("Invalid email or password", { toastId: 'loginErrorToast' });
        }
      
      }else{
        
          alert('An error occurred while Logged In.  Please try later!');
        
        
      }
    } finally {
      dispatch({ type: "LOGIN_END" });
    }
  };



  // Register Stuff..

  const handleRegister = async (formData) => {
    dispatch({ type: "REGISTER_BEGIN" });



    try {
      const response = await axios.post(
      
        `${baseURL}/api/register`,
        formData,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${state.token}`,
          },
        }
      );

      // console.log('response', response.data);



      dispatch({ type: "REGISTER_SUCCESS"});
      
    } catch (error) {

      dispatch({ type: "REGISTER_END" });

      
      if (error.response && error.response.data && error.response.data.errors) {
    
            
            if (!toast.isActive('loginNameErrorToast')) {
              if (error.response.data.errors.name && Array.isArray(error.response.data.errors.name) && error.response.data.errors.name.length > 0) {
                toast.error(error.response.data.errors.name[0], { toastId: 'loginNameErrorToast' });
              }
            }
            
            if (!toast.isActive('loginEmailErrorToast')) {
              if (error.response.data.errors.email && Array.isArray(error.response.data.errors.email) && error.response.data.errors.email.length > 0) {
                toast.error(error.response.data.errors.email[0], { toastId: 'loginEmailErrorToast' });
              }
            }
            if (!toast.isActive('loginPasswordErrorToast')) {
              if (error.response.data.errors.password && Array.isArray(error.response.data.errors.password) && error.response.data.errors.password.length > 0) {
                toast.error(error.response.data.errors.password[0], { toastId: 'loginPasswordErrorToast' });
              }
            }
            
      } else {
        alert('An error occurred while registering. Please try later!');
      }
    }

 
  }

  const resetUserRegitered = () => {
    dispatch({ type: "RESET_USER_REGISTERED" });
  }
  return (
    <AuthContext.Provider
      value={{
        ...state,
        logout,
        handleLogin,
        handleRegister,
        resetUserRegitered,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};




export const useAuth = () => {
  return useContext(AuthContext);
};
