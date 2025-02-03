"use client";

import React, { ChangeEventHandler, useEffect, useMemo, useState } from "react";
import { MdOutlineSearch } from "react-icons/md";
import { twMerge } from "tailwind-merge";
import Table from "../Table";
import { TableObj, Symbol } from "../../../../utils/type";
import { v4 as uuid } from "uuid";
import { useLazySearchStockListingsQuery } from "../../redux/subscriptions/stock";
import { debounce } from "lodash";
import { useRouter } from "next/navigation";
import ColorBadge from "../ColorBadge";

export default function SearchStock() {
	const [value, setValue] = useState<string>("");
	const [focused, setFocused] = useState<boolean>(false);
	const [runSearch, { data, isFetching }] = useLazySearchStockListingsQuery();
	const router = useRouter();

	const handleFocus = (isFocused: boolean) => () => {
		setFocused(isFocused);
	};

	const handleChange: ChangeEventHandler<HTMLInputElement> = (e) => {
		const { value } = e.target;
		setValue(value);
	};

	const debounceRunSearch = useMemo(
		() =>
			debounce((value: string) => {
				if (!value) return;
				runSearch(value);
			}, 400),
		// eslint-disable-next-line react-hooks/exhaustive-deps
		[],
	);

	useEffect(() => {
		debounceRunSearch(value);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [value]);

	const handleClick = (arg: Symbol) => {
		setFocused(false);
		router.push(`/${arg["1. symbol"]}`);
	};

	return (
		<div className="bg-white max-w-[600px] w-full mx-auto rounded-[1rem] search-shadow overflow-hidden">
			<div className="h-[clamp(3.0rem,_6vw,_3.5rem)] flex items-center md:px-5 px-3 gap-3">
				<MdOutlineSearch size={24} color="grey" />
				<input
					type="text"
					className="w-full bg-transparent border-0 outline-none"
					placeholder="Search stocks"
					onFocus={handleFocus(true)}
					value={value}
					onChange={handleChange}
				/>
			</div>

			<div
				className={twMerge(
					"max-h-[0px] flex-1 h-fit overflow-hidden transition-all duration-500",
					focused && "max-h-[1000px]",
				)}
				onMouseOver={handleFocus(true)}
				onMouseLeave={handleFocus(false)}
			>
				<hr />
				<Table
					getRows={function ({ setIndex }: TableObj): void {
						setIndex(0)
							.setColumnName("")
							.render("1. symbol", (val, row: Symbol) => (
								<div>
									<div className="flex items-center gap-2">
										<ColorBadge name={row?.["1. symbol"]} />
										<span className="text-gray-800">{row["2. name"]}</span>
										<span className="font-[300] text-gray-400">
											{row["3. type"]}
										</span>
									</div>
								</div>
							));
						setIndex(4)
							.setColumnName("")
							.render("4. region", (val, row: Symbol) => (
								<div>
									<span className="font-[600] text-black">
										{val}{" "}
										<span className="text-gray-400">
											({row?.["8. currency"]})
										</span>
									</span>
								</div>
							));
					}}
					onClick={handleClick}
					keyExtractor={() => uuid()}
					loading={isFetching}
					data={isFetching ? [] : [...(data?.bestMatches || [])]?.splice(0, 5)}
				/>
			</div>
		</div>
	);
}
