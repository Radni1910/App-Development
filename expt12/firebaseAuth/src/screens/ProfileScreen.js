// src/screens/ProfileScreen.js
import React from "react";
import { View, Text, StyleSheet, Alert } from "react-native";
import Button from "../components/Button";
import { auth } from "../firebase/config";
import { signOut } from "firebase/auth";

export default function ProfileScreen() {
  const user = auth.currentUser;

  const handleSignOut = () => {
    signOut(auth)
      .then(() => Alert.alert("Logged out"))
      .catch((err) => Alert.alert("Error", err.message));
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Profile</Text>
      <Text>Name: {user?.displayName || "N/A"}</Text>
      <Text>Email: {user?.email || "N/A"}</Text>
      <Text>Phone: {user?.phoneNumber || "N/A"}</Text>
      <View style={{ width: "100%", marginTop: 20 }}>
        <Button title="Sign Out" color="#d32f2f" onPress={handleSignOut} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  title: { fontSize: 24, fontWeight: "700", marginBottom: 10 },
});
