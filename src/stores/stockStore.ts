import { defineStore } from 'pinia';
import { StockService } from '../services/api';
import type { StockQuote, StockError, WatchlistItem, StockSearchResult } from '../types/stock';

interface StockState {
  symbolInChart: string | null;
  quotes: Map<string, StockQuote>;
  popularStocks: Map<string, StockQuote>;
  errors: Map<string, StockError>;
  isUpdatingChart: boolean;
  watchlist: WatchlistItem[];
  isInitializing: boolean;
  loading: boolean;
  error: string | null;
  isSearching: boolean;
  searchResults: StockSearchResult | null;
  lastUpdated: Date | null;
  pollingInterval: number | null;
  chartFromSearch: boolean | null;
};

const POLLING_INTERVAL = 5 * 60 * 1000;
const RETRY_ATTEMPTS = 3;
const RETRY_DELAY = 3000;

export const useStockStore = defineStore('stock', {
    state: (): StockState => ({
      symbolInChart: import.meta.env.VITE_DEFAULT_SYMBOL_IN_CHART,
      quotes: new Map(),
      popularStocks: new Map(),
      chartFromSearch: false,
      errors: new Map(),
      isUpdatingChart: false,
      watchlist: [],
      isInitializing: true,
      searchResults: null,
      isSearching: false,
      error: null,
      loading: false,
      lastUpdated: null,
      pollingInterval: null
    }),
  
    actions: {

      async searchSymbol(symbol: string) {
        try {
          this.isSearching = true;
          const quote = await StockService.searchSymbol(symbol);
          this.isSearching = false;
          return quote;
        } catch (error) {
          console.log(error);
        } finally {
          this.isSearching = false;
        }
      },

      async fetchQuote(symbol: string) {
        try {
          this.loading = true;
          const quote = await StockService.getQuote(symbol);
          this.quotes.set(symbol, quote);
        } catch (error) {
          console.log(error);
        } finally {
          this.loading = false;
        }
      },

      async fetchQuoteWithRetry(symbol: string, attempts = RETRY_ATTEMPTS) {
        try {
          const quote = await StockService.getQuote(symbol);
          this.quotes.set(symbol, quote);
          this.errors.delete(symbol);
        } catch (error) {
          if(attempts > 1){
            await new Promise(resolve => setTimeout(resolve, RETRY_DELAY));
            this.fetchQuoteWithRetry(symbol, attempts - 1);
          }
          console.error(error)
        } finally {
          this.loading = false;
        }
      },

      async fetchAllPopularStocks() {
        try {
          this.loading = true;
          let fetchPromises = import.meta.env.VITE_TOP_SYMBOLS.split(',').map(async(symbol: string)=>{
            try {
              const quote = await StockService.getQuote(symbol);
              this.popularStocks.set(symbol, quote);
            } catch (error) {
              this.errors.set(symbol, {
                symbol,
                error: error instanceof Error ? error.message : 'Failed to fetch quote',
                timestamp: Date.now()
              })
            }
          });
          await Promise.allSettled(fetchPromises);
          this.lastUpdated = new Date();
          this.loading = false;
          this.isInitializing = false;
        } catch (error) {
          console.error(error)
          // this.error = error instanceof Error ? error.message : 'Failed to fetch quote';
        } finally {
          this.loading = false;
        }
      },

      startPolling() {
        if(this.pollingInterval){
          clearInterval(this.pollingInterval)
        }

        this.fetchAllPopularStocks();

        this.pollingInterval = window.setInterval(()=>{
          this.fetchAllPopularStocks();
        }, POLLING_INTERVAL)
      },

      stopPolling() {
        if(this.pollingInterval){
          clearInterval(this.pollingInterval)
          this.pollingInterval = null
        }
      },
  
      addToWatchlist(symbol: string) {
        if (!this.watchlist.some(item => item.symbol === symbol)) {
          this.watchlist.push({
            symbol,
            addedAt: Date.now()
          });
        }
      },
  
      removeFromWatchlist(symbol: string) {
        this.watchlist = this.watchlist.filter(item => item.symbol !== symbol);
      }
    },
  });