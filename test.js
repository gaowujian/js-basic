// // 求两个数组的交集 const firstArray = [2, 2, 4, 1]; const secondArray = [1, 2, 0, 2];
// // intersection(firstArray, secondArray); 实现intersection函数

// const firstArray = [2, 2, 4, 1];
// const secondArray = [1, 2, 0, 2];
// function intersection(firstArray, secondArray) {
//   const firstSet = new Set(firstArray);
//   const arr = [...firstSet];
//   const secondSet = new Set(secondArray);
//   const result = [];
//   for (const item of firstSet) {
//     if (secondSet.has(item)) {
//       result.push(item);
//     }
//   }
//   return result;
// }

// console.log(intersection(firstArray, secondArray));

// const obj = {
//   name: "tony",
//   age: 28,
//   [Symbol.iterator]: function () {
//     let index = 0;
//     function next() {
//       const keys = Object.keys(obj);
//       const length = keys.length;
//       if (index < length) {
//         return {
//           value: obj[keys[index++]],
//           done: false,
//         };
//       } else {
//         return {
//           value: undefined,
//           done: true,
//         };
//       }
//     }
//     return { next };
//   },
// };
// for (const item of obj) {
//   console.log(item);
// }

const obj = {
  name: "tony",
  age: 28,
  [Symbol.iterator]: function* () {
    const keys = Object.keys(obj);
    const context = this;
    // console.log(keys[0]);
    // console.log(context[keys[0]]);
    // console.log(context[keys[0]]);
    for (let i = 0; i < keys.length; i++) {
      const key = keys[i];
      
    }
    keys.forEach((key) => {
      console.log("key:", key);
      console.log(context[key]);
      yield context[key]
    });
  },
};

// forof就是对obj的symbal.iterator函数返回值，不停调用next方法

for (const item of obj) {
  console.log(item);
}
