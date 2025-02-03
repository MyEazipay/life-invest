"use client";

import React, { useEffect } from "react";
import SearchStock from "../components/SearchStock";
import StockListing from "../components/StockListing";
import { useGetStockBySymbolQuery } from "../redux/subscriptions/stock";
import EmptyState from "../components/EmptyState";
import { useAppSelector } from "../redux/hooks";

interface WatchItemProps {
	symbol: string;
}

const WatchItem = ({ symbol }: WatchItemProps) => {
	const { data } = useGetStockBySymbolQuery(symbol, {
		skip: !symbol,
		// This is disabled to enable demonstration without hitting api limit
		// pollingInterval: 5000
	});

	if (!data) return;
	return <StockListing data={[data!]} loading={false} />;
};

export default function Watchlist() {
	const { watchlist } = useAppSelector((state) => state.stock);

	useEffect(() => {}, []);

	return (
		<main className="p-5">
			<section className="max-w-[900px] mx-auto">
				<div className="sticky top-10 z-[10]">
					<SearchStock />
				</div>
				<div className="mt-12 grid">
					{watchlist?.length ? (
						watchlist?.map((item) => <WatchItem key={item} symbol={item} />)
					) : (
						<div className="min-h-[400px] h-full flex items-center justify-center">
							<EmptyState text="Stock not found" />
						</div>
					)}
				</div>
			</section>
		</main>
	);
}
