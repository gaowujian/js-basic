// 有的时候我们需要根据不同的条件执行不同的操作
// 我们可以使用if 或者使用 ？
// if的适用场景： (不需要返回值）执行不同的代码分支
// ？的使用场景： (需要返回值）根据条件返回一个或另一个值
// if + else 等于使用一个？
// if + else if + else 等于使用多个？

// 使用if的场景  不需要返回值
var value = prompt("请输入一个数字");
if (value > 0) {
  alert("输入数字大于0");
} else if (value < 0) {
  alert("输入数字小于0");
} else {
  alert("输入数字等于0");
}
// 使用 ？场景 需要返回值
var value = prompt("请输入一个数字");
var message = value > 0 ? "大于0" : value < 0 ? "小于0" : "等于0";
alert("输入结果：" + message);
