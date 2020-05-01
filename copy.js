var obj1 = {
  num: 12,
  str: "string",
  obj: { a: 1, b: 2 },
  arr: [1, 2],
  func: function() {
    console.log("great");
  }
};
console.log(obj1);
// 赋值操作 不论修改任何属性都是同步修改
// var obj2 = obj1;
// console.log(obj1);
// console.log(obj2);
// obj2.num = 5;
// console.log(obj1);
// console.log(obj2);
// 浅拷贝
function shallowCopy(obj) {
  var newObj = {};
  for (prop in obj) {
    newObj[prop] = obj[prop];
  }
  return newObj;
}
var obj3 = shallowCopy(obj1);
console.log(obj1);
console.log(obj3);
obj3.num = 5;
obj3.str = "ss";
//   错误示范
// obj3.obj = 10;
// 正确修改 可以得知浅赋值只是创建了一个新对象，遍历旧对象，
// 把所有属性给新对象创建一份，值类型创建新值，引用类型创建引用，还是指向原来的
obj3.obj.a = 10;
console.log(obj1);
console.log(obj3);

// 深拷贝 deepcopy  有几种不同的解决方式
// 第一种  手动使用递归实现深拷贝
function deepClone1(obj) {
  //判断拷贝的要进行深拷贝的是数组还是对象，是数组的话进行数组拷贝，对象的话进行对象拷贝
  var objClone = Array.isArray(obj) ? [] : {};
  //进行深拷贝的不能为空，并且是对象或者是
  if (obj && typeof obj == "object") {
    for (prop in obj) {
      if (typeof obj[prop] == "object") {
        objClone[prop] = deepClone1(obj[prop]);
      } else {
        objClone[prop] = obj[prop];
      }
    }
  }
  return objClone;
}

var obj4 = deepClone1(obj1);
console.log(obj1);
console.log(obj4);
// 修改函数后，不再相等，表示是两个方法，不是值引用
obj4.func = function add() {};
console.log(obj1);
console.log(obj4);
console.log(obj1.func === obj4.func);

// 第二种 使用JSON内建的stringify方法  缺陷是不能实现对象中方法的深拷贝
// 因为JSON是一种通用的数据传递类型，所以JSON不能转换 function, Symbol 和 undefined 等js才有的特性
function deepClone2(obj) {
  var _obj = JSON.stringify(obj),
    objClone = JSON.parse(_obj);
  return objClone;
}
var obj5 = deepClone2(obj1);
console.log(obj1);
// 缺陷是不能实现对象中方法的深拷贝 发现方法没有拷贝出来
console.log(obj5);

// 第三种 使用jq中的extend方法
// 第四种 使用Object.assign() 等同于之前的shallowCopy方法， 只拷贝了一层
// 当对象中只有一级属性，没有二级属性的时候，此方法为深拷贝，但是对象中有对象的时候，此方法，在二级属性以后就是浅拷贝。
var obj6 = {};
Object.assign(obj6, obj1);
console.log(obj1);
console.log(obj6);
obj6.num = 3;
obj6.str = "dd";
obj6.obj.a = 4;
console.log(obj1);
console.log(obj6);
// 第五种 使用lodash中的cloneDeep方法 https://www.lodashjs.com/docs/latest#_clonedeepvalue

// 深拷贝之循环引用和解决
function deepCopy(obj) {
  // hash表，记录所有的对象的引用关系
  let map = new WeakMap();

  function dp(obj) {
    let result = null;
    let keys = Object.keys(obj);
    let key = null,
      temp = null,
      existobj = null;

    existobj = map.get(obj);
    //如果这个对象已经被记录则直接返回
    if (existobj) {
      return existobj;
    }

    result = {};
    map.set(obj, result);

    for (let i = 0, len = keys.length; i < len; i++) {
      key = keys[i];
      temp = obj[key];
      if (temp && typeof temp === "object") {
        result[key] = dp(temp);
      } else {
        result[key] = temp;
      }
    }
    return result;
  }

  return dp(obj);
}

const obj1 = {
  x: 1
};
// obj1.z = obj1;

const obj2 = {
  x: 2
};

obj1.next = obj2;
obj2.next = obj1;

const obj3 = deepCopy(obj1);

console.log(obj3);
