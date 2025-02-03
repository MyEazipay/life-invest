"use client";

import React from "react";
import Button from "../Button";
import { useAppSelector } from "../../redux/hooks";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function Header() {
	const watchlist = useAppSelector((state) => state.stock.watchlist);
	const router = useRouter();

	const gotoWatchlist = () => {
		router.push("/watchlist");
	};
	return (
		<header className="flex items-center justify-between shadow-sm bg-gray-200 p-5">
			<div className="max-w-[1000px] w-full mx-auto flex items-center justify-between">
				<Link href="/">
					<h1 className="text-blue-600 font-[700] md:text-2xl text-xl">
						LiveInVest
					</h1>
				</Link>
				<Button
					label={""}
					className="gap-2 items-center flex"
					onClick={gotoWatchlist}
				>
					<span>Watchlist</span>
					<span className="bg-white px-2 py-1 text-blue-500 font-[600] rounded-md">
						{watchlist.length}
					</span>
				</Button>
			</div>
		</header>
	);
}
