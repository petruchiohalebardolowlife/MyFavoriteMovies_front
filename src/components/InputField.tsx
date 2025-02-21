import { Field } from "react-final-form";
import { InputFieldProps } from "../models";

function InputField({ name, type, placeholder }: InputFieldProps) {
  return (
    <Field name={name}>
      {({ input, meta }) => (
        <div>
          <input
            {...input}
            type={type}
            placeholder={placeholder}
            className="w-full p-2 border rounded mt-1"
          />
          {meta.error && meta.touched && (
            <span className="text-red-500 text-sm">{meta.error}</span>
          )}
        </div>
      )}
    </Field>
  );
}

export default InputField;
