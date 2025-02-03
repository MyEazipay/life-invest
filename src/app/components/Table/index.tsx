"use client";

import {
	Dispatch,
	Fragment,
	JSX,
	SetStateAction,
	useMemo,
	useRef,
} from "react";
import { v4 as uuid } from "uuid";
import { twMerge } from "tailwind-merge";
import { TableObj } from "../../../../utils/type";
import Loader from "../Loader";
interface TableProps {
	getRows: (arg: TableObj) => void;
	data: any[];
	keyExtractor: (arg: any) => string | undefined;
	onClick?: (arg: any) => void;
	tableHeaderClass?: string;
	loading: boolean;
	emptyText?: string;
	setPage?: Dispatch<SetStateAction<number>>;
}

const Table = ({
	getRows,
	data,
	keyExtractor,
	onClick,
	loading,
}: TableProps) => {
	const config = useRef(new Array(Object.keys(data?.[0] || {}).length)).current;

	const render =
		(index: number) => (field: string, callback: () => JSX.Element) => {
			config[index].render = callback;
			config[index].field = field;
		};

	const addClassName = (index: number) => (arg: string) => {
		config[index].className = arg;
		return {
			render: render(index),
		};
	};
	const setColumnName = (index: number) => {
		return (arg: string) => {
			config[index].name = arg;
			return {
				render: render(index),
				addClassName: addClassName(index),
			};
		};
	};

	const setIndex = (value = 0) => {
		config[value] = {};
		return {
			setColumnName: setColumnName(value),
		};
	};

	const table: TableObj = { setIndex } as any;

	useMemo(() => {
		getRows(table);
		return config.map((item) => item.name);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [data, getRows, keyExtractor]);

	const getKey = (row: any) => {
		const key = keyExtractor(row);
		return key || row["id"];
	};

	return (
		<div className="w-full flex flex-1 flex-col">
			<div className="overflow-x-auto hide-scroll w-full flex-1 flex flex-col">
				<table className={twMerge("w-full")}>
					<tbody>
						{data.map((row, rowIndex: number) => (
							<tr
								key={getKey(row)}
								className={twMerge(
									"hover:bg-[#6670850c] h-[48px] border-b-[#EAECF0] border-b-[1px]",
									onClick ? "cursor-pointer" : "",
								)}
								onClick={() => onClick?.(row)}
							>
								{config.map((item, index) => (
									<Fragment key={uuid()}>
										{!index && <td className="px-2"></td>}
										<td
											style={{
												fontSize: "clamp(12px, 4vw, 14px)",
											}}
											className={twMerge(
												"font-[300] whitespace-nowrap text-[#4a4a4a]",
												item.className,
											)}
										>
											{item?.render(row[item.field], row, rowIndex) ||
												row[item.field]}
										</td>
										<td className="px-2"></td>
									</Fragment>
								))}
							</tr>
						))}
					</tbody>
				</table>
				{loading && (
					<div className="flex items-center justify-center flex-1 py-5">
						<Loader />
					</div>
				)}
			</div>
		</div>
	);
};

export default Table;
