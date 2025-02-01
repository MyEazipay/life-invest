import React from "react";

interface SpinnerProps {
  size?: "small" | "medium" | "large";
  className?: string;
}

const Spinner = ({ size = "medium", className = "" }: SpinnerProps) => {
  const sizeClasses = {
    small: "w-4 h-4",
    medium: "w-8 h-8",
    large: "w-12 h-12",
  };
  return (
    <div role="status" className="inline-block" aria-label="Loading">
      <div
        className={`
          border-4 rounded-full
          border-gray-400 border-t-slate-100
          animate-spin
          ${sizeClasses[size]}
          ${className}
        `}
      />
      <span className="sr-only">Loading...</span>
    </div>
  );
};

export default Spinner;