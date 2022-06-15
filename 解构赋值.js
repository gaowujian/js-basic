// 数组的结构赋值
// 如果一个对象继承了iterator接口，可以用解构赋值来取值
// 6个类型 包括 number null undefined boolean, symbol 及 原生object是没有默认接口的
// 基础类型解构的时候需要先转化给对象，number和不二值都会转化为对象先
// array和string是有实现默认的接口
var [arg1, arg2] = ["java", "script"];
console.log(arg1, arg2);
var [a, b, c] = "string";
console.log(a, b, c);
// 实现接口
var obj = {};
obj[Symbol.iterator] = function*() {
  yield 1;
  yield 2;
  yield 3;
  return 4;
};
var [one, two, three, four, five] = obj;
console.log(one);
console.log(two);
console.log(three);
console.log(four);

//对象的解构赋值 与数组的结构赋值不同的是 没有顺序，必须属性名匹配才可以
//还可以在:后重新命名变量

let { foo: baz } = { foo: "aaa", bar: "bbb" };
console.log(baz);

// 所以针对于一个可迭代对象，我们可以分别用两种解构赋值方式去对待
// 数组解构，按迭代器规则，对象解构，用对应属性取值
var [one, two, three] = "hello";
console.log(one, two, three);
var { length } = "hello";
console.log(Object.getOwnPropertyNames("hello"));
console.log(length);

// 实际应用场景
// 1. 交换变量值
let x = 1;
let y = 2;

[x, y] = [y, x];

// 2. 从函数返回多个值
var [a, b, c] = (function() {
  return [2, 3, 4];
})();
console.log(a, b, c);
var { name, age } = (() => ({ name: "tony", age: 28 }))();
console.log(name, age);

// 3. 提取JSON数据
let jsonData = {
  id: 42,
  status: "OK",
  data: [867, 5309]
};

let { id, status, data: number } = jsonData;

console.log(id, status, number);

// 4. 遍历map解构
const map = new Map();
map.set("first", "hello");
map.set("second", "world");

for (let [key, value] of map) {
  console.log(key + " is " + value);
}

// 5. 获取模块的指定方法
// const { SourceMapConsumer, SourceNode } = require("source-map");
