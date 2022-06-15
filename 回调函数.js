//回调函数就有点像是发布订阅模式，可以用在解决异步问题上。

// 我告诉你我现在有什么，我想要要拿到哪些数据去做什么，具体异步的事情交给其他人

// 我告诉你我想要你三秒之后,告诉我当时的时间是多少

// 第一个参数是3000
// 第二个参数是一个回调 参数传回来3秒后的时间，
// 我可以打印 (timeAfter3s)=>{console.log(timeAfter3s)}

console.log("currentTime:", new Date());

function sleep(ms, cb) {
  setTimeout(() => {
    cb(new Date());
  }, ms);
}

sleep(3000, (timeAfter3s) => {
  console.log("timeAfter3s:", timeAfter3s);
});
