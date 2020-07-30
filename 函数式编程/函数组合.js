// 利用了柯里化函数和组合函数
// 柯里化函数就是有预组置参数的函数
function plus(x) {
  return function name(y) {
    return x + y;
  };
}
function multi(x) {
  return function name(y) {
    return x * y;
  };
}

const tap = (fn) => (x) => {
  fn(x);
  return x;
};

// 使用trace函数可以跟踪每次纯函数返回的最新数据值
const trace = (label) => tap(console.log.bind(console, label + ":"));

const multi10AfterPlus5 = compose(
  trace("multi2"),
  multi(2),
  trace("plus2"),
  plus(10),
  trace("plus1"),
  plus(10)
);
const result = multi10AfterPlus5(3);

function compose(...args) {
  return function (value) {
    return args.reduceRight((prev, cur) => {
      return cur(prev);
    }, value);
  };
}
// console.log(result);
