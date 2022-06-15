// 强制类型转换发生在动态语言类型的runtime
// js 里的类型转换都是强制类型转换
// 有的是显示 有的是隐式

// 首先基础是 字符串 数字和 boolean之间的转换
// 抽象值操作

// * toString 抽象操作

// null 是 "null"
// undefined 是 "undefined"
// true 是 "true"
// number 使用通用规则  5 是 "5"
// 普通对象来说对普通对象来说，除非自行定义，否则 toString()(Object.prototype.toString())返回 内部属性 [[Class]] 的值
// Array 对象有对tostring进行了重定义。所有但单元字符串化之后再用 , 拼接
var a = {
  a: "tony",
  b: "wudi",
  toJSON: function() {
    return this.b;
  }
};

// JSON的 stringify 和 toString 规则大致相同
// (1) 字符串、数字、布尔值和 null 的 JSON.stringify(..) 规则与 ToString 基本相同。
// (2) 如果传递给 JSON.stringify(..) 的对象中定义了 toJSON() 方法，那么该方法会在字符
// 串化前调用，以便将对象转换为安全的 JSON 值。

// *toNumber 抽象操作

// 基础类型转换
// true 转换为 1，false 转换为 0。undefined 转换为 NaN，null 转换为 0
// 对于字符串来说，数字字符串转化为数字，其他转化为NAN
console.log(Number("ddd"));
// 对象包括数组进行转化的时候，会调用内部的ToPrimitive 检查是否有valueOf方法，如果有返回基本的类型值
// 就直接用该值进行数据转换，如果没有就用toString来进行强制类型转换，如果均没有基础值返回，产生error

var a = {
  b: "hah",
  valueOf() {
    return {};
  },
  toString() {
    return "24";
  }
};
console.log(Number(a));

// *toBoolean 抽象操作

// 假值包括: null undefined +0、-0 和 NaN ""

var a = new Number(0),
  b = new Boolean(false),
  c = new String("");
if (a && b && c) console.log(true);
else console.log(false);

// ! 显示强制类型转换 推荐使用（）主要使用 Number,String,Boolean等
// ** 字符串和数字之间的类型转换

// 1.数字转字符串
var a = 10;
var b = String(a);
var c = a.toString();
console.log(b);
console.log(c);

// 2.字符串转数字
// *一般情况
// 一元运算 + 被普遍认为是显式强制类型转换。
var str = "111";
var num = +str;
console.log(typeof num);

// *针对Date类型
// 获取时间戳的三种方式
var timestamp1 = +new Date();
var timestamp2 = new Date().getTime();
var timestamp3 = Date.now();
console.log(timestamp1);
console.log(timestamp2);
console.log(timestamp3);

// 即构造函数没有参数时可以不用带 ()。
// 于是 我们可能会碰到var timestamp = +new Date

// 显式解析数字字符串   Number 和 parseInt
var str = "43s";
console.log(Number(str));
console.log(parseInt(str)); //接受字符串值，解析到非数字为止，非字符串类型，先转化为字符串

// ** 显示转化为boolean (Boolean, !运算符 和 !!运算符)

var a = "0";
var b = [];
var c = {};
var d = "";
var e = 0;
var f = null;
var g;

console.log(
  Boolean(a),
  Boolean(b),
  Boolean(c),
  Boolean(d),
  Boolean(e),
  Boolean(f),
  Boolean(g)
);
console.log(!a, !b, !c, !d, !e, !f, !g);
console.log(!!a, !!b, !!c, !!d, !!e, !!f, !!g);



// ! 隐式的强制类型转换 （避免使用）

// 1. 字符串和数字之间的隐式数据转换

// +运算符  如果其中一个操作数是字符串，或通过 toPrimitive(包括valueOf和toString)可以
// 转化为字符串，那么执行字符串拼接操作

// 区分 toPrimitive  和 String(), 第一包含 valueOf 和 toString 两步，第二个直接调用 toString

// 减法需要两个number, 数组先转化成 "3" 和 "1", 然后 再转化为 3 和 1
var a = [3];
var b = [1];
a - b; // 2

// 2. boolean值到数字之间的隐式强制转换 （略，碰上的少）

// 3. 隐式强制转换为boolean

// (1)if (..)语句中的条件判断表达式。
// (2)for ( .. ; .. ; .. )语句中的条件判断表达式(第二个)。
// (3) while (..) 和 do..while(..) 循环中的条件判断表达式。
// (4)? :中的条件判断表达式。
// (5) 逻辑运算符 ||(逻辑或)和 &&(逻辑与)左边的操作数(作为条件判断表达式)

// * 在if的上下文中会进行隐式的ToBoolean操作，等价于 Boolean() 和 !!
var arr = [];
if (!!arr) {
  console.log("存在");
} else console.log("不存在");


