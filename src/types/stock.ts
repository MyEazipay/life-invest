export interface StockQuote {
    symbol: string;
    price: number;
    change: number;
    changePercent: number;
    name: string;
    logo: string;
}

export interface StockError {
    symbol: string;
    error: string;
    timestamp: number;
}

export interface StockHistoricalData {
    timestamp: number;
    open: number;
    high: number;
    low: number;
    close: number;
    volume: number;
}
  
export interface WatchlistItem {
    symbol: string;
    addedAt: number;
}

export interface StockSearchResult {
    count: number;
    result: {
        description: string;
        displaySymbol: string;
        symbol: string;
        type: string;
    }[]
}