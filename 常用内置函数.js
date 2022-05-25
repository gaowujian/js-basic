// Number and Math operation
var _ = require("lodash");
var num = 6.35;
// 想上进
console.log(Math.floor(num));
// 向下进
console.log(Math.ceil(num));
// 四舍五入
console.log(Math.round(num));
console.log(num.toFixed(1));
console.log(_.round(num, 1));

// String
var str = "hello world!";
console.log(Object.getOwnPropertyNames(String.prototype));
// 截取字符串 注意负值 -1值得是倒数第一个
console.log(str.slice(1, 3));
console.log(str.substring(1, 3));
// 大小写转换
console.log(str.toLowerCase(str));
console.log(str.toUpperCase(str));
// 查找字符串
console.log(str.indexOf("or"));
// 替换replace str.replace(regexp|substr, newSubStr|function)
// 第一个参数是正则表达式或者字符串  第二个参数是新字符串或一个函数，返回值是用来替换的新字符串
// 将b中的英文字符串全部替换成a对象里对应key的值
var a = {
  YYYY: "2017",
  MM: "04",
  DD: "02",
};
var b = "今天是YYYY年MM月DD日（YYYY-MM-DD）。Good luck!";
console.log(
  b
    .replace(/\b[YMD]+\b/g, function ($0) {
      return a[$0];
    })
    .toUpperCase()
);

// Array
var arr = ["apple", "pear", "banana"];
// 添加和删除操作
// push(...items) 在末端添加项 items。 可以添加多个
arr.push("strawberry", "pineapple");
console.log(arr);
// pop() 从末端移除并返回该元素。
arr.pop();
console.log(arr);
// unshift(...items) 从前端添加项 items。 可以添加多个
arr.unshift("orange", "cherry");
console.log(arr);
// shift() 从前端移除并返回该元素。
arr.shift();
console.log(arr);
// splice 可以用于添加删除和插入 arr.splice(index[, deleteCount, elem1, ..., elemN])
arr.splice(1, 1);
console.log(arr);
//concat 用于合并数组，返回一个新的数组
console.log(arr.concat(["new arr", "1", 3]));
arr.splice(1, 0, "blueberry"); // 插入
console.log(arr);
// slice 截取数组 并不会对原来数组进行操作 截取范围内的元素创建一个新的数组
console.log(arr.slice(1, 2));
// arr.concat 将数组与其他数组和/或元素结合在一起
console.log(arr.concat([3, 4]));
// 查询操作
var arr = [4, 5, 6, false];
// indexOf/lastIndexOf/includes  查询数组内是否有目标对象
//  在比较目标元素和数组内元素时，采用===严格比较
console.log(arr.indexOf(false));
// find/findIndex 传入函数 找寻符合条件的元素 返回第一个满足条件的元素
console.log(arr.find((item) => item > 4));
// filter 返回满足条件的所有元素
console.log(arr.filter((item) => item > 4));
// 转换数组
// map(fn) 对数组内每个元素做一次函数的调用
var newArr = arr.map(function (item) {
  return item * 10;
});
console.log(newArr);
// sort(fn) 对数组内元素做一次默认排序，默认是转化为string，并按字母顺序排序，需要自定义比较函数
arr.sort((a, b) => a - b);
console.log(arr);
// reverse() 颠倒数据内元素 不会返回原数组
arr.reverse();
console.log(arr);
var str = "hello world!";
// split(ch) 字符串拆分为一个数组
console.log(str.split(" "));
// join(ch) 数组拼接成一个字符串
console.log(str.split(" ").join("-"));

// reduce
let value = arr.reduce(function (previousValue, item, index, arr) {}, 0);
// foreach 用于迭代元素，对数组的每个元素进行一次处理，与map不同的是没有返回结果
// foreach 没有返回值，且不能直接改变元素（但是可以间接）
var arr = [1, 2, 3];
arr.forEach((item) => item + 1);
console.log(arr); //arr没有变化，不能直接给item赋值
arr.forEach((item, index, arr) => (arr[index] = item + 1));
console.log(arr); //arr变化了，通过第二三个参数找到值

// Array.isArray(arr) 用于检查目标对象是不是Array

// 日期
// dateObj.toLocaleString([locales [, options]])
// locales 缩写语言代码的字符串或数组 可以使用后缀 包括数字系统和不同日历
// options 对象 ,列举常用的
var options = {
  dateStyle: "long", //short, medium, long ,full 日期
  timeStyle: "short", // 时间
  timeZone: "Asia/Shanghai", //默认是UTC时间
  hour12: true, //12小时制度
};

var date = new Date();
console.log(date.toLocaleString("zh", options));

//  Number
// numObj.toLocaleString([locales [, options]])
// locales  缩写语言代码的字符串或数组 可以使用后缀 包括 不同的编号系统
// options 根据数字的用途，主要style分为纯数字，货币，百分比和单位 四种
var num = 2333333.224;
var options = {
  style: "currency", //decimal,currency,percent,unit
  // numberingSystem:"arab"  //编号系统
  currency: "CNY", //style是currency时，必须有currency属性
  currencyDisplay: "name", //默认使用symbol, 还有code 和name
  useGrouping: true, //是否使用分割符号
  maximumFractionDigits: 4, //使用分割符的字符片段长度，默认是3
};
num.toLocaleString("zh", options); //2,333,333
