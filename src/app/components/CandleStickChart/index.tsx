import React from "react";
import Chart from "react-apexcharts";
import { TimeSeriesStockData } from "../../../../utils/type";

const parseStockData = (stockData: Record<string, any>) => {
	return Object.entries(stockData).map(([timestamp, values]) => {
		const open = parseFloat(values["1. open"]);
		const high = parseFloat(values["2. high"]);
		const low = parseFloat(values["3. low"]);
		const close = parseFloat(values["4. close"]);
		const date = new Date(timestamp).getTime(); // Convert timestamp to Date object

		return { x: date, y: [open, high, low, close] };
	});
};

interface CandleStickChartProps {
	data: {
		[arg: string]: TimeSeriesStockData;
	};
}

const CandleStickChart = ({ data }: CandleStickChartProps) => {
	// Sample historical stock data
	// console.log(parseStockData(data));
	const series = [
		{
			data: parseStockData(data),
		},
	];

	// Chart options
	const options = {
		chart: {
			type: "candlestick",
			height: 350,
		},
		title: {
			text: "Stock Historical Data",
			align: "left",
		},
		xaxis: {
			type: "datetime",
		},
		yaxis: {
			tooltip: {
				enabled: true,
			},
		},
	};

	return (
		<Chart
			options={options as any}
			series={series}
			type="candlestick"
			height={550}
			width={"100%"}
		/>
	);
};

export default CandleStickChart;
