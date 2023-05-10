import React from "react";

interface Props {
  onClick: () => void;
  children: React.ReactNode;
  type?: "button" | "submit" | "reset";
  className?: string;
}

const Button: React.FC<Props> = ({ onClick, children, type, className }) => {
  return (
    <button
      onClick={onClick}
      type={type || "button"}
      className={`bg-blue-500 text-white px-4 py-2 rounded-md ${className}`}
    >
      {children}
    </button>
  );
};

export default Button;
