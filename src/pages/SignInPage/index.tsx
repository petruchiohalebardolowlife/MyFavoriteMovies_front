import { useState } from "react";
import logo from "../../assets/logo.jpg";
import { Form } from "react-final-form";
import { useNavigate } from "react-router-dom";
import InputField from "@components/InputField";
import { useLingui } from "@lingui/react/macro";
import { useAuth } from "@contexts/authContext";

interface SignInFormValues {
  username: string;
  password: string;
}

function SignInPage() {
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const { t } = useLingui();
  const { login } = useAuth();

  const onSubmit = async (values: SignInFormValues) => {
    try {
      const isSuccess = await login({
        username: values.username,
        password: values.password,
      });
      if (isSuccess) {
        navigate("/");
      } else {
        setError("Invalid username or password");
      }
    } catch {
      setError("Failed to connect with server, try again later");
    }
  };

  const validate = (values: SignInFormValues) => {
    const errors: Partial<SignInFormValues> = {};
    if (!values.username) {
      errors.username = t`Username cannot be empty`;
    }
    if (!values.password) {
      errors.password = t`Password cannot be empty`;
    }
    return errors;
  };

  return (
    <div className="bg-gray-100 flex flex-col items-center justify-center min-h-screen">
      <img src={logo} alt="Logo" className="w-15 mx-auto mb-4" />
      <Form<SignInFormValues>
        onSubmit={onSubmit}
        validate={validate}
        render={({ handleSubmit, submitting }) => (
          <form
            onSubmit={handleSubmit}
            className="bg-white p-6 rounded-lg shadow-md w-96"
          >
            <div className="mb-4">
              <label className="text-gray-700">{t`Username`}</label>
              <InputField
                name="username"
                type="text"
                placeholder={t`Enter username`}
              />
            </div>
            <div className="mb-4">
              <label className="text-gray-700">{t`Password`}</label>
              <InputField
                name="password"
                type="password"
                placeholder={t`Enter password`}
              />
            </div>
            <button
              type="submit"
              disabled={submitting}
              className="w-full bg-black text-white py-2 rounded hover:bg-gray-600 disabled:bg-gray-400"
            >
              {t`Sign In`}
            </button>
            {error && (
              <span className="text-red-500 text-sm">{t`Invalid username or password`}</span>
            )}
          </form>
        )}
      />
    </div>
  );
}

export default SignInPage;
