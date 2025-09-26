import 'dart:io';

void main() {
  print("Enter your name:");
  String? name = stdin.readLineSync();

  print("Enter your age:");
  String? ageInput = stdin.readLineSync();
  int age = int.parse(ageInput ?? "0");

  print("\nHello, $name!");
  print("You are $age years old.");
}

