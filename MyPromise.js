// promise 基本结构
new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve("FULFILLED");
  }, 1000);
});

// 判断变量否为function
var isFunction = variable => typeof variable === "function";

// 定义Promise的三种状态常量
const PENDING = "PENDING";
const FULFILLED = "FULFILLED";
const REJECTED = "REJECTED";

// 定义我们自己的promise
class MyPromise {
  constructor(executor) {
    if (!isFunction(executor)) {
      throw new Error("MyPromise must accept a function as a parameter");
    }
    this._status = PENDING;
    this._value = "undefined";
    try {
      executor(this._resolve.bind(this), this._reject.bind(this));
    } catch (error) {
      this._reject(err);
    }
  }

  _resolve(val) {
    if (this._status !== PENDING) return;
    this._status = FULFILLED;
    this._value = val;
  }
  _reject(err) {
    if (this._status !== PENDING) return;
    this._status = FULFILLED;
    this._value = err;
  }
}
// // 判断是否异步成功，使用setTimeout模拟 promise 微任务
// const promise = new MyPromise((res, rej) => {
//   setTimeout(() => {
//     res("success");
//   }, 1000);
// });
// // 立即执行 promise pending 因为异步
// console.log(promise);
// // 两秒后 查看promise状态
// setTimeout(() => {
//   console.log(promise);
// }, 2000);

// 开始实现then方法  MyPromise.prototype.then
// promise.then(onFulfilled, onRejected)

// 如果onFulfilled和onRejected不是函数，则需要忽略
// 如果是函数，onFulfilled函数的第一个参数是promise成功传入的值，
// onRejected函数的第一个参数是promise失败传入的值，
// 状态改变前，这两个函数不能被调用
// 调用次数只有一次

// 一个promise可以被多次使用then，调用，将依次执行注册队列中的回调函数

//  * then的链式调用

// promise1.then(onFulfilled1, onRejected1).then(onFulfilled2, onRejected2);
// 等价于
//promise2 =promise1.then(onFulfilled1, onRejected1)
// promise2.then(onFulfilled2, onRejected2);

// 先了解then的传值过程机制

// 1. onFulfilled或 onRejected返回一个值x，
// 若 x 不为 Promise ，则使 x 直接作为新返回的 Promise 对象的值， 即新的onFulfilled 或者 onRejected 函数的参数.
// 若 x 为 Promise ，这时后一个回调函数，就会等待该 Promise 对象(即 x )的状态发生变化，才会被调用，并且新的 Promise 状态和 x 的状态相同。

// 2. 如果 onFulfilled 或者onRejected 抛出一个异常 e ，则 promise2 必须变为失败（Rejected），并返回失败的值 e，

// 3. 如果onFulfilled 不是函数且 promise1 状态为成功（Fulfilled）， promise2 必须变为成功（Fulfilled）并返回 promise1 成功的值

// 4. 如果 onRejected 不是函数且 promise1 状态为失败（Rejected），promise2必须变为失败（Rejected） 并返回 promise1 失败的值，

// * 结论：
// 新的 Promise 对象的状态依赖于当前 then 方法回调函数执行的情况以及返回值，例如 then 的参数是否为一个函数、回调函数执行是否出错、返回值是否为 Promise 对象。
// (3)(4)代表了值穿透，如果当前then的参数不是函数，那么这个then返回的promise和之前的promise状态保持一致，并返回相同值

MyPromise.prototype.then = function() {
  const { _value, _status } = this;
  //   //返回一个promise对象
  //   return new MyPromise((onFulfilledNext, onRejectedNext) => {
  //     //封装一个成功的时候执行的函数
  //   });
  if (_status == FULFILLED) return "";
};

var promise = new MyPromise((res, rej) => {
  setTimeout(() => {
    res("success");
  }, 0);
});
console.log(promise);
setTimeout(() => {
  console.log(promise.then());
}, 1000);


