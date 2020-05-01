// 1. 三元运算符 替换 if else
const big = x > 10 ? " greater 10" : x;
// 2. 短路求值问题 || 返回第一个真值  &&返回第一个假值
// 当给一个变量分配另一个值时，想确定源始值不是null，undefined或空值。
var variable1 = " "
if (variable1 !== null || variable1 !== undefined || variable1 !== "") {
  let variable2 = variable1;
  console.log("inside")
}
// 3. 声明变量简写方式
let x;
let y = 3;
let x,
  y = 3;
// 4. if存在条件简写方法
if (a == true) {
}
if (a) {
}
// 5.循环简写办法 for, for in, for of 和 arr.foreach
// 6.短路评价 给一个变量分配的值是通过判断其值是否为null或undefined，则可以：
const dbHost = process.env.DB_HOST || "localhost";
