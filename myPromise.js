const pending = "pending";
const resolved = "resolved";
const rejected = "rejected";

class Promise {
  constructor(executor) {
    this.state = pending;
    this.value = null;
    this.reason = null;
    this.onFulfilledCallbacks = [];
    this.onRejectedCallbacks = [];
    //使用箭头函数保证this指向
    const resolve = (value) => {
      if (this.state === pending) {
        this.state = resolved;
        this.value = value;
        this.onFulfilledCallbacks.forEach((fn) => fn());
      }
    };
    const reject = (reason) => {
      if (this.state === pending) {
        this.state = rejected;
        this.reason = reason;
        this.onRejectedCallbacks.forEach((fn) => fn());
      }
    };

    try {
      executor(resolve, reject);
    } catch (error) {
      console.log(error);
      reject(error);
    }
  }

  then(onFulfilled, onRejected) {
    onFulfilled =
      typeof onFulfilled === "function" ? onFulfilled : (data) => data;
    onRejected =
      typeof onRejected === "function"
        ? onRejected
        : (err) => {
            throw err;
          };
    const promise2 = new Promise((resolve, reject) => {
      if (this.state === resolved) {
        setTimeout(() => {
          try {
            const x = onFulfilled(this.value);
            resolvePromise(promise2, x, resolve, reject);
          } catch (error) {
            reject(error);
          }
        });
      }
      if (this.state === rejected) {
        setTimeout(() => {
          try {
            const x = onRejected(this.reason);

            resolvePromise(promise2, x, resolve, reject);
          } catch (error) {
            console.log("error", error);
            reject(error);
          }
        });
      }
      if (this.state === pending) {
        this.onFulfilledCallbacks.push(() => {
          setTimeout(() => {
            try {
              const x = onFulfilled(this.value);
              resolvePromise(promise2, x, resolve, reject);
            } catch (error) {
              reject(error);
            }
          });
        });
        this.onRejectedCallbacks.push(() => {
          setTimeout(() => {
            try {
              const x = onRejected(this.reason);
              resolvePromise(promise2, x, resolve, reject);
            } catch (error) {
              reject(error);
            }
          });
        });
      }
    });
    return promise2;
  }
}

function resolvePromise(promise2, x, resolve, reject) {
  if (promise2 === x) {
    throw new TypeError("Chaining cycle");
  }
  //判断x是不是promise，如果不是直接resolve，如果是继续去解析
  if ((x && typeof x === "object") || typeof x === "function") {
    let called = false;
    try {
      //判断是不是thenable
      const then = x.then;

      if (typeof then === "function") {
        // 把promise2的resolve和reject交给了x，
        // 所以x在resolve的时候，在下一个then获取结果
        then.call(
          x,
          (y) => {
            if (called) return;
            called = true;
            resolvePromise(promise2, y, resolve, reject);
          },
          (r) => {
            if (called) return;
            called = true;
            reject(r);
          }
        );
      } else {
        resolve(x);
      }
    } catch (error) {
      if (called) return;
      called = true;
      reject(error);
    }
  } else {
    resolve(x);
  }
}

Promise.deferred = function () {
  let dfd = {};
  dfd.promise = new Promise((resolve, reject) => {
    dfd.resolve = resolve;
    dfd.reject = reject;
  });
  return dfd;
};
module.exports = Promise;
