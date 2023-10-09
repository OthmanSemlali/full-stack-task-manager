import React, { useEffect, useState } from "react";
import {
  Container,
  Card,
  Title,
  Form,
  Input,
  SubmitButton,
  CustomLink,
} from "../components/form";

import { useAuth } from "../context/AuthContext";

import { Link, useNavigate } from "react-router-dom";

const Register = () => {
  const navigate = useNavigate();

  const {
    register_is_loading,
    handleRegister,
    user_registrered,
    resetUserRegitered,
  } = useAuth();

  //check if user is already registered (this is a hack bcoz navigate or history.push doesn't work in the context)
  useEffect(() => {
    if (user_registrered) {
      navigate("/login");
      // reset the user_registrered state, I told you it's a hack :)
      resetUserRegitered();
    }
  }, [user_registrered, navigate, resetUserRegitered]);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    handleRegister(formData);
  };

  return (
    <Container>
      <Card>
        <Title>Regiser</Title>
        <Form onSubmit={handleSubmit}>
          <Input
            placeholder="Name"
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />

          <Input
            type="email"
            placeholder="Email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />

          <Input
            type="password"
            placeholder="Password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />

          <SubmitButton type="submit">
            {register_is_loading ? (
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <span className="loading-spinner"></span>
                <span>sending..</span>
              </div>
            ) : (
              "Register"
            )}
          </SubmitButton>
        </Form>

        <CustomLink>
          Already a member?
          <Link to="/login"> Log In</Link>
        </CustomLink>
      </Card>
    </Container>
  );
};

export default Register;
