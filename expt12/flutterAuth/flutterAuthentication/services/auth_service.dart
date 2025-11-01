import 'package:firebase_auth/firebase_auth.dart';
import 'package:google_sign_in/google_sign_in.dart';

class AuthService {
  final FirebaseAuth _auth = FirebaseAuth.instance;

  // EMAIL SIGN UP
  Future<UserCredential> signUpWithEmail(String email, String password) async {
    return await _auth.createUserWithEmailAndPassword(
        email: email, password: password);
  }

  // EMAIL LOGIN
  Future<UserCredential> signInWithEmail(String email, String password) async {
    return await _auth.signInWithEmailAndPassword(
        email: email, password: password);
  }

  // GOOGLE SIGN IN (for Web)
  Future<UserCredential> signInWithGoogle() async {
    GoogleAuthProvider googleProvider = GoogleAuthProvider();
    return await _auth.signInWithPopup(googleProvider);
  }

  // PHONE VERIFY
  Future<void> verifyPhone(
    String phoneNumber,
    Function(String, int?) codeSent,
    Function(PhoneAuthCredential) verified,
    Function(FirebaseAuthException) failed,
  ) async {
    await _auth.verifyPhoneNumber(
      phoneNumber: phoneNumber,
      verificationCompleted: verified,
      verificationFailed: failed,
      codeSent: codeSent,
      codeAutoRetrievalTimeout: (id) {},
    );
  }

  // PHONE SIGN-IN WITH OTP
  Future<UserCredential> signInWithSmsCode(
      String verificationId, String smsCode) async {
    final credential = PhoneAuthProvider.credential(
        verificationId: verificationId, smsCode: smsCode);
    return await _auth.signInWithCredential(credential);
  }

  Future<void> signOut() async {
    await _auth.signOut();
    await GoogleSignIn().signOut();
  }
}
