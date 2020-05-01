// 组合

// compose(f,g)(x) === f(g(x))
// compose(f,g,m)(x) === f(g(m(x)))
// compose(f,g,m)(x) === f(g(m(x)))
// compose(f,g,m,n)(x) === f(g(m(n(x))))

// 我们需要借助reduce

// compose的调用顺序是从右到左依次调用函数
// pipeline的的调用顺序是从做到右依次调用函数

function compose(...fns) {
  return function(x) {
    return fns.reduceRight(function(arg, fn) {
      return fn(arg);
    }, x);
  };
}
function pipe(...fns) {
  return function(x) {
    return fns.reduce(function(arg, fn) {
      return fn(arg);
    }, x);
  };
}

function toUpperCase(str) {
  return str.toUpperCase();
}

function toReverse(str) {
  return str
    .split("")
    .reverse()
    .join("");
}

const composedFun = pipe(toUpperCase, toReverse);
console.log(composedFun("abc"));

// 使用递归完成组合的功能
function recursionCompose(...args) {
  //参数1
  let count = args.length - 1;
  let result;
  return function fn(...arg1) {
    //参数2
    result = args[count].apply(null, arg1);
    if (count <= 0) {
      return result;
    }
    count--;
    return fn.call(null, result);
  };
}
const a = recursionCompose(toUpperCase, toReverse); //参数1

console.log(a("jkl")); //参数2
