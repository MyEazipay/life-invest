import React, { JSX } from "react";

interface ButtonProps {
	label: string;
	onClick: () => void;
	type?: "button" | "submit" | "reset";
	className?: string;
	children?: string | JSX.Element | JSX.Element[];
}

const Button: React.FC<ButtonProps> = ({
	label,
	onClick,
	type = "button",
	className = "",
	children,
}) => {
	return (
		<button
			type={type}
			onClick={onClick}
			className={`px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-300 ${className}`}
		>
			{children || label}
		</button>
	);
};

export default Button;
