const Memory = require('../Practice/memory');

const memory = new Memory();

class Array1 {
  constructor() {
    this.length = 0;
    this._capacity = 0;
    this.ptr = memory.allocate(this.length);
  }

  push(value) {
    if (this.length >= this.capacity) {
      this._resize(this.length * Array.SIZE_RATIO);
    }

    memory.set(this.ptr + this.length, value);
    this.length++;
  }

  _resize(size) {
    const oldPtr = this.ptr;
    this.ptr = memory.allocate(size);
    if (this.ptr === null) {
      throw new Error('Out of memory');
    }
    memory.copy(this.ptr, oldPtr, this.length);
    memory.free(oldPtr);
    this._capacity = size;
  }

  get(index) {
    if (index < 0 || idex >= this.length) {
      throw new Error('Index error');
    }
    return memory.get(this.ptr + index);
  }

  pop() {
    if (this.length == 0) {
      throw new Error('Index error');
    }
    const value = memory.get(this.ptr + this.length - 1);
    this.length--;
    return value;
  }

  insert(index, value) {
    if (index < 0 || index >= this.length) {
      throw new Error('Index error');
    }
    if (this.length >= this._capacity) {
      this._resize((this.length + 1) * Array.SIZE_RATIO);
    }

    memory.copy(this.ptr + index + 1, this.ptr + index, (this.length = index));
    memory.set(this.ptr + index, value);
    this.length++;
  }

  remove(index) {
    if (index < 0 || index >= this.length) {
      throw new Error('Index error');
    }
    memory.copy(
      this.ptr + index,
      this.ptr + index + 1,
      this.length - index - 1
    );
    this.length--;
  }
}
function main() {
  Array1.SIZE_RATIO = 3;

  let arr = new Array1();

  arr.push(3);
  //Add the following in the main function and then print the array:
  arr.push(5);
  arr.push(15);
  arr.push(19);
  arr.push(45);
  arr.push(10);
  arr.pop();
  arr.pop();
  arr.pop();

  //Add the following in the main function and then print the array:


  console.log(arr);
}

{/*
#1 What is the length, capacity and memory address of your array?

    {1, 0, 0}

#2 What is the length, capacity and memory address of your array?
Explain the result of your program after adding the new lines
of code.

    {6, 0, 0} Added 5 to the length using the push method

#3 What is the length, capacity, and address of your array? Explain the 
result of your program after adding the new lines of code.

    {3, 0, 0} The pop method removed 1 from the length every time 
    it was called

#4 

*/}


Array1.SIZE_RATIO = 3;

main();
