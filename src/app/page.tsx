"use client";

import React from "react";
import SearchStock from "./components/SearchStock";
import { useAppSelector } from "./redux/hooks";
import StockListing from "./components/StockListing";
import { useFetchStockListingsQuery } from "./redux/subscriptions/stock";

export default function Home() {
	useFetchStockListingsQuery(undefined, {
		// This is disabled to enable demonstration without hitting api limit
		// pollingInterval: 5000
	});
	const { mostActivelyTraded, topGainers, topLosers, fetchingStocks } =
		useAppSelector((state) => state.stock);

	return (
		<main className="p-5">
			<section className="max-w-[900px] mx-auto">
				<div className="sticky top-10 z-[10]">
					<SearchStock />
				</div>
				<div className="mt-12 gap-12 grid">
					<StockListing
						data={mostActivelyTraded}
						loading={fetchingStocks}
						title="Most Actively Traded"
					/>
					<StockListing
						data={topGainers}
						loading={fetchingStocks}
						title="Top Gainers"
					/>
					<StockListing
						data={topLosers}
						loading={fetchingStocks}
						title="Top Losers"
					/>
				</div>
			</section>
		</main>
	);
}
