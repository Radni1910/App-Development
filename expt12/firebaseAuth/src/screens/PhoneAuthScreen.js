// src/screens/PhoneAuthScreen.js
import React, { useRef, useState } from "react";
import { View, Text, TextInput, Alert, StyleSheet } from "react-native";
import Button from "../components/Button";
import { FirebaseRecaptchaVerifierModal } from "expo-firebase-recaptcha";
import { auth } from "../firebase/config";
import { signInWithPhoneNumber } from "firebase/auth";
import app from "../firebase/config";

export default function PhoneAuthScreen() {
  const recaptchaVerifier = useRef(null);
  const [phone, setPhone] = useState("");
  const [verificationId, setVerificationId] = useState(null);
  const [code, setCode] = useState("");

  const sendVerification = async () => {
    try {
      const phoneNumber = phone;
      const verification = await signInWithPhoneNumber(auth, phoneNumber, recaptchaVerifier.current);
      setVerificationId(verification);
      Alert.alert("Code sent", "An OTP has been sent to your phone");
    } catch (err) {
      Alert.alert("Error", err.message);
    }
  };

  const confirmCode = async () => {
    try {
      if (!verificationId) return Alert.alert("Error", "Please request code first");
      await verificationId.confirm(code);
      Alert.alert("Success", "Phone authentication successful");
    } catch (err) {
      Alert.alert("Error", "Invalid code or expired");
    }
  };

  return (
    <View style={styles.container}>
      <FirebaseRecaptchaVerifierModal ref={recaptchaVerifier} firebaseConfig={app.options} />
      <Text style={styles.title}>Phone Sign In</Text>

      <TextInput
        placeholder="+91 9999999999"
        value={phone}
        onChangeText={setPhone}
        keyboardType="phone-pad"
        style={styles.input}
      />
      <Button title="Send Code" onPress={sendVerification} />

      {verificationId && (
        <>
          <TextInput placeholder="Enter OTP" value={code} onChangeText={setCode} keyboardType="number-pad" style={styles.input} />
          <Button title="Confirm Code" onPress={confirmCode} />
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, justifyContent: "center" },
  title: { fontSize: 22, fontWeight: "700", marginBottom: 12, textAlign: "center" },
  input: { borderWidth: 1, borderColor: "#ddd", padding: 12, borderRadius: 8, marginBottom: 10 },
});
