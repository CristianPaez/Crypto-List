import { logErrors } from "@/src/utils/logErrors";
import { CryptosResponse, ICrypto } from "../models/crypto.model";
import HttpClient, { IHttpClient } from "@/src/domain/core/HttpClient";

interface ICryptoService {
  getCryptos(): Promise<CryptosResponse>;
  getCryptoById(id: string): Promise<ICrypto | undefined>;
}

// Service class that manages all cryptocurrency-related API calls
class CryptoService implements ICryptoService {
  private readonly baseUrl = "https://api.coinlore.net/api";

  constructor(private readonly httpClient: IHttpClient) {}

  // Method to fetch all cryptocurrencies
  async getCryptos(): Promise<CryptosResponse> {
    try {
      return await this.httpClient.get<CryptosResponse>(
        `${this.baseUrl}/tickers/`
      );
    } catch (error) {
      const errorInfo = logErrors(error);
      throw new Error(errorInfo.message);
    }
  }

  // Method to fetch a specific cryptocurrency by ID
  async getCryptoById(id: string): Promise<ICrypto | undefined> {
    try {
      const data = await this.httpClient.get<ICrypto[]>(
        `${this.baseUrl}/ticker/?id=${id}`
      );
      return data?.[0] ?? undefined;
    } catch (error) {
      const errorInfo = logErrors(error);
      throw new Error(errorInfo.message);
    }
  }
}

export default new CryptoService(HttpClient);
