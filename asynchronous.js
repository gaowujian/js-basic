// https://www.cnblogs.com/jiangyuzhen/p/11064408.html
// 总结
// 微任务队列优先于宏任务队列执行，微任务队列上创建的宏任务会被后添加到当前宏任务队列的尾端，微任务队列中创建的微任务会被添加到微任务队列的尾端。
// 只要微任务队列中还有任务，宏任务队列就只会等待微任务队列执行完毕后再执行。
// 宏任务setTimeout
// 微任务 Promise.then()
// await 紧跟的语句是同步代码，执行完后先执行外部的同步代码，等同步代码执行完之后再执行await下一句

async function async1() {
  console.log("async1 start");
  // await async2();

  await new Promise(resolve => {
    console.log("wei zhong wei");
    setTimeout(function() {
      console.log("wei zhong hong"); //里边resolve的话要等 之前的setTimeout执行完才能轮到这个setTimeout
    }, 0);
    resolve(); // 外边resolve的话 await接收到结果 async1 end 被打印在setTimeout之前
  });
  // 没有resolve的话 await会卡死，下面的语句不会执行
  console.log("async1 end");
}

async function async2() {
  console.log("async2");
}

console.log("script start");

setTimeout(function() {
  console.log("setTimeout");
}, 0);

async1();

new Promise(function(resolve) {
  console.log("promise1");
  resolve();
}).then(function() {
  console.log("promise2");
});

console.log("script end");
