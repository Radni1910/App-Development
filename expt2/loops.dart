// loops.dart
void main() {
  print("For Loop");
  for (int i = 1; i <= 5; i++) {
    print(i);
  }
  print(" ForEach Loop");
  var numbers = [1, 2, 3, 4, 5];
  numbers.forEach((n) => print(n));

  print(" While Loop ");
  int count = 1;
  while (count <= 5) {
    print(count);
    count++;
  }
  print(" Do-While Loop ");
  int num = 1;
  do {
    print(num);
    num++;
  } while (num <= 5);
}
