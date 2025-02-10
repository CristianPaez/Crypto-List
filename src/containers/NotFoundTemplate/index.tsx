import { Link } from "expo-router";
import React from "react";
import { Text, View } from "react-native";
import { styles } from "./style";

// Template component for the 404 Not Found page
export default function NotFoundTemplate() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>This screen doesn't exist.</Text>
      <Link href="/" style={styles.link}>
        <Text style={styles.linkText}>Go to home screen!</Text>
      </Link>
    </View>
  );
}
