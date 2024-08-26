import React from "react";

interface AlertProps {
  message: string;
  type: string;
}

export default function Alert({ message, type }: AlertProps) {
  return (
    <div
      className={`${
        type === "error" ? "bg-red-500" : "bg-green-500"
      } text-white text-center py-2 px-4 rounded-md`}
    >
      {message}
    </div>
  );
}
