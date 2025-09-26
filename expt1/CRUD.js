// Initial array
let numbers = [10, 20, 30, 40];

// Read (display array)
function read() {
  console.log("Current Array:", numbers);
}

// Create (add new element)
function create(item) {
  numbers.push(item);
  console.log(`${item} added.`);
}

// Update (change value at given index)
function update(index, newValue) {
  if (index >= 0 && index < numbers.length) {
    console.log(`${numbers[index]} updated to ${newValue}`);
    numbers[index] = newValue;
  } else {
    console.log("Invalid index.");
  }
}

// Delete (remove element at given index)
function remove(index) {
  if (index >= 0 && index < numbers.length) {
    console.log(`${numbers[index]} removed.`);
    numbers.splice(index, 1);
  } else {
    console.log("Invalid index.");
  }
}

// Example usage
read();             // [10, 20, 30, 40]
create(50);         // Add new item
read();             // [10, 20, 30, 40, 50]
update(1, 25);      // Update index 1 (20 → 25)
read();             // [10, 25, 30, 40, 50]
remove(2);          // Delete index 2 (30 removed)
read();             // [10, 25, 40, 50]

