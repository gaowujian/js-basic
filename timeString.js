var timeString = "2019-7-23 16:22:30";
// 2019年7月23日16点22分30秒

// 方案1 一路replace

var newStr =
  timeString
    .replace("-", "年")
    .replace("-", "月")
    .replace(" ", "日")
    .replace(":", "时")
    .replace(":", "分") + "秒";
console.log(newStr);

// 方案二  确定特殊字符位置，然后截取正常字符拼接
var a = timeString.indexOf("-");
var b = timeString.lastIndexOf("-");
var c = timeString.indexOf(" ");
var d = timeString.indexOf(":");
var e = timeString.lastIndexOf(":");
var year = timeString.slice(0, a);
var month = timeString.slice(a + 1, b);
var day = timeString.slice(b + 1, c);
var hour = timeString.slice(c + 1, d);
var minute = timeString.slice(d + 1, e);
var second = timeString.slice(e + 1);

var newStr2 =
  year +
  "年" +
  month +
  "月" +
  day +
  "日" +
  hour +
  "时" +
  minute +
  "分" +
  second +
  "秒";

console.log(newStr2);

// 方案3 使用split获取有效字段，比indexOf+ slice更高效
var [date, time] = timeString.split(" ");
var [year, month, day] = date.split("-");
var [hour, minute, second] = time.split(":");

var newStr3 =
  year +
  "年" +
  month +
  "月" +
  day +
  "日" +
  hour +
  "时" +
  minute +
  "分" +
  second +
  "秒";

console.log(newStr3);

// 方案4 使用正则表达式 高效分割字符串

var arr = timeString.split(/(?: |-|:)/g);
var newStr4 =
  arr[0] +
  "年" +
  arr[1] +
  "月" +
  arr[2] +
  "日" +
  arr[3] +
  "时" +
  arr[4] +
  "分" +
  arr[5] +
  "秒";
console.log(newStr4);

// 方案5 使用Date对象, 这种方式对字符串的要求比较高，必须是标准格式的字符串
//  yyyy/mm/dd hh:mm:ss

var time = new Date(timeString);
var year = time.getFullYear();
var month = time.getMonth();
var day = time.getDate();
var hour = time.getHours();
var minute = time.getMinutes();
var second = time.getSeconds();

var newStr5 =
  year +
  "年" +
  month +
  "月" +
  day +
  "日" +
  hour +
  "时" +
  minute +
  "分" +
  second +
  "秒";
console.log(newStr5);
