import { logErrors } from "@/src/utils/logErrors";
import { CryptosResponse, ICrypto } from "../models/crypto.model";

// Service class that manages all cryptocurrency-related API calls
export default class CryptoService {
  // Method to fetch all cryptocurrencies
  static async getCryptos(): Promise<CryptosResponse> {
    try {
      const response = await fetch("https://api.coinlore.net/api/tickers/");

      if (!response.ok) {
        throw response;
      }

      const data: CryptosResponse = await response.json();
      return data;
    } catch (error) {
      const errorInfo = logErrors(error);
      throw new Error(errorInfo.message);
    }
  }

  // Method to fetch a specific cryptocurrency by ID
  static async getCryptoById(id: string): Promise<ICrypto | undefined> {
    try {
      const response = await fetch(
        `https://api.coinlore.net/api/ticker/?id=${id}`
      );

      if (!response.ok) {
        throw response;
      }

      const data: ICrypto[] = await response.json();
      return data?.[0] ?? undefined;
    } catch (error) {
      const errorInfo = logErrors(error);
      throw new Error(errorInfo.message);
    }
  }
}
