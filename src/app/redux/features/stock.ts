import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";
import { Stock } from "../../../../utils/type";
import { stockApi } from "../subscriptions/stock";

interface StockInitialState {
	mostActivelyTraded: Stock[];
	topGainers: Stock[];
	topLosers: Stock[];
	fetchingStocks: boolean;
	watchlist: string[];
}
const initialState: StockInitialState = {
	mostActivelyTraded: [],
	topGainers: [],
	topLosers: [],
	fetchingStocks: false,
	watchlist: [],
};
export const stockSlice = createSlice({
	name: "stock",
	initialState,
	reducers: {
		toggleAddToWatchlist(state, { payload }) {
			let list = [...state.watchlist];
			if (list.includes(payload))
				list = list.filter((item) => item !== payload);
			else list.push(payload);

			state.watchlist = list;
		},
	},
	extraReducers(builder) {
		builder.addMatcher(
			stockApi.endpoints.fetchStockListings.matchFulfilled,
			(state, { payload }) => {
				const { most_actively_traded, top_gainers, top_losers } = payload;
				state.mostActivelyTraded = most_actively_traded;
				state.topGainers = top_gainers;
				state.topLosers = top_losers;
				state.fetchingStocks = false;
			},
		);
		builder.addMatcher(
			stockApi.endpoints.fetchStockListings.matchPending,
			(state) => {
				state.fetchingStocks = true;
			},
		);
		builder.addMatcher(
			stockApi.endpoints.fetchStockListings.matchRejected,
			(state) => {
				state.fetchingStocks = false;
			},
		);
	},
});

export const { toggleAddToWatchlist } = stockSlice.actions;

export const selectstock = (state: RootState) => state.stock;

export default stockSlice.reducer;
