import React, { useState } from "react";
import logo from "../assets/logo.jpg";
import { Form } from "react-final-form";
import { useNavigate } from "react-router-dom";
import { Container, Label } from "../styled/Styled";
import { SignInFormValues } from "../models";
import InputField from "../components/InputrField";

const SignInForm: React.FC = () => {
  const navigate = useNavigate();
  const [error, setError] = useState("");
  localStorage.setItem("username", "password");
  const onSubmit = (values: SignInFormValues) => {
    if (localStorage.getItem(values.username) === values.password) {
      navigate("/main");
    }
    return setError("Invalid username or password");
  };

  const validate = (values: SignInFormValues) => {
    const errors: Partial<SignInFormValues> = {};
    if (!values.username) {
      errors.username = "Username is required";
    }
    if (!values.password) {
      errors.password = "Password is required";
    }
    return errors;
  };

  return (
    <Container>
      <Form<SignInFormValues>
        onSubmit={onSubmit}
        validate={validate}
        render={({ handleSubmit, submitting }) => (
          <form
            onSubmit={handleSubmit}
            className="bg-white p-6 rounded-lg shadow-md w-96"
          >
            <img src={logo} alt="Logo" className="w-15  mx-auto mb-4" />
            <div className="mb-4">
              <Label>Username</Label>
              <InputField
                name="username"
                type="text"
                placeholder="Enter username"
              />
            </div>
            <div className="mb-4">
              <Label>Password</Label>
              <InputField
                name="password"
                type="password"
                placeholder="Enter password"
              />
            </div>
            <button
              type="submit"
              disabled={submitting}
              className="w-full bg-black text-white py-2 rounded hover:bg-gray-600 disabled:bg-gray-400"
            >
              Sign In
            </button>
            {error && <span className="text-red-500 text-sm">{error}</span>}
          </form>
        )}
      />
    </Container>
  );
};

export default SignInForm;
