//偏函数： 返回了一个包含预处理参数的新函数，以便之后可以调用
function isType(type) {
  return function (obj) {
    return Object.prototype.toString.call(obj) === `[object ${type}]`;
  };
}

const isArray = isType("Array");
const isString = isType("String");
console.log(isArray([1, 2, [3, 4]]));
console.log(isString({}));

// 预置函数，当达到条件时再执行回调函数

function after(cb) {
  let time = 3;
  return function () {
    if (--time === 0) {
      cb();
    }
  };
}
// 举个栗子吧，吃饭的时候，我很能吃，吃了三碗才能吃饱
let eat = after(function () {
  console.log("吃饱了");
});
eat();
eat();
eat();
