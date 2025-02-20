import "./App.css";
import { Form, Field } from "react-final-form";

interface FormValues {
  username: string;
  password: string;
}

const LoginForm: React.FC = () => {
  const onSubmit = (values: FormValues) => {
    console.log("Recieved data", values);
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
    <Form<FormValues>
      onSubmit={onSubmit}
      validate={validate}
      render={({ handleSubmit, submitting }) => (
        <form onSubmit={handleSubmit}>
          <div>
            <label>Username</label>
            <Field name="username">
              {({ input, meta }) => (
                <div>
                  <input {...input} placeholder="input username" />
                  {meta.error && meta.touched && <span>{meta.error}</span>}
                </div>
              )}
            </Field>
            <Field name="password">
              {({ input, meta }) => (
                <div>
                  <input
                    {...input}
                    type="password"
                    placeholder="input password"
                  />
                  {meta.error && meta.touched && <span>{meta.error}</span>}
                </div>
              )}
            </Field>
          </div>
          <button type="submit" disabled={submitting}>
            Send
          </button>
        </form>
      )}
    />
  );
};

export default LoginForm;
