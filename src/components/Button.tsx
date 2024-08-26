import React from "react";

interface ButtonProps {
  label: string;
  className: string;
  disabled: boolean;
  onClick: () => void;
}

export default function Button({
  label,
  className,
  disabled = false,
  onClick,
}: ButtonProps) {
  return (
    <button className={className} onClick={onClick} disabled={disabled}>
      {label}
    </button>
  );
}
