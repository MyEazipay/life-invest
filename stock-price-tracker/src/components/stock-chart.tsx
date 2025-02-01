/* eslint-disable @typescript-eslint/no-explicit-any */
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
  const [state, setState] = React.useState<Record<string, any>>({
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

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const isObject = (value: any) =>
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
          ? transformedResult?.map(([key, val]: [string, any]) => {
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
        setState((prevData: Record<string, any>) => {
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
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      } catch (error) {
        setSearching(false);
      }
    };
    innerFunction();
    setSearching(false);
  // eslint-disable-next-line react-hooks/exhaustive-deps
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
