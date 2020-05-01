// 1. 验证是否是有效数字

// 可能有 + 或 - ， 不能够以0 开头

// const validNum = /^[+-]?(\d|(\d)+)(\.\d+)?$/;

// console.log(validNum.test(-10.9));

// 2. 验证一个由数字字母和下划线组成的6-16位的密码

// const password = /^\w{6,16}$/;

// console.log(password.test("+"));

// 3. 验证真实姓名 中文 2-4个字

// const realName = /^[\u4E00-\u9FA5]$/; //中文的unicode

// 4. 验证邮箱
//  可以由 数字字母下划线 - 和 . 组成，不能有连续的- 或者连续的.

// 5. 验证身份证号
// 130623199305240011;
// const id = /^(\d{6})(\d{4})(\d{2})(\d{2})\d{2}(\d)(\d|X)$/;

// 6. 实现首字母大写

// var str = "good good study, day day up";
// const newStr = str.replace(/([a-zA-Z])([a-zA-Z]*)/g, (...args) => {
//   console.log(args);
//   const [content, firstLetter] = args;
//   return firstLetter.toUpperCase() + content.substring(1);
// });
// console.log(newStr);

// 7. 验证字符串中哪个字母出现最多，出现了多少次

// 1.  遍历string, 直接用一个对象保存所有出现的字母和次数

// var str = "wekrjinnqwiruezoqervba";
// var obj = {};
// var arr = [];
// var result = [];
// arr.forEach.call(str, (item) => {
//   if (obj[item] === undefined) {
//     obj[item] = 1;
//   } else {
//     obj[item]++;
//   }
// });

// var max = 0;

// for (const key in obj) {
//   if (obj.hasOwnProperty(key)) {
//     const value = obj[key];
//     max = value > max ? value : max;
//   }
// }

// Object.keys(obj).forEach((key) => {
//   if (obj[key] === max) result.push(key);
// });

// console.log(`出现最多的字符是${result},次数为${max}`);

// 方案2 排序，然后用正则捕获所有重复超过1次的组，最后比较组的长度判断

// var str = "wekrjinnqwiruezoqervba";

// str = str
//   .split("")
//   .sort((a, b) => a.localeCompare(b))
//   .join("");

// var reg = /([a-zA-Z])\1+/g;

// var arr = str.match(reg);

// arr.sort((a, b) => b.length - a.length);

// var max = arr[0].length;
// var result = [arr[0].substr(0, 1)];

// for (let i = 1; i < arr.length; i++) {
//   const item = arr[i];
//   if (item.length < max) break;
//   result.push(item.substr(0, 1));
// }

// console.log(`出现最多的字符是${result},次数为${max}`);

// 3. 方案三 排序 然后从数组的最长长度向下递减，判断是否存在字符串满足连续字符和数组的递减后长度相等

// var str = "wekrjinnqwiruezoqervba";

// str = str
//   .split("")
//   .sort((a, b) => a.localeCompare(b))
//   .join("");
// var max = 0;
// var result = [];
// var flag = false;

// for (let i = str.length; i > 0; i--) {
//   let reg = new RegExp("([a-zA-Z])\\1{" + (i - 1) + "}", "g");
//   str.replace(reg, (content, $1) => {
//     result.push($1);
//     max = i;
//     flag = true;
//   });
//   if (flag) break;
// }

// console.log(`出现最多的字符是${result},次数为${max}`);
