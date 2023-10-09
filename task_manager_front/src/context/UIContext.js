import { createContext, useContext, useReducer } from "react";
import UIReducer from "../reducers/UIReducer";


const initialState = {
  isSidebarOpen: false,

  isAlertOpen: false,
  alertContent: "",
  alertType: "",

};

const UIContext = createContext(initialState);

export const UIProvider = ({ children }) => {
  const [state, dispatch] = useReducer(UIReducer, initialState);

  const toggleSidebar = () => {
    dispatch({ type: "TOGGLE_SIDEBAR" });
  };


  return (
    <UIContext.Provider
      value={{
        ...state,
        toggleSidebar,
  
      }}
    >
      {children}
    </UIContext.Provider>
  );
};

export const useUIContext = () => {
  return useContext(UIContext);
};
