import 'package:flutter/material.dart';
import '../services/auth_service.dart';

class PhoneSignInScreen extends StatefulWidget {
  const PhoneSignInScreen({super.key});

  @override
  State<PhoneSignInScreen> createState() => _PhoneSignInScreenState();
}

class _PhoneSignInScreenState extends State<PhoneSignInScreen> {
  final phoneController = TextEditingController();
  final codeController = TextEditingController();
  final AuthService _authService = AuthService();

  String verificationId = '';
  bool codeSent = false;

  void _sendCode() {
    _authService.verifyPhone(
      phoneController.text.trim(),
      (verId, resendToken) {
        setState(() {
          verificationId = verId;
          codeSent = true;
        });
      },
      (credential) async {
        await _authService.signInWithSmsCode(
            verificationId, codeController.text.trim());
      },
      (error) {
        ScaffoldMessenger.of(context).showSnackBar(SnackBar(content: Text(error.message ?? error.code)));
      },
    );
  }

  void _verifyCode() async {
    await _authService.signInWithSmsCode(
        verificationId, codeController.text.trim());
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: const Text('Phone Sign In')),
      body: Padding(
        padding: const EdgeInsets.all(20),
        child: Column(
          children: [
            if (!codeSent) ...[
              TextField(
                  controller: phoneController,
                  decoration: const InputDecoration(labelText: '+91 9876543210')),
              const SizedBox(height: 10),
              ElevatedButton(onPressed: _sendCode, child: const Text('Send OTP')),
            ] else ...[
              TextField(
                  controller: codeController,
                  decoration: const InputDecoration(labelText: 'Enter OTP')),
              const SizedBox(height: 10),
              ElevatedButton(onPressed: _verifyCode, child: const Text('Verify OTP')),
            ],
          ],
        ),
      ),
    );
  }
}
