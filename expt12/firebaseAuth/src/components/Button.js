// src/components/Button.js
import React from "react";
import { TouchableOpacity, Text, StyleSheet } from "react-native";

export default function Button({ title, onPress, color = "#1976D2", disabled = false }) {
  return (
    <TouchableOpacity
      style={[styles.button, { backgroundColor: disabled ? "#9e9e9e" : color }]}
      onPress={onPress}
      disabled={disabled}
    >
      <Text style={styles.text}>{title}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: "center",
    marginVertical: 8,
    width: "100%",
  },
  text: { color: "#fff", fontWeight: "700" },
});
