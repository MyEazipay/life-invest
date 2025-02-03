"use client";

import React, { useMemo } from "react";
import ChangePercentage from "../components/ChangePercentage";
import CandleStickChart from "../components/CandleStickChart";
import EmptyState from "../components/EmptyState";
import ColorBadge from "../components/ColorBadge";
import AddToWatchlist from "../components/AddToWatchlist";
import BackIcon from "../components/BackIcon";
import {
	useGetStockDetailsQuery,
	useSearchStockListingsQuery,
} from "../redux/subscriptions/stock";
import { useParams } from "next/navigation";
import Loader from "../components/Loader";

export default function StockDetails() {
	const symbol = useParams().symbol as unknown as string;
	const { isLoading: loadingSymbol, data: searchData } =
		useSearchStockListingsQuery(symbol, {
			skip: !symbol,
		});
	const { isLoading, data } = useGetStockDetailsQuery(symbol, {
		skip: !symbol,
		// This is disabled to enable demonstration without hitting api limit
		// pollingInterval: 5000,
	});

	const changes = useMemo(() => {
		if (!data?.["Time Series (5min)"]) return;
		console.log(data);
		const times = Object.keys(data["Time Series (5min)"]);
		const lastClose = parseFloat(
			data["Time Series (5min)"][times[0]]["4. close"],
		);
		const previousClose = parseFloat(
			data["Time Series (5min)"][times[1]]["4. close"],
		);

		const priceChange = lastClose - previousClose;
		const percentageChange =
			((lastClose - previousClose) / previousClose) * 100;
		return {
			priceChange,
			percentageChange,
			price: lastClose,
		};
	}, [data]);

	const stockSymbol = useMemo(() => {
		return searchData?.bestMatches?.[0];
	}, [searchData]);

	if (isLoading || loadingSymbol)
		return (
			<div className="min-h-screen flex items-center justify-center">
				<Loader />
			</div>
		);
	if (!symbol || !data?.["Time Series (5min)"])
		return (
			<div className="min-h-screen flex items-center justify-center">
				<EmptyState text="Stock not found" />
			</div>
		);
	return (
		<main className="p-5 min-h-screen flex flex-col">
			<section className="">
				<div className="flex md:items-center justify-between w-full md:flex-row flex-col gap-5">
					<div className="flex items-center gap-5">
						<BackIcon />
						<div className="flex items-center gap-2">
							<ColorBadge name={stockSymbol?.["1. symbol"] || ""} />
							<h1 className="md:text-[24px] text-[18px] text-blue-500 font-[600] truncate md:max-w-[400px] max-w-[200px]">
								{stockSymbol?.["2. name"]}
							</h1>
						</div>
					</div>
					<AddToWatchlist symbol={stockSymbol?.["1. symbol"]} />
				</div>
				<div className="mt-5 flex items-center gap-3">
					<h1 className="md:text-[36px] text-[24px] font-[600]">
						{stockSymbol?.["8. currency"]}
						{changes?.price}
					</h1>

					<span>
						<ChangePercentage value={changes?.priceChange?.toFixed(2)} showBg />
					</span>
					<span className="flex items-center">
						<ChangePercentage
							value={changes?.percentageChange?.toFixed(2)}
							showBg={false}
						/>
						%
					</span>
				</div>
				<p className="text-gray-500 text-xs font-[500]">
					Open: {stockSymbol?.["5. marketOpen"]} {stockSymbol?.["7. timezone"]}{" "}
					| Close: {stockSymbol?.["6. marketClose"]}{" "}
					{stockSymbol?.["7. timezone"]} . {stockSymbol?.["8. currency"]}
				</p>
			</section>

			<div className="flex border-[1px] flex-1 w-full mt-6">
				<div className="w-full h-full">
					<CandleStickChart data={data["Time Series (5min)"]} />
				</div>
			</div>
		</main>
	);
}
