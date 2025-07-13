import React from "react";

const Button = React.forwardRef(({ className = "", children, ...props }, ref) => {
  return (
    <button
      ref={ref}
      className={`bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition font-medium ${className}`}
      {...props}
    >
      {children}
    </button>
  );
});

Button.displayName = "Button";

export { Button };