import React from "react";
import Button from "@mui/material/Button";

interface ButtonProps {
  label: string;
  className?: string;
  disabled: boolean;
  onClick: () => void;
}

export default function ButtonCustom({
  label,
  className,
  disabled = false,
  onClick,
}: ButtonProps) {
  return (
    <Button
      variant="contained"
      className={className}
      style={{ marginLeft: "2px", marginRight: "2px" }}
      disabled={disabled}
      onClick={onClick}
    >
      {label}
    </Button>
  );
}
