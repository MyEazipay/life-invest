"use client";

import React, { useEffect, useState, useRef } from "react";
import { Search } from "lucide-react";
import Spinner from "./spinner";

type SearchAutocompleteProps = {
  stockList: IStock[];
  handleSelectedSymbol: (value: string) => void;
  searching: boolean;
  setSearching: React.Dispatch<React.SetStateAction<boolean>>;
};

export const SearchAutocomplete = ({
  stockList,
  handleSelectedSymbol,
  searching,
  setSearching,
}: SearchAutocompleteProps): React.ReactElement => {
  const [inputValue, setInputValue] = useState<string>("");
  const [filteredSuggestions, setFilteredSuggestions] = useState<IStock[]>([]);
  const [selectedIndex, setSelectedIndex] = useState<number>(-1);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [isFocused, setIsFocused] = useState<boolean>(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLUListElement>(null);

  useEffect(() => {
    const filtered = stockList
      .filter((entry) =>
        entry?.symbol?.toLowerCase().includes(inputValue.toLowerCase())
      )
      .slice(0, 10);
    setFilteredSuggestions(filtered);
    setSelectedIndex(-1);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inputValue]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setSelectedIndex((prev) =>
        prev < filteredSuggestions.length - 1 ? prev + 1 : prev
      );
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setSelectedIndex((prev) => (prev > 0 ? prev - 1 : -1));
    } else if (e.key === "Enter" && selectedIndex >= 0) {
      setInputValue(filteredSuggestions[selectedIndex].symbol);
      setIsOpen(false);
    } else if (e.key === "Escape") {
      setIsOpen(false);
    }
  };

  const handleBlur = () => {
    // Small delay to allow click events on results to fire
    setTimeout(() => {
      setIsFocused(false);
    }, 200);
  };

  const handleSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault();
    setSearching(true);
    handleSelectedSymbol(inputValue);
  };

  return (
    <div className="w-full">
      <form className="w-full mx-auto p-4 flex-col md:flex md:flex-row gap-8" onSubmit={handleSubmit}>
        <div className="relative md:min-w-[500px] lg:min-w-[700px] min-w-0">
          <div className="relative h-16">
            <input
              ref={inputRef}
              type="text"
              value={inputValue}
              onChange={(e) => {
                setInputValue(e.target.value);
                setIsOpen(true);
              }}
              onKeyDown={handleKeyDown}
              onFocus={() => setIsFocused(true)}
              onBlur={handleBlur}
              className="w-full px-4 py-4 pl-10 h-full text-lg border rounded-lg bg-gray-50 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
              placeholder="Search..."
              aria-label="Search"
              aria-expanded={isOpen}
              aria-controls="search-listbox"
              aria-activedescendant={
                selectedIndex >= 0 ? `suggestion-${selectedIndex}` : undefined
              }
              role="combobox"
            />
            <Search className="absolute left-3 top-5 h-6 w-6 text-gray-400" />
          </div>
          {isOpen && isFocused && filteredSuggestions.length > 0 && (
            <ul
              ref={listRef}
              className="absolute z-10 w-full mt-1 bg-white border rounded-lg shadow-lg"
              role="listbox"
              id="search-listbox"
            >
              {filteredSuggestions.map((suggestion, index) => (
                <li
                  key={suggestion?.symbol}
                  id={`suggestion-${index}`}
                  role="option"
                  aria-selected={index === selectedIndex}
                  className={`px-4 py-2 text-lg font-semibold cursor-pointer ${
                    index === selectedIndex
                      ? "bg-blue-50 text-blue-700"
                      : "text-gray-900 hover:bg-gray-100"
                  }`}
                  onClick={() => {
                    setInputValue(suggestion?.symbol);
                    setIsOpen(false);
                  }}
                >
                  <span className="mr-4">{suggestion.symbol}</span> ---{" "}
                  <span className="ml-4">{suggestion.name}</span>
                </li>
              ))}
            </ul>
          )}
        </div>
        <button
          type="submit"
          className="bg-green-600 px-4 text-white font-semibold flex items-center justify-center rounded-lg min-w-[135px] min-h-14 mt-4 md:mt-0 "
        >
          {searching ? <Spinner size="medium" /> : <span>Launch Chart</span>}
        </button>
      </form>
    </div>
  );
};
