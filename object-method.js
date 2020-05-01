// 给一个object添加方法一共有三种方式

var obj = {};
// 第一种 函数声明式
function func1() {}
obj.func1 = func1;
// 第二种 函数表达式
obj.func2 = function() {};
// 第三种 简写方式
var obj2 = {
  func3() {}
};
console.log(obj);

// 对象中存储信息，对象中的方法往往需要用到这些信息，为了访问该对象，需要用this
// this 的值就是在点之前的这个对象，即调用该方法的对象。

// obj.method()的调用远离
// 首先 .符号取得这个obj.method属性， 后面的（）调用它

let user = {
  name: "John",
  hi() {
    console.log(this.name);
  }
};

user.hi();

// 将赋值与方法调用拆分为两行
let hi = user.hi;
hi(); // 错误，因为 this 未定义

var obj, method;

obj = {
  go: function() {
    console.log(this);
  }
};

obj.go(); // (1) [object Object]

obj.go(); // (2) [object Object]

(method = obj.go)(); // (3) undefined

(obj.go || obj.stop)(); // (4) undefined

// obj.method返回的不是函数  而是一个引用类型的值
// 括号在调用这个引用类型的值的时候 会去接收该对象及其方法的所有信息 并且可以设定正确的this值
// 可以将这个引用类型当作一种特殊的”中间“内部类型，用于将信息从点符号传递到调用括号（）
// 像赋值操作 method = obj.go 等其他操作，将引用类型作为一个整体丢弃，只是获取了

// this有四种绑定形式
// 1. new 操作符
// 2. 显式绑定 通过call 和 apply
// 3. 隐式绑定 通过给对象添加属性 这个属性即为函数
// 4. 默认绑定 如果上述三种方式不满足 默认绑定到window对象

// this的指针有两种丢失情况： 引用赋值丢失， 传参操作丢失
// 第一种 引用赋值丢失
var person = {
  name: "tony",
  print() {
    console.log(this.name);
  }
};
person.print();
let print = person.print;
// 因为这一行其实就是相当于创建了一个函数 并且命名为print，并没有存储信息，自然找this是找不到的
print();
// 第二种 传参丢失
// 这也是为什么没有打印出 data内的2  默认打印出了全局的3 因为该函数执行的时候
// 前三条规则都不满足 默认绑定到了window对象
function thisTo() {
  console.log(this.a);
}
var data = {
  a: 2,
  foo: thisTo //通过属性引用this所在函数
};
var a = 3; //全局属性

setTimeout(data.foo, 100); // 3
