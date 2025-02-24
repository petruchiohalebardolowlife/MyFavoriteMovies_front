import { useState } from "react";
import logo from "../assets/logo.jpg";
import { Form } from "react-final-form";
import { useNavigate } from "react-router-dom";
import "../App.css";
import InputField from "../components/InputField";
import { signIn } from "../services/auth";

interface SignInFormValues {
  username: string;
  password: string;
}

function SignInForm() {
  const navigate = useNavigate();
  const [error, setError] = useState("");

  const onSubmit = (values: SignInFormValues) => {
    const result = signIn(values.username, values.password);
    if (result.success) {
      navigate("/");
    } else {
      setError(result.error ?? "");
    }
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
    <div className="bg-gray-100 flex flex-col items-center justify-center min-h-screen">
      <img src={logo} alt="Logo" className="w-15  mx-auto mb-4" />
      <Form<SignInFormValues>
        onSubmit={onSubmit}
        validate={validate}
        render={({ handleSubmit, submitting }) => (
          <form
            onSubmit={handleSubmit}
            className="bg-white p-6 rounded-lg shadow-md w-96"
          >
            <div className="mb-4">
              <label className="text-gray-700">Username</label>
              <InputField
                name="username"
                type="text"
                placeholder="Enter username"
              />
            </div>
            <div className="mb-4">
              <label className="text-gray-700">Password</label>
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
    </div>
  );
}

export default SignInForm;
