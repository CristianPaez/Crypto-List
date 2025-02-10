import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  cryptoItem: {
    padding: 16,
    backgroundColor: "#fff",
  },
  cryptoMain: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: 8,
  },
  cryptoInfo: {
    flex: 1,
    marginRight: 16,
  },
  cryptoName: {
    fontSize: 16,
    fontWeight: "600",
    color: "#2c3e50",
    marginBottom: 4,
  },
  cryptoSymbol: {
    fontSize: 14,
    color: "#666",
    textTransform: "uppercase",
  },
  priceInfo: {
    alignItems: "flex-end",
  },
  price: {
    fontSize: 16,
    fontWeight: "600",
    color: "#2c3e50",
    marginBottom: 4,
  },
  priceChange: {
    fontSize: 14,
    fontWeight: "500",
  },
  cryptoStats: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 4,
  },
  marketCap: {
    fontSize: 12,
    color: "#666",
  },
  volume: {
    fontSize: 12,
    color: "#666",
  },
});
