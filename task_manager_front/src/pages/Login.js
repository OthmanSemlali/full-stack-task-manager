import React, { useState } from "react";
import { Container, 
  Card,
  Title,
  Form,
  Input,
  SubmitButton,
  CustomLink  } from "../components/form";


import { useAuth } from "../context/AuthContext";

import { Link } from "react-router-dom";


const Login = () => {

  
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const {login_is_loading, handleLogin} = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();

    handleLogin(email, password);
  };



  return (
    <Container>
      <Card>
        <Title>Login</Title>
        <Form onSubmit={handleSubmit}>
          <Input type="email" placeholder="Email" 
            onChange={(e) => setEmail(e.target.value)}
            required 
            value={email}
            />


          <Input type="password" placeholder="Password" 
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
         />


          <SubmitButton type="submit">
          {login_is_loading ? (
           <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
           <span className='loading-spinner'></span>
           <span>sending..</span>
         </div>
         

      
      ) : (
        'login'
      )}
          </SubmitButton>


        </Form>


        <CustomLink>
          Not yet a member? <Link to='/register'> Register</Link>

        </CustomLink>


      </Card>
    </Container>
  );
};

export default Login;



