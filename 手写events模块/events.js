class EventEmitter {
  constructor() {
    this.events = {};
  }
  on(eventName, callback) {
    this.events = this.events || {};
    const isExist = this.events[eventName];
    // 如果绑定的事件不是newListener 就要触发事件
    if (eventName !== "newListener") {
      this.emit("newListener", eventName, callback);
    }
    if (isExist) {
      this.events[eventName].push(callback);
    } else {
      this.events[eventName] = [callback];
    }
  }
  emit(eventName, ...args) {
    this.events = this.events || {};

    const isExist = this.events[eventName];
    if (isExist) {
      this.events[eventName].forEach((fn) => {
        fn(...args);
      });
    }
  }
  off(eventName, callback) {
    this.events = this.events || {};

    const isExist = this.events[eventName];
    if (isExist) {
      this.events[eventName] = this.events[eventName].filter(
        (fn) => fn !== callback && fn.l !== callback
      );
    }
  }
  once(eventName, callback) {
    this.events = this.events || {};

    //我们要把一个被包装过的方法传进去,AOP，可以添加额外的逻辑
    const once = (...args) => {
      callback(...args);
      // ** 额外的逻辑
      this.off(eventName, once);
    };
    //执行
    once.l = callback;
    this.on(eventName, once);
  }
}

module.exports = EventEmitter;
