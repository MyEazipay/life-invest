import axios from 'axios';
import type { StockQuote, StockHistoricalData } from '../types/stock';
import { useStockStore } from '../stores/stockStore';

const FINNHUB_API_KEY = import.meta.env.VITE_FINNHUB_API_KEY;
const api = axios.create({
  baseURL: 'https://finnhub.io/api/v1',
  params: {
    token: FINNHUB_API_KEY
  }
});

export class StockService {
  static async getQuote(symbol: string): Promise<StockQuote> {
    const store = useStockStore();
    try {
      const [quoteRes, profileRes] = await Promise.all([
        api.get(`/quote?symbol=${symbol}`),
        api.get(`/stock/profile2?symbol=${symbol}`)
      ]);
      store.error = null
      
      return {
        symbol,
        price: quoteRes.data.c,
        change: quoteRes.data.d,
        changePercent: quoteRes.data.dp,
        name: profileRes.data.name,
        logo: profileRes.data.logo
      };
    } catch (error) {
      store.error = error.message
      // console.log(error)
      throw new Error(`Failed to fetch quote for ${symbol}`);
    }
}

static async getHistoricalData(
    symbol: string,
    resolution: string = 'D',
    from: number,
    to: number
): Promise<StockHistoricalData[]> {
    try {
      const { data } = await api.get('/stock/candle', {
        params: { symbol, resolution, from, to }
      });
      
      return data.t.map((timestamp: number, index: number) => ({
        timestamp,
        open: data.o[index],
        high: data.h[index],
        low: data.l[index],
        close: data.c[index],
        volume: data.v[index]
      }));
    } catch (error) {
      throw new Error(`Failed to fetch historical data for ${symbol}`);
    }
  }

static async searchSymbol(
    symbol: string,
): Promise<any[]> {
    try {
      const { data } = await api.get(`/search?q=${symbol}`);
      return data
    } catch (error) {
      throw new Error(`Failed to fetch search results for ${symbol}`);
    }
  }
}

// const searchSymbol = () => {
//     try {
//       let topSymbols = import.meta.env.TOP_SYMBOLS;
//       let symbolsArray = topSymbols.split(',').join(',');
//       console.log(symbolsArray)
//     } catch (error) {
//       throw new Error(`Failed to fetch quotes for top symbols`);
//     }
// }