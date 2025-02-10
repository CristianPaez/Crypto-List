import React from "react";
import { render } from "@testing-library/react-native";
import CryptoDetailTemplate from "@/src/containers/CryptoDetailTemplate";

// Mock hooks
jest.mock("@/src/hooks/useCryptoDetail", () => ({
  useCryptoDetail: () => ({
    crypto: null,
    loading: false,
  }),
}));

describe("CryptoDetailTemplate", () => {
  it("should render without crashing", () => {
    const rendered = render(<CryptoDetailTemplate />);
    expect(rendered.toJSON()).not.toBeNull();
  });
});
