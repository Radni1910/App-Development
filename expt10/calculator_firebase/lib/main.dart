import 'package:flutter/material.dart';
import 'package:firebase_core/firebase_core.dart';
import 'package:cloud_firestore/cloud_firestore.dart';

Future<void> main() async {
  WidgetsFlutterBinding.ensureInitialized();

  await Firebase.initializeApp(
    options: const FirebaseOptions(
      apiKey: "AIzaSyAyKatLn4f9KuTn-Ps9_sJno3qCtXeNxNk",
      authDomain: "calculator-732eb.firebaseapp.com",
      projectId: "calculator-732eb",
      storageBucket: "calculator-732eb.firebasestorage.app",
      messagingSenderId: "259031964493",
      appId: "1:259031964493:web:41ca4d659b37eefc577504",
      measurementId: "G-9YDK8QQJ5T",
    ),
  );

  runApp(const CalculatorApp());
}

// Function to save a calculation
Future<void> saveResult(String expression, String result) async {
  await FirebaseFirestore.instance.collection('calculations').add({
    'expression': expression,
    'result': result,
    'timestamp': FieldValue.serverTimestamp(),
  });
}

class CalculatorApp extends StatelessWidget {
  const CalculatorApp({super.key});

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      debugShowCheckedModeBanner: false,
      home: const Calculator(),
    );
  }
}

class Calculator extends StatefulWidget {
  const Calculator({super.key});

  @override
  _CalculatorState createState() => _CalculatorState();
}

class _CalculatorState extends State<Calculator> {
  String textToDisplay = "0";
  String expression = "";
  String operation = "";
  double firstNum = 0;
  bool shouldResetDisplay = false;

  void btnOnClick(String btnText) {
    setState(() {
      if (btnText == "C") {
        textToDisplay = "0";
        expression = "";
        firstNum = 0;
        operation = "";
        shouldResetDisplay = false;
      } else if (btnText == "+/-") {
        if (textToDisplay.startsWith("-")) {
          textToDisplay = textToDisplay.substring(1);
        } else if (textToDisplay != "0") {
          textToDisplay = "-$textToDisplay";
        }
      } else if (btnText == "%") {
        double num = double.tryParse(textToDisplay) ?? 0;
        if (firstNum != 0 && operation.isNotEmpty) {
          num = (firstNum * num) / 100;
        } else {
          num = num / 100;
        }
        textToDisplay = num.toString();
      } else if (btnText == "+" ||
          btnText == "-" ||
          btnText == "×" ||
          btnText == "÷") {
        firstNum = double.tryParse(textToDisplay) ?? 0;
        operation = btnText;
        expression = "$textToDisplay $btnText ";
        shouldResetDisplay = true;
      } else if (btnText == "=") {
        double secondNum = double.tryParse(textToDisplay) ?? 0;
        double result = 0;
        if (operation == "+") {
          result = firstNum + secondNum;
        } else if (operation == "-") {
          result = firstNum - secondNum;
        } else if (operation == "×") {
          result = firstNum * secondNum;
        } else if (operation == "÷") {
          if (secondNum != 0) result = firstNum / secondNum;
        }
        expression += textToDisplay;

        // Save calculation to Firebase
        saveResult(expression, result.toString());

        if (result == result.toInt()) {
          textToDisplay = result.toInt().toString();
        } else {
          textToDisplay = result.toString();
        }
        shouldResetDisplay = true;
        expression = "";
      } else {
        if (textToDisplay == "0" || shouldResetDisplay) {
          textToDisplay = btnText;
          shouldResetDisplay = false;
        } else {
          textToDisplay += btnText;
        }
      }
    });
  }

  Widget calcButton(
    String btnText, {
    Color? btnColor,
    Color txtColor = Colors.white,
  }) {
    return Expanded(
      child: Padding(
        padding: const EdgeInsets.all(6.0),
        child: ElevatedButton(
          onPressed: () => btnOnClick(btnText),
          style: ElevatedButton.styleFrom(
            shape: const CircleBorder(),
            padding: const EdgeInsets.all(22),
            backgroundColor: btnColor ?? Colors.black54,
          ),
          child: Text(btnText, style: TextStyle(fontSize: 24, color: txtColor)),
        ),
      ),
    );
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: Colors.black,
      body: Column(
        mainAxisAlignment: MainAxisAlignment.end,
        children: [
          Container(
            padding: const EdgeInsets.all(20),
            alignment: Alignment.centerRight,
            child: Text(
              expression,
              style: const TextStyle(fontSize: 30, color: Colors.white70),
            ),
          ),
          Container(
            padding: const EdgeInsets.all(20),
            alignment: Alignment.centerRight,
            child: Text(
              textToDisplay,
              style: const TextStyle(fontSize: 48, color: Colors.white),
            ),
          ),
          const Divider(color: Colors.white24),
          Row(
            children: [
              calcButton("C", btnColor: Colors.grey, txtColor: Colors.red),
              calcButton("+/-", btnColor: Colors.grey),
              calcButton("%", btnColor: Colors.grey),
              calcButton("÷", btnColor: Colors.teal),
            ],
          ),
          Row(
            children: [
              calcButton("7"),
              calcButton("8"),
              calcButton("9"),
              calcButton("×", btnColor: Colors.teal),
            ],
          ),
          Row(
            children: [
              calcButton("4"),
              calcButton("5"),
              calcButton("6"),
              calcButton("-", btnColor: Colors.teal),
            ],
          ),
          Row(
            children: [
              calcButton("1"),
              calcButton("2"),
              calcButton("3"),
              calcButton("+", btnColor: Colors.teal),
            ],
          ),
          Row(
            children: [
              Expanded(
                flex: 2,
                child: Padding(
                  padding: const EdgeInsets.all(6.0),
                  child: ElevatedButton(
                    onPressed: () => btnOnClick("0"),
                    style: ElevatedButton.styleFrom(
                      shape: const StadiumBorder(),
                      padding: const EdgeInsets.all(22),
                      backgroundColor: Colors.black54,
                    ),
                    child: const Text(
                      "0",
                      style: TextStyle(fontSize: 24, color: Colors.white),
                    ),
                  ),
                ),
              ),
              calcButton("."),
              calcButton("=", btnColor: Colors.teal),
            ],
          ),
        ],
      ),
    );
  }
}
