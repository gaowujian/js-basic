// reduce方法

// The reduce() method executes a reducer function (that you provide)
// on each element of the array, resulting in a single output value.

// reduce方法对于数组中的每个元素都执行了一次reducer方法，最后得到了一个输出值

// reducer方法有四个参数，包括  accumulator（acc）累加器，currentValue(cur) 当前值,
// currentIndex 当前循环索引值， sourceArr 源数组

// reducer的返回值会被作为下一轮循环的acc值
const arr = [
  { name: "tony", count: 1 },
  { name: "tony", count: 1 },
  { name: "jingjing", count: 10 },
  { name: "tony", count: 20 },
];

// const newArr = arr.reduce((accu, current, index, arr) => {
//   console.log(accu);
//   console.log(Object.keys(accu));
//   console.log(Object.values(accu));
//   if (typeof accu == "object" && Object.values(accu).includes(current.name)) {
//     accu[current.name].count += current.count;
//     return accu;
//   }
//   return accu;
// });
// console.log(newArr);

const newArr = arr.sort((a, b) => {
  return String(a.name).localeCompare(b.name);
});
console.log(newArr);
