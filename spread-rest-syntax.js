// 展开语法 spread
// 可以在函数调用/数组构造时, 将数组表达式或者string在语法层面展开；
// 还可以在构造字面量对象时, 将对象表达式按key-value的方式展开

// 1. 函数调用
// myFunction(...iterableObj);
function sayHi(...args) {
  console.log(args);
}

function sayHi() {
  for (
    var _len = arguments.length, args = new Array(_len), _key = 0;
    _key < _len;
    _key++
  ) {
    args[_key] = arguments[_key];
  }
  console.log(args);
}

// 2. 字面量数组或字符串
var arr;
var newArr = ["11", ...arr, 22];
// 转译
function _toConsumableArray(arr) {
  return (
    _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread()
  );
}

function _nonIterableSpread() {
  throw new TypeError("Invalid attempt to spread non-iterable instance");
}

function _iterableToArray(iter) {
  if (
    Symbol.iterator in Object(iter) ||
    Object.prototype.toString.call(iter) === "[object Arguments]"
  )
    return Array.from(iter);
}

function _arrayWithoutHoles(arr) {
  if (Array.isArray(arr)) {
    for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) {
      arr2[i] = arr[i];
    }
    return arr2;
  }
}

var arr;
var newArr = ["11"].concat(_toConsumableArray(arr));
// 执行步骤
// 先判断是不是数组 isArray，是数组直接拼接，
// 如果不是数组看是不是可迭代对象, Array.from()
// var newArr = [...arr] 可以创建一个新数组，因为本身就是数组拼接的过程，第一个元素现在是[]

// 3. 构造字面量对象时,进行克隆或者属性拷贝

let objClone = { ...obj, name: "tony" };

// 转译
var objClone = _objectSpread({}, obj, { name: "tony" });
// 执行步骤
// 定义了一个函数，第一个参数是空对象，第二个是该对象，后边的是该对象内其他的键值对
// 遍历对象的属性，然后依次赋值

// !剩余语法 rest
// rest 剩余参数语法允许我们将一个不定数量的参数表示为一个数组

function fn(a, b, ...theArgs) {
  console.log(theArgs)
}

// 解析
function fn(a, b) {
  for (var _len = arguments.length, theArgs = new Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) {
    theArgs[_key - 2] = arguments[_key];
  }

  // ...
  console.log(theArgs);
}

//步骤
// 计算arguments的总长度，计算args的长度，多余的长度是以及参数，
// 给theArgs数组中添加arguments中的数据
