const PENDING = "PENDING";
const RESOLVED = "RESOLVED";
const REJECTED = "REJECTED";
class Promise {
  constructor(executor) {
    this.state = PENDING;
    this.value = null;
    this.reason = null;
    this.onFulfilledCallbacks = [];
    this.onRejectedCallbacks = [];

    // 具有等待功能，衍生出了 Promise.resolve
    const resolve = (value) => {
      if (value instanceof Promise) {
        //把resolve和reject分别当作onFulfilled和onRejected的回调
        // 必须要return
        // 这个then方法调用的时候,resolve已经有值了，
        // 不用担心是先调用再赋值给resolve
        return value.then(resolve, reject);
      }
      if (this.state === PENDING) {
        this.state = RESOLVED;
        this.value = value;
        this.onFulfilledCallbacks.forEach((cb) => cb());
      }
    };
    //没有等待功能，直接失败,衍生出了Promise.reject
    const reject = (reason) => {
      if (this.state === PENDING) {
        this.state = REJECTED;
        this.reason = reason;
        this.onRejectedCallbacks.forEach((cb) => cb());
      }
    };
    try {
      executor(resolve, reject);
    } catch (error) {
      reject(error);
    }
  }

  then(onFulfilled, onRejected) {
    onFulfilled =
      typeof onFulfilled === "function" ? onFulfilled : (value) => value;
    onRejected =
      typeof onRejected === "function"
        ? onRejected
        : (err) => {
            throw err;
          };
    const promise2 = new Promise((resolve, reject) => {
      if (this.state === RESOLVED) {
        setTimeout(() => {
          try {
            const x = onFulfilled(this.value);
            resolvePromise(promise2, x, resolve, reject);
          } catch (error) {
            reject(error);
          }
        }, 0);
      }
      if (this.state === REJECTED) {
        setTimeout(() => {
          try {
            const x = onRejected(this.reason);
            resolvePromise(promise2, x, resolve, reject);
          } catch (error) {
            reject(error);
          }
        }, 0);
      }
      if (this.state === PENDING) {
        this.onFulfilledCallbacks.push(() => {
          setTimeout(() => {
            try {
              const x = onFulfilled(this.value);
              resolvePromise(promise2, x, resolve, reject);
            } catch (error) {
              reject(error);
            }
          }, 0);
        });
        this.onRejectedCallbacks.push(() => {
          setTimeout(() => {
            try {
              const x = onRejected(this.reason);
              resolvePromise(promise2, x, resolve, reject);
            } catch (error) {
              reject(error);
            }
          }, 0);
        });
      }
    });
    return promise2;
  }

  //then的变种
  catch(onRejected) {
    return this.then(null, onRejected);
  }

  //具有等待性,就是去递归解析promise
  //也是then的一个变种
  //returns a new promise that is resolved when the original promise
  //is resolved. The handler is called when the promise is settled,
  //whether fulfilled or rejected.

  //返回一个promise，当原promise resolve的时候，这个新的promise也会resolve。
  //回调函数会在promise settle之后调用，不论是成功或者是失败

  //onFinally的返回结果不会影响后续的promise
  //只有一种情况，当onFinally返回promise的时候，如果成功不影响结果，失败才会影响结果
  finally(onFinally) {
    return this.then(
      (data) => {
        return Promise.resolve(onFinally()).then(() => data);
      },
      (err) => {
        //上一次promise如果失败，resolve的时候也是先递归解析再返回
        // return Promise.reject(callback()).then(null, () => {
        //   return err;
        // });
        return Promise.resolve(onFinally()).then(() => {
          throw err;
        });
      }
    );
  }

  //返回一个成功的promise,且具有等待功能
  // Returns a new Promise object that is resolved with the given value.
  // If the value is a thenable (i.e. has a then method),
  // the returned promise will "follow" that thenable, adopting
  // its eventual state; otherwise, the returned promise will be fulfilled
  // with the value.

  static resolve(value) {
    //resolve,reject是构造器函数内定义好的
    if (value instanceof Promise) {
      return value;
    }
    return new Promise((resolve, reject) => {
      if (
        value &&
        typeof value === "object" &&
        typeof value.then === "function"
      ) {
        setTimeout(() => {
          value.then(resolve, reject);
        });
      } else {
        resolve(value);
      }
    });
  }
  static reject(reason) {
    return new Promise((resolve, reject) => {
      reject(reason);
    });
  }

  //   Promise .all        -> Promise .allFulfilled
  //   Promise .allSettled -> Promise .allSettled
  //   Promise .race       -> Promise .oneSettled
  //   Promise .any        -> Promise .oneFulfilled

  // 获取所有的成功结果，一旦有失败，就返回失败的结果
  static all(promises) {
    return new Promise((resolve, reject) => {
      const result = [];
      let count = 0;
      promises = Array.from(promises);
      //当传入空数组时，返回一个空数组
      if (promises.length === 0) {
        resolve(result);
      }
      for (let i = 0; i < promises.length; i++) {
        const promise = promises[i];
        promise
          .then((data) => {
            result[i] = data;
            if (++count === promises.length) {
              resolve(result);
            }
          })
          .catch((err) => {
            // reject并终止循环
            return reject(err);
          });
      }
    });
  }

  // 返回第一个完成的promise,不论是成功还是失败
  static race(promises) {
    return new Promise((resolve, reject) => {
      promises = Array.from(promises);
      for (let i = 0; i < promises.length; i++) {
        const promise = promises[i];
        promise
          .then((data) => {
            return resolve(data);
          })
          .catch((err) => {
            return reject(err);
          });
      }
    });
  }
}

function resolvePromise(promise2, x, resolve, reject) {
  if (promise2 === x) {
    throw new TypeError("cycling detected");
  }
  if ((x && typeof x === "object") || typeof x === "function") {
    let called = false;
    try {
      const then = x.then;
      if (typeof then === "function") {
        then.call(
          x,
          (r) => {
            if (called) return;
            called = true;
            resolvePromise(promise2, r, resolve, reject);
          },
          (err) => {
            if (called) return;
            called = true;
            reject(err);
          }
        );
      } else {
        //x.then是普通值
        resolve(x);
      }
    } catch (error) {
      if (called) return;
      called = true;
      reject(error);
    }
  } else {
    //x是非promise值
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
