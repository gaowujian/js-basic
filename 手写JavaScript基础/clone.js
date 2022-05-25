// * 浅克隆,只负责拷贝对象的第一层属性
// 对基本数据类型进行值传递，对引用数据类型进行引用传递般的拷贝，此为浅拷贝。
// 重新在堆中创建内存，拷贝后对象的基本类型互不影响，但是不能对对象中的子对象进行拷贝
// ! 基本类型互不影响，对象类型属性使用同一引用，修改之后相互影响

(function () {
  function isPlainObj(obj) {
    return typeof obj === "object" && obj !== null;
  }

  function shallowClone(obj) {
    if (isPlainObj(obj)) {
      const result = {};
      Object.keys(obj).forEach((key) => {
        result[key] = obj[key];
      });
      return result;
    } else {
      console.log("不是对象类型");
    }
  }

  const obj = {
    name: "tony",
    info: {
      sex: "男",
      age: 20,
    },
  };

  const cloneObj = shallowClone(obj);
  console.log(obj);
  console.log(cloneObj);

  // 基本类型互不影响
  cloneObj.name = "changedName";
  //引用类型会修改
  cloneObj.info.age = 28;

  console.log(obj);
  console.log(cloneObj);
})();

// * 深克隆
// 对基本数据类型进行值传递，对引用数据类型，创建一个新的对象，并复制其内容，此为深拷贝。
// !基本类型和对象类型属性 修改之后都互不影响

(function () {
  function deepClone(obj) {
    function isPlainObj(obj) {
      return typeof obj === "object" && obj !== null;
    }
    if (isPlainObj(obj)) {
      const result = {};
      Object.keys(obj).forEach((key) => {
        if (isPlainObj(obj[key])) {
          result[key] = deepClone(obj[key]);
        } else {
          result[key] = obj[key];
        }
      });
      return result;
    } else {
      console.log("不是对象类型");
    }
  }
  const obj = {
    name: "tony",
    info: {
      sex: "男",
      age: 20,
    },
  };

  const cloneObj = deepClone(obj);
  console.log(obj);
  console.log(cloneObj);

  cloneObj.name = "changedName";
  cloneObj.info.age = 28;
  console.log(obj);
  console.log(cloneObj);
})();

// * instanceof机制
// 使用  p instanceof Person
// 查看左边值的 _proto_属性 和右边值的 prototype 属性，直到_proto_ 属性为null表示到头了
(function () {
  function _instanceOf(instanceObj, fn) {
    if (!instanceObj || !fn) {
      return;
    }
    let proto = instanceObj.__proto__;
    const prototype = fn.prototype;

    while (proto) {
      if (proto === prototype) {
        return true;
      }
      proto = proto.__proto__;
    }
    return false;
  }

  function Person() {
    this.name = "tony";
  }
  const p = new Person();
  console.log(_instanceOf(p, Object));
  console.log(p instanceof Object);
})();

//* debounce 防抖函数

(function () {
  /**
   * @param {*} fn  传入的函数
   * @param {number} [wait=500]  默认的延迟时间
   * @param {*} immediate  如果有immediate参数，表示是否先立即执行一次
   */
  function debounce(fn, wait = 500, immediate) {
    let timer;
    return function (...args) {
      if (!timer) {
        timer = setTimeout(() => {
          fn(...args);
        }, wait);
      } else {
        clearTimeout(timer);
      }
      if (immediate) {
        fn.call(this, ...args);
        immediate = false;
      }
    };
  }
})();

// * 节流函数

(function () {
  /**
   * @param {*} fn   传入的函数
   * @param {number} [wait=500]   延迟时间
   * @return {*}
   */
  function throttle(fn, wait = 500) {
    let timeout;
    return function (...args) {
      if (!timeout) {
        timeout = setTimeout(() => {
          fn(...args);
          timeout = null;
        }, wait);
      }
    };
  }
})();
