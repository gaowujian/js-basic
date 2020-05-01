// 第一阶段 无中生有
console.log(Object.prototype.__proto__ === null);
// 第二阶段 制造对象的机器
var obj = new Object();
console.log(obj);
var obj = new Object({ flag: 10 });
console.log(obj);
// 第三阶段 更多制造对象的机器
var num = new Number(1.5);
var str = new String("string");
var date = new Date();
var arr = new Array(1, 2, 3);
console.log(num);
console.log(str);
console.log(date);
console.log(arr);
// 第四阶段 制造机器的机器
console.log(Function.__proto__ === Function.prototype);
// 第五阶段
// 第六阶段
