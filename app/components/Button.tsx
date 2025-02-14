import React from "react";

interface ButtonProps {
  text: string;
  variant?: "default" | "filled";
  onClick?: () => void;
  className?: string;
  disabled?: boolean;
}

const Button: React.FC<ButtonProps> = ({ text, variant = "default", onClick, disabled, className = "" }) => {
  const baseStyles = "border-2 w-full py-3 font-jeju rounded-[8px] max-sm:w-full";
  const variants = {
    default: "border-mint-green text-[#24A0B5] -mx-3 ",
    filled: "border-mint-green bg-mint-green text-white -mx-3",
  };

  return (
    <button className={`${baseStyles} ${variants[variant]} ${className}`} onClick={onClick}>
      {text}
    </button>
  );
};

export default Button;
