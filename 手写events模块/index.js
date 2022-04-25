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
