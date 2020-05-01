// 需要对象进行转化的时候 为了进行转换，JavaScript 尝试查找并调用三个对象方法：

// 调用 obj[Symbol.toPrimitive](hint) 如果这个方法存在的话，
// 否则如果暗示是 "string"
// 尝试 obj.toString() 和 obj.valueOf()，无论哪个存在。
// 否则，如果暗示 "number" 或者 "default"
// 尝试 obj.valueOf() 和 obj.toString()，无论哪个存在。

let user = {
  name: "John",
  money: 1000,

  [Symbol.toPrimitive](hint) {
    console.log(`hint: ${hint}`);
    return hint == "string" ? `{name: "${this.name}"}` : this.money;
  }
};

// 转换演示：
console.log(user); // hint: string -> {name: "John"}
console.log(+user); // hint: number -> 1000
console.log(user + 500); // hint: default -> 1500

// 根据上下文我们会有一个hint 所以会返回不同的值


// 相等和不相等
// 这组操作符是先转换再比较，即操作符会改变操作数的数值类型。
// 1.如果有一个操作数是布尔值，则在比较之前会转换为数值；
// 2.一个操作数是字符，另一个是数值，那么在比较相等性之前会将字符串转换为数值再进行比较；
// 3.如果一个操作符是对象，另一个不是，则调用valueOf()方法，将得到的结果进行比较。
// 4.如果两个都是对象，则比较是否是同一个对象，如果两个操作数都指向同一个对象，那么认为它们相等。

