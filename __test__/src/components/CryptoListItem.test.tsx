import React from "react";
import { render } from "@testing-library/react-native";
import CryptoListItem from "@/src/components/CryptoListItem";

const mockCrypto = {
  id: "1",
  name: "Bitcoin",
  nameid: "bitcoin",
  symbol: "BTC",
  price_usd: "45000",
  market_cap_usd: "800000000000",
  rank: 1,
  csupply: "19000000",
  tsupply: "21000000",
  msupply: "21000000",
  percent_change_24h: "5.25",
  percent_change_1h: "5.25",
  percent_change_7d: "5.25",
  price_btc: "0.000045",
  volume24: 30000000000,
  volume24a: 30000000000,
};

describe("CryptoListItem", () => {
  it("should render without crashing", () => {
    const rendered = render(
      <CryptoListItem crypto={mockCrypto} onPress={() => {}} />
    );
    expect(rendered.toJSON()).not.toBeNull();
  });
});
