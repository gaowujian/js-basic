// generator是一个状态机，封装了内部多个状态，执行generator函数会返回一个迭代器对象

// 形式上generator是一个普通函数 不过在function关键字和函数名间有一个星号*  二是，函数体内
// 使用yield表达式，定义不同的内部状态

// function* name{}

function* helloWorldGenerator() {
  yield "hello";
  yield "world";
  return "ending";
}

// ! 调用 Generator 函数后，该函数并不执行，返回的也不是函数运行结果，而是一个指向内部状态的指针对象
// hw就是这个指向内部状态的指针对象
var hw = helloWorldGenerator();

console.log(hw.next());
console.log(hw.next());
console.log(hw.next());
console.log(hw.next());

// 调用next方法的逻辑

// 1）遇到yield表达式，就暂停执行后面的操作，并将紧跟在yield后面的那个表达式的值，作为返回的对象的value属性值。

// （2）下一次调用next方法时，再继续往下执行，直到遇到下一个yield表达式。

// （3）如果没有再遇到新的yield表达式，就一直运行到函数结束，直到return语句为止，并将return语句后面的表达式的值，作为返回的对象的value属性值。

// （4）如果该函数没有return语句，则返回的对象的value属性值为undefined。

//generator 也可以不使用yield 这样就变成了一个单纯的暂缓执行函数

function* hello() {
  console.log("hello world");
}

const generator = hello();

generator.next();

// yield只能用在generator 函数中 ，在普通函数中使用会报错

// generator函数就是一个iterator的生成器，所以对于普通的对象，因为不能迭代，我们可以帮他们
// 实现 [Symbol.iterator]

const obj = {};
obj[Symbol.iterator] = function* () {
  yield 1;
  yield 2;
  yield 3;
};

// obj[Symbol.iterator] = function() {
//   let i = 0;
//   return {
//     next() {
//       return i < 5 ? { done: false, value: i++ } : { done: true, value: i };
//     }
//   };
// };
// for (const item of obj) {
//   console.log(item);
// }

// yield表达式本身没有返回值，或者说总是返回undefined。
// next方法可以带一个参数，该参数就会被当作上一个yield表达式的返回值
// 第一次next中的的参数 会被忽略掉 从第二次开始

function* f() {
  for (var i = 0; true; i++) {
    var reset = yield i;
    if (reset) {
      i = -1;
    }
  }
}

// 先定义了一个可以无限运行的 Generator 函数f，如果next方法没有参数，每次运行到yield表达式，
// 变量reset的值总是undefined。当next方法带一个参数true时，变量reset就被重置为这个参数（即true），
// 因此i会等于-1，下一轮循环就会从-1开始递增。
var g = f();

console.log(g.next()); // { value: 0, done: false }
console.log(g.next()); // { value: 1, done: false }
console.log(g.next(true)); // { value: 0, done: false }

// 除了for...of循环以外，扩展运算符（...）、解构赋值和Array.from方法内部调用的，都是遍历器接口。
// 这意味着，它们都可以将 Generator 函数返回的 Iterator 对象，作为参数

function* numbers() {
  yield 1;
  yield 2;
  yield 3;
  return 4;
  yield 5;
}

// 扩展运算符
console.log([...numbers()]); // [1, 2]

// Array.from 方法
console.log(Array.from(numbers())); // [1, 2]

// 解构赋值
let [x, y, z] = numbers();
x; // 1
y; // 2
console.log(x, y, z);

// for...of 循环
for (let n of numbers()) {
  console.log(n);
}
// 1
// 2

function* gen() {
  yield 1;
  yield 2;
  yield 3;
}

var g = gen();

// 解析
("use strict");

// var _marked =
//   /*#__PURE__*/
//   regeneratorRuntime.mark(gen);

// function gen() {
//   return regeneratorRuntime.wrap(function gen$(_context) {
//     while (1) {
//       switch ((_context.prev = _context.next)) {
//         case 0:
//           _context.next = 2;
//           return 3;

//         case 2:
//           _context.next = 4;
//           return 55;

//         case 4:
//           _context.next = 6;
//           return 34;

//         case 6:
//         case "end":
//           return _context.stop();
//       }
//     }
//   }, _marked);
// }

var g = gen();
g.next();

// generator的实现是由facebook开发的regeneratorRuntime，来进行实现

// Generator的原型链上还有throw和return方法
// 三个方法的本质是一件事情，替换yield表达式

// next()是将yield表达式替换成一个值。
// gen.next(1); // Object {value: 1, done: true}
// // 相当于将 let result = yield x + y
// // 替换成 let result = 1;

