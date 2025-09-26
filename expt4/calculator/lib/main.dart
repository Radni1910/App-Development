import 'package:flutter/material.dart';
void main() => runApp(CalculatorApp());
class CalculatorApp extends StatelessWidget {
  const CalculatorApp({super.key});
  @override
  Widget build(BuildContext context) {
    return MaterialApp(debugShowCheckedModeBanner: false, home: Calculator());
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
        if (result == result.toInt()) {
          textToDisplay = result.toInt().toString();
        } else {
          textToDisplay = result.toString();
        }
        shouldResetDisplay = true;
      } else {
        // numbers and dot
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
            shape: CircleBorder(),
            padding: EdgeInsets.all(22),
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
          // Expression
          Container(
            padding: EdgeInsets.all(20),
            alignment: Alignment.centerRight,
            child: Text(
              expression,
              style: TextStyle(fontSize: 30, color: Colors.white70),
            ),
          ),
          // Display
          Container(
            padding: EdgeInsets.all(20),
            alignment: Alignment.centerRight,
            child: Text(
              textToDisplay,
              style: TextStyle(fontSize: 48, color: Colors.white),
            ),
          ),
          Divider(color: Colors.white24),
          // Buttons
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
                flex: 2, // 0 button double width
                child: Padding(
                  padding: const EdgeInsets.all(6.0),
                  child: ElevatedButton(
                    onPressed: () => btnOnClick("0"),
                    style: ElevatedButton.styleFrom(
                      shape: StadiumBorder(),
                      padding: EdgeInsets.all(22),
                      backgroundColor: Colors.black54,
                    ),
                    child: Text(
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
