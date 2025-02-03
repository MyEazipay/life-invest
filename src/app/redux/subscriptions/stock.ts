import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import {
	SearchStockListingResults,
	Stock,
	StockDetails,
} from "../../../../utils/type";

export const stockApi = createApi({
	reducerPath: "stockApi",
	baseQuery: fetchBaseQuery({
		baseUrl: process.env.NEXT_PUBLIC_ALPHAVANTAGE_BASEURL,
	}),
	refetchOnMountOrArgChange: true,
	refetchOnReconnect: true,
	tagTypes: [],
	endpoints: (builder) => ({
		fetchStockListings: builder.query<any, any>({
			query() {
				return `?function=TOP_GAINERS_LOSERS&apikey=${process.env.NEXT_PUBLIC_ALPHAVANTAGE_APIKEY}`;
			},
		}),
		searchStockListings: builder.query<SearchStockListingResults, string>({
			query(searchTerm) {
				return `?function=SYMBOL_SEARCH&keywords=${searchTerm}&apikey=${process.env.NEXT_PUBLIC_ALPHAVANTAGE_APIKEY}`;
			},
		}),
		getStockDetails: builder.query<StockDetails, string>({
			query(symbol) {
				return `?function=TIME_SERIES_INTRADAY&symbol=${symbol}&interval=5min&apikey=${process.env.NEXT_PUBLIC_ALPHAVANTAGE_APIKEY}`;
			},
		}),
		getStockBySymbol: builder.query<Stock | null, string>({
			query: (symbol) =>
				`?function=GLOBAL_QUOTE&symbol=${symbol}&apikey=${process.env.NEXT_PUBLIC_ALPHAVANTAGE_APIKEY}`,
			transformResponse: (response: any): Stock | null => {
				const quote = response["Global Quote"];
				if (!quote) return null;
				return {
					ticker: quote["01. symbol"],
					price: quote["05. price"],
					change_amount: quote["09. change"],
					change_percentage: quote["10. change percent"],
					volume: quote["06. volume"],
				};
			},
		}),
	}),
});

export const {
	useFetchStockListingsQuery,
	useLazySearchStockListingsQuery,
	useSearchStockListingsQuery,
	useGetStockDetailsQuery,
	useGetStockBySymbolQuery,
} = stockApi;
