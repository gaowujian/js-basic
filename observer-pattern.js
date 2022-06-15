// 观察订阅者模式
class Subject {
  constructor() {
    this.subs = {};
  }
  //   key监听者，fn回调函数，回调函数被放到队列（数组中）
  addSub(key, fn) {
    const subArr = this.subs[key];
    if (!subArr) {
      this.subs[key] = [];
    }
    this.subs[key].push(fn);
  }

  trigger(key, message) {
    const subArr = this.subs[key];
    if (!subArr || subArr.length === 0) {
      return false;
    }
    for (let i = 0, len = subArr.length; i < len; i++) {
      const fn = subArr[i];
      fn(message);
    }
  }

  unSub(key, fn) {
    const subArr = this.subs[key];
    if (!subArr) {
      return false;
    }
    if (!fn) {
      this.subs[key] = [];
    } else {
      for (let i = 0, len = subArr.length; i < len; i++) {
        const _fn = subArr[i];
        if (_fn === fn) {
          subArr.splice(i, 1);
        }
      }
    }
  }
}

// 测试
// 订阅
// 生成了一个目标对象

let subA = new Subject();
let A = message => {
  console.log("订阅者收到信息: " + message);
};
// 有观察者想要监听这个目标对象,
subA.addSub("A", A);

// 发布
// 目标对象发布信息，所有监听者都能收到消息
subA.trigger("A", "我是徐小夕"); // A收到信息: --> 我是徐小夕
