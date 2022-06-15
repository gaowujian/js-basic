// https://medium.com/better-programming/functional-programming-in-javascript-introduction-and-practical-examples-d268e44395b2

// pure function 纯函数：
// 1. 相同的参数有唯一的结果
// 2. 一个纯函数不会依赖函数外的变量
// 3.不存在副作用，即不会改变函数外的变量，不会call console等api，也不会触发其他进程的执行

// combinator
// 在纯函数的基础之上，增添了一个规则：no free variable  不存在自由变量，即函数内的变量，应该全部来源于参数列表，可以在外部独立修改
// 如下是一个纯函数，但不是一个combinator，因为conversionRates不是通过参数传进来的，不能独立进行修改

const convertUSD = (val, code) => {
  const conversionRates = {
    CNY: 7.07347,
    EUR: 0.90625,
    GBP: 0.796313,
    INR: 71.1427,
    USD: 1,
  };
  if (!conversionRates[code]) {
    throw new Error("This currency code is not available");
  }
  return val * conversionRates[code];
};
