// 我们有一个构造函数 可以通过这个输出该对象的名字
// var Person = function(name) {
//   this.name = name;
// };
// Person.prototype.showName = function() {
//   console.log(this.name);
// };

// var tony = new Person("tony");
// tony.showName();

// 我们将利用下面的代码实现 以上的功能，把对象和方法拼凑起来（无米之炊），需要call方法

var person = {
  name: "tony",
};

var showName = function () {
  console.log(this.name);
};

showName.call(person);

// call、apply与bind的差别

// call和apply改变了函数的this上下文后便执行该函数,
// 而bind则是返回改变了上下文后的一个函数。

// call、apply的区别
// call和apply的第一个参数都是要改变上下文的对象，
// 而call从第二个参数开始以参数列表的形式展现，
// apply则是把除了改变上下文对象的参数放在一个数组里面作为它的第二个参数。

// fn.call(obj, arg1, arg2, arg3...);
// fn.apply(obj, [arg1, arg2, arg3...]);

// 使用call 和apply的几种使用场景

// 1. 使用call 和 apply求数组的最大值
var arr = [34, 5, 3, 6, 54, 6, -67, 5, 7, 6, -8, 687];

console.log(Math.max.call(Math, 34, 5, 3, 6, 54, 6, -67, 5, 7, 6, -8, 687));
console.log(Math.max.apply(Math, arr));
// es6
console.log(Math.max(...arr));

// 2. 使用call 和apply 合并数组
var arr1 = [1, 2, 3];
var arr2 = [4, 5, 6];
Array.prototype.push.apply(arr1, arr2);
console.log(arr1);

// 3. 使用call 和 apply把类数组对象转为数组
// arguments就是典型的类对象数组
var arrayLike = {
  0: "tony",
  1: 18,
  length: 2,
};
console.log(arrayLike);
console.log(Array.prototype.slice.call(arrayLike));
// es6
console.log(Array.from(arrayLike));

function add(a, b) {
  console.log(arguments);
  console.log(Array.prototype.slice.call(arguments));
  return a + b;
}
add(1, 2);

// 4. 使用call和apply 判断变量类型

function isArray(obj) {
  return Object.prototype.toString.call(obj) == "[object Array]";
}
console.log(isArray([])); // true
console.log(isArray("apple")); // false

// 模拟call的实现

// call 有两个特点：
// 1. 改变了了this的指向
// 2. 执行该函数

var obj = {
  value: "tony",
};

var showName = function (name, age) {
  console.log(this.value);
  console.log(name);
  console.log(age);
};

Function.prototype.myCall = function (context) {
  var context = Object(context) || global; // context为null的话 this指向window
  context.fn = this; // 给对象添加一个函数作为属性
  var args = [];
  for (var i = 1, len = arguments.length; i < len; i++) {
    args.push("arguments[" + i + "]");
  }
  // args 数组[arguments[1],arguments[2]] 转为 string类型 "arguments[1],[arguments[2]"
  var result = eval("context.fn(" + args + ")");
  delete context.fn; //删除属性 清楚痕迹
  return result;
};

// es6
Function.prototype.call2 = function (content = window) {
  content.fn = this;
  let args = [...arguments].slice(1);
  let result = content.fn(...args);
  delete content.fn;
  return result;
};

showName.myCall(obj, "tony", 18);

//  模拟apply
// es3
Function.prototype.myApply = function (context, arr) {
  context = context ? Object(context) : window;
  context.fn = this;

  var result;
  // 判断是否存在第二个参数
  if (!arr) {
    result = context.fn();
  } else {
    var args = [];
    for (var i = 0, len = arr.length; i < len; i++) {
      args.push("arr[" + i + "]");
    }
    result = eval("context.fn(" + args + ")");
  }

  delete context.fn;
  return result;
};
// es6
Function.prototype.apply2 = function (context = window) {
  context.fn = this;
  let result;
  // 判断是否有第二个参数
  if (arguments[1]) {
    result = context.fn(...arguments[1]);
  } else {
    result = context.fn();
  }
  delete context.fn;
  return result;
};

// bind的业务场景
// 1. setTimeout 和 setInterval 中的 this指针丢失
function Person(name) {
  this.name = name;
  this.repeatMyName = function () {
    setTimeout(
      function () {
        console.log(this.name); //
      }.bind(this),
      2000
    );
  };
}

Function.prototype.myBind = function myBind(params) {
  console.log("bind");
};

var tony = new Person("tony");
tony.repeatMyName();

// 模拟bind
// bind的特点
// 1. 可以变更this指向
// 2. 可以返回函数的引用
// 3. 可以传入参数
// 4. 柯里化
