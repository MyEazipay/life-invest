import { combineReducers } from "redux";
import { stockSlice } from "./features/stock";
import { stockApi } from "./subscriptions/stock";

export const reducer = combineReducers({
	stock: stockSlice.reducer,
	[stockApi.reducerPath]: stockApi.reducer,
});
