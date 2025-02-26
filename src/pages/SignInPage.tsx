import { useState } from "react";
import logo from "../assets/logo.jpg";
import { Form } from "react-final-form";
import { useNavigate } from "react-router-dom";
import InputField from "../components/InputField";
import { signIn } from "../services/auth";
import { Trans } from "@lingui/react/macro";
import { useLingui } from "@lingui/react/macro";


interface SignInFormValues {
  username: string;
  password: string;
}

function SignInForm() {
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const { t } = useLingui();

  const onSubmit = (values: SignInFormValues) => {
    const result = signIn(values.username, values.password);
    if (result.success) {
      navigate("/");
    } else {
      setError(result.error || "");
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
              <label className="text-gray-700">
                <Trans>Username</Trans>
              </label>
              <InputField
                name="username"
                type="text"
                placeholder={t`Enter username`}
              />
            </div>
            <div className="mb-4">
              <label className="text-gray-700">
                <Trans>Password</Trans>
              </label>
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
              <Trans>Sign In</Trans>
            </button>
            {error && (
              <span className="text-red-500 text-sm"><Trans>Invalid username or password</Trans></span>
            )}
          </form>
        )}
      />
    </div>
  );
}

export default SignInForm;
