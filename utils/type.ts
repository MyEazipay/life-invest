import { JSX } from "react";

export interface Stock {
	ticker: string;
	price: string;
	change_amount: string;
	change_percentage: string;
	volume: string;
}

export interface StockListingData {
	last_updated: string;
	metadata: string;
	most_actively_traded: Stock[];
	top_gainers: Stock[];
	top_losers: Stock[];
}

export interface Symbol {
	"1. symbol": string;
	"2. name": string;
	"3. type": string;
	"4. region": string;
	"5. marketOpen": string;
	"6. marketClose": string;
	"7. timezone": string;
	"8. currency": string;
	"9. matchScore": string;
}

export interface TableObj {
	setIndex: (arg: number) => {
		setColumnName: (arg: string) => {
			render: (
				name: string,
				callBack: (
					val: string,
					row: any,
					index: number,
				) => JSX.Element | string | JSX.Element[],
			) => void;
			addClassName: (arg: string) => {
				render: (
					name: string,
					callBack: (
						val: string,
						row: any,
						index: number,
					) => JSX.Element | string | JSX.Element[],
				) => void;
			};
		};
	};
}

export interface SearchStockListingResults {
	bestMatches: Symbol[];
}

export interface TimeSeriesStockData {
	"1. open": string;
	"2. high": string;
	"3. low": string;
	"4. close": string;
	"5. volume": string;
}

export interface StockDetails {
	"Meta Data": {
		"1. Information": string;
		"2. Symbol": string;
		"3. Last Refreshed": string;
		"4. Interval": string;
		"5. Output Size": string;
		"6. Time Zone": string;
	};
	"Time Series (5min)": {
		[arg: string]: TimeSeriesStockData;
	};
}
