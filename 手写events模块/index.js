<<<<<<< HEAD
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
=======
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

const fn = function (a, b) {
  console.log(111);
};

event.addListener("newListener", (eventName, ...args) => {
  console.log("第一个监听器:", eventName);
});

// event.addListener("newListener", (eventName, ...args) => {
//   console.log("第二个监听器:", eventName);
//   // console.log("...args:", ...args);
// });
// event.addListener("newListener", (eventName, ...args) => {
//   console.log("第三个监听器:", eventName);
//   // console.log("...args:", ...args);
// });
event.emit("break", "a", "b");

event.addListener("break", fn);
event.addListener("break", fn);
event.addListener("break", fn);

console.log("event.events:", event._events);
>>>>>>> 7bcf7f222404054ff15d1368ca9c214be52b4e7b
