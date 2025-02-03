import { stockApi } from "./subscriptions/stock";

export const middlewares = [stockApi.middleware];
