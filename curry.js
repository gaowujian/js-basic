// 柯里化  即 curring的音译

// * Currying 为实现多参函数提供了一个递归降解的实现思路----把接受多个参数的函数变换成接受
// * 一个单一参数（最初函数的第一个参数）的函数，并且返回接受余下的参数而且返回结果的新函数

// 柯里化，可以理解为提前接收部分参数，延迟执行，不立即输出结果，而是返回一个接受剩余参数的函数。
// 因为这样的特性，也被称为部分计算函数。柯里化，是一个逐步接收参数的过程。

// 最简单的实例  多参数的时候，把多余的参数交给返回的函数，在返回的函数中去返回结果
// 这个返回的结果既包括 最后的计算结果，或者是继续调用外层的函数 实现连续的curry的调用
function add(a, b) {
  return a + b;
}

function add(a) {
  return function(b) {
    return a + b;
  };
}
// 在这个例子当中 curring的函数 其实是一个接受剩余的参数并且立即返回计算值的函数
// 即它的返回值没有currying化，所以我们通过递归来将currying返回的函数也自动currying化
// 目的实现 add(1)(3,4)(2)() = 10

// 第一步 记忆传入参数 存储在all args
function curryAdd(fn) {
  let allArgs = [];
  return function next() {
    let args = [...arguments];

    // 第二步 判断触发条件
    if (args.length > 0) {
      allArgs.push(...args);
      return next;
    } else {
      // 指定fn 两种方式都可以 但是求和函数的参数会变，接受数组的引用还是多参数
      //   使用apply fn需要用 ...arr来接受多参数， 使用fn() 需要用 arr来接收数组的饮用
      return fn.apply(null, allArgs);
      //   return fn(allArgs);
    }
  };
}
// 第三部 求和
function sum(...arr) {
  let result = 0;
  for (let i = 0; i < arr.length; i++) {
    result += arr[i];
  }
  return result;
}

// 调用
var add = curryAdd(sum);
console.log(add(1)(3, 4)(2)());
