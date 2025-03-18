import { ReactNode } from "react";

interface ButtonProps {
  onClick: () => void;
  buttonView?: "square";
  children: ReactNode;
  isDisabled?: boolean;
  className?: string;
}

function Button({
  onClick,
  buttonView,
  children,
  isDisabled,
  className = "",
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
        ${className}
        ${isDisabled ? "grayscale opacity-50" : ""}
      `}
    >
      {children}
    </button>
  );
}

export default Button;
