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

// 非递归写法 遍历 + 移动指针
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
