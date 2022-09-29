import React from "react";
import { Field } from "formik";
function RadioInput({ ...props }) {
  return (
    <Field
      type="radio"
      className="h-5 w-5 rounded-full text-primary outline-none focus:ring-0 "
      {...props}
    />
  );
}

export default RadioInput;
