"use client";

import React, { useEffect } from "react";
import dynamic from "next/dynamic";

const ApexChart = dynamic(() => import("react-apexcharts"), { ssr: false });

type StockChartProps = {
  selectedSymbol: string;
  setSearching: React.Dispatch<React.SetStateAction<boolean>>;
};

export const StockChart = ({
  selectedSymbol,
  setSearching,
}: StockChartProps) => {
  const [state, setState] = React.useState<object>({
    series: [
      {
        data: [],
      },
    ],
    options: {
      chart: {
        type: "candlestick",
        height: 550,
      },
      title: {
        text: selectedSymbol,
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
    },
  });

  const isObject = (value) =>
    value !== null && typeof value === "object" && !Array.isArray(value);

  useEffect(() => {
    const innerFunction = async () => {
      try {
        const data = await fetch(
          `https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=${selectedSymbol}&interval=5min&apikey=8CJ0T2Q3BMLWBN7M`
        );
        const result = await data.json();
        const transformedResult = isObject(result["Time Series (5min)"])
          ? Object.entries(result["Time Series (5min)"])
          : null;
        const seriesData = transformedResult
          ? transformedResult?.map(([key, val]) => {
              const dateString = key;
              const formattedDateString = dateString.replace(" ", "T"); // Convert to ISO 8601 format
              const x = new Date(formattedDateString);
              const y = [
                val?.["1. open"],
                val?.["2. high"],
                val?.["3. low"],
                val?.["4. close"],
              ];
              return { x, y };
            })
          : [];
        setState((prevData) => {
          return {
            series: [
              {
                data: seriesData,
              },
            ],
            options: {
              ...prevData?.options,
              title: {
                text: selectedSymbol,
                align: "left",
              },
            },
          };
        });
        setSearching(false);
      } catch (error) {
        setSearching(false);
      }
    };
    innerFunction();
    setSearching(false);
  }, [selectedSymbol]);

  return (
    <div>
      <div id="chart">
        <ApexChart
          options={state.options}
          series={state.series}
          type="candlestick"
          height={550}
        />
      </div>
      <div id="html-dist"></div>
    </div>
  );
};
