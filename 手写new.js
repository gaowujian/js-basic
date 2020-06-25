// 一个普通函数的创建
// 给函数创建一个堆，确定函数的scope，即当前的上下文

// 一个普通函数的执行
// 创建EC(FN) 确定自己的this指向， 创建 AO对象（包含arguments和形参赋值）

// 一个构造函数的执行
// 除了普通函数的执行过程，默认会创建一个对象，this会指向这个新建的对象
// 如果return值是引用类型，则返回这个引用类型值，否则默认返回新建的默认对象

function Person(name) {
  this.name = name;
}
Person.prototype.print = function () {
  console.log(this.name);
};
let person = new Person("tony");
person.print();
console.log(person);

// 手写new
// (1) 创建一个新对象；
// (2) 将构造函数的作用域赋给新对象（因此 this 就指向了这个新对象） ；
// (3) 执行构造函数中的代码（为这个新对象添加属性） ；
// (4) 返回新对象。

function _new(fn, ...args) {
  if (typeof fn !== "function") {
    return new Error("必须是一个函数");
  }

  let obj = Object.create(fn.prototype); //（1）
  // 实际效果就是 obj.__proto__ = fn.prototype

  let res = fn.call(obj, ...args); //（2）（3）

  //构造函数有对象和函数作为返回值的时候就返回构造函数时内的返回值
  if (res !== null && (typeof res === "object" || typeof res === "function")) {
    return res;
  }
  return obj;
}
