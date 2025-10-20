import 'package:flutter/material.dart';
import 'db_helper.dart'; // Import your DBHelper

class HistoryScreen extends StatefulWidget {
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
    print("Loaded history: $data"); // Debugging
    setState(() {
      history = data;
    });
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text("Calculation History"),
        actions: [
          IconButton(
            icon: Icon(Icons.delete_forever),
            onPressed: () async {
              await dbHelper.clearHistory();
              loadHistory();
            },
          ),
        ],
      ),
      body: history.isEmpty
          ? Center(child: Text("No history yet"))
          : ListView.builder(
              itemCount: history.length,
              itemBuilder: (context, index) {
                var item = history[index];
                return ListTile(
                  title: Text(item["expression"] ?? ""),
                  subtitle: Text("= ${item["result"]}"),
                  trailing: Text(item["timestamp"] ?? ""),
                  onTap: () {
                    _showEditDialog(item);
                  },
                );
              },
            ),
    );
  }

  void _showEditDialog(Map<String, dynamic> item) async {
    String newExpression = item["expression"];
    String newResult = item["result"];

    await showDialog(
      context: context,
      builder: (context) {
        return AlertDialog(
          title: Text("Edit History"),
          content: Column(
            mainAxisSize: MainAxisSize.min,
            children: [
              TextField(
                controller: TextEditingController(text: newExpression),
                decoration: InputDecoration(labelText: "Expression"),
                onChanged: (val) => newExpression = val,
              ),
              TextField(
                controller: TextEditingController(text: newResult),
                decoration: InputDecoration(labelText: "Result"),
                onChanged: (val) => newResult = val,
              ),
            ],
          ),
          actions: [
            TextButton(
              onPressed: () => Navigator.pop(context),
              child: Text("Cancel"),
            ),
            TextButton(
              onPressed: () async {
                await dbHelper.updateHistory(item["id"], newExpression, newResult);
                loadHistory();
                Navigator.pop(context);
              },
              child: Text("Save"),
            ),
          ],
        );
      },
    );
  }
}
