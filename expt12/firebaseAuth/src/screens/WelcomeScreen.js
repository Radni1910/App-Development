// src/screens/WelcomeScreen.js
import React from "react";
import { View, Text, StyleSheet, ScrollView,TouchableOpacity,Image } from "react-native";
import Button from "../components/Button";

export default function WelcomeScreen({ navigation }) {
  return (
    <ScrollView contentContainerStyle={styles.container}>
        <Image
        source={require("../assets/logo.png")} 
        style={styles.logo}
        resizeMode="contain"
      />
      <Text style={styles.title}>Welcome to Firebase Auth App</Text>
      <Text style={styles.subtitle}>
        Securely sign in and manage your account
      </Text>
      
      <Button
        title="Sign In"
        onPress={() => navigation.navigate("SignIn")}
        style={styles.button}
      />
      <Button
        title="Sign Up"
        onPress={() => navigation.navigate("SignUp")}
        color="#4caf50"
        style={styles.button}
      />
      <TouchableOpacity onPress={() => navigation.navigate("PhoneAuth")}>
        <Text style={styles.phoneLink}>Phone Sign In</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 24,
    backgroundColor: "#f5f5f5",
  },
  logo: {
    width: 150,
    height: 150,
    marginBottom: 24,
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    textAlign: "center",
    color: "#1976D2",
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: "#555",
    textAlign: "center",
    marginBottom: 32,
  },
  button: {
    width: "80%",
    borderRadius: 12,
    paddingVertical: 14,
    marginBottom: 16,
    elevation: 2, // shadow for Android
  },
  phoneLink: {
    color: "#1976D2",
    fontSize: 16,
    textDecorationLine: "underline",
    marginTop: 12,
  },
});
