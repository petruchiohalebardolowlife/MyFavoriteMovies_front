import { ReactNode } from "react";

interface ButtonProps {
  onClick: () => void;
  isSelected?: boolean;
  buttonView?: "square";
  children: ReactNode;
  isActive?: boolean;
  customClassName?: string;
}

function Button({
  onClick,
  isSelected,
  buttonView,
  children,
  isActive,
  customClassName,
}: ButtonProps) {
  return (
    <button
      onClick={onClick}
      className={`flex items-center justify-center transition
        ${
          buttonView === "square"
            ? "w-10 h-10 border border-gray-400 rounded hover:bg-gray-600"
            : "mx-1 py-2 px-4 bg-gray-800 text-white rounded hover:bg-gray-600"
        }
        ${isSelected ? customClassName : ""} 
        ${isActive !== undefined && !isActive ? customClassName : ""}
      `}
    >
      {children}
    </button>
  );
}

export default Button;
