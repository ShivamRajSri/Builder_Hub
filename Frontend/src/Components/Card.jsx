import React from "react";

function Card({ className = "", children }) {
  return (
    <div className={`bg-white rounded-2xl shadow-md overflow-hidden flex flex-col h-full ${className}`}>
      {children}
    </div>
  );
}

function CardContent({ className = "", children }) {
  return <div className={`p-4 flex flex-col flex-grow ${className}`}>{children}</div>;
}

export { Card, CardContent };