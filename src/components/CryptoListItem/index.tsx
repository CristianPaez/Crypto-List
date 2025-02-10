import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { styles } from "./style";
import { ICrypto } from "@/src/domain/models/crypto.model";
import { formatNumber } from "@/src/utils/formatNumber";
import { getPercentageColor } from "@/src/utils/getPercentageColor";

// Props for the CryptoListItem component
type CryptoListItemProps = Readonly<{
  crypto: ICrypto;
  onPress: () => void;
}>;

// Component that displays cryptocurrency information
const CryptoListItem = ({ crypto, onPress }: CryptoListItemProps) => {
  return (
    <TouchableOpacity style={styles.cryptoItem} onPress={onPress}>
      <View style={styles.cryptoMain}>
        <View style={styles.cryptoInfo}>
          <Text style={styles.cryptoName}>{crypto.name}</Text>
          <Text style={styles.cryptoSymbol}>{crypto.symbol}</Text>
        </View>
        <View style={styles.priceInfo}>
          <Text style={styles.price}>${formatNumber(crypto.price_usd)}</Text>
          <Text
            style={[
              styles.priceChange,
              { color: getPercentageColor(crypto.percent_change_24h).color },
            ]}
          >
            {getPercentageColor(crypto.percent_change_24h).value}
          </Text>
        </View>
      </View>
      <View style={styles.cryptoStats}>
        <Text style={styles.marketCap}>
          MCap: ${formatNumber(crypto.market_cap_usd)}
        </Text>
        <Text style={styles.volume}>
          Vol: ${formatNumber(crypto.volume24.toString())}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export default CryptoListItem;
