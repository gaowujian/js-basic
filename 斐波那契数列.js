// 递归写法
function fib(n) {
  if (n === 1) {
    return 1;
  }
  if (n === 2) {
    return 2;
  }
  return fib(n - 1) + fib(n - 2);
}

console.log("递归fib:", fib(10));

// 使用备忘录版本的递归算法
// 利用空间换时间，但是还有优化的可能
function fib(n) {
  const cache = {};
  function next(n) {
    if (n === 1) {
      cache[1] = 1;
      return 1;
    }
    if (n === 2) {
      cache[2] = 1;
      return 1;
    }

    let a = cache[n - 1] || next(n - 1);
    let b = cache[n - 2] || next(n - 2);
    const result = a + b;
    cache[n] = result;
    return result;
  }
  return next(n);
}

// 非递归写法 遍历 + 移动指针
// 使用while的迭代算法，自底向上计算，同时省略了dp数组的空间，只需要first和second两个数

function fib(n) {
  let first = 1;
  let second = 2;
  if (n === 1) {
    return first;
  } else if (n === 2) {
    return second;
  } else {
    let result;
    let index = 3;
    while (index <= n) {
      result = first + second;
      index++;
      first = second;
      second = result;
    }
    return result;
  }
}

console.log("非递归:", fib(10));
