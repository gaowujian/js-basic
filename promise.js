// Promise对象 （函数对象）是一个构造函数，等同于Array,String等
// 他的参数是一个函数，有两个变量，用来生成一个 Promise的实例
// 在promise对象的初始化时，Promise把自己Promise.prototype上的resolve和reject方法
// 绑定到了这两个参数上，所以在回调函数中可以调用resolve和reject去改变实例上的status
// * 核心： 所以在创建promise对象时创建的方法会直接立即执行，
// * 同时返回的resolve和reject函数有修改promise实例上staus状态的能力
// constructor(executor){
//   executor(this.resolve.bind(resolve),this.reject.bind(reject))
// }

// js的Promise会自动帮你bind好两个回调函数，用于更改自身状态
// 即：process(this.resolve.bind(this), this.reject.bind(this));

// resolve和 reject函数用来改变内部状态，本身没有特殊之处
// 在then方法中，我们接受一个回调函数，在then方法中进行判断，如果status
// 是fullfilled那就返回相应的值，是rejected返回另外的值

function start() {
  return new Promise((resolve, reject) => {
    resolve("start");
  });
}

start()
  .then(data => {
    // promise start
    console.log("result of start: ", data);
    return Promise.resolve(1); // p1
  })
  .then(data => {
    // promise p1
    console.log("result of p1: ", data);
    return Promise.reject(2); // p2
  })
  .then(
    data => {
      // promise p2
      console.log("result of p2: ", data);
      return Promise.resolve(3); // p3
    },
    function() {
      // throw new Error("wudi");
      // return Promise.reject("wudi");
      return "wudi";
    }
  )
  .catch(ex => {
    // promise p3
    console.log("ex: ", ex);
    return Promise.resolve(4); // p4
  })
  .then(data => {
    // promise p4
    console.log("result of p4: ", data);
  });

// 总结：

// promise 的 then 方法里面可以继续返回一个新的 promise 对象

// 下一个 then 方法的参数是上一个 promise 对象的 resolve 参数

// catch 方法的参数是其之前某个 promise 对象的 reject 参数

// 一旦某个 then 方法里面的 promise 状态改变为了 rejected，则promise 方法连会跳过后面的 then 直接执行 catch

// catch 方法里面依旧可以返回一个新的 promise 对象

// then 和 catch 方法如果没有return 值会产生一个默认的 promise对象，返回undefined

// 即使是catch 默认返回的promise对象 也只能由then来接受到undefined，因为返回undefined也是一种resolved的状态

// catch可以截获的，只有throw error,  return Promise.reject(), 不然的话链式调用过程中的catch不起任何作用，也不能返回resolve或者reject
