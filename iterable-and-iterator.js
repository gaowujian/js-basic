// ECMAScript 2015中定义了两个协议
// 1. 可迭代协议
// 2. 迭代器协议
// 并不是新的内置实现或语法，而是协议。这些协议可以被任何遵循某些约定的对象来实现。

// iterables（可迭代对象，有一个Symbol.iterator方法，并返回一个迭代器对象）是数组对象的泛化
// iterator （迭代器对象,有一个next方法，返回对象的格式为 {done: Boolean, value: any}）

// 任何对象都是可以迭代的，即在 for of中使用，
// 我们需要为对象添加一个名为 Symbol.iterator 的方法（一个特殊的内置标记）。

// 当 for..of 循环开始，它将会调用这个方法（如果没找到，就会报错）。
// 这个方法必须返回一个迭代器 —— 一个有 next 方法的对象。
// 这个next方法返回的迭代器对象可以返回一个新的对象作为迭代器对象 ，或者是和可迭代对象本身是同一个
// 当 for..of 循环希望取得下一个数值，它就调用这个对象的 next() 方法。
// next() 返回结果的格式必须是 {done: Boolean, value: any}，当 done=true 时，表示迭代结束，否则 value 必须是一个未被迭代的新值。

// 第一种 （返回一个新的对象作为迭代器对象）
var obj = {
  from: 1,
  to: 4,
  [Symbol.iterator]() {
    return {
      current: this.from,
      last: this.to,
      next() {
        if (this.current <= this.last) {
          return { done: false, value: this.current++ };
        } else {
          return { done: true };
        }
      }
    };
  }
};
for (value of obj) {
  console.log(value);
}
console.log(obj);
console.log(Array.from(obj));
console.log("\n");
// 第二种 （迭代器对象可以和可迭代对象本身是同一个）
var obj = {
  from: 1,
  to: 5,

  [Symbol.iterator]() {
    this.current = this.from;
    return this;
  },

  next() {
    if (this.current <= this.to) {
      return { done: false, value: this.current++ };
    } else {
      return { done: true };
    }
  }
};
for (value of obj) {
  console.log(value);
}

// 可迭代的对象 即有 Symbol.iterable函数的对象和 类数组对象，即有length属性的对象 都可以通过Array.from()转化为真正的数组
let arrayLike = {
  0: "Hello",
  1: "World",
  length: 2
};

let arr = Array.from(arrayLike); // (*)
console.log(arr);
console.log(arr.pop()); // World（pop 方法生效）
