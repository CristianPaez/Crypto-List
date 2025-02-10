import React from "react";
import {
  ActivityIndicator,
  FlatList,
  SafeAreaView,
  TextInput,
  View,
  Text,
} from "react-native";
import { styles } from "./style";
import CryptoListItem from "@/src/components/CryptoListItem";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useCryptoList } from "@/src/hooks/useCryptoList";

// Template component for the home screen, displays the cryptocurrency list with search functionality
const HomeTemplate = () => {
  const router = useRouter();
  const { cryptos, loading, search, handleSearch } = useCryptoList();

  if (loading) {
    return (
      <View style={styles.containerLoading}>
        <ActivityIndicator size="large" color="#2c3e50" />
      </View>
    );
  }

  if (cryptos.length === 0) {
    return (
      <View style={styles.container}>
        <Text>No cryptos found</Text>
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.searchContainer}>
        <Ionicons
          name="search"
          size={20}
          color="#666"
          style={styles.searchIcon}
        />
        <TextInput
          style={styles.input}
          placeholder="Search cryptocurrency..."
          value={search}
          onChangeText={handleSearch}
          placeholderTextColor="#666"
        />
      </View>
      <FlatList
        data={cryptos}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <CryptoListItem
            crypto={item}
            onPress={() => router.push(`/crypto/${item.id}`)}
          />
        )}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
      />
    </SafeAreaView>
  );
};

export default HomeTemplate;