// throw()是将yield表达式替换成一个throw语句。
// gen.throw(new Error('出错了')); // Uncaught Error: 出错了
// // 相当于将 let result = yield x + y
// // 替换成 let result = throw(new Error('出错了'));

// return()是将yield表达式替换成一个return语句。
// gen.return(2); // Object {value: 2, done: true}
// // 相当于将 let result = yield x + y
// // 替换成 let result = return 2;

// es6之前，异步主要有四种方式
// 1. 回调函数
// 2. 事件监听
// 3. 发布/订阅
// 4. Promise 对象

// 异步操作：一个任务不是可以连续完成，把任务分成两段执行，先去执行一段，转而去执行其他任务，
// 做好了准备，再执行第二段

// 1. 回调函数

readFile("/etc/text", function (err, data) {});
// 第一段是读取文件，第二段是回调函数，嵌套的话会纵向增长，会有回调地狱的现象

// 2. promise

var readFile = require("fs-readfile-promise");
readFile("/etc/text").then((data) => {});

// 第一段是读取文件，第二段是then里的回调函数，promise把两段式分的更加清晰，链式增长而不是纵向

// es6中引入了协程，可以看作是线程，指的是多个线程之间相互协作，完成异步任务
// 第一步，协程A开始执行。
// 第二步，协程A执行到一半，进入暂停，执行权转移到协程B。
// 第三步，（一段时间后）协程B交还执行权。
// 第四步，协程A恢复执行。

// A 就可以看成是一个异步任务，因为他是分段执行的
function* asyncJob() {
  // ...其他代码
  var f = yield readFile(fileA);
  // ...其他代码
}

// next返回值的 value 属性，是 Generator 函数向外输出数据；
// next方法还可以接受参数，向 Generator 函数体内输入数据。

var gen = asyncJob();
// 第一段 （.next可以把第一段的值传出来）
var a = gen.next();
// 第二段 (next的参数可以传值进去，开始第二段)
var b = gen.next();

//* 一个使用generator执行异步任务的实际场景
var fetch = require("node-fetch");

function* gen() {
  var url = "https://api.github.com/users/github";
  var result = yield fetch(url);
  console.log(result.bio);
}

var g = gen();
var result = g.next();
// result是一个迭代器对象，value是一个fetchapi返回的promise对象，所以用value.then

result.value
  .then(function (data) {
    return data.json();
  })
  .then(function (data) {
    g.next(data);
  });

// !generator 使得异步任务可中断，表达的更简洁，但是流程管理不变，

// * thunk函数使得generator可以自动执行

// 传值调用(c语言)和传名调用(haskell)： thunk是一个传名调用策略的实现，js是一个传值调用的语言
// 通过thunk函数，我们把一个接受多参数 和 回调的函数替换成一个只接受回调作为单个参数的单参数函数

fs.readFile(fileName, callback) = Thunk(fileName)(callback);

// Thunk版本的readFile（单参数版本）
var Thunk = function (fileName) {
  return function (callback) {
    return fs.readFile(fileName, callback);
  };
};

var readFileThunk = Thunk(fileName); //经过Thunk函数处理，但是他不是所谓的thunk函数
readFileThunk(callback); //thunk 函数

// 经过转换器处理，它变成了一个单参数函数，只接受回调函数作为参数。这个单参数版本，就叫做 Thunk 函数。

// yield命令用于将程序的执行权移出 Generator 函数，那么就需要一种方法，将执行权再交还给 Generator 函数。

// 这种方法就是 Thunk 函数，因为它可以在回调函数里，将执行权交还给 Generator 函数

// Thunk 函数并不是 Generator 函数自动执行的唯一方案。因为自动执行的关键是，必须有一种机制，
// 自动控制 Generator 函数的流程，接收和交还程序的执行权。回调函数可以做到这一点，Promise 对象也可以做到这一点

// （1）回调函数。将异步操作包装成 Thunk 函数，在回调函数里面交回执行权。

function run(fn) {
  var gen = fn();

  function next(err, data) {
    var result = gen.next(data);
    if (result.done) return;
    result.value(next);
  }

  next();
}

run(g);

// （2）Promise 对象。将异步操作包装成 Promise 对象，用then方法交回执行权。

// function run(gen){
//   var g = gen();

//   function next(data){
//     var result = g.next(data);
//     if (result.done) return result.value;
//     result.value.then(function(data){
//       next(data);
//     });
//   }

//   next();
// }

// run(gen);
