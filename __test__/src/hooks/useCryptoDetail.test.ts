import { renderHook } from "@testing-library/react-hooks";
import { useCryptoDetail } from "@/src/hooks/useCryptoDetail";
import CryptoService from "@/src/domain/services/crypto.service";

// Mock the required modules
jest.mock("@/src/domain/services/crypto.service");
jest.mock("expo-router", () => ({
  useLocalSearchParams: () => ({ id: "1" }),
  useRouter: () => ({
    back: jest.fn(),
  }),
}));

// Mock data for testing
const mockCrypto = {
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
};

describe("useCryptoDetail", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should initialize with undefined crypto and loading state", () => {
    const { result } = renderHook(() => useCryptoDetail());

    expect(result.current.crypto).toBeUndefined();
    expect(result.current.loading).toBe(true);
  });

  it("should fetch crypto details on mount", async () => {
    (CryptoService.getCryptoById as jest.Mock).mockResolvedValue(mockCrypto);

    const { result, waitForNextUpdate } = renderHook(() => useCryptoDetail());

    expect(result.current.loading).toBe(true);
    expect(result.current.crypto).toBeUndefined();

    await waitForNextUpdate();

    expect(CryptoService.getCryptoById).toHaveBeenCalledWith("1");
    expect(result.current.crypto).toEqual(mockCrypto);
    expect(result.current.loading).toBe(false);
  });

  it("should handle error case", async () => {
    const consoleSpy = jest.spyOn(console, "error").mockImplementation();
    const backMock = jest.fn();

    (CryptoService.getCryptoById as jest.Mock).mockRejectedValue(
      new Error("API Error")
    );
    jest.spyOn(require("expo-router"), "useRouter").mockImplementation(() => ({
      back: backMock,
    }));

    const { result, waitForNextUpdate } = renderHook(() => useCryptoDetail());

    await waitForNextUpdate();

    expect(result.current.crypto).toBeUndefined();
    expect(result.current.loading).toBe(false);
    expect(consoleSpy).toHaveBeenCalled();
    expect(backMock).toHaveBeenCalled();

    consoleSpy.mockRestore();
  });
});
