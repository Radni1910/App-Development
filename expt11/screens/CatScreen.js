// src/screens/CatScreen.js
import React from "react";
import { View, Text, FlatList, Image, Button, ActivityIndicator, StyleSheet } from "react-native";
import { useCats } from "../hooks/useCats";

export const CatScreen = () => {
  const { cats, loading, error, reload } = useCats(10);

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" />
        <Text>Loading cat images...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.center}>
        <Text style={{ color: "red" }}>{error}</Text>
        <Button title="Retry" onPress={reload} />
      </View>
    );
  }

  if (cats.length === 0) {
    return (
      <View style={styles.center}>
        <Text>No cat images found.</Text>
        <Button title="Reload" onPress={reload} />
      </View>
    );
  }

  return (
    <FlatList
      data={cats}
      keyExtractor={(item, index) => index.toString()}
      renderItem={({ item }) => (
        <View style={styles.item}>
          <Image source={{ uri: item }} style={styles.image} resizeMode="contain" />
        </View>
      )}
      refreshing={loading} // pull-to-refresh
      onRefresh={reload}
    />
  );
};

const styles = StyleSheet.create({
  center: { flex: 1, justifyContent: "center", alignItems: "center", padding: 10 },
  item: { padding: 10, borderBottomWidth: 1, borderColor: "#ccc", alignItems: "center" },
  image: { width: "90%", height: 200, borderRadius: 10 },
});
