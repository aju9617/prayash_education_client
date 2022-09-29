import React from "react";

function Button({ children, className, ...props }) {
  return (
    <button
      className={`bg-secondary p-2 px-6 text-sm text-white rounded-full ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}

export default Button;
