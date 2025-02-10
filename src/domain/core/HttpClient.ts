// Interface for the HTTP client
export interface IHttpClient {
  get<T>(url: string): Promise<T>;
}

// Basic implementation of the HTTP client
class HttpClient implements IHttpClient {
  async get<T>(url: string): Promise<T> {
    const response = await fetch(url);
    if (!response.ok) {
      throw response;
    }
    return response.json();
  }
}

// Export a singleton instance
export default new HttpClient();
