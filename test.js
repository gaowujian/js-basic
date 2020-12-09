// 使用promise 实现红绿灯颜色的跳转
// 绿灯执行三秒后
// 黄灯执行四秒后
// 红灯执行五秒

let timer = 0;
setInterval(() => {
  timer++;
  console.log(timer);
}, 1000);
TrafficLight();
function TrafficLight() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve("绿灯执行了三秒，准备进入黄灯");
    }, 3000);
  })
    .then((data) => {
      console.log(data);
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve("黄灯执行了四秒，准备进入红灯");
        }, 4000);
      });
    })
    .then((data) => {
      console.log(data);
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve("红灯执行了五秒，准备进入绿灯");
        }, 5000);
      });
    })
    .then((data) => {
      console.log(data);
      TrafficLight();
    });
}

class name {
  constructor(arguments) {}
}

cls;
