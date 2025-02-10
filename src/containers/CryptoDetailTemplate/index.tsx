import React, { Fragment } from "react";
import { ScrollView, View, Text, ActivityIndicator } from "react-native";
import { formatNumber } from "@/src/utils/formatNumber";
import { styles } from "./style";
import { Stack } from "expo-router";
import { useCryptoDetail } from "@/src/hooks/useCryptoDetail";
import { getPercentageColor } from "@/src/utils/getPercentageColor";

// Template component for displaying detailed information about a specific cryptocurrency
export default function CryptoDetailTemplate() {
  const { crypto, loading } = useCryptoDetail();

  if (loading) {
    return (
      <View style={styles.containerLoading}>
        <ActivityIndicator size="large" color="#2c3e50" />
      </View>
    );
  }

  if (!crypto) {
    return (
      <View style={styles.container}>
        <Text>No crypto found</Text>
      </View>
    );
  }

  return (
    <Fragment>
      <Stack.Screen options={{ title: crypto.name }} />
      <ScrollView style={styles.container}>
        <View style={styles.header}>
          <View style={styles.symbolContainer}>
            <Text style={styles.symbol}>{crypto.symbol}</Text>
            <Text style={styles.rank}>Rank #{crypto.rank}</Text>
          </View>
          <Text style={styles.price}>${formatNumber(crypto.price_usd)}</Text>
        </View>

        <View style={styles.statsContainer}>
          <View style={styles.statBox}>
            <Text style={styles.statLabel}>1h Change</Text>
            <Text
              style={[
                styles.statValue,
                { color: getPercentageColor(crypto.percent_change_1h).color },
              ]}
            >
              {getPercentageColor(crypto.percent_change_1h).value}
            </Text>
          </View>
          <View style={styles.statBox}>
            <Text style={styles.statLabel}>24h Change</Text>
            <Text
              style={[
                styles.statValue,
                { color: getPercentageColor(crypto.percent_change_24h).color },
              ]}
            >
              {getPercentageColor(crypto.percent_change_24h).value}
            </Text>
          </View>
          <View style={styles.statBox}>
            <Text style={styles.statLabel}>7d Change</Text>
            <Text
              style={[
                styles.statValue,
                { color: getPercentageColor(crypto.percent_change_7d).color },
              ]}
            >
              {getPercentageColor(crypto.percent_change_7d).value}
            </Text>
          </View>
        </View>

        <View style={styles.infoContainer}>
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Market Cap</Text>
            <Text style={styles.infoValue}>
              ${formatNumber(crypto.market_cap_usd)}
            </Text>
          </View>
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>24h Volume</Text>
            <Text style={styles.infoValue}>
              ${formatNumber(crypto.volume24.toString())}
            </Text>
          </View>
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Available Supply</Text>
            <Text style={styles.infoValue}>
              {formatNumber(crypto.csupply)} {crypto.symbol}
            </Text>
          </View>
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Total Supply</Text>
            <Text style={styles.infoValue}>
              {formatNumber(crypto.tsupply)} {crypto.symbol}
            </Text>
          </View>
        </View>
      </ScrollView>
    </Fragment>
  );
}
