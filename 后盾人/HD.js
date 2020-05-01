class HD {
  static PENDING = "PENDING";
  static FULFILLED = "FULFILLED";
  static REJECTED = "REJECTED";

  constructor(executor) {
    this.status = HD.PENDING;
    this.value = null;
    this.callbacks = [];
    try {
      executor(this.resolve.bind(this), this.reject.bind(this));
    } catch (error) {
      this.reject(error);
    }
  }

  // resolve 和 reject 负责改变内部状态，并且异步执行pending状态时期保存的所有回调函数
  resolve(value) {
    if (this.status === HD.PENDING) {
      this.status = HD.FULFILLED;
      this.value = value;
      setTimeout(() => {
        this.callbacks.map((callback) => {
          callback.onFulFilled(value);
        });
      }, 0);
    }
  }
  reject(reason) {
    if (this.status === HD.PENDING) {
      this.status = HD.REJECTED;
      this.value = reason;
      setTimeout(() => {
        this.callbacks.map((callback) => {
          callback.onRejected(reason);
        });
      }, 0);
    }
  }
  // 根据上一个promise的状态，进行不同的操作，我们也可能会返回一个新的promise，需要改变新的promise的状态，下一个then才能获取到值
  // .then的关键在于返回了一个promise，并且状态被改变了
  then(onFulFilled, onRejected) {
    // console.log(onFulFilled);
    if (typeof onFulFilled !== "function") {
      // 这里可以直接返回this.value
      // 或者 onFulFilled = (value) => value;
      // 因为这一步之前，在resolve函数中已经使用过 this.value = value
      onFulFilled = () => this.value;
    }
    if (typeof onRejected !== "function") {
      onRejected = () => this.value;
    }
    const p = new HD((resolve, reject) => {
      if (this.status === HD.FULFILLED) {
        setTimeout(() => {
          // 下一步优化得来源就是这里，创建promise的时候，状态已经改变，
          const result = onFulFilled(this.value);
          this.parse(p, result, resolve, reject);

          // onFulFilled(this.value);
        }, 0);
      }
      if (this.status === HD.REJECTED) {
        setTimeout(() => {
          const result = onRejected(this.value);
          this.parse(p, result, resolve, reject);
        }, 0);
      }
      if (this.status === HD.PENDING) {
        this.callbacks.push({
          onFulFilled: (value) => {
            const result = onFulFilled(value);
            this.parse(p, result, resolve, reject);
          },
          onRejected: (value) => {
            const result = onRejected(value);
            this.parse(p, result, resolve, reject);
          },
        });
      }
    });
    return p;
  }

  parse(promise, result, resolve, reject) {
    if (promise === result) throw new TypeError("Chaining cycle detected");

    try {
      if (result instanceof HD) {
        result.then(
          (value) => resolve(value),
          (reason) => reject(reason)
        );
        // result.then(resolve, reject);
      } else {
        resolve(result);
      }
    } catch (error) {
      reject(error);
    }
  }

  static resolve(value) {
    return new HD((resolve, reject) => {
      if (value instanceof HD) {
        value.then(resolve, reject);
      } else {
        resolve(value);
      }
    });
  }

  static reject(value) {
    return new HD((resolve, reject) => {
      if (value instanceof HD) {
        value.then(resolve, (value) => {
          console.log(value);
          reject(value);
        });
      } else {
        reject(value);
      }
    });
  }
  static all(promises) {
    return new HD((resolve, reject) => {
      const values = [];
      promises.forEach((promise) => {
        promise.then(
          (value) => {
            values.push(value);
            if (values.length == promises.length) {
              resolve(values);
            }
          },
          (reason) => {
            reject(reason);
          }
        );
      });
    });
  }
  static race(promises) {
    return new Promise((resolve, reject) => {
      promises.forEach((promise) => {
        promise.then(
          (value) => {
            resolve(value);
          },
          (reason) => {
            reject(reason);
          }
        );
      });
    });
  }
}
