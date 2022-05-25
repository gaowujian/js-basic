// const EventEmitter = require("events");
// const event = new EventEmitter();
// event.on("newListener", (type, callback) => {
//   // console.log(type);
//   // callback();
// });
// const cry = () => {
//   console.log("哭了");
// };
// event.on("cry", cry);

// event.on("eat", () => {
//   console.log("吃东西");
// });
// event.on("cry", () => {
//   console.log("又哭了");
// });

// event.once("cry", () => {
//   console.log("又哭了222");
// });
// event.emit("cry");
// event.emit("cry");
// event.off("cry", cry);
// event.emit("cry");

const EventEmitter = require("events");
const event = new EventEmitter();

const fn1 = (...args) => {
  console.log("fn1:", ...args);
};
const fn2 = (...args) => {
  console.log("fn1:", ...args);
};
event.once("data2", () => {
  fn1(123);
});
event.on("newListener", (type, callback) => {
  console.log(type, callback);
});
event.on("data", fn2);
// event.off("data", fn1);
event.emit("data", 1, 2, 3);
// event.off("data", fn1);
console.log("========================");

// event.emit("data", 1, 2, 3);
