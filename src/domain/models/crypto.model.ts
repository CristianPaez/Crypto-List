// Interface defining the structure of cryptocurrency data from the API
export interface ICrypto {
  id: string;
  symbol: string;
  name: string;
  nameid: string;
  rank: number;
  price_usd: string;
  percent_change_24h: string;
  percent_change_1h: string;
  percent_change_7d: string;
  price_btc: string;
  market_cap_usd: string;
  volume24: number;
  volume24a: number;
  csupply: string;
  tsupply: string;
  msupply: string;
}

// Interface for the API response containing cryptocurrency data
export interface CryptosResponse {
  data: ICrypto[];
  info: {
    coins_num: number;
    time: number;
  };
}
