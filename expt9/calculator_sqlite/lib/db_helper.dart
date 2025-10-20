import 'package:sqflite/sqflite.dart';
import 'package:path/path.dart';

class DBHelper {
  static Database? _db;

  Future<Database> get db async {
    if (_db != null) return _db!;
    _db = await initDB();
    return _db!;
  }

  initDB() async {
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

  Future<int> clearHistory() async {
    var dbClient = await db;
    return await dbClient.delete("history");
  }

  Future<void> updateHistory(item, String newExpression, String newResult) async {}
}
