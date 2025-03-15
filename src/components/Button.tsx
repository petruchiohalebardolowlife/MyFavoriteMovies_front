import { ReactNode } from "react";

interface ButtonProps {
  onClick: () => void;
  isPressed?: boolean;
  buttonView?: "square";
  children: ReactNode;
  isActive?: boolean;
}

function Button({
  onClick,
  isPressed,
  buttonView,
  children,
  isActive,
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
        ${isPressed ? "!bg-yellow-500" : ""} 
        ${isActive !== undefined &&!isActive ? "grayscale opacity-50" : ""}
      `}
    >
      {children}
    </button>
  );
}

export default Button;
