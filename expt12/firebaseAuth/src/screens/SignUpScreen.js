// src/screens/SignUpScreen.js
import React, { useState } from "react";
import { View, Text, Alert, StyleSheet, TouchableOpacity } from "react-native";
import Input from "../components/Input";
import Button from "../components/Button";
import ErrorText from "../components/ErrorText";
import { isValidEmail, isValidPassword } from "../utils/validators";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth } from "../firebase/config";

export default function SignUpScreen({ navigation }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSignUp = async () => {
    setError("");
    if (!isValidEmail(email)) return setError("Invalid email");
    if (!isValidPassword(password)) return setError("Password must be at least 8 characters");
    try {
      const userCred = await createUserWithEmailAndPassword(auth, email, password);
      if (name) await updateProfile(userCred.user, { displayName: name });
      Alert.alert("Success", "Account created");
    } catch (err) {
      switch (err.code) {
        case "auth/email-already-in-use":
          setError("Email already in use");
          break;
        case "auth/weak-password":
          setError("Weak password");
          break;
        default:
          setError(err.message);
      }
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Create Account</Text>

      <Input placeholder="Full name" value={name} onChangeText={setName} />
      <Input placeholder="Email" keyboardType="email-address" value={email} onChangeText={setEmail} />
      <Input placeholder="Password" secureTextEntry value={password} onChangeText={setPassword} />

      <ErrorText message={error} />

      <Button title="Sign Up" color="#4caf50" onPress={handleSignUp} />
      <TouchableOpacity
        style={styles.backContainer}
        onPress={() => navigation.navigate("SignIn")}
      >
        <Text style={styles.backText}>Back to Sign In</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 24,
    backgroundColor: "#f5f5f5",
  },
  title: {
    fontSize: 28,
    fontWeight: "700",
    marginBottom: 24,
    color: "#1976D2",
  },
  input: {
    marginBottom: 16,
  },
  backContainer: {
    marginTop: 12,
  },
  backText: {
    color: "#1976D2",
    textDecorationLine: "underline",
    fontSize: 14,
  },
});
