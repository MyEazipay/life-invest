"use client";

import React, { useState } from "react";
import { SearchAutocomplete } from "./search-autocomplete";
import { StockChart } from "./stock-chart";

type SearchAndChartWrapperProps = {
  stockList: IStock[];
};

const SearchAndChartWrapper = ({ stockList }: SearchAndChartWrapperProps) => {
  const [selectedSymbol, setSelectedSymbol] = useState<string>("");
  const [searching, setSearching] = useState<boolean>(false);

  const handleSelectedSymbol = (value: string): void => {
    setSelectedSymbol(value);
  };
  return (
    <>
      <div className="mt-6">
        <SearchAutocomplete
          stockList={stockList}
          handleSelectedSymbol={handleSelectedSymbol}
          searching={searching}
          setSearching={setSearching}
        />
      </div>

      <div className="w-full">
        <StockChart
          selectedSymbol={selectedSymbol}
          setSearching={setSearching}
        />
      </div>
    </>
  );
};

export default SearchAndChartWrapper;
