// 1. 考察 .的优先级高于= 以及 赋值运算符=的运算顺序
// https://segmentfault.com/a/1190000018711603?utm_source=tag-newest
// var a = { n: 1 };
// b = a;
// a.x = a = { n: 2 };
// console.log(a);
// console.log(b);

// 2. 打印二叉树的所有路径

var tree = {
  value: 3,
  left: {
    value: 1,
  },
  right: {
    value: 2,
    left: {
      value: 4,
    },
    right: {
      value: 6,
    },
  },
};

// 3. 实现一个数据结构，保证add，remove和getRandom的时间复杂度都是常数级别
//  举例： add(1) add(2)  remove(2)   getRandom() 获取 1或者 2
// 数组：寻址容易，插入 删除难 顺序存储线性
// 链表： 插入删除容易，寻址难  链式存储线性表
class A {
  constructor() {
    this.map = new Map();
    this.arr = [];
  }
  add(elem) {
    if (this.arr.indexOf(elem) === -1) {
      this.arr.push(elem);
      this.map.set(elem, this.arr.length - 1);
    }
  }
  getRandom() {
    const index = Math.floor(this.arr.length * Math.random());
    return this.arr[index];
  }
  remove(elem) {
    const value = this.map.get(elem);
    this.map.delete(elem);
    var len = this.arr.length;
    var temp = this.arr[value];
    this.arr[value] = this.arr[len - 1];
    this.arr[len - 1] = this.arr[temp];
    this.arr.pop();
  }
}

const a = new A();
a.add(1);
a.add(4);
a.add(5);
a.add(10);
console.log(a);
a.remove();
console.log(a);

// 4. 括号匹配问题

var rules = {
  "}": "{",
  ")": "(",
  "]": "[",
};

function isValid(str) {
  var arr = str.split("");
  var keys = Object.keys(rules);
  var stack = [];
  for (let i = 0; i < arr.length; i++) {
    if (keys.indexOf(arr[i]) != -1) {
      const target = stack.pop();
      if (rules[arr[i]] == target) {
        continue;
      }
      return false;
    } else {
      stack.push(arr[i]);
    }
  }
  if (stack.length != 0) return false;
  return true;
}

console.log(isValid("()"));
console.log(isValid("()[]{}"));
console.log(isValid("(]"));
console.log(isValid("([)]"));
console.log(isValid("("));

// 已知对象A = {name: 'sfd', getName: function(){console.log(this.name)}},现要求 ⽤用不不同⽅方式对A进⾏行行改造实现A.name 发⽣生变化时⽴立即执⾏行行A.getName
A = {
  name: "sfd",
  getName: function () {
    console.log(this.name);
  },
};

class Test {
  constructor(name) {
    this._name = name;
  }
  set nickname(name) {
    this._name = name;
    this.getName();
  }

  getName() {
    console.log(this._name);
  }
}

var test = new Test("aaa");
test.nickname = "bbb";

// 按找执行格式输出数据
function fn(arr) {
  let temp = [];

  for (let i = 0; i < arr.length; i++) {
    let innerArr = arr[i].split("");

    let count = 0;
    for (let j = 0; j < innerArr.length; j++) {
      if (innerArr[j] === "#") count++;
    }

    const key = arr[i].slice(count);

    temp.push({ key, value: count });
  }
  console.log(temp);

  let result = [];

  let first = 0;
  let second = 0;
  let third = 0;

  for (let i = 0; i < temp.length; i++) {
    var length = temp[i].value;
    switch (length) {
      case 1:
        ++first;
        second = 0;
        third = 0;
        result.push({
          hn: `${first != 0 ? first : ""}${second != 0 ? "." + second : ""}${
            third != 0 ? "." + third : ""
          }`,
          title: temp[i].key,
        });
        break;
      case 2:
        ++second;
        third = 0;
        result.push({
          hn: `${first != 0 ? first : ""}${second != 0 ? "." + second : ""}${
            third != 0 ? "." + third : ""
          }`,
          title: temp[i].key,
        });
        break;
      case 3:
        ++third;
        result.push({
          hn: `${first != 0 ? first : ""}${second != 0 ? "." + second : ""}${
            third != 0 ? "." + third : ""
          }`,
          title: temp[i].key,
        });
        break;
    }
  }
  for (let i = 0; i < result.length; i++) {
    let index = result[i]["hn"].indexOf("0");
    if (index != -1) {
      result[i]["hn"] = result[i]["hn"].substring(0, index - 1);
    }
  }
  return result;
}

const data = ["#a", "##b", "##c", "###d", "#e"];

console.log(fn(data));

// 二分查找
// 二分查找，返回插入的的位置
var searchInsert = function (nums, target) {
  var len = nums.length;
  var left = 0;
  var right = len - 1;
  // 边界条件
  if (nums[0] > target) return 0;
  if (nums[len - 1] < target) return len;
  // 当一个值在两个值中间时
  while (left < right) {
    var mid = Math.floor((left + right) / 2);
    //正好命中
    if (nums[mid] == target) return mid;
    else if (nums[mid] < target) {
      left = mid + 1;
    } else right = mid;
  }
  // 当一个值在两个值中间时，会在最后跳出循环,left = mid + 1,
  // 这个时候left = mid, right = mid + 1,所以left占据了插入的位置
  return left;
};

console.log(searchInsert([1, 3, 5, 6], 1));

// 模拟一个http请求，每次请求返回消耗的时间是介于1~5s的随机值，并写一个测试函数调用该模拟请求，不管调用请求多少次，总能拿到最后一次请求的结果

let quanju = Date.now();
let count = 1;
const ajax = () => {
  return new Promise((res, rej) => {
    const random = Math.random() * 4000 + 1000;
    const local = Date.now();
    quanju = local;
    console.log(`这是第${count}次请求，需要时间:${random}`);
    count++;
    setTimeout(() => {
      if (local == quanju) res(count);
    }, random);
  });
};

const getData = (param) => {
  ajax().then((res) => {
    console.log(`第${param}次返回的数据是${res}`);
  });
};

const testRequest = () => {
  for (let i = 1; i < 5; i++) {
    setTimeout(() => {
      getData(i);
    }, i * 100);
  }
};

testRequest();
