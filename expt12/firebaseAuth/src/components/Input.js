// src/components/Input.js
import React from "react";
import { TextInput, StyleSheet } from "react-native";

export default function Input({ placeholder, value, onChangeText, secureTextEntry = false, keyboardType = "default" }) {
  return (
    <TextInput
      style={styles.input}
      placeholder={placeholder}
      value={value}
      onChangeText={onChangeText}
      secureTextEntry={secureTextEntry}
      keyboardType={keyboardType}
      autoCapitalize="none"
    />
  );
}

const styles = StyleSheet.create({
  input: {
    borderWidth: 1,
    borderColor: "#ddd",
    padding: 12,
    borderRadius: 8,
    marginBottom: 10,
    width: "100%",
    backgroundColor: "#fff",
  },
});
