// 1. 考察函数的查找顺序，如果没有私有的属性，就沿着原型脸上去找

// let n = 10;
// let m = n.plus(10).minus(5);
// console.log(m); //=>15（10+10-5）

// Number.prototype.plus = function plus(x) {
//   return this + x;
// };

// Number.prototype.minus = function plus(x) {
//   return this - x;
// };

// 2. 画图解决如下问题

// function fun() {
//   this.a = 0;
//   this.b = function () {
//     console.log(this.a);
//   };
// }
// fun.prototype = {
//   b: function () {
//     this.a = 20;
//     console.log(this.a);
//   },
//   c: function () {
//     this.a = 30;
//     console.log(this.a);
//     console.log(this);
//   },
// };
// var my_fun = new fun();
// // my_fun.b();
// // my_fun.c();
// // 重点关注 这个函数的this指向是谁？ my_fun上是没有c这个函数的，所以他会去fun.prototype
// // 上去找c这个方法，找到之后在调用，此时的this 指的依然是 my_fun 而不是 my_fun.prototype
// // 如下可以验证
// my_fun.c();
// my_fun.__proto__.c();
// console.log(my_fun.constructor);

// 3. 请使用画图技巧阶梯，考察了ecstack,原型链，this指针指向，运算符优先级
// function Foo() {
//   getName = function () {
//     console.log(1);
//   };
//   return this;
// }
// Foo.getName = function () {
//   console.log(2);
// };
// Foo.prototype.getName = function () {
//   console.log(3);
// };
// var getName = function () {
//   console.log(4);
// };
// function getName() {
//   console.log(5);
// }
// Foo.getName();
// getName();
// Foo().getName();
// getName();
// new Foo.getName();
// new Foo().getName();
// new new Foo().getName();

// 4.
// 方案一 巧妙利用 ==比较的时候 值类型转化的特性，如果一个对象和数字进行比较，那么先转化成字符串，再转化为数字

// var a = {
//   i: 0,
//   toString() {
//     return ++this.i;
//   },
// };

// 方案二 巧妙利用es6中新增的 Object.defineProperty 进行数据劫持，在判等的时候会调用a属性的getter方法

// var a = 0;

// Object.defineProperty(window, a, {
//   set: function () {
//     console.log("set");
//   },
//   get: function () {
//     console.log("get");
//     ++i;
//   },
// });

// if (a == 1 && a == 2 && a == 3) {
//   console.log("OK");
// }

// 5. 一道关于push的题目
// array中的push操作其实就是两步骤

// function push(x) {
//   // 在末尾添加一个元素
//   this[this.length] = x;
//   // 让长度加一
//   this.length++;
// }

// const obj = {
//   3: 3,
//   4: 4,
//   length: 2,
//   push: Array.prototype.push,
// };
// obj.push(1);
// obj.push(2);
// console.log(obj);

// 6. 闭包的两大用处：保存和保护
// function a(x, y) {
//   y = function () {
//     x = 2;
//   };
//   return function () {
//     var x = 3;
//     y();
//     console.log(x);
//   }.apply(this, arguments);
// }
// a();

// 7.数组扁平化

// var arr = [1, 2, [8, 7, 1, 12, 18], [1, 6, 8, 99, [1, 3, 5, [20, 4, 5, 27]]]];

// function flatMap(arr) {
//   let result = [];
//   for (let i = 0; i < arr.length; i++) {
//     const element = arr[i];
//     // console.log(element);
//     if (!Array.isArray(element)) {
//       result.push(element);
//     } else {
//       result = result.concat(flatMap(element));
//     }
//   }
//   return result;
// }

// console.log(flatMap(arr));

// 8. 排序（学习一个快拍）

// let arr = [229, 383, 93, 3, 2, 30, 3, 31, 94, 1];
// let newArr = arr.sort((x, y) => x - y);

// console.log(newArr);

// 9. 数据变形

const TreeNode = {
  val: 1,
  left: {
    val: 2,
    left: {
      val: 4,
    },
    right: {
      val: 5,
    },
  },
  right: {
    val: 3,
    left: {
      val: 6,
    },
    right: {
      val: 7,
    },
  },
};

function preOrderRecur(treeNode) {
  const result = [];
  const stack = [treeNode];
  function preOrder() {
    while (stack.length > 0) {
      const node = stack.pop();
      result.push(node.val);
      if (node.right) stack.push(node.right);
      if (node.left) stack.push(node.left);
    }
  }
  preOrder();
  return result;
}
const result = preOrderRecur(TreeNode);
console.log(result);

// 先序遍历;
// 递归
// function preOrderRecur(root) {
//   const arr = [];
//   function preOrder(root) {
//     if (root) {
//       arr.push(root.val);
//       console.log(root.val);
//     }
//     if (root.left) preOrder(root.left);
//     if (root.right) preOrder(root.right);
//   }
//   preOrder(root);
//   return arr;
// }

// 使用栈
// function preOrderRecur(TreeNode) {
//   var list = [];
//   let stack = [TreeNode];
//   while (stack.length !== 0) {
//     const cur = stack.pop();
//     const right = cur.right;
//     const left = cur.left;
//     list.push(cur.val);

//     if (right) {
//       stack.push(right);
//     }
//     if (left) {
//       stack.push(left);
//     }
//   }
//   return list;
// }
// const result = preOrderRecur(TreeNode);
// console.log(result);
var loseloseHashCode = function (key) {
  var hash = 0;
  for (var i = 0; i < key.length; i++) {
    hash += key.charCodeAt(i);
    return hash % 37;
  }
};

this.get = function (key) {
  return table[loseloseHashCode(key)];
};
this.remove = function (key) {
  table[loseloseHashCode(key)] = undefined;
};
