// Interfaz para el cliente HTTP
export interface IHttpClient {
  get<T>(url: string): Promise<T>;
}

// Implementación básica del cliente HTTP
class HttpClient implements IHttpClient {
  async get<T>(url: string): Promise<T> {
    const response = await fetch(url);
    if (!response.ok) {
      throw response;
    }
    return response.json();
  }
}

// Exportar una instancia singleton
export default new HttpClient();
