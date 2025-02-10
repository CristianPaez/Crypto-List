import { renderHook, act } from "@testing-library/react-hooks";
import { useCryptoList } from "@/src/hooks/useCryptoList";
import CryptoService from "@/src/domain/services/crypto.service";

// Mock the CryptoService
jest.mock("@/src/domain/services/crypto.service");

// Mock data for testing
const mockCryptos = {
  data: [
    {
      id: "1",
      name: "Bitcoin",
      symbol: "BTC",
      price_usd: "45000",
      nameid: "bitcoin",
      rank: 1,
      percent_change_24h: "1.24",
      percent_change_1h: "0.2",
      percent_change_7d: "5.0",
      price_btc: "1.0",
      market_cap_usd: "800000000000",
      volume24: 30000000000,
      volume24a: 30000000000,
      csupply: "19000000",
      tsupply: "21000000",
      msupply: "21000000",
    },
    {
      id: "2",
      name: "Ethereum",
      symbol: "ETH",
      price_usd: "3000",
      nameid: "ethereum",
      rank: 2,
      percent_change_24h: "2.24",
      percent_change_1h: "0.5",
      percent_change_7d: "7.0",
      price_btc: "0.1",
      market_cap_usd: "300000000000",
      volume24: 20000000000,
      volume24a: 20000000000,
      csupply: "120000000",
      tsupply: "",
      msupply: "",
    },
  ],
};

// Increase the default timeout for async operations
jest.setTimeout(5000);

describe("useCryptoList", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should initialize with empty cryptos and loading state", () => {
    const { result } = renderHook(() => useCryptoList());

    expect(result.current.cryptos).toEqual([]);
    expect(result.current.loading).toBe(true);
    expect(result.current.search).toBe("");
  });

  it("should fetch cryptos on mount", async () => {
    (CryptoService.getCryptos as jest.Mock).mockResolvedValue(mockCryptos);

    const { result } = renderHook(() => useCryptoList());

    expect(result.current.loading).toBe(true);
    expect(result.current.cryptos).toEqual([]);

    // Wait for the effect to complete
    await act(async () => {
      await new Promise(resolve => setTimeout(resolve, 0));
    });

    expect(CryptoService.getCryptos).toHaveBeenCalledTimes(1);
    expect(result.current.cryptos).toEqual(mockCryptos.data);
    expect(result.current.loading).toBe(false);
  });

  it("should handle search correctly", async () => {
    (CryptoService.getCryptos as jest.Mock).mockResolvedValue(mockCryptos);
    const { result } = renderHook(() => useCryptoList());

    // Wait for the effect to complete
    await act(async () => {
      await new Promise(resolve => setTimeout(resolve, 0));
    });

    act(() => {
      result.current.handleSearch("bitcoin");
    });

    expect(result.current.search).toBe("bitcoin");
    expect(result.current.cryptos).toHaveLength(1);
    expect(result.current.cryptos[0].name).toBe("Bitcoin");
  });

  it("should handle error during crypto fetch", async () => {
    const consoleSpy = jest.spyOn(console, "error").mockImplementation();
    (CryptoService.getCryptos as jest.Mock).mockRejectedValue(
      new Error("API Error")
    );

    const { result } = renderHook(() => useCryptoList());

    // Wait for the effect to complete
    await act(async () => {
      await new Promise(resolve => setTimeout(resolve, 0));
    });

    expect(result.current.loading).toBe(false);
    expect(result.current.cryptos).toEqual([]);
    expect(consoleSpy).toHaveBeenCalled();

    consoleSpy.mockRestore();
  });

  it("should return empty results for non-matching search", async () => {
    (CryptoService.getCryptos as jest.Mock).mockResolvedValue(mockCryptos);
    const { result } = renderHook(() => useCryptoList());

    // Wait for the effect to complete
    await act(async () => {
      await new Promise(resolve => setTimeout(resolve, 0));
    });

    act(() => {
      result.current.handleSearch("nonexistent");
    });

    expect(result.current.search).toBe("nonexistent");
    expect(result.current.cryptos).toHaveLength(0);
  });
});
