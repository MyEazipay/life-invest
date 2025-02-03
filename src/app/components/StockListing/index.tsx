import React from "react";
import { Stock, TableObj } from "../../../../utils/type";
import Table from "../Table";
import { v4 as uuid } from "uuid";
import { useRouter } from "next/navigation";
import ChangePercentage from "../ChangePercentage";

interface StockListingProps {
	data: Stock[];
	loading?: boolean;
	title?: string;
}

export default function StockListing({
	title,
	data,
	loading,
}: StockListingProps) {
	const router = useRouter();
	const handleClick = (arg: Stock) => {
		router.push(`/${arg?.ticker}`);
	};

	return (
		<div className="space-y-5 overflow-x-auto min-w-0">
			<h1 className="font-[600] text-xl text-gray-600">{title}</h1>
			<Table
				getRows={function ({ setIndex }: TableObj): void {
					setIndex(0)
						.setColumnName("")
						.render("ticker", (val) => val);
					setIndex(1)
						.setColumnName("")
						.render("price", (val) => `$${val}`);
					setIndex(2)
						.setColumnName("")
						.render("change_amount", (val) => <ChangePercentage value={val} />);
					setIndex(3)
						.setColumnName("")
						.render("change_percentage", (val) => (
							<ChangePercentage value={val?.replace("%", "")} showBg />
						));
					setIndex(4)
						.setColumnName("")
						.render("volume", (val) => (
							<div>
								{val} <span className="text-xs">Vol.</span>
							</div>
						));
				}}
				onClick={handleClick}
				keyExtractor={() => uuid()}
				loading={!!loading}
				data={loading ? [] : [...(data || [])]?.splice(0, 5)}
			/>
		</div>
	);
}
