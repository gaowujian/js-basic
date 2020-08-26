// 实现一个sleep函数，通过es5, promise, generator 及 async-await

// * 通用
function sayHi(name) {
  console.log(`hi ${name}`);
}

// *  es5
// function sleep(fn, time) {
//   setTimeout(() => {
//     fn();
//   }, time);
// }
// 使用到了延迟执行
//  *. 箭头函数，创建wrapper函数
// sleep(() => sayHi("tony"), 3000);

// * 2.绑定参数，因为函数内部没有使用this，可以直接帮定到null上
// sleep(sayHi.bind(null, "tony"), 3000);

// * Promise
// function sleep(time) {
//   return new Promise(resolve =>
//     setTimeout(() => {
//       resolve();
//     }, time)
//   );
// }

// sleep(3000).then(() => sayHi("tony"));

// * generator and promise
// * 返回了一个iterator 其中的value是promise
// function* sleep(time) {
//   yield new Promise(resolve =>
//     setTimeout(() => {
//       resolve("value");
//     }, time)
//   );
// }

// sleep()
//   .next()
//   .value.then(message => sayHi(`tony${message}`));

// console.log(sleep(3000).next());

// * async await
// * 有内置的执行器，不需要next，直接返回promise
async function sleep(time) {
  const promise = await new Promise(resolve =>
    setTimeout(() => {
      resolve("message");
    }, time)
  );
  console.log("11");
  return promise;
}

sleep(3000).then(message => {
  sayHi(`tony${message}`);
  console.log(22);
});
function sayHi(name) {
  console.log(`hi ${name}`);
}