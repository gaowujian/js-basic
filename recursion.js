// // 递归思想 最重要的两个步骤
// // 1. 找到边界关系
// // 2. 找出递归公式

// // 1. 求和
// function sum(n) {
//   if (n == 1) return 1;
//   return sum(n - 1) + n;
// }

// console.log(sum(5));

// // 2. 深拷贝

// function deepCopy(obj) {
//   if (!obj) return;
//   var newObj = Array.isArray(obj) ? [] : {};
//   for (var prop in obj) {
//     if (obj.hasOwnProperty(prop)) {
//       if (typeof obj[prop] !== "object") newObj[prop] = obj[prop];
//       else newObj[prop] = deepCopy(obj[prop]);
//     }
//   }
//   return newObj;
// }

// var obj = { a: 1, b: "string", c: { d: "e" }, d: function add() {} };

// console.log(deepCopy(obj));

// // 3. 爬楼梯问题/斐波那契数列问题

// function climbStairs(n) {
//   if (n == 1) return 1;
//   if (n == 2) return 2;

//   return climbStairs(n - 1) + climbStairs(n - 2);
// }

// function climbStairs(n) {
//   const arr = [1, 2];
//   if (n <= 2) return n;
//   let f1 = 1,
//     f2 = 2,
//     f3 = 3;
//   for (let i = 3; i <= n; i++) {
//     f3 = f1 + f2;
//     f1 = f2;
//     f2 = f3;
//   }
//   return f3;
// }

// // 5: flatten array

// function flatten(arr) {
//   let result = [];
//   for (let i = 0; i < arr.length; i++) {
//     if (Array.isArray(arr[i])) {
//       result = result.concat(flatten(arr[i]));
//     } else {
//       result.push(arr[i]);
//     }
//   }
//   return result;
// }
// var a = [1, 2, 3, [1, 2, [1.4], [1, 2, 3]]];

// console.log(flatten(a));

// // 求二叉树的总结点树木

// function nodesOfTree(n) {
//   if (n === 1) {
//     return 1;
//   } else return nodesOfTree(n - 1) + Math.pow(2, n - 1);
// }

// console.log(nodesOfTree(5));

// // 使用递归完成组合的功能
// function recursionCompose(...args) {
//   let count = args.length - 1;
//   let result;
//   return function fn(...arg1) {
//     result = args[count].apply(null, arg1);
//     if (count <= 0) {
//       return result;
//     }
//     count--;
//     return fn.call(null, result);
//   };
// }
// const a = recursionCompose(toUpperCase, toReverse);

// console.log(a("jkl"));

// function climbStairs(n) {
//   if (n <= 2) return n;

//   return climbStairs(n - 1) + climbStairs(n - 2);
// }

function climbStairs(n) {
  if (n == 1) return 1;
  if (n == 2) return 2;

  return climbStairs(n - 1) + climbStairs(n - 2);
}

function climbStairs(n) {
  const arr = [1, 2];
  if (n <= 2) return n;
  let f1 = 1,
    f2 = 2,
    f3 = 3;
  for (let i = 3; i <= n; i++) {
    f3 = f1 + f2;
    f1 = f2;
    f2 = f3;
  }
  return f3;
}

console.log("climbStairs -> climbStairs", climbStairs(6));

// 1 2 3 5 8 13
