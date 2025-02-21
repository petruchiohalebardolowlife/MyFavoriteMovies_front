import { Field } from "react-final-form";
import { InputFieldProps } from "../models";

const InputField: React.FC<InputFieldProps> = ({ name, type, placeholder }) => (
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

export default InputField;
