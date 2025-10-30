// src/screens/HomeScreen.js
import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, Alert } from "react-native";
import Button from "../components/Button";
import { auth } from "../firebase/config";
import { signOut } from "firebase/auth";

export default function HomeScreen({ navigation }) {
  const handleSignOut = () => {
    signOut(auth)
      .then(() => {
        navigation.replace("Welcome"); // redirect to welcome screen after sign out
      })
      .catch((err) => Alert.alert("Error", err.message));
  };

  const userEmailOrPhone = auth.currentUser?.email || auth.currentUser?.phoneNumber;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Dashboard</Text>

      {/* User Info Card */}
      <View style={styles.userCard}>
        <Text style={styles.userText}>Welcome,</Text>
        <Text style={styles.userEmail}>{userEmailOrPhone}</Text>
      </View>

      {/* Action Buttons */}
      <Button
        title="Profile"
        onPress={() => navigation.navigate("Profile")}
        style={styles.button}
      />

      <TouchableOpacity onPress={handleSignOut} style={styles.signOutButton}>
        <Text style={styles.signOutText}>Sign Out</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f5f5f5",
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#1976D2",
    marginBottom: 24,
  },
  userCard: {
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 16,
    width: "90%",
    marginBottom: 30,
    alignItems: "center",
    elevation: 3, // shadow for Android
    shadowColor: "#000", // shadow for iOS
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  userText: {
    fontSize: 18,
    color: "#555",
  },
  userEmail: {
    fontSize: 20,
    fontWeight: "bold",
    marginTop: 4,
    color: "#1976D2",
  },
  button: {
    width: "90%",
    borderRadius: 12,
    paddingVertical: 14,
    marginBottom: 16,
  },
  signOutButton: {
    marginTop: 16,
  },
  signOutText: {
    color: "#d32f2f",
    fontWeight: "bold",
    fontSize: 16,
    textDecorationLine: "underline",
  },
});
