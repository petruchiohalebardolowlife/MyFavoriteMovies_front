import React, { useState } from "react";
import logo from "../../public/logo.jpg";
import { Form, Field } from "react-final-form";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

interface FormValues {
  username: string;
  password: string;
}

const Container = styled.div`
  background-color: #f5f5f5;
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
`;

const SignInForm: React.FC = () => {
  const navigate = useNavigate();
  const [error, setError] = useState("");
  localStorage.setItem("username", "password");
  const onSubmit = (values: FormValues) => {
    if (localStorage.getItem(values.username) === values.password) {
      navigate("/main");
    }
    return setError("Invalid username or password");
  };

  const validate = (values: FormValues) => {
    const errors: Partial<FormValues> = {};
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
      <Form<FormValues>
        onSubmit={onSubmit}
        validate={validate}
        render={({ handleSubmit, submitting }) => (
          <form
            onSubmit={handleSubmit}
            className="bg-white p-6 rounded-lg shadow-md w-96"
          >
            <img src={logo} alt="Logo" className="w-15  mx-auto mb-4" />
            <div className="mb-4">
              <label className="block text-gray-700">Username</label>
              <Field name="username">
                {({ input, meta }) => (
                  <div>
                    <input
                      {...input}
                      placeholder="input username"
                      className="w-full p-2 border rounded mt-1"
                    />
                    {meta.error && meta.touched && (
                      <span className="text-red-500 text-sm">{meta.error}</span>
                    )}
                  </div>
                )}
              </Field>
            </div>
            <div className="mb-4">
              <label className="block text-gray-700">Password</label>
              <Field name="password">
                {({ input, meta }) => (
                  <div>
                    <input
                      {...input}
                      type="password"
                      placeholder="input password"
                      className="w-full p-2 border rounded mt-1"
                    />
                    {meta.error && meta.touched && (
                      <span className="text-red-500 text-sm">{meta.error}</span>
                    )}
                  </div>
                )}
              </Field>
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
