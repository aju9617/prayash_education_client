import React from "react";
import { Field, ErrorMessage } from "formik";

function TextInput({ label, name, inputClassName, className, ...props }) {
  const fieldId = React.useId();
  return (
    <div className={`${className} mb-4`}>
      {label && (
        <label className="text-sm mb-2 block" htmlFor={fieldId}>
          {label}
        </label>
      )}
      <Field
        name={name}
        id={fieldId}
        {...props}
        className={`p-2 px-4 rounded ring-1 !ring-primary border-0 focus:ring-2 text-sm outline-none focus:outline-none ${inputClassName}`}
      />
      <ErrorMessage
        name={name}
        render={(msg) => <span className="text-xs text-red-600">{msg}</span>}
      />
    </div>
  );
}

export default TextInput;
