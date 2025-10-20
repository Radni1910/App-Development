import React, { useEffect, useState } from "react";
import {
  Button,
  FlatList,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import * as SQLite from "expo-sqlite";

const db = SQLite.openDatabaseSync("todos.db");

export default function TodoList() {
  const [task, setTask] = useState("");
  const [todos, setTodos] = useState<string[]>([]);

  useEffect(() => {
    db.execAsync(`
      CREATE TABLE IF NOT EXISTS todos (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        task TEXT
      );
    `).catch(console.error);

    loadTasks();
  }, []);

  const loadTasks = async () => {
    try {
      const result = await db.getAllAsync<{ id: number; task: string }>(
        "SELECT * FROM todos"
      );
      setTodos(result.map((row) => row.task));
    } catch (error) {
      console.error("Error loading tasks:", error);
    }
  };

  const addTask = async () => {
    if (task.trim().length > 0) {
      try {
        await db.runAsync("INSERT INTO todos (task) VALUES (?);", [task]);
        setTask("");
        loadTasks();
      } catch (error) {
        console.error("Error adding task:", error);
      }
    }
  };

  const deleteTask = async (index: number) => {
    try {
      const taskToDelete = todos[index];
      await db.runAsync("DELETE FROM todos WHERE task = ?;", [taskToDelete]);
      loadTasks();
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Todo List (SQLite)</Text>

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Enter a task"
          value={task}
          onChangeText={setTask}
        />
        <Button title="Add" onPress={addTask} />
      </View>

      <FlatList
        data={todos}
        keyExtractor={(_, index) => index.toString()}
        renderItem={({ item, index }) => (
          <View style={styles.todoItem}>
            <Text style={styles.todoText}>{item}</Text>
            <Button
              title="Delete"
              color="red"
              onPress={() => deleteTask(index)}
            />
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 50,
    paddingHorizontal: 20,
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  inputContainer: {
    flexDirection: "row",
    marginBottom: 20,
    gap: 10,
  },
  input: {
    flex: 1,
    borderBottomWidth: 1,
    borderColor: "#ccc",
    padding: 8,
  },
  todoItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 10,
    marginBottom: 10,
    backgroundColor: "#f1f1f1",
    borderRadius: 5,
  },
  todoText: {
    fontSize: 18,
  },
});
