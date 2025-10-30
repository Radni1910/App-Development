// src/screens/SignInScreen.js
import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import Input from "../components/Input";
import Button from "../components/Button";
import ErrorText from "../components/ErrorText";
import { isValidEmail } from "../utils/validators";
import {
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithCredential,
} from "firebase/auth";
import { auth } from "../firebase/config";
import { Ionicons } from "@expo/vector-icons";

import * as WebBrowser from "expo-web-browser";
import * as Google from "expo-auth-session/providers/google";
WebBrowser.maybeCompleteAuthSession();

export default function SignInScreen({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [rememberMe, setRememberMe] = useState(false);

  const [request, response, promptAsync] = Google.useAuthRequest({
    androidClientId:
      "197631537891-oulisev5b1mdfv1idthds1eu191cr2ei.apps.googleusercontent.com",
    expoClientId:
      "197631537891-v5kqda3637f7fgbhqb2inhtlapfh9tuq.apps.googleusercontent.com",
  });

  useEffect(() => {
    if (response?.type === "success") {
      const { id_token } = response.params;
      const credential = GoogleAuthProvider.credential(id_token);
      signInWithCredential(auth, credential).catch((err) =>
        setError(err.message)
      );
    } else if (response?.type === "error") {
      setError("Google sign-in error");
    }
  }, [response]);

  const handleSignIn = async () => {
    setError("");
    if (!isValidEmail(email)) return setError("Invalid email");
    if (password.length < 8)
      return setError("Password must be at least 8 characters");

    try {
      await signInWithEmailAndPassword(auth, email, password);
    } catch (err) {
      switch (err.code) {
        case "auth/user-not-found":
          setError("User not found");
          break;
        case "auth/wrong-password":
          setError("Wrong password");
          break;
        case "auth/invalid-email":
          setError("Invalid email format");
          break;
        default:
          setError(err.message);
      }
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Welcome Back!</Text>
      <Text style={styles.subtitle}>Sign in to continue</Text>

      <Input
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        style={styles.input}
      />
      <Input
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        style={styles.input}
      />
      <TouchableOpacity
        style={styles.rememberMeContainer}
        onPress={() => setRememberMe(!rememberMe)}
      >
        <View style={styles.checkbox}>
          {rememberMe && <Text style={styles.tick}>✓</Text>}
        </View>
        <Text style={styles.rememberMeText}>Remember Me</Text>
      </TouchableOpacity>

      <ErrorText message={error} />

      <Button
        title="Login"
        onPress={handleSignIn}
        style={styles.signInButton}
      />
      <TouchableOpacity onPress={() => navigation.navigate("ForgotPassword")}>
        <Text style={styles.forgotLink}>Forgot Password?</Text>
      </TouchableOpacity>
      <View style={styles.orContainer}>
        <View style={styles.line} />
        <Text style={styles.orText}>or</Text>
        <View style={styles.line} />
      </View>

      <TouchableOpacity onPress={() => promptAsync()} style={styles.googleIcon}>
  <Ionicons name="logo-google" size={32} color="#db4437" />
</TouchableOpacity>

      <View style={styles.signUpContainer}>
        <Text>Don't have an account? </Text>
        <Text
          style={styles.signUpText}
          onPress={() => navigation.navigate("SignUp")}
        >
          Sign Up
        </Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 24,
    justifyContent: "center",
    backgroundColor: "#f5f5f5",
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    textAlign: "center",
    color: "#1976D2",
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 16,
    textAlign: "center",
    color: "#555",
    marginBottom: 24,
  },
  input: {
    marginBottom: 16,
    backgroundColor: "#fff",
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 8,
    elevation: 2,
  },
  signInButton: {
    backgroundColor: "#1976D2",
    borderRadius: 12,
    paddingVertical: 14,
    marginBottom: 12,
  },
  forgotLink: {
    color: "#1976D2", // blue link color
    textAlign: "right",
    marginBottom: 16,
    textDecorationLine: "underline", // optional underline for a real link feel
    fontSize: 14,
  },
  orContainer: {
  flexDirection: "row",
  alignItems: "center",
  marginVertical: 16,
},
line: {
  flex: 1,
  height: 1,
  backgroundColor: "#ccc",
},
orText: {
  marginHorizontal: 8,
  color: "#555",
  fontWeight: "bold",
},
  googleIcon: {
    alignItems: "center",
    marginBottom: 16,
  },
  signUpContainer: {
    flexDirection: "row",
    justifyContent: "center",
  },
  signUpText: {
    color: "#1976D2",
    fontWeight: "bold",
  },
  rememberMeContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
  },
  checkbox: {
    height: 20,
    width: 20,
    borderWidth: 1,
    borderColor: "#1976D2",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 8,
    borderRadius: 4,
  },
  tick: {
    color: "#1976D2",
    fontSize: 12,
  },
  rememberMeText: {
    color: "#555",
    fontSize: 14,
  },
});
