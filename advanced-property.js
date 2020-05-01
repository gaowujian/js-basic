// 我们都知道属性可以存储信息
// 属性一种有两种：
// data property 数据属性（一般接触的都是）
// accessor property 访问器属性，例如 length和size，本质上是获取和设置值的函数，外部代码看起来是常规属性

// 关于属性 其实本身也是可以配置的
var obj = {
  name: "tony"
};

console.log(Object.keys(obj));

// 查询
console.log(Object.getOwnPropertyDescriptor(obj, "name"));
// 有四个标志
// 对象属性除 value 外还有三个特殊属性（所谓的“标志”）：
// writable — 如果为 true，则可以修改，否则它是只读的。
// enumerable — 如果是 true，则可在循环中列出，否则不列出。
// configurable — 如果是 true，则此属性可以被删除，相应的特性也可以被修改，否则不可以

// 定义和修改属性操作
// By default, values added using Object.defineProperty() are immutable
// 默认情况下，通过defineProperty添加的属性，是不可以修改的，即默认值都是false
Object.defineProperty(obj, "age", {
  value: 18,
  writable: false, //是否可以修改属性值，是否只读
  enumerable: false, //是否可以在for in中列出
  configurable: false //是否可以删除
});
console.log(Object.getOwnPropertyDescriptor(obj, "age"));

// 定义多个属性操作
Object.defineProperties(obj, {
  lastName: { value: "John" },
  firstName: { value: "Smith", writable: false }
  // ...
});
console.log(Object.getOwnPropertyDescriptor(obj, "lastName"));

//属性的setter 和getter

let user = {
  name: "John",
  surname: "Smith",

  get fullName() {
    return `${this.name} ${this.surname}`;
  },

  set fullName(value) {
    [this.name, this.surname] = value.split(" ");
  }
};

// set fullName is executed with the given value.
user.fullName = "Alice Cooper";

console.log(user.name); // Alice
console.log(user.surname); // Cooper
console.log(Object.getOwnPropertyDescriptor(user, "fullName"));
// 访问器 属性 没有 value 和 writable，但是有 get 和 set 函数。
// get —— 一个没有参数的函数，在读取属性时工作，
// set —— 带有一个参数的函数，当属性被设置时调用，
// enumerable —— 与数据属性相同，
// configurable —— 与数据属性相同。

// 访问器最大的好处就是可以在 获取和设置真实属性的过程中做一些操作
//  如果想要包装内部的属性值，可以使用setter 和 getter

class Student {
  constructor(name, age) {
    this._name = name;
    this._age = age;
  }
  set age(age) {
    if (age < 18) {
      console.log(`you are too young, cannot set you age as ${age}`);
      return;
    }
    this._age = age;
  }
  get age() {
    return this._age;
  }
}

var stu = new Student("tony", 18);
// _开头的属性是内部属性，student上没有name 属性，只有_name
console.log(stu.name);
// 通过age访问器属性，可以获取和修改真实的_name属性
stu.age = 22;
console.log(stu.age);
stu.age = 15;
// 可以直接通过 _prop 修改属性值，但是不建议这样直接修改内部属性
stu._age = 25;
console.log(stu._age);
