import React from "react";

type ColoredBadgeProps = {
	name: string;
};

const colors: string[] = [
	"bg-red-500",
	"bg-blue-500",
	"bg-green-500",
	"bg-yellow-500",
	"bg-purple-500",
	"bg-pink-500",
	"bg-indigo-500",
	"bg-teal-500",
	"bg-orange-500",
	"bg-gray-500",
];

const getColor = (name: string): string => {
	let hash = 0;
	for (let i = 0; i < name.length; i++) {
		hash = name.charCodeAt(i) + ((hash << 5) - hash);
	}
	return colors[Math.abs(hash) % colors.length];
};

const ColoredBadge: React.FC<ColoredBadgeProps> = ({ name }) => {
	if (!name) return null;
	const bgColor = getColor(name);

	return (
		<span className={`rounded-[5px] ${bgColor} text-white p-1 px-2 font-[600]`}>
			{name}
		</span>
	);
};

export default ColoredBadge;
