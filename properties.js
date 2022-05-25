// 获取js对象属性（自身，原型，枚举和不可枚举）
// 所以我们有四种不同的情况
// 自身可枚举，自身所有属性，自身+原型可枚举，自身+原型所有属性
// 第一种 自身可枚举
// es5 即ie 8以上的浏览器，使用Object.keys()
var Person = function(name) {
  this.name = name;
};

// 创建原型属性
Person.prototype.age = 26;

// 创建实例
var person = new Person("xiaog");

// 在person实例中创建不可枚举属性"job"
Object.defineProperty(person, "job", {
  value: "FEDer",
  enumerable: false,
  configurable: true,
  writable: true
});

// 只能返回自身可枚举属性
console.log(Object.keys(person)); // ["name"]

// es3 如果要兼容 ie8以下的浏览器，使用 for in
// 使用for in的时候会遍历自身和继承的可枚举属性，
// 所以要配合 hasOwnProperty使用才能做好兼容
for (p in person) {
  // 只有是自身属性时，打印
  if (Object.hasOwnProperty(p)) {
    console.log(p); // "name"
  }
}
// 第二种 自身+原型的可枚举属性 使用 for in
var Person = function(name) {
  this.name = name;
};

// 创建原型属性
Person.prototype.age = 26;

// 创建实例
var person = new Person("xiaog");

// 在person实例中创建不可枚举属性"job"
Object.defineProperty(person, "job", {
  value: "FEDer",
  enumerable: false,
  configurable: true,
  writable: true
});

var person = new Person("xiaog");
for (p in person) {
  // 只能打印自身+原型中可枚举属性
  console.log(p); // "name", "age"
}

// 第三种 获取自身的所有属性 内建方法：Object.getOwnPropertyNames
var Person = function(name) {
  this.name = name;
};

// 创建原型属性
Person.prototype.age = 26;

// 创建实例
var person = new Person("xiaog");

// 在person实例中创建不可枚举属性"job"
Object.defineProperty(person, "job", {
  value: "FEDer",
  enumerable: false,
  configurable: true,
  writable: true
});

var ownAllProperties = Object.getOwnPropertyNames(person);

// 可以打印自身可枚举属性"name"以及不可枚举属性"job"
console.log(ownAllProperties); // ["name", "job"]

//   第四种 获取自身和原型的所有属性 并没有内建方法， 需要自己写
// 获取所有属性方法封装
function getAllPropertyNames(obj) {
  var props = [];

  do {
    Object.getOwnPropertyNames(obj).forEach(function(prop) {
      if (props.indexOf(prop) === -1) {
        props.push(prop);
      }
    });
  } while ((obj = Object.getPrototypeOf(obj)));

  return props;
}

// 测试
var Person = function(name) {
  this.name = name;
};

// 创建原型属性
Person.prototype.age = 26;

// 创建实例
var person = new Person("xiaog");

// 在person实例中创建不可枚举属性"job"
Object.defineProperty(person, "job", {
  value: "FEDer",
  enumerable: false,
  configurable: true,
  writable: true
});

var allPropertiesNames = getAllPropertyNames(person);
// console.log(Object.getOwnPropertyNames(person));
console.log(allPropertiesNames); // 返回的数组中会包括"name", "job", "age", 还有原型对象中其他默认不可枚举属性
