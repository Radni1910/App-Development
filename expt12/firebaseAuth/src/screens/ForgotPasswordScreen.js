// src/screens/ForgotPasswordScreen.js
import React, { useState } from "react";
import { View, Text, Alert, StyleSheet } from "react-native";
import Input from "../components/Input";
import Button from "../components/Button";
import ErrorText from "../components/ErrorText";
import { sendPasswordResetEmail } from "firebase/auth";
import { auth } from "../firebase/config";
import { isValidEmail } from "../utils/validators";

export default function ForgotPasswordScreen({ navigation }) {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");

  const handleReset = async () => {
    setError("");
    if (!isValidEmail(email)) return setError("Invalid email");
    try {
      await sendPasswordResetEmail(auth, email);
      Alert.alert("Success", "Password reset email sent");
      navigation.navigate("SignIn");
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Reset Password</Text>
      <Input placeholder="Enter your email" value={email} onChangeText={setEmail} keyboardType="email-address" />
      <ErrorText message={error} />
      <Button title="Send Reset Email" onPress={handleReset} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, justifyContent: "center" },
  title: { fontSize: 22, fontWeight: "700", marginBottom: 12, textAlign: "center" },
});
