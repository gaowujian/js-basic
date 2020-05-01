// 关于函数我们有两种写法
// 在大多数情况下，我们优先选择优先声明，因为函数表达式只有运行到那一行才会创建和执行，在之前调用会找不到
// 第一种 函数声明
function add(a, b) {
  return a + b;
}
// 第二种 函数表达式
var add = function() {
  return a + b;
};
// 函数可以使用默认参数
function add(a, b = 10) {
  return a + b;
}
// 旧式的默认参数实现方法 有两种
function add(a, b) {
  if (b === undefined) {
    b = 10;
  }
  return a + b;
}
function add(a, b) {
  b = b || 10;
  return a + b;
}

// 在es6 中我们引入了箭头函数， 它是函数表达式的简写形式, 需要匿名函数的时候，函数声明也可以由箭头函数替代
var sayHi = function() {
  console.log("hi");
};
var sayHi = () => {
  console.log("hi");
};

// function的重要参数  length和 arguments
function fun(a, b) {
  return arguments.length;
}

console.log(fn.length); //返回形式参数的个数
console.log(fun()); //返回实际参数的
