import React from "react";

export const Input = React.forwardRef(({ className = "", value, onChange, ...props }, ref) => {
  return (
    <input
      ref={ref}
      value={value}
      onChange={onChange}
      type="text"
      className={`border border-gray-300 px-4 py-2 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 ${className}`}
      {...props}
    />
  );
});

Input.displayName = "Input";
