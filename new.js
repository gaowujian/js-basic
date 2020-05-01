function Person(name) {
  this.name = name;
}
Person.prototype.print = function() {
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

function myNew(fn, ...args) {
  const obj = {};
  fn.call(obj, ...args);
  obj.__proto__ = fn.prototype;
  return obj;
}

const girl = myNew(Person, "ally");
console.log(girl);
girl.print();

function _new(fn, ...args) {
  if (typeof fn !== "function") {
    return new Error("必须是一个函数");
  }

  let obj = Object.create(fn.prototype); //（1）

  let res = fn.call(obj, ...args); //（2）（3）

  //构造函数有对象和函数作为返回值的时候就返回构造函数时内的返回值
  if (res !== null && (typeof res === "object" || typeof res === "function")) {
    return res;
  }
  return obj;
}
