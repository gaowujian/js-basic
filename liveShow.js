function say() {
  console.log("content");
}

Function.prototype.before = function() {};

const newSay = say.before(function() {
  console.log("before");
});

newSay();

// 实现柯里化和反柯里化 （柯里化，使函数的范围更确定，学会包装通用的柯里化）

// 实现一个after方法，让异步变同步，类似promise.all(), 有一个异步并发的问题

const fs = require("fs");

// 并发的核心靠定时来维护
let out = after(2, () => {
  console.log(obj);
});

let obj = {};
fs.readFile("./name.txt", "utf-8", function(err, data) {
  out();
  obj.name = data;
});
fs.readFile("./age.txt", "utf-8", function(err, data) {
  out();
  obj.age = data;
});

const after = (time, fn) => () => --times == 0 && fn();
