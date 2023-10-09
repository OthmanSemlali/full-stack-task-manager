import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';


function PrivateRoute({ children }) {
    const navigate = useNavigate();
    const { isAuthenticated } = useAuth();
  
    useEffect(() => {
        if (!isAuthenticated) {
          navigate('/login'); 
        }
      }, [isAuthenticated, navigate]);
    return isAuthenticated ? children : null;

  }
export default PrivateRoute;
