import React from "react";
import { Field, ErrorMessage } from "formik";

function SelectInput({
  name,
  label,
  className,
  placeholder,
  inputClassName,
  options,
  ...props
}) {
  const fieldId = React.useId();
  return (
    <div className={`${className} mb-4`}>
      {label && (
        <label className="text-sm mb-2 block" htmlFor={fieldId}>
          {label}
        </label>
      )}
      <Field
        as="select"
        name={name}
        className={`p-2 px-4 w-full rounded ring-1 !ring-primary border-0 focus:ring-2 text-sm outline-none focus:outline-none ${inputClassName}`}
      >
        {placeholder && (
          <option value="" disabled>
            {placeholder}
          </option>
        )}
        {options.map(({ value, key }) => (
          <option key={key} value={value}>
            {key}
          </option>
        ))}
      </Field>
      <ErrorMessage
        name={name}
        render={(msg) => <span className="text-xs text-red-600">{msg}</span>}
      />
    </div>
  );
}

export default SelectInput;
