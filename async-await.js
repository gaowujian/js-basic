// generator 的自动执行机制：有两种实现方法
// 1. 回调函数。将异步操作包装成 Thunk 函数，在回调函数里面交回执行权。
// 2. Promise 对象。将异步操作包装成 Promise 对象，用then方法交回执行权。

//Promise方式
function run(gen){
    var g = gen();
  
    function next(data){
      var result = g.next(data);
      if (result.done) return result.value;
      result.value.then(function(data){
        next(data);
      });
    }
  
    next();
  }
  
 //使用
 function* foo() {
    let response1 = yield fetch('https://xxx') //返回promise对象
    console.log('response1')
    console.log(response1)
    let response2 = yield fetch('https://xxx') //返回promise对象
    console.log('response2')
    console.log(response2)
}
run(foo);


// async函数对 Generator 函数的改进，体现在以下四点：

// 内置执行器。Generator 函数的执行必须依靠执行器，而 async 函数自带执行器，无需手动执行 next() 方法。
// 更好的语义。async和await，比起星号和yield，语义更清楚了。async表示函数里有异步操作，await表示紧跟在后面的表达式需要等待结果。
// 更广的适用性。co模块约定，yield命令后面只能是 Thunk 函数或 Promise 对象，而async函数的await命令后面，可以是 Promise 对象和原始类型的值（数值、字符串和布尔值，但这时会自动转成立即 resolved 的 Promise 对象）。
// 返回值是 Promise。async 函数返回值是 Promise 对象，比 Generator 函数返回的 Iterator 对象方便，可以直接使用 then() 方法进行调用。
