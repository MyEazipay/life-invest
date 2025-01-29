# LifeInvest

## Overview
LifeInvest is a stock price tracking application built to show realtime data of stock prices in the US exchange market.

## Video Walkthrough

## API Integration
- Fetches current stock prices from [Finnhub](https://finnhub.io)
- Fetches historical stock data for charting from [Alpha Vantage](https://alphavantage.co)

## Features 
- Search for stocks using their ticker symbols
- Display key stock details
    - Current Price
    - Price hange
    - Stock symbol
    - Company name
    - Historical Data with charts

## Tech Stack
- Framework: Vue.js
- Language: TypeScript
- API: Alpha Vantage / Finnhub
- State Management: Pinia
- Styling: Tailwind CSS

## Project Setup

1. Clone the Repository

```sh
git clone https://github.com/EmmanuelOmoiya/LifeInvest.git
cd LifeInvest
```

2. Install Dependencies

```sh
npm install
# or
pnpm install
# or 
npm install
```

3. Setup Environment Variables

```sh
VITE_FINNHUB_API_KEY=your_alpha_vantage_api_key
VITE_ALHPAVANTAGE_API_KEY=your_alpha_vantage_api_key
VITE_FINNHUB_API_EXCHANGE_CODE=your_preferred_exchage
VITE_DEFAULT_SYMBOL_IN_CHART=your_default_symbol_showing_in_chart
VITE_TOP_SYMBOLS=your_top_symbols
```

4. Start the development server

```sh
npm run dev
# or
pnpm run dev
# or 
yarn
```

## Usage
1. Enter a stock ticker symbol (e.g., AAPL, TSLA) in the search bar.
2. View near real-time stock details and historical trends.



## Contributing

Contributions are welcome!
To contribute:
