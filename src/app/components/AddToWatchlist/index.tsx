import React, { useMemo } from "react";
import Button from "../Button";
import { useAppSelector } from "../../redux/hooks";
import { useDispatch } from "react-redux";
import { toggleAddToWatchlist } from "../../redux/features/stock";
import { toast } from "react-toastify";

interface AddToWatchlistProps {
	symbol?: string;
}
export default function AddToWatchlist({ symbol }: AddToWatchlistProps) {
	const watchlist = useAppSelector((state) => state.stock.watchlist);
	const dispatch = useDispatch();

	const isAdded = useMemo(
		() => watchlist.includes(symbol!),
		[watchlist, symbol],
	);

	console.log(symbol, isAdded, watchlist);

	const addToWatchlist = () => {
		toast.success(`${isAdded ? "Added" : "Removed"} to watchlist`);
		dispatch(toggleAddToWatchlist(symbol));
	};

	return (
		<Button
			label={!isAdded ? "Add to watchlist" : "Remove from watchlist"}
			onClick={addToWatchlist}
			className={
				isAdded ? "bg-red-500 hover:bg-red-500 focus:ring-red-300" : ""
			}
		/>
	);
}
