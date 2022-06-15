// 正则表达式之划分URL字符串
String.prototype.queryUrlParams = function () {
  var result = {};
  var reg = /([^?=#&]+)=([^?=#&]+)/g;
  this.replace(reg, (...[, $1, $2]) => {
    result[$1] = $2;
  });
  reg = /#([^?=#&]+)/g;
  this.replace(reg, (...[, $1]) => {
    result["HASH"] = $1;
  });
  return result;
};
const str = "http://www.graphicsmagick.org/utilities.html?name=111";

console.log(str.queryUrlParams());

const searchParams = new URL(
  "http://www.graphicsmagick.org/utilities.html?name=111"
).searchParams;
console.log(searchParams);

// 正则表达式之解析json串

// const str = '{"name":"tony","age":18}';

// String.prototype.parseJSON = function () {
//   const reg = /["|']?(\w+)["|']?:["|']?(\w+)["|']?/g;
//   const obj = {};
//   this.replace(reg, (...[, $1, $2]) => {
//     obj[$1] = $2;
//   });
//   return obj;
// };

// console.log(str.parseJSON());

// 实现一个千分符

// 正则表达式之实现千分符
const num = 12321874214214;

// 方案1  把数字颠倒，每三位都加一个逗号

// String.prototype.delimiter = function () {
//   const reg = /(\d{3})/g;
//   const resultStr = this.replace(reg, (...[, $1]) => $1 + ",");
//   return resultStr.split("").reverse().join("");
// };

// const numString = String(num).split("").reverse().join("");
// console.log(numString.delimiter());

// 方案2 直接正向匹配，需要使用到正向预查的写法

// String.prototype.delimiter = function () {
//   const reg = /\d{1,3}(?=(\d{3})+$)/g;
//   return this.replace(reg, (content) => content + ",");
// };

// const numString = String(num).delimiter();
// console.log(numString);
