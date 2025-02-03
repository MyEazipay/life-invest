import React from "react";

interface ChangePercentageProps {
	value: number | string | undefined;
	showBg?: boolean;
}

const ChangePercentage: React.FC<ChangePercentageProps> = ({
	value,
	showBg,
}) => {
	const isPositive = +(value || 0)! > 0;
	const arrow = isPositive ? "↑" : "↓";
	const bgColor = showBg ? (isPositive ? "bg-green-200" : "bg-red-200") : "";
	const textColor = isPositive ? "text-green-700" : "text-red-700";

	return (
		<div
			className={`font-[600] flex items-center justify-center w-fit py-1 ${bgColor} ${textColor} rounded-[4px] p-1 text-sm`}
		>
			<span className="mr-2">{arrow}</span>
			{Math.abs(+(value || 0))}
		</div>
	);
};

export default ChangePercentage;
