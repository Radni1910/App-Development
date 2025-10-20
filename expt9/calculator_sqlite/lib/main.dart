import 'package:flutter/material.dart';
import 'package:sqflite/sqflite.dart';
import 'package:path/path.dart';

void main() async {
  WidgetsFlutterBinding.ensureInitialized(); // must be first
  runApp(const CalculatorApp());
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

class DBHelper {
  static Database? _db;

  Future<Database> get db async {
    if (_db != null) return _db!;
    _db = await initDB();
    return _db!;
  }

  Future<Database> initDB() async {
    String path = join(await getDatabasesPath(), "calc_history.db");
    return await openDatabase(
      path,
      version: 1,
      onCreate: (db, version) async {
        await db.execute('''
          CREATE TABLE history (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            expression TEXT,
            result TEXT,
            timestamp DATETIME DEFAULT CURRENT_TIMESTAMP
          )
        ''');
      },
    );
  }

  Future<int> insertHistory(String expression, String result) async {
    var dbClient = await db;
    return await dbClient.insert("history", {
      "expression": expression,
      "result": result,
    });
  }

  Future<List<Map<String, dynamic>>> getHistory() async {
    var dbClient = await db;
    return await dbClient.query("history", orderBy: "id DESC");
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

  DBHelper dbHelper = DBHelper();

  void btnOnClick(String btnText) async {
    if (btnText == "=") {
      double secondNum = double.tryParse(textToDisplay) ?? 0;
      double result = 0;

      if (operation == "+")
        result = firstNum + secondNum;
      else if (operation == "-")
        result = firstNum - secondNum;
      else if (operation == "×")
        result = firstNum * secondNum;
      else if (operation == "÷" && secondNum != 0)
        result = firstNum / secondNum;

      String finalExpression = "$expression$textToDisplay";
      String finalResult = (result == result.toInt())
          ? result.toInt().toString()
          : result.toString();

      // Update UI
      setState(() {
        textToDisplay = finalResult;
        expression = finalExpression;
        shouldResetDisplay = true;
      });

      // Save to SQLite
      await dbHelper.insertHistory(finalExpression, finalResult);
    } else if (btnText == "C") {
      setState(() {
        textToDisplay = "0";
        expression = "";
        firstNum = 0;
        operation = "";
        shouldResetDisplay = false;
      });
    } else if (btnText == "+/-") {
      setState(() {
        if (textToDisplay.startsWith("-")) {
          textToDisplay = textToDisplay.substring(1);
        } else if (textToDisplay != "0") {
          textToDisplay = "-$textToDisplay";
        }
      });
    } else if (btnText == "%") {
      setState(() {
        double num = double.tryParse(textToDisplay) ?? 0;
        if (firstNum != 0 && operation.isNotEmpty) {
          num = (firstNum * num) / 100;
        } else {
          num = num / 100;
        }
        textToDisplay = num.toString();
      });
    } else if (btnText == "+" ||
        btnText == "-" ||
        btnText == "×" ||
        btnText == "÷") {
      firstNum = double.tryParse(textToDisplay) ?? 0;
      operation = btnText;
      expression = "$textToDisplay $btnText ";
      shouldResetDisplay = true;
    } else {
      setState(() {
        if (textToDisplay == "0" || shouldResetDisplay) {
          textToDisplay = btnText;
          shouldResetDisplay = false;
        } else {
          textToDisplay += btnText;
        }
      });
    }
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

      body: Padding(
        padding: const EdgeInsets.all(70.0),
        child: Column(
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
      ),
      floatingActionButton: FloatingActionButton(
        backgroundColor: Colors.teal,
        child: const Icon(Icons.history),
        onPressed: () {
          Navigator.push(
            context,
            MaterialPageRoute(builder: (context) => const HistoryScreen()),
          );
        },
      ),
    );
  }
}


class HistoryScreen extends StatefulWidget {
  const HistoryScreen({super.key});

  @override
  _HistoryScreenState createState() => _HistoryScreenState();
}

class _HistoryScreenState extends State<HistoryScreen> {
  DBHelper dbHelper = DBHelper();
  List<Map<String, dynamic>> history = [];

  @override
  void initState() {
    super.initState();
    loadHistory();
  }

  void loadHistory() async {
    var data = await dbHelper.getHistory();
    setState(() {
      history = data;
    });
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text("Calculation History"),
        actions: [
          IconButton(icon: const Icon(Icons.refresh), onPressed: loadHistory),
        ],
      ),
      body: history.isEmpty
          ? const Center(child: Text("No history yet"))
          : ListView.builder(
              itemCount: history.length,
              itemBuilder: (context, index) {
                var item = history[index];
                return ListTile(
                  title: Text(item["expression"] ?? ""),
                  subtitle: Text("= ${item["result"]}"),
                  trailing: Text(
                    item["timestamp"]?.toString().substring(0, 19) ?? "",
                  ),
                );
              },
            ),
    );
  }
}
